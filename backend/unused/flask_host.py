from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from marshmallow_jsonapi.flask import Relationship, Schema
from flask_rest_jsonapi import ResourceRelationship, Api, ResourceDetail, ResourceList
from marshmallow_jsonapi import fields
import sqlite3

database_file = '../covid.sqlite'
# Create a new Flask application
app = Flask(__name__)

# Set up SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + database_file
db = SQLAlchemy(app)

# Setup sqlite3 instead of alchemy...
conn = sqlite3.connect(database_file)
cursor = conn.cursor()

class State(db.model):
    def __init__(self, name, date=None):
        self.name = name
        if date == None:
            date = cursor.execute(
                'SELECT MAX (date) FROM covid_tbl WHERE state = "{0}";'.format(name)
            ).fetchone()[0]
        self.date = date
        self.positiveTotal = cursor.execute(
            'SELECT positive FROM covid_tbl WHERE state = "{0}" AND date = "{1}";'.format(name, date)
        ).fetchone()[0]
        self.negativeTotal = cursor.execute(
            'SELECT negative FROM covid_tbl WHERE state = "{0}" AND date = "{1}";'.format(name, date)
        ).fetchone()[0]
        self.deathTotal = cursor.execute(
            'SELECT death FROM covid_tbl WHERE state = "{0}" AND date = "{1}";'.format(name, date)
        ).fetchone()[0]

class StateSchema(Schema):
    class Meta:
        type_ = 'state'
    self_view = "state_one"
    self_view_kwargs = {'id': '<id>'}
    self_view_many = 'state_many'

    id = fields.Integer()
    name = fields.Str(required=True)
    date = fields.Date()
    positiveTotal = fields.Integer()
    negativeTotal = fields.Integer()
    deathTotal = fields.Integer()

class StateMany(ResourceList):
    schema = StateSchema
    data_layer = {'session': db.session,
                  'model': State}

class StateOne(ResourceDetail):
    schema = StateSchema
    data_layer = {'session': db.session,
                  'model': State}

api = Api(app)
api.route(StateMany, 'state_many', '/states')
api.route(StateOne, 'state_one', '/states/<int:id>')

# main loop to run app in debug mode
if __name__ == '__main__':
    app.run(debug=True)
