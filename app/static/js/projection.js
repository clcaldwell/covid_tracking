function generateProjection(currentState, allData) {

    var data = {
        dates: allData.map(a => a.attributes.date),
        positive: allData.map(a => a.attributes.positiveTotal),
        deaths: allData.map(a => a.attributes.deathTotal)
    };

positiveChange = getAvgChange(data.positive)
deathChange = getAvgChange(data.deaths)

prediction = new Array

currentPos = data.positive[data.positive.length-1]
currentDeath = data.deaths[data.deaths.length-1]

for (let step = 0; step < 15; step++) {
  currentPos = Math.round(currentPos * positiveChange)
  currentDeath = Math.round(currentDeath * deathChange)
  prediction.push(currentPos, currentDeath)
}

}

function getAvgChange (numArr) {
    
    var changes = new Array
    
    for (var i = 0; i < numArr.length-1; i++) {
        var diff = ( numArr[i+1] - numArr[i] )
        var change = ( numArr[i] / diff )
        changes.push(change)
    }

    var getAvgChange = arr => arr.reduce((a,b) => a + b, 0) / arr.length
    avgChange = getAvgChange(changes)
    
    return avgChange
}
