function renderMainGraph(currentState, allData) {

  var dates = allData.map(a => a.attributes.date);
  var positive = allData.map(a => a.attributes.positiveTotal);
  var deaths = allData.map(a => a.attributes.deathTotal);
  
  chartDiv = document.getElementById("main_graph_canvas")
  while (chartDiv.firstChild) {
      chartDiv.firstChild.remove();
  }

  var canvas = document.createElement("CANVAS");
  canvas.id = "myChart"
  chartDiv.append(canvas)

  var ctx = document.getElementById("myChart").getContext("2d");

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

function chartOptions(currentState) {

  const maingraph_buttons = document.getElementById('main_graph_btn_group');
  
  var options = [
    {"days":15, "text":"15 days" },
    {"days":30, "text":"30 days"},
    {"days":45, "text":"45 days"},
    {"days":60, "text":"60 days"},
    {"days":90, "text":"90 days"},
    {"days":0, "text":"All"}
  ]
  options.forEach(a => {
    const btn = document.createElement("BUTTON");
      btn.setAttribute('class', "btn-group btn-group-toggle");
      btn.setAttribute('data-toggle', 'button');
      btn.textContent = a.text;
      btn.onclick = function() {
        updateMainChart(currentState, a.days)
      };
  
      //const btn_input = document.createElement("INPUT");
        //btn_input.setAttribute("type", "radio")
       // btn_input.setAttribute("name", "options")
        //btn_input.setAttribute("id", "option")
        //btn_input.setAttribute("autocomplete", "off")

      maingraph_buttons.appendChild(btn)//.appendChild(btn_input)
  });

}