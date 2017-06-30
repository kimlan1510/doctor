
$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();
    var medIssue = $("#medical-issue").val();
    var location = $("#location").val();
    var gender = $("#gender").val();
  });
});
