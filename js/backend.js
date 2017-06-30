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
