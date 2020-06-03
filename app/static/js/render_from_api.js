function renderAll(currentState) {

        var request = new XMLHttpRequest();
        request.open('GET', `${window.location.origin}/api?page[size]=0&filter[state]=${currentState}&sort=date`, true);
        
        request.onload = function() {
            allData = JSON.parse(this.response).data;
            
            // render functions
            renderStats(currentState, 
                allData[allData.length-1],
                allData[allData.length-2]);
            renderHeader(currentState,
                allData[allData.length-1]);
            renderMainGraph(currentState, allData);
        };

        request.send();
};