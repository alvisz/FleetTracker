require('dotenv').config()
const   express     = require('express'),
        router      = express.Router(),
        {Client}    = require("@googlemaps/google-maps-services-js"),

        API_KEY =  process.env.GOOGLE_API_KEY;



router.post('/distanceapi', getDistance);

/*
This is specially made API, because I didn't find any suitable library for Google maps routing :)

I didn't know that Google API allows only 25 waypoints + start and end coordinates, so I had to split the arrays into
chunks of 27.

Time spent here - Almost 3 hours.

*/

async function getDistance(req, res) {
    const {locations} = req.body;
    let locationsParsed = await locations.map(function (location){
        return {lng: location.longitude, lat: location.latitude}
    })
    if (!locations){
        res.json({
            success: false,
            message: "No locations provided"
        })
        return
    }
    if (locations.length === 2) {
        let distance = calculateTwoPoints(locationsParsed);
        res.json({
            success: true,
            distance: distance
        })
        return
    }
    if (locations.length >= 3){
        if (locations.length > 27) {
            let distance = 0;
            let splittedArray = spliceArrays(locations);
            for(let i = 0; i<splittedArray.length;i++){
                let arrayDistance = await calculateManyPoints(splittedArray[i])
                distance += arrayDistance;
            }
            res.json({
                success: true,
                distance: distance
            })
            return
        }
        let distance = await calculateManyPoints(locationsParsed);
        res.json({
            success:true,
            distance: distance
        })
        return
    }
    res.json({
        success: false,
        message: "Need at least two points to measure distance"
    })

}

function spliceArrays(locations){
    let arr = [];
    while(true){
        if (arr.length === 0){
            let newArray = locations.splice(0,27)
            arr.push(newArray)
            continue;
        }
        let newArray = locations.splice(0,26)
        let lastArr = arr[arr.length-1];
        let lastElement = lastArr[lastArr.length-1];
        newArray.unshift(lastElement)
        arr.push(newArray);
        if (locations.length === 0){
            break;
        }
    }
    return arr;

}

function calculateTwoPoints(locations){
    const client = new Client();
    return client.directions({
        params: {
            origin: locations[0],
            destination: locations[locations.length-1],
            key: API_KEY,
            mode: "driving",
            timeout: 1000, // milliseconds
        }
    }).then((r) => {
        let count = 0;
        const reducer = function (accumulator, item) {
            return accumulator + item.distance.value
        }
        return r.data.routes[0].legs.reduce(reducer, count);
    }).catch((e) => {
        console.log(e?.response.data.error_message);
    });
}

function calculateManyPoints(locations){
    let firstPoint = locations[0];
    let lastPoint = locations[locations.length-1]
    let waypoints = locations.slice(1, -1);
    const client = new Client();
    return client.directions({
        params: {
            origin: firstPoint,
            destination: lastPoint,
            waypoints: waypoints,
            mode: "driving",
            key: API_KEY,
            timeout: 1000, // milliseconds
        }
    }).then((r) => {
        let count = 0;
        const reducer = function (accumulator, item) {
            return accumulator + item.distance.value
        }
        return r.data.routes[0].legs.reduce(reducer, count);
    }).catch((e) => {
        console.log(e.response?.data.error_message);
    });
}


module.exports = router;
