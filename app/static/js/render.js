function renderAll(currentState) {
    // Header processing
        var latestResult = new XMLHttpRequest();
        // Filter by State, Sort by Date (newest first), and only grab the first record
        latestResult.open('GET', `${window.location.origin}/api?filter[state]=${currentState}&sort=-date&page[size]=1`, false);

        latestResult.onload = function() {

        // Begin accessing JSON data here
        var latestData = JSON.parse(this.response);
        var latestData = latestData.data;

        latestDate = latestData.map(a => a.attributes.date);

        };

        latestResult.send()

        renderMainGraph(currentState);
        renderStats(currentState);
        renderHeader(currentState, latestDate)

};