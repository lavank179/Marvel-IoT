var userid = localStorage.getItem("user-email");
console.log(userid);
// var accountno = localStorage.getItem("user-account-no");

// var adminid = localStorage.getItem("admin-login-id");
// var admin_accountno = localStorage.getItem("admin-account-no");


if (userid != "" && userid != null) {
  alert("You have already valid session! please logout to proceed to login page.");
  window.location.href = `../../pages/home.html`;
} else {
  let v1 = false,
    v2 = false,
    v3 = false,
    v4 = false,
    v5 = false;

  EDsubbtn();

  function getInputVals(a1, a2, a3, a4) {
    var text = document.querySelector("form #" + a1).value;
    if (!a2.test(text)) {
      $("#" + a4).html(a3);
      $("#" + a4).addClass("alert-danger");
      $("#" + a1).addClass("addRed");
      $("#" + a1).removeClass("addGreen");
      if (a1 == "email") v1 = false;
      if (a1 == "password") v2 = false;
      if (a1 == "username") v3 = false;
      if (a1 == "phone") v5 = false;
    } else {
      $("#" + a4).removeClass("alert-danger");
      $("#" + a4).empty();
      $("#" + a1).addClass("addGreen");
      $("#" + a1).removeClass("addRed");
      if (a1 == "email") v1 = true;
      if (a1 == "password") v2 = true;
      if (a1 == "username") v3 = true;
      if (a1 == "phone") v5 = true;
    }
    EDsubbtn();
  }

  $("form #email").keyup(function () {
    var regx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    getInputVals(
      "email",
      regx,
      "Email should be valid. EG: example@example.com",
      "er1"
    );
  });

  $("form #username").keyup(function () {
    var regx = /^[a-zA-Z \-]{5,20}$/;
    getInputVals("username", regx, "Name should be valid.", "er3");
  });

  $("form #password").keyup(function () {
    var regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
    getInputVals(
      "password",
      regx,
      "Password shuld be [7 to 15 characters which contain at least one numeric digit and a special character].",
      "er2"
    );
  });

  $("form #cpassword").keyup(function () {
    var text = document.querySelector("form #password").value;
    var text1 = document.querySelector("form #cpassword").value;
    if (text != text1) {
      $("#er4").html("Password and confirm password should be same.");
      $("#er4").addClass("alert-danger");
      $("#cpassword").addClass("addRed");
      $("#cpassword").removeClass("addGreen");
      v4 = false;
    } else {
      $("#er4").removeClass("alert-danger");
      $("#er4").empty();
      $("#cpassword").addClass("addGreen");
      $("#cpassword").removeClass("addRed");
      v4 = true;
    }
    EDsubbtn();
  });

  $("form #phone").keyup(function () {
    var regx = /^([0|+[0-9]{1,5})?([6-9][0-9]{9})$/;
    getInputVals(
      "phone",
      regx,
      `Mobile number should be valid. +(**) - country code AND (**********) - 10 digit number`,
      "er5"
    );
  });

  function EDsubbtn() {
    if (v1 == true && v2 == true && v3 == true && v4 == true && v5 == true) {
      document.querySelector("#LoginSub").disabled = false;
    } else {
      document.querySelector("#LoginSub").disabled = true;
    }
  }

  $('#LoginSub').on('click', function () {
    sendRegister();
  });

  function sendRegister() {

    let user = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;
    let contact = document.getElementById("phone").value;
    // let gen = $('#gender').val();

    // let add = document.getElementById("address").value;
    // let acc = document.getElementById("account").value;
    // acc = parseInt(acc);

    let dat = {
      email: email,
      password: pass,
      username: user,
      phone: contact,
    }
    $.ajax({
      url: "/users/register",
      method: "POST",
      data: dat,
      success: function (data) {
        console.log(data);
        if (data.stat == 2) {
          alert("New User registered successfully! Please Login to continue.");
          window.location.href = `../../`;
        } else if (data.stat == 3) {
          alert("Error in DB Server! Please try again");
        } else if (data.stat == 1) {
          alert("User already exists! Please try with new details.");
        } else {
          alert("Some error has occured! please try again");
        }
      },
      error: (data) => {
        console.log(data);
        alert(data);
    }
    });
  }

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }
}