function renderStats(currentState) {

  var today = moment().format("YYYY-MM-DD").toString()
  console.log("today: " + today); // DEBUG

  stats = {
    positiveToday:null,
    deathToday:null,
    positiveYesterday:null,
    positiveYesterday:null
  };
  console.log("initialized: " + stats.positiveToday); // DEBUG
  console.log("initialized: " + stats); // DEBUG

  var todayRequest = new XMLHttpRequest();
  var yesterdayRequest = new XMLHttpRequest();
  todayRequest.open('GET', `http://127.0.0.1:9999/states?filter[state]=${currentState}&sort=-date&page[size]=1&page[number]=1`, false);
  yesterdayRequest.open('GET', `http://127.0.0.1:9999/states?filter[state]=${currentState}&sort=-date&page[size]=1&page[number]=2`, false);

  todayRequest.onload = function() {

    // Begin accessing JSON data here
    var todayData = JSON.parse(this.response);
    var todayData = todayData.data;
    console.log("todayData from todayRequest.onload(): " + todayData); // DEBUG

    stats.positiveToday = todayData.map(a => a.attributes.positiveTotal);
    stats.deathToday = todayData.map(a => a.attributes.deathTotal);
    console.log("stats.positiveToday from todayRequest.onload(): " + stats.positiveToday); // DEBUG
    console.log("stats.deathToday from todayRequest.onload(): " + stats.deathToday); // DEBUG

    if (todayData.date != today) {
        staleData = True
        today = todayData.date
    };

  };

  yesterdayRequest.onload = function(){

    // Begin accessing JSON data here
    var yesterdayData = JSON.parse(this.response);
    var yesterdayData = yesterdayData.data;
    console.log("yesterdayData from yesterdayRequest.onload(): " + yesterdayData); // DEBUG

    stats.positiveYesterday = yesterdayData.map(a => a.attributes.positiveTotal);
    stats.deathYesterday = yesterdayData.map(a => a.attributes.deathTotal);
    console.log("stats.positiveYesterday from yesterdayRequest.onload(): " + stats.positiveYesterday); // DEBUG
    console.log("stats.deathYesterday from yesterdayRequest.onload(): " + stats.deathYesterday); // DEBUG

  };

  function htmlStats() {

    console.log("stats.positiveToday from htmlStats(): " + stats.positiveToday); // DEBUG
    console.log("stats.positiveYesterday from htmlStats(): " + stats.positiveYesterday); // DEBUG
    var positiveIncrease = stats.positiveToday - stats.positiveYesterday;
    var deathIncrease = stats.deathToday - stats.deathYesterday;

    if (currentState != "USA") {
        currentState = StateShortToFull(currentState)
    }

    var caseStats = document.getElementById('case_stats');
    caseStats.innerHTML =
        "<div>" +
            "<h5>Total Cases: " + currentState + "</h5>" +
              "<h2>" + Intl.NumberFormat('en-US').format( stats.positiveToday ) + "</h2>" +
            "<h5>" + "<b>" + Intl.NumberFormat('en-US').format( positiveIncrease ) + "</b>" + " new cases since yesterday</h5>" +
        "</div>";

    var deathStats = document.getElementById('death_stats');
    deathStats.innerHTML =
        "<div>" +
            "<h5>Total Deaths: " + currentState + "</h5>" +
            "<h2>" + Intl.NumberFormat('en-US').format( stats.deathToday ) + "</h2>" +
            "<h5>" + "<b>" + Intl.NumberFormat('en-US').format( deathIncrease ) + "</b>" + " deaths since yesterday</h5>" +
        "</div>";

  };

  todayRequest.send();
  yesterdayRequest.send();
  htmlStats();

};

renderStats("USA");