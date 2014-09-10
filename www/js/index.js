/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var options = { frequency: 1000 };  // Update every 1 seconds
var firstTime = true;
var lastx = 0, lasty = 0, lastz = 9.81;
var steps = 0;

// Anonymous Closures
(function () {
    document.addEventListener('deviceready', onDeviceReady, false);
})();

function onDeviceReady() {
    //var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
    var watchID = navigator.geolocation.watchPosition(onSuccessGeolocation, onErrorGeolocation, { timeout: 30000 });
}

//Acceleration

function onSuccess(acceleration) {

    var strMsg = '<p>Acceleration X: ' + acceleration.x + '<br />' +
        'Acceleration Y: ' + acceleration.y + '<br />' +
        'Acceleration Z: ' + acceleration.z + '<br />' +
        'Timestamp: ' + acceleration.timestamp + '</p>';

    $("#message").html(strMsg);

    if (firstTime) {
        lastx = acceleration.x;
        lasty = acceleration.y;
        lastz = acceleration.z;
        firstTime = false;
        return;
    }
    else {
        if (stepMade(acceleration.x, acceleration.y, acceleration.z))
            $("#steps").html("Pasos: " + steps++);

        lastx = acceleration.x;
        lasty = acceleration.y;
        lastz = acceleration.z;
    }

    //alert('Acceleration X: ' + acceleration.x + '\n' +
    //      'Acceleration Y: ' + acceleration.y + '\n' +
    //      'Acceleration Z: ' + acceleration.z + '\n' +
    //      'Timestamp: ' + acceleration.timestamp + '\n');
};

function onError() {
    alert('onError!');
};

function stepMade(x, y, z) {
    if (lasty - y > 2)
        return true;
    else
        return false;
};

//Geolocation

// onSuccess Callback
// This method accepts a Position object, which contains the
// current GPS coordinates
//
function onSuccessGeolocation(position) {
    alert('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
};

// onError Callback receives a PositionError object
//
function onErrorGeolocation(error) {
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

