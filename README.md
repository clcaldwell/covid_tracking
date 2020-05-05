# covid_tracking

[![Build Status](https://travis-ci.com/clcaldwell/covid_tracking.svg?branch=master)](https://travis-ci.com/clcaldwell/covid_tracking)

[![DeepSource](https://static.deepsource.io/deepsource-badge-light-mini.svg)](https://deepsource.io/gh/clcaldwell/covid_tracking/?ref=repository-badge)

This is a COVID-19 tracker created as a school project for the Software Development track at WGU.

Repo created from temlate graciously provided by navdeep-G. Template repo is here: navdeep-G/samplemod

## Data sourced from:

# API root page and docs
https://covidtracking.com/api

# Static data
https://covidtracking.com/api/v1/states/current.json
https://covidtracking.com/api/v1/states/daily.json


# Sample API Call
api_response = requests.get('https://covidtracking.com/api/states?state=NY')
print("COVID-19 Testing Results in", api_response.json()['state'])
print("Positive:", api_response.json()['positive'])
print("Negative:", api_response.json()['negative'])
