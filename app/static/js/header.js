function renderHeader(currentState, latestData) {

  latestDate = latestData.map(a => a.attributes.date);

  console.log("Rendering Header")

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