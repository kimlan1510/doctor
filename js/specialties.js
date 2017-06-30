var apiKey = require('./../.env').apiKey;

function Specialties(){}

Specialties.prototype.getSpecialties = function(displaySpecialties){
  $.get("https://api.betterdoctor.com/2016-03-01/specialties?user_key=" + apiKey)
  .then(function(response){
    var data = response.data;
    data.forEach(function(element){
      displaySpecialties(element);
    });
  })
  .fail(function(error){
    console.log("error");
  });
};

exports.specialtiesModule=Specialties;
