<script lang="ts">
	import DatePickerScroller from "$lib/DatePickerScroller/DatePickerScroller.svelte";
    let selectedDate: Date;

    function onDateSelection(e: CustomEvent<Date>) {
        selectedDate = e.detail;
    }

</script>
<h1>DatePickerScroller Demo</h1>

<div class="scroller-container">
    <DatePickerScroller on:selection={onDateSelection} />
</div>

<p>Selected Date: {selectedDate?.toLocaleString()}</p>

<style>
    .scroller-container {
        border: 1px solid gray;
        border-radius: 4px;
    }
</style>
