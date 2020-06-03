function renderStats(currentState, todayData, yesterdayData) {

    var today = moment().format("YYYY-MM-DD").toString();

    stats = {
        positiveToday:null,
        deathToday:null,
        positiveYesterday:null,
        positiveYesterday:null,
        yesterdayDate:null
    };

    if (todayData.date != today) {
        staleData = true
        today = todayData.date
    };

    stats.positiveToday = todayData.attributes.positiveTotal;
    stats.deathToday = todayData.attributes.deathTotal;
    stats.positiveYesterday = yesterdayData.attributes.positiveTotal;
    stats.deathYesterday = yesterdayData.attributes.deathTotal;
    stats.yesterdayDate = yesterdayData.attributes.date;

    htmlStats(currentState, stats);

};

function htmlStats(currentState, stats) {

    var positiveIncrease = stats.positiveToday - stats.positiveYesterday;
    var deathIncrease = stats.deathToday - stats.deathYesterday;

    if (currentState != "USA") {
        currentState = StateShortToFull(currentState);
    };

    var caseStats = document.getElementById('case_stats');
    caseStats.innerHTML =
        "<div>" +
            "<h5>Total Cases: " + currentState + "</h5>" +
              "<h2>" + Intl.NumberFormat('en-US').format( stats.positiveToday ) + "</h2>" +
            "<h5>" + "<b>" + Intl.NumberFormat('en-US').format( positiveIncrease ) + "</b>" + " new cases since " + stats.yesterdayDate +"</h5>" +
        "</div>";

    var deathStats = document.getElementById('death_stats');
    deathStats.innerHTML =
        "<div>" +
            "<h5>Total Deaths: " + currentState + "</h5>" +
            "<h2>" + Intl.NumberFormat('en-US').format( stats.deathToday ) + "</h2>" +
            "<h5>" + "<b>" + Intl.NumberFormat('en-US').format( deathIncrease ) + "</b>" + " deaths since " + stats.yesterdayDate + "</h5>" +
        "</div>";

};