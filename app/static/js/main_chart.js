function renderMainGraph(currentState, allData) {

  var dates = allData.map(a => a.attributes.date);
  var positive = allData.map(a => a.attributes.positiveTotal);
  var deaths = allData.map(a => a.attributes.deathTotal);
    
  var ctx = document.getElementById('myChart').getContext('2d');
  if (ctx.data == undefined) {
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'bar',
      // The data for our dataset
      data: {
        labels: dates,
          datasets: [{
            label: 'Deceased',
            backgroundColor: 'rgb(35, 35, 35)',
            borderColor: 'rgb(35, 35, 35)',
            data: deaths
              },{
            label: 'Positive',
            backgroundColor: 'rgba(247, 20, 35, 0.9)',
            borderColor: 'rgb(247, 20, 35)',
            data: positive
          }]
      },
      // Configuration options go here
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
  } else {
      removeData(ctx);
      addData(ctx, 'Deceased', deaths);
      addData(ctx, 'Positive', positive);
  }

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
