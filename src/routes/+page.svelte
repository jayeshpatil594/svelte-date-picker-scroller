<script lang="ts">
	import DatePickerScroller from '$lib/DatePickerScroller/DatePickerScroller.svelte';
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

<p style="font-weight: bold;">Selected Date: {selectedDate?.toLocaleString()}</p>

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
</style>
