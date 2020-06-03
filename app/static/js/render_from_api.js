function renderAll(currentState) {

    renderSideBar();

    var request = new XMLHttpRequest();
    url = `${window.location.origin}/api?` +
        `filter[state]=${currentState}&` +
        `page[size]=0&` +
        `sort=date`;
    request.open('GET', url, true);
        
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