function renderHeader(currentState) {

  console.log("Rendering Header")

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

    var caseStats = document.getElementById('header');
        /*
        caseStats.innerHTML =
            "<div>" +
                "<h2>COVID-19 Statistics</h2>" +
                "<i>Most current data: " + latestDate + "</i>" +
            "</div>";
        */

        caseStats.innerHTML =
            '<div>' +
                '<header style="border-bottom: 1px transparent #000;">' +
                    '<h1 style="display: inline-block;">COVID-19 Statistics</h1>' +
                    '<span style="margin-left: 100px";"font-size: 10%"><i>Most current data: ' + latestDate + '</i></span>' +
                '</header>' +
            '</div>';

};
