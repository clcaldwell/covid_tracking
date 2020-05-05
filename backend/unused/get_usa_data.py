# -*- coding: utf-8 -*-
import requests
import sqlite3

usa_source = "https://covidtracking.com/api/v1/us/daily.json"
conn = sqlite3.connect("covid.sqlite")
cursor = conn.cursor()

session = requests.Session()
api_response = session.get(usa_source)
json_items = api_response.json()
for json_item in json_items:
    del json_item['states']
    json_item['state'] = 'USA'
    pk_query = 'INSERT INTO covid_tbl (state, date) values ("{0}", "{1}");'
    pk_query = pk_query.format(json_item['state'], json_item['date'])
    try:
        cursor.execute(pk_query)
        conn.commit()
    except sqlite3.IntegrityError:
        pass

    for key, value in json_item.items():
        if key != 'state' and key != 'date':
            sql_query = 'UPDATE covid_tbl SET {0} = "{1}" WHERE (state = "{2}" AND date = "{3}");'
            sql_query = sql_query.format(key, value, json_item['state'], json_item['date'])
            try:
                cursor.execute(sql_query)
            except:
                pass

conn.commit()
conn.close()