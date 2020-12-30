import requests
from datetime import datetime
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask_host import State


def connect_db():
    DATABASE_URL = os.environ['DATABASE_URL']
    buildSession = sessionmaker()
    engine = create_engine(DATABASE_URL)
    buildSession.configure(bind=engine)
    #session = buildSession()
    return buildSession()


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

    current = State(state, date, positive, negative, death)

    # Allow for updates of old data in case mistakes are fixed upstream,
    # use builtin update query to find new records for .add()
    update = session.query(State).filter_by(
        state=current.state, date=current.date
    ).update({
        "positiveTotal": current.positiveTotal,
        "negativeTotal": current.negativeTotal,
        "deathTotal": current.deathTotal
    })
    if update == 0:
        session.add(current)

def get_data():
    usa_source = "https://api.covidtracking.com/v1/us/daily.json"
    states_source = "https://api.covidtracking.com/v1/states/daily.json"

    data_session = requests.Session()
    usa_data = data_session.get(usa_source)
    states_data = data_session.get(states_source)
    items = usa_data.json() + states_data.json()
    return items

session = connect_db

for i in get_data():
    update_site(i)

session.commit()
session.close()
