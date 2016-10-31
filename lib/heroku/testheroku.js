/**
 * Created by yue on 10/31/16.
 */
var _ = require('lodash')
var random_name = require('node-random-name');
var firebase = require('firebase');
var config = {
    apiKey: "AIzaSyDkiG22NfKHBCAhZw6qee09AMQqjLc7dxM",
    authDomain: "fixr-e9187.firebaseapp.com",
    databaseURL: "https://fixr-e9187.firebaseio.com",
    storageBucket: "fixr-e9187.appspot.com",
    messagingSenderId: "326982378777"
};
firebase.initializeApp(config);
var database = firebase.database();
// San Francisco
var city_location = {
    lat: 37.78,
    lon: -122.41
}

var radius = 0.03

// simualate a random person entering, staying for a duration, and leaving
function simulate(){

    // generate a random person with a random name,
    // random location, and random duration
    var name = random_name()
    var duration = 1 + 5 * Math.random()
    var lat = city_location.lat + radius * (Math.random() - 0.5) * 2
    var lon = city_location.lon + radius * (Math.random() - 0.5) * 2
    //var restaurant = Math.floor((Math.random() * 4) + 1);

    var person = {
        name: name,
        duration: duration,
        lat: lat,
        lon: lon,

    }

    // simulate this person entering
    enter(person)

    //simulate this person moving
    /*
     setInterval(function(){
     move(person)
     }, 1000)
     */
    // simulate this person leaving after 'duration' seconds
    setTimeout(function(){
        leave(person)
    }, duration * 2000)

    // generate a random person with a random name,
    // random location, and random duration
    //var busref = new Firebase("https://publicdata-transit.firebaseio.com/sf-muni/vehicles");

    //bus_arr = ["1440", "8155", "5581", "5558", "1506", "1052", "1403", "6513", "8135", "8102"]
    //var one_bus = bus_arr[Math.floor(Math.random() * bus_arr.length)];
    //console.log(one_bus)
    //var abusref = busref.child(one_bus)

    var providerref = database.ref("/providers")
    var name = random_name()
    var duration = 3 + 10 * Math.random()
    /*
    abusref.once('value', function (snapshot) {
        data = snapshot.val()
        //var lat = city_location.lat + radius * (Math.random() - 0.5) * 2
        //var lon = city_location.lon + radius * (Math.random() - 0.5) * 2
        var lat = data.lat
        var lon = data.lon
        var person = {
            name: name,
            duration: duration,
            lat: lat,
            lon: lon
        }
        enter(person)
    })


    // simulate this person entering
    var timer = setInterval(function () {
        abusref.once('value', function (snapshot) {
            data = snapshot.val()
            providerref.child(name).update({lon: data.lon, lat: data.lat})
        })
    }, 1000);
     */
    // simulate this person leaving after 'duration' seconds
    setTimeout(function () {
        clearTimeout(timer);
        leave(name);
    }, duration * 10000)
}


function enter(person){
    //console.log('enter', person)
    var ref = database.ref("/");
    var usersRef = ref.child("providers");
    usersRef.child(person.name).set({
        name : person.name,
        duration: person.duration,
        lat: person.lat,
        lon: person.lon
    });
}



function leave(name){
    //console.log('leave', person)
    var ref = database.ref("/providers/"+name);
    ref.remove();
}
/*
 function move(person){
 console.log('move',person)
 var ref = new Firebase("https://hungry-asians.firebaseio.com/providers/");
 ref.on('value', function(snapshot){
 var p = snapshot.val()
 var positions = []
 var pos =[p.lat+1, p.lon+1]
 positions.push(pos)
 });
 }
 */
function leave(person){
    console.log('leave', person)
    var ref = database.ref("/providers/"+person.name);
    ref.remove();
}

function clear(){
    var ref = database.ref("/providers/");
    ref.remove();
}

//This is so we always start fresh
clear();

// run each second
setInterval(simulate, 100)