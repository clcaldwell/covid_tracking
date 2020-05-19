from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from marshmallow_jsonapi.flask import Relationship, Schema
from flask_rest_jsonapi import ResourceRelationship, Api, ResourceDetail, ResourceList
from marshmallow_jsonapi import fields
from sqlalchemy import UniqueConstraint
import threading
import uuid
import os
import re
import subprocess

#from backend import data_import

database_file = 'covid.sqlite'
# Create a new Flask application
app = Flask(__name__)


@app.route('/')
def get_uuid():
    return str(uuid.uuid4())


# Set up SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


class State(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state = db.Column(db.String)
    date = db.Column(db.Date)
    positiveTotal = db.Column(db.Integer)
    negativeTotal = db.Column(db.Integer)
    deathTotal = db.Column(db.Integer)
    __table_args__ = (
        db.UniqueConstraint(state, date),
    )


# Create the table
db.create_all()


class StateSchema(Schema):
    class Meta:
        type_ = 'state'
        self_view = "state_one"
        self_view_kwargs = {'id': '<id>'}
        self_view_many = 'state_many'

    id = fields.Integer()
    state = fields.Str(required=True)
    date = fields.Date(required=True)
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

# Execute data_import.py in background. Has to be run this way to avoid race condition
process = subprocess.Popen(["python3", "backend/data_import.py"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

# main loop to run app in debug mode
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8080
    )
