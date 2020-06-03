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

function renderMainGraph(currentState) {

  var request = new XMLHttpRequest();
  request.open('GET', `${window.location.origin}/api?page[size]=0&filter[state]=${currentState}&sort=date`, true);

  request.onload = function() {
    
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    var data = data.data
    
    var dates = data.map(a => a.attributes.date);
    var positive = data.map(a => a.attributes.positiveTotal);
    var deaths = data.map(a => a.attributes.deathTotal);
    
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
        removeData(ctx)
        addData(ctx, 'Deceased', deaths)
        addData(ctx, 'Positive', positive)
    }


  };

  request.send();
}

renderMainGraph("USA");