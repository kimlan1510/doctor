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

Doctor.prototype.searchDoctor = function (issue, location, specialtyUid, currentLocation, gender, displayInfo, displayRest) {
  var stringIssue = "query=";
  var stringLoc = "&location=";
  var stringSpecUid = "&specialty_uid="
  if(issue === ""){
    stringIssue = "";
  } if(location === ""){
    stringLoc = "";
  } if(specialtyUid ===""){
    stringSpecUid = "";
  }

  $.get("https://api.betterdoctor.com/2016-03-01/doctors?" + stringIssue + issue + stringSpecUid + specialtyUid + stringLoc + location + "&user_location=" + currentLocation + "&gender=" + gender + "&skip=0&limit=20&user_key=" + apiKey)
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
    console.log("At least one of the request parameters 'medical issue', 'location' needs to be provided. Error Code: " + error);

  });
};

Doctor.prototype.getSpecialties = function(){
  $.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=" + apiKey)
  .then(function(response){
    console.log(response.data);
  })
  .fail(function(error){
    console.log("error");
  });
};

exports.doctorModule = Doctor;
