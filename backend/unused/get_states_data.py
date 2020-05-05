# -*- coding: utf-8 -*-
import requests
import us
import sqlite3

states_source = "https://covidtracking.com/api/states/daily?state="
conn = sqlite3.connect("covid.sqlite")
cursor = conn.cursor()

for state in us.states.STATES:
    session = requests.Session()
    api_response = session.get(states_source + state.abbr)
    state_json_items = api_response.json()
    for json_item in state_json_items:
        pk_query = 'INSERT INTO covid_tbl (state, date) values ("{0}", "{1}");'
        pk_query = pk_query.format(state.abbr, json_item['date'])
        try:
            cursor.execute(pk_query)
            conn.commit()
        except sqlite3.IntegrityError:
            pass

        for key, value in json_item.items():
            if key != 'state' and key != 'date':
                sql_query = 'UPDATE covid_tbl SET {0} = "{1}" WHERE (state = "{2}" AND date = "{3}");'
                sql_query = sql_query.format(key, value, state.abbr, json_item['date'])
                try:
                    cursor.execute(sql_query)
                except:
                    pass

conn.commit()
conn.close()