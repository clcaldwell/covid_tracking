from flask import Flask
import requests
  
app = Flask(__name__) 
  
import requests

def getCurrentStatsByState():
        api_response = requests.get('https://covidtracking.com/api/states?state=NY')
        #print("COVID-19 Testing Results in", api_response.json()['state'])
        return (api_response.json()['positive'])
        #print("Positive:", api_response.json()['positive'])
        #print("Negative:", api_response.json()['negative'])

#currentStats = getCurrentStatsByState()
@app.route("/")
def home_view(): 
        #return "<h1>Test Deploy to Heroku</h1>"
        #return "<h3> New York:{}<h3>".format(currentStats)
        return  "<h1>Test Deploy to Heroku</h1>\n"\
            "<h3> New York:{1}<h3>".format(getCurrentStatsByState())