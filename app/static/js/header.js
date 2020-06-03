function renderHeader(currentState, latestData) {

    var caseStats = document.getElementById("header");
    caseStats.innerHTML =
        "<div>" +
            "<header style='border-bottom: 1px transparent #000;'>" +
                "<h1 style='display: inline-block;'>COVID-19 Statistics</h1>" +
                    "<span style='margin-left: 100px';'font-size: 10%'>" +
                        "<i>Most current data: " + latestData.attributes.date + "</i>" +
                    "</span>" +
            "</header>" +
        "</div>";

}
