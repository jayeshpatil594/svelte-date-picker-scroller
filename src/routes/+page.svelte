<script lang="ts">
	import DatePickerScroller from '$lib/DatePickerScroller/DatePickerScroller.svelte';
	import CalenderSvg from '../../static/calender.svg?raw';
	let selectedDate: Date;

	function onDateSelection(e: CustomEvent<Date>) {
		selectedDate = e.detail;
	}
</script>

<h3>DatePickerScroller Demo</h3>

<div class="scroller-container">
	<DatePickerScroller on:selection={onDateSelection}>
		<div slot="activeRowHighlighter" class="active-row-highlighter"></div>
	</DatePickerScroller>
</div>

<div class="output-container">
	<p>Output (on:selection)</p>
	<div class="row-center">
		<input
			class="input"
			value={`${selectedDate?.getDate()}/${selectedDate?.getMonth() + 1}/${selectedDate?.getFullYear()}`}
			type="text"
			name="selectedDate"
			id="selectedDate"
		/>
		<div>
			{@html CalenderSvg}
		</div>
	</div>
</div>

<style>
	.scroller-container {
		border: 1px solid gray;
		border-radius: 4px;
		padding: 0.5rem;
	}
	.active-row-highlighter {
		background-color: blue;
		pointer-events: none;
		opacity: 0.2;
		border-radius: 2rem;
		width: 100%;
		height: 100%;
	}
	.output-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}
	.row-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.input {
		width: 7rem;
		background-color: lightcyan;
		border: none;
		font-weight: 600;
		padding: 0.3rem;
	}
</style>
