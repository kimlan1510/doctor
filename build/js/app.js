(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey="6b4c0b9e479346ef69c9abee7864545d";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Doctor(issue, location, gender){
  if(issue == "undefined"){
    this.Issue = null;
  } else if(location == "undefined"){
    this.Location = null;
  } else{
  this.Issue = issue;
  this.Location = location;
  this.Gender = gender;
  }
}

Doctor.prototype.searchDoctor = function (issue, location, currentLocation, gender, displayInfo, displayRest) {
  var stringIssue = "query=";
  var stringLoc = "&location=";
  if(issue === ""){
    stringIssue = "";
  } if(location === ""){
    stringLoc = "";
  }

  $.get("https://api.betterdoctor.com/2016-03-01/doctors?" + stringIssue + issue + stringLoc + location + "&user_location=" + currentLocation + "&gender=" + gender + "&skip=0&limit=20&user_key=" + apiKey)
  .then(function(response){
    var info = response.data;
    console.log(info);
    info.forEach(function(element){
      if(typeof element.practices !== "undefined"){
        displayInfo(element.practices[0], element.educations, element.profile );
      } else{
        displayRest(element.educations, element.profile);
      }
    });
  })
  .fail(function(error){
    console.log("At least one of the request parameters 'medical issue', 'location' needs to be provided. Error Code: " + error);

  });
};

exports.doctorModule = Doctor;

},{"./../.env":1}],3:[function(require,module,exports){
var Doctor = require('./../js/backend.js').doctorModule;

function displayInfo(address, educations, profile){
  var street = address.visit_address.street;
  var city = address.visit_address.city;
  var state = address.visit_address.state_long;
  var zip = address.visit_address.zip;
  var firstName = profile.first_name;
  var lastName = profile.last_name;
  var bio = profile.bio;
  var img = profile.image_url;
  if(educations.length > 0){
    var degree = educations[0].degree;
    var school = educations[0].school;
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Address: " + street +" "+ city + " " + state + " " + zip + "</li>" +
    "<li>Degree: " + degree + "</li>" +
    "<li>School: " + school + "</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  } else {
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Address: " + street +" "+ city + " " + state + " " + zip + "</li>" +
    "<li>Degree: Not available</li>" +
    "<li>School: Not available</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  }

}

function displayRest(educations, profile){
  var firstName = profile.first_name;
  var lastName = profile.last_name;
  var bio = profile.bio;
  var img = profile.image_url;
  if(educations.length > 0){
    var degree = educations[0].degree;
    var school = educations[0].school;
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Degree: " + degree + "</li>" +
    "<li>School: " + school + "</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  } else {
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Degree: Not available</li>" +
    "<li>School: Not available</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  }
}


$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#display").empty();
    var medIssue = $("#medical-issue").val();
    var location = $("#location").val();
    var gender = $("#gender").val();
    var Doctors = new Doctor(medIssue, location, gender);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var currentLocation = latitude + "," + longitude;

      Doctors.searchDoctor(Doctors.Issue, Doctors.Location, currentLocation, Doctors.Gender, displayInfo, displayRest);
    }

    function error(err) {
      $("#display").text("error: " + err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  });
});

},{"./../js/backend.js":2}]},{},[3]);