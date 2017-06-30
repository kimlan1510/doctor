var apiKey = require('./../.env').apiKey;

function Doctor(name, issue, location, gender){
  if(issue == "undefined"){
    this.Issue = null;
  } else if(location == "undefined"){
    this.Location = null;
  } else if(name == "undefined"){
    this.Name = null;
  } else{
  this.Issue = issue;
  this.Location = location;
  this.Gender = gender;
  this.Name = name;
  }
}

Doctor.prototype.searchDoctor = function (name, issue, location, specialtyUid, currentLocation, gender, displayInfo, displayRest, displayError) {
  var stringName = "name=";
  var stringIssue = "query=";
  var stringLoc = "&location=";
  var stringSpecUid = "&specialty_uid="
  if(name === ""){
    stringName = "";
  } if(issue === ""){
    stringIssue = "";
  } if(location === ""){
    stringLoc = "";
  } if(specialtyUid ===""){
    stringSpecUid = "";
  }

  $.get("https://api.betterdoctor.com/2016-03-01/doctors?" + stringName + name + stringIssue + issue + stringSpecUid + specialtyUid + stringLoc + location + "&user_location=" + currentLocation + "&gender=" + gender + "&skip=0&limit=20&user_key=" + apiKey)
  .then(function(response){
    var info = response.data;
    info.forEach(function(element){
      if(typeof element.practices !== "undefined"){
        displayInfo(element.practices[0], element.educations, element.profile );
      } else{
        displayRest(element.educations, element.profile);
      }
    });
  })
  .fail(function(error){
    displayError();
  });
};

function Doctor(name, issue, location, gender){
  if(issue == "undefined"){
    this.Issue = null;
  } else if(location == "undefined"){
    this.Location = null;
  } else if(name == "undefined"){
    this.Name = null;
  } else{
  this.Issue = issue;
  this.Location = location;
  this.Gender = gender;
  this.Name = name;
  }
}

Doctor.prototype.displayMarkers = function (name, issue, location, specialtyUid, currentLocation, gender, getLocation, displayError) {
  var stringName = "name=";
  var stringIssue = "query=";
  var stringLoc = "&location=";
  var stringSpecUid = "&specialty_uid="
  if(name === ""){
    stringName = "";
  } if(issue === ""){
    stringIssue = "";
  } if(location === ""){
    stringLoc = "";
  } if(specialtyUid ===""){
    stringSpecUid = "";
  }

  $.get("https://api.betterdoctor.com/2016-03-01/doctors?" + stringName + name + stringIssue + issue + stringSpecUid + specialtyUid + stringLoc + location + "&user_location=" + currentLocation + "&gender=" + gender + "&skip=0&limit=20&user_key=" + apiKey)
  .then(function(response){
    var info = response.data;
    info.forEach(function(element){
      if(typeof element.practices !== "undefined"){
        getLocation(element.practices[0]);
      } else{
        console.log("Some of the Doctors don't provide an address");;
      }
    });
  })
  .fail(function(error){
    displayError();
  });
};


exports.doctorModule = Doctor;
