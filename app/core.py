# -*- coding: utf-8 -*-
import requests

def getCurrentStatsByState():
    api_response = requests.get('https://covidtracking.com/api/states?state=NY')
    #print("COVID-19 Testing Results in", api_response.json()['state'])
    print(api_response.json()['positive'])
    #print("Positive:", api_response.json()['positive'])
    #print("Negative:", api_response.json()['negative'])
