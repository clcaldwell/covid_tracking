from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from marshmallow_jsonapi.flask import Schema
from flask_rest_jsonapi import Api, ResourceDetail, ResourceList
from marshmallow_jsonapi import fields
import uuid
import os


# Create a new Flask application
app = Flask(__name__)


# Set up SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
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

    def __init__(self, state, date, positiveTotal, negativeTotal, deathTotal):
        self.state = state
        self.date = date
        self.positiveTotal = positiveTotal
        self.negativeTotal = negativeTotal
        self.deathTotal = deathTotal


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


@app.route('/')
def get_uuid():
    """Return random UUID"""
    return str(uuid.uuid4())


api = Api(app)
api.route(StateMany, 'state_many', '/api')
api.route(StateOne, 'state_one', '/api/<int:id>')


# main loop to run app in debug mode
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8080
    )
