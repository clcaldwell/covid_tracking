function renderMainGraph(currentState, allData) {

  var dates = allData.map(a => a.attributes.date);
  var positive = allData.map(a => a.attributes.positiveTotal);
  var deaths = allData.map(a => a.attributes.deathTotal);
    
  var ctx = document.getElementById("myChart").getContext("2d");
  
  if (window.bar != undefined) { 
    window.bar.destroy();
  } 
  
  //if (ctx.data == undefined) {
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dates,
          datasets: [{
            label: "Deceased",
            backgroundColor: "rgb(35, 35, 35)",
            borderColor: "rgb(35, 35, 35)",
            data: deaths
              },{
            label: "Positive",
            backgroundColor: "rgba(247, 20, 35, 0.9)",
            borderColor: "rgb(247, 20, 35)",
            data: positive
          }]
      },
      options: {
          scales: {
              xAxes: [{
                  stacked: true,
              }],
              yAxes: [{
                  stacked: false,
                  ticks: {
                      beginAtZero: true
                  },
              }]
          }
      }
    });
  //} else {
     // removeData(ctx);
      //addData(ctx, "Deceased", deaths);
     // addData(ctx, "Positive", positive);
  //}

}

function updateMainChart(currentState, timeline) {
  
  console.log("UpdateMainChart() invoked") // DEBUG
  if (timeline !== undefined) {
    
    var request = new XMLHttpRequest();
    url = `${window.location.origin}/api?` +
      `filter[state]=${currentState}&` +
      `page[size]=${timeline}&` +
      `page[number]=1&` +
      `sort=-date`;
    request.open('GET', url, true);

    request.onload = function() {
        allData = JSON.parse(this.response).data;

        function dateSort(a,b) {
          return ( (new Date(a.attributes.date)) - (new Date(b.attributes.date)) );
        }
        allData = allData.sort(dateSort);

        renderMainGraph(currentState, allData);
    };

    request.send()
  };

}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
};

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
};