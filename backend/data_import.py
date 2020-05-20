import requests
from datetime import datetime
import time
from multiprocessing import Pool


def update_site(data_item):
    # make USA a state to match up USA/States datasets into one table
    if 'state' not in data_item:
        state = "USA"
    else:
        state = data_item['state']

    if ('positive' not in data_item) or (data_item['positive'] is None):
        positive = 0
    else:
        positive = data_item['positive']

    # some source missing negative columns for early data
    if ('negative' not in data_item) or (data_item['negative'] is None):
        negative = 0
    else:
        negative = data_item['negative']

    # some source missing death columns for early data
    if ('death' not in data_item) or (data_item['death'] is None):
        death = 0
    else:
        death = data_item['death']

    # date to ISO8601 format
    date = datetime.strptime(str(data_item['date']), "%Y%m%d").strftime("%Y-%m-%d")

    data_json = {
        "data": {
            "type": "state",
            "attributes": {
                "state": state,
                "date": date,
                "positiveTotal": positive,
                "negativeTotal": negative,
                "deathTotal": death
            }
        }
    }
    print(data_json)
    push_session = requests.Session()
    resp = push_session.post('http://127.0.0.1:8080/states', json=data_json)
    if resp.status_code == 500:
        pass  # duplicate entry warning
    if resp.status_code != 201 or 500:
        pass
        # raise ApiError('POST /tasks/ {}'.format(resp.status_code))
    # print('Created task. ID: {}'.format(resp.json()["id"]))


usa_source = "https://covidtracking.com/api/v1/us/daily.json"
states_source = "https://covidtracking.com/api/v1/states/daily.json"

data_session = requests.Session()
usa_data = data_session.get(usa_source)
states_data = data_session.get(states_source)
items = usa_data.json() + states_data.json()

timer = 0
ready = False
while ready is not True:
    try:
        print("Try...")
        status_code = requests.Session().get('http://127.0.0.1:8080/states').status_code
        print(status_code)
    except:
        print("Except...")
        time.sleep(1)
        pass
    else:
        print("Else...")
        if status_code == 200:
            print("Set ready to True")
            ready = True
            print(ready)
        time.sleep(1)

for i in items:
    update_site(i)
