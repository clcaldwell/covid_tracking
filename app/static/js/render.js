function renderAll(currentState) {

        var allRequest = new XMLHttpRequest();
        var todayRequest = new XMLHttpRequest();
        var yesterdayRequest = new XMLHttpRequest();

        // API Calls
        allRequest.open('GET', `${window.location.origin}/api?page[size]=0&filter[state]=${currentState}&sort=date`, true);
        todayRequest.open('GET', `${window.location.origin}/api?filter[state]=${currentState}&sort=-date&page[size]=1&page[number]=1`, true);
        yesterdayRequest.open('GET', `${window.location.origin}/api?filter[state]=${currentState}&sort=-date&page[size]=1&page[number]=2`, true);

        // Onload JSON parsing
        todayRequest.onload = function() {
            todayData = JSON.parse(this.response).data;
        };
        yesterdayRequest.onload = function(){
            yesterdayData = JSON.parse(this.response).data;
        };
        allRequest.onload = function() {
            allData = JSON.parse(this.response).data;
        };

        // Send all requests
        todayRequest.send();
        yesterdayRequest.send();
        allRequest.send();

        // Call render functions
        renderStats(currentState, todayData, yesterdayData);
        renderHeader(currentState, todayData);
        renderMainGraph(currentState, allData);

};