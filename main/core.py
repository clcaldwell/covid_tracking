# -*- coding: utf-8 -*-
from . import helpers
import requests

def get_hmm():
    """Get a thought."""
    return 'hmmm...'


def hmm():
    """Contemplation..."""
    if helpers.get_answer():
        print(get_hmm())

api_response = requests.get('https://covidtracking.com/api/states?state=NY')
print("COVID-19 Testing Results in", api_response.json()['state'])
print("Positive:", api_response.json()['positive'])
print("Negative:", api_response.json()['negative'])
