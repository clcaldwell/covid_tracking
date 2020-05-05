var statesWithAbbr = [
    ["United States","USA"],
    ["Alabama","AL"],
    ["Alaska","AK"],
    ["Arizona","AZ"],
    ["Arkansas","AR"],
    ["California","CA"],
    ["Colorado","CO"],
    ["Connecticut","CT"],
    ["Delaware","DE"],
    ["Florida","FL"],
    ["Georgia","GA"],
    ["Hawaii","HI"],
    ["Idaho","ID"],
    ["Illinois","IL"],
    ["Indiana","IN"],
    ["Iowa","IA"],
    ["Kansas","KS"],
    ["Kentucky","KY"],
    ["Louisiana","LA"],
    ["Maine","ME"],
    ["Maryland","MD"],
    ["Massachusetts","MA"],
    ["Michigan","MI"],
    ["Minnesota","MN"],
    ["Mississippi","MS"],
    ["Missouri","MO"],
    ["Montana","MT"],
    ["Nebraska","NE"],
    ["Nevada","NV"],
    ["New Hampshire","NH"],
    ["New Jersey","NJ"],
    ["New Mexico","NM"],
    ["New York","NY"],
    ["North Carolina","NC"],
    ["North Dakota","ND"],
    ["Ohio","OH"],
    ["Oklahoma","OK"],
    ["Oregon","OR"],
    ["Pennsylvania","PA"],
    ["Rhode Island","RI"],
    ["South Carolina","SC"],
    ["South Dakota","SD"],
    ["Tennessee","TN"],
    ["Texas","TX"],
    ["Utah","UT"],
    ["Vermont","VT"],
    ["Virginia","VA"],
    ["Washington","WA"],
    ["West Virginia","WV"],
    ["Wisconsin","WI"],
    ["Wyoming","WY"]
];

const sidebar = document.getElementById('side_bar');

const sidebar_container = document.createElement('div');
sidebar_container.setAttribute('class', 'container');

sidebar.appendChild(sidebar_container);

statesWithAbbr.forEach(state => {
      
    //const statelink = document.createElement('div');
    //statelink.setAttribute('href', '#${a}');

    //const br = document.createElement('br');

    const btn = document.createElement('BUTTON');
    btn.setAttribute('class', 'btn btn-warning');
    btn.textContent = state[0];
    btn.onclick = function() { renderMainGraph(state[1]) };
    //btn.onclick = function() { alert(state[1]) };
    //btn.setAttribute('href', `#${state[1]}`);

    //sidebar_container.appendChild(statelink)
    //statelink.appendChild(a)

    //sidebar.appendChild(statelink);
    //statelink.appendChild(a);
    //statelink.appendChild(br);
    sidebar_container.appendChild(btn);
    //sidebar_container.appendChild(br);

});