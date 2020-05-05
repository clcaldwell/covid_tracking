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

  const app = document.getElementById('main_graph');
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.appendChild(container);

  var request = new XMLHttpRequest();
  request.open('GET', `http://127.0.0.1:9999/states?page[size]=0&filter[state]=${currentState}`, true);

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
        type: 'line',

        // The data for our dataset
        data: {
          labels: dates,
            datasets: [{
              label: 'Deceased',
                backgroundColor: 'rgb(247, 20, 35)',
                  borderColor: 'rgb(247, 20, 35)',
                  data: deaths
              },{
              label: 'Positive',
                backgroundColor: 'rgb(255, 234, 0)',
                  borderColor: 'rgb(255, 234, 0)',
                  data: positive
            }]
        },
          // Configuration options go here
          options: {}
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