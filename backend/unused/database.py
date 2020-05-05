# -*- coding: utf-8 -*-
import sqlite3
import requests

column_source = "https://covidtracking.com/api/states/daily?state=CA"
conn = sqlite3.connect("covid.sqlite")
c = conn.cursor()

try:
    c.execute("""
        CREATE TABLE IF NOT EXISTS covid_tbl (
            state VARCHAR(2) NOT NULL,
            date DATE NOT NULL,
            PRIMARY KEY (state, date)
        );
    """)
except:
    pass

api_response = requests.get(column_source)
response_json = api_response.json()
state_json_items = api_response.json()
for json_item in state_json_items:
    for key in json_item.keys():
        query = 'ALTER TABLE covid_tbl ADD COLUMN {0} NULL;'.format(key)
        try:
            c.execute(query)
        except sqlite3.OperationalError:
            pass


conn.commit()
conn.close()
