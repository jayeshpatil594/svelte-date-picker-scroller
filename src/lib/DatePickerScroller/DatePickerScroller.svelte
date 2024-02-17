<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { COLUMNS, MONTHS, DAY_PREFIX, MONTH_PREFIX, YEAR_PREFIX } from './constants.js';
	import { debounce, isScrollBehaviorSupported, daysInMonth } from './utils.js';

	export let selectedDate: Date = new Date();
	export let maxDate: Date = new Date();
	export let minDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 10));
	export let noOfVisibleRows: number = 5;
	export let rowItemHeight: number = 38;
	export let rowItemStyles = {};
	export let activeRowItemStyles = {};
	$: customRowItemStyles = Object.entries(rowItemStyles)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');
	$: customActiveRowItemStyles = Object.entries(activeRowItemStyles)
		.map(([key, value]) => `${key}:${value}`)
		.join(';');

	const SCROLL_DEBOUNCE_DELAY = 300;

	const dispatch = createEventDispatcher();

	// Imp: do not remove this behavior: 'instant' initialisation, calling scrollIntoView multiple times onMount only works when behaviour is "instant | auto"
	let scrollIntoViewBehaviour: ScrollBehavior = 'instant';
	let scrollIntoViewPolyfill: (
		element: Element,
		scrollIntoViewOptions?: ScrollIntoViewOptions | undefined
	) => void;

	const fillerValue = -1;
	const fillerArr = Array.from({ length: Math.floor(noOfVisibleRows / 2) }, (_, i) => fillerValue);
	let noOfDays = 31;
	let noOfMonths = 12;
	let maxYear = maxDate.getFullYear();
	let minYear = minDate.getFullYear();

	$: daysArr = [...fillerArr, ...Array.from({ length: noOfDays }, (_, i) => i + 1), ...fillerArr];
	$: monthsArr = [...fillerArr, ...Array.from({ length: noOfMonths }, (_, i) => i), ...fillerArr]; // months are 0-indexed
	const yearsArr = [
		...fillerArr,
		...Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index),
		...fillerArr
	];

	$: selectedDay = selectedDate.getDate();
	$: selectedMonth = selectedDate.getMonth();
	$: selectedYear = selectedDate.getFullYear();
	$: scrollerContainerHeight = rowItemHeight * noOfVisibleRows;

	let dayContainerRef: HTMLUListElement;
	let monthContainerRef: HTMLUListElement;
	let yearContainerRef: HTMLUListElement;

	const debouncedScrollHandler = debounce((e: UIEvent, selectedColumn: string) => {
		handleScroll(e, selectedColumn);
	}, SCROLL_DEBOUNCE_DELAY);

	onMount(() => {
		(async () => {
			if (!isScrollBehaviorSupported()) {
				scrollIntoViewPolyfill = (await import('seamless-scroll-polyfill')).scrollIntoView;
			}
			scrollIntoView(dayContainerRef, `${DAY_PREFIX}${selectedDay}`);
			scrollIntoView(monthContainerRef, `${MONTH_PREFIX}${selectedMonth}`);
			scrollIntoView(yearContainerRef, `${YEAR_PREFIX}${selectedYear}`);
			scrollIntoViewBehaviour = 'smooth';
		})();
	});

	function handleClick(
		containerRef: HTMLUListElement,
		selectedColumn: string,
		selectedValue: number
	) {
		if (selectedColumn === COLUMNS.DAY) {
			selectedDay = selectedValue;
			scrollIntoView(containerRef, `${DAY_PREFIX}${selectedValue}`);
		} else if (selectedColumn === COLUMNS.MONTH) {
			selectedMonth = selectedValue;
			scrollIntoView(containerRef, `${MONTH_PREFIX}${selectedValue}`);
		} else {
			selectedYear = selectedValue;
			scrollIntoView(containerRef, `${YEAR_PREFIX}${selectedValue}`);
		}
		dispatch('selection', new Date(selectedYear, selectedMonth, selectedDay));
	}

	function updateNoOfDays(selectedMonth: number, selectedYear: number, maxDate: Date) {
		if (selectedYear === maxDate.getFullYear() && selectedMonth === maxDate.getMonth()) {
			noOfDays = maxDate.getDate();
		} else {
			noOfDays = daysInMonth(selectedMonth, selectedYear);
		}
	}

	function updateNoOfMonths(selectedYear: number, maxDate: Date) {
		if (selectedYear === maxDate.getFullYear()) {
			noOfMonths = maxDate.getMonth() + 1;
		} else {
			noOfMonths = 12;
		}
	}

	function handleScroll(e: UIEvent, selectedColumn: string) {
		const element = e.target as HTMLElement;
		const itemIndex = Math.round(element.scrollTop / rowItemHeight);
		if (selectedColumn === COLUMNS.DAY) {
			selectedDay = itemIndex + 1;
		} else if (selectedColumn === COLUMNS.MONTH) {
			selectedMonth = itemIndex;
		} else {
			selectedYear = itemIndex + minYear;
		}
		updateNoOfDays(selectedMonth, selectedYear, maxDate);
		updateNoOfMonths(selectedYear, maxDate);
		dispatch('selection', new Date(selectedYear, selectedMonth, selectedDay));
	}

	function scrollIntoView(container: HTMLUListElement, selectedValue: string) {
		const selectedItem = container.querySelector(`[data-value="${selectedValue}"]`);
		if (selectedItem) {
			if (scrollIntoViewPolyfill && !isScrollBehaviorSupported()) {
				scrollIntoViewPolyfill(selectedItem, {
					block: 'center',
					behavior: scrollIntoViewBehaviour
				});
			} else {
				selectedItem.scrollIntoView({ behavior: scrollIntoViewBehaviour, block: 'center' });
			}
		}
	}
</script>

<div class="scroller-container" style={`height: ${scrollerContainerHeight}px;`}>
	<ul
		class="column"
		bind:this={dayContainerRef}
		on:scroll={(e) => debouncedScrollHandler(e, COLUMNS.DAY)}
	>
		{#each daysArr as day}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class={`row-item ${selectedDay === day ? 'active-row-item' : ''}`}
				data-value={`${DAY_PREFIX}${day}`}
				on:click={() => handleClick(dayContainerRef, COLUMNS.DAY, day)}
				on:keydown={() => handleClick(dayContainerRef, COLUMNS.DAY, day)}
				style={`min-height: ${rowItemHeight}px; ${selectedDay === day ? customActiveRowItemStyles : customRowItemStyles}`}
			>
				<slot name="day" {day}>
					{day === fillerValue ? '' : day}
				</slot>
			</li>
		{/each}
	</ul>

	<ul
		class="column"
		bind:this={monthContainerRef}
		on:scroll={(e) => debouncedScrollHandler(e, COLUMNS.MONTH)}
	>
		{#each monthsArr as month}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class={`row-item ${selectedMonth === month ? 'active-row-item' : ''}`}
				data-value={`${MONTH_PREFIX}${month}`}
				on:click={() => handleClick(monthContainerRef, COLUMNS.MONTH, month)}
				on:keydown={() => handleClick(monthContainerRef, COLUMNS.MONTH, month)}
				style={`min-height: ${rowItemHeight}px; ${selectedMonth === month ? customActiveRowItemStyles : customRowItemStyles}`}
			>
				<slot name="month" {month}>
					{month === fillerValue ? '' : MONTHS[month]}
				</slot>
			</li>
		{/each}
	</ul>

	<ul
		class="column"
		bind:this={yearContainerRef}
		on:scroll={(e) => debouncedScrollHandler(e, COLUMNS.YEAR)}
	>
		{#each yearsArr as year}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class={`row-item ${selectedYear === year ? 'active-row-item' : ''}`}
				data-value={`${YEAR_PREFIX}${year}`}
				on:click={() => handleClick(yearContainerRef, COLUMNS.YEAR, year)}
				on:keydown={() => handleClick(yearContainerRef, COLUMNS.YEAR, year)}
				style={`min-height: ${rowItemHeight}px; ${selectedYear === year ? customActiveRowItemStyles : customRowItemStyles}`}
			>
				<slot name="year" {year}>
					{year === fillerValue ? '' : year}
				</slot>
			</li>
		{/each}
	</ul>
	<div
		class="active-row-highlighter"
		style={`height: ${rowItemHeight}px; top: ${rowItemHeight * Math.floor(noOfVisibleRows / 2)}px`}
	>
		<slot name="activeRowHighlighter" />
	</div>
</div>

<style>
	.scroller-container {
		display: flex;
		justify-content: center;
		width: 100%;
		overflow-x: hidden;
		white-space: nowrap;
		position: relative;
		scroll-snap-align: start;
	}
	ul {
		list-style-type: none;
		padding: 0px;
		margin: 0px;
	}
	.column::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 33.33%;
		overflow-y: auto;
		scroll-snap-type: y mandatory;
		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	.row-item {
		display: flex;
		align-items: center;
		justify-content: center;
		list-style: none;
		scroll-snap-align: start;
		width: 100%;
		opacity: 0.8;
	}

	.active-row-highlighter {
		position: absolute;
		width: 100%;
	}

	.active-row-item {
		font-weight: bold;
		opacity: 1;
	}
</style>
