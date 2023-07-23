$(document).ready(function(){

    var nameerror=1
    var emailerror=1
    var ageerror=1
    var passworderror=1
    var cpassworderror=1

     // Get the modal
     var modal = $('#modalDialog');

    // Get the button that opens the modal
    var btn = $("#submit");

    // Get the <span> element that closes the modal
    var span = $(".close");

        // When the user clicks the button, open the modal 
        btn.on('click', function() {
                modal.show();
                $("#mod").html("Please fill all the fields without errors to login")
            }
        //}
        );
        
        // When the user clicks on <span> (x), close the modal
        span.on('click', function() {
            modal.fadeOut();
        });

    // When the user clicks anywhere outside of the modal, close it
    $('body').bind('click', function(e){
        if($(e.target).hasClass("modal")){
            modal.fadeOut();
        }
    });

// name validation
nameerror=1
$("#namecheck").hide();
$("#name").keyup(function(){validatename();});
function validatename(){
    var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    let namevalue=$("#name").val();
    var intcheck=numberRegex.test(namevalue);
   
    if (namevalue.length==""){
        $("#namecheck").show();
        nameerror=1
    }
    else if(namevalue.length<3 || intcheck==true){
        $("#namecheck").show()
        $("#namecheck").html("**name must have atleast 3 charector and it cannot be a number")
        nameerror=1
    }
    else{
        $("#namecheck").hide();
        nameerror=0
    }
}
//email validation
emailerror=1
$("#emailvalid").hide();
$("#email").keyup(function(){validateemail();});
function validateemail(){
    var emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
    var emailvalue = $("#email").val();
    console.log(emailvalue)
    var echeck = !emailRegex.test(emailvalue);
    if(emailvalue.length==""){
        $("#emailvalid").show();
        emailerror=1
    }
    else if(emailvalue.length<1 || echeck==true){
        $("#emailvalid").show()
        $("emailvalid").html("**give a valid email")
        emailerror=1
    }
    else{
        $("#emailvalid").hide();
        emailerror=0
    }
}
//age validation
ageerror=1
$("#agevalid").hide();
$("#dob").change(function(){agecalculate();});
function agecalculate(){
    var dobInput = $("#dob").val();
    var dob = new Date(dobInput);
    var today = new Date();
    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
    $("#age").val(age);
    if(age<18 || age>100){
        $("#agevalid").show();
        ageerror=1
    }
    else{
        $("#agevalid").hide();
        ageerror=0

    }
}
//password validation
passworderror=1
$('#password').on("cut copy paste",function(e) {
    e.preventDefault();
    modal.show()
    $("#mod").html("copy paste is not allowed")
 });
$("#passwordcheck").hide();
$("#password").keyup(function(){validatepassword();});
function validatepassword(){
    var passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}/;
    let passwordvalue=$("#password").val();
    var passwordcheck=!passwordRegex.test(passwordvalue);
   
    if (passwordvalue.length==""){
        $("#passwordcheck").show();
        passworderror=1
    }
    else if(passwordcheck==true){
        $("#passwordcheck").show()
        $("#passwordcheck").html("**invalid password")
        passworderror=1
    }
    else{
        $("#passwordcheck").hide();
        passworderror=0
    }
    //password change
        $("#password").change(passwordchange())
        function passwordchange(){
            if($("#password").val()!=$("#cpassword").val()){
            $("#cpasswordcheck").show();
            cpassworderror=1
        }
        else if($("#password").val()==$("#cpassword").val()){
            $("#cpasswordcheck").hide();
            cpassworderror=0
        }
        }
}
//confirm password validation
cpassworderror=1
$('#cpassword').on("cut copy paste",function(e) {
    e.preventDefault();
    modal.show()
    $("#mod").html("copy paste is not allowed")
 });
$("#cpasswordcheck").hide();
$("#cpassword").keyup(function(){validateconfirmpassword();});
function validateconfirmpassword(){
    let cpasswordvalue=$("#cpassword").val();
    if(cpasswordvalue.length==""){
        $("#cpasswordcheck").show();
        cpassworderror=1
    }
    else if(cpasswordvalue!=$("#password").val()){
        $("#cpasswordcheck").show();
        $("#cpasswordcheck").html("**password is not matching")
        cpassworderror=1
    }
    else if(cpasswordvalue==$("#password").val()){
        $("#cpasswordcheck").hide();
        cpassworderror=0

    }
}
 //view password

 $("#phide").hide();
 $("#pshow").show();
 $("#phide").click(function(){viewpassword();})
 $("#pshow").click(function(){viewpassword();})
    function viewpassword() {
        var passwordinput = $("#password");
        if (passwordinput.attr("type") === "password") {
        passwordinput.attr("type", "text");
        $("#pshow").hide()
        $("#phide").show()
        } else {
        passwordinput.attr("type", "password");
        $("#phide").hide();
        $("#pshow").show();

        }
    }
// view cpassword

$("#chide").hide();
 $("#cshow").show();
 $("#chide").click(function(){viewcpassword();})
 $("#cshow").click(function(){viewcpassword();})
    function viewcpassword() {
        var cpasswordinput = $("#cpassword");
        if (cpasswordinput.attr("type") === "password") {
        cpasswordinput.attr("type", "text");
        $("#cshow").hide()
        $("#chide").show()
        } else {
        cpasswordinput.attr("type", "password");
        $("#chide").hide();
        $("#cshow").show();
        }
    }

//address validation
var addresserror=1
$("#addresscheck").hide();
$("#address").keyup(function(){addressvalid()})
function addressvalid(){
    if($("#address").val().length<8){
        $("#addresscheck").show();
        addresserror=1
    }
    else {
        $("#addresscheck").hide();
        addresserror=0
    }
}

$("#address")

//gender validation
$('#gendervalid').hide()
var gendererror=1
$( ".gender" ).mouseleave(function() {

    if ($('input[value="Male"]:checked').length || $('input[value="Female"]:checked' ).length || $('input[value="Other"]:checked' ).length) {
        
        
        $('#gendervalid').hide()
        gendererror=0
    
    }
    else{
        $('#show_error_gender').html('Please select one')
        $('#gendervalid').show()
        gendererror=1
    }


    });

//final submit
$("#signup-form").submit(function(event){
    event.preventDefault();
    $(".error-message").remove();
    if( $("#age").val()==""){
        ageerror=1
    }
    if (nameerror == 0 && ageerror == 0 && passworderror==0 && cpassworderror==0 && emailerror==0 && addresserror==0 && gendererror==0){

        modal.hide();
        window.location.href = "https://www.cybrosys.com";

    }
   
})          
});