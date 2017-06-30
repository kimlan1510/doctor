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
};

Doctor.prototype.searchDoctor(issue, location, currentLocation,  gender) {
  var stringIssue = "query=";
  var stringLoc = "&location=";
  if(issue == ""){
    stringIssue = "";
  } if(location == ""){
    stringLoc = "";
  }

  $.get("https://api.betterdoctor.com/2016-03-01/doctors?" + stringIssue + issue + stringLoc + location + "&user_location=" + currentLocation + "&gender=" + gender + "&skip=0&limit=20&user_key=" + apiKey)
  .then(function(response){
    console.log(JSON.stringify(response));
  });
  .fail(function(error){
    console.log("At least one of the request parameters 'medical issue', 'location' needs to be provided. Error Code: " + error);
  })
};

exports.doctorModule = Doctor;
