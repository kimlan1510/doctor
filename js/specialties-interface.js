var Specialties = require('./../js/specialties.js').specialtiesModule;

function displaySpecialties(data){
  console.log(data);
  $("#specialty").append(
    "<option value=" + data.uid + ">" + data.name + "</option>"
    // "<option value>" + data.name +"</option>"
  );

}
$(document).ready(function(){
    var specialtiesOption = new Specialties();
    specialtiesOption.getSpecialties(displaySpecialties);

});
