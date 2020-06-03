function renderSideBar() {

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
        ["Washington DC","DC"],
        ["West Virginia","WV"],
        ["Wisconsin","WI"],
        ["Wyoming","WY"]
    ];

    const sidebar_buttons = document.getElementById('side_bar_btn_group');

    statesWithAbbr.forEach(state => {
        
        const btn = document.createElement('BUTTON');
        btn.setAttribute('class', 'btn btn-sm btn-primary py-0');
        btn.setAttribute('data-toggle', 'button');
        btn.setAttribute('style', 'font-size: 0.8em');
        btn.textContent = state[0];
        btn.onclick = function() {
            location.href = state[1]
        };

        sidebar_buttons.appendChild(btn)

    });

}