// var userid = localStorage.getItem("user-email");
// var accountno = localStorage.getItem("user-account-no");

// var adminid = localStorage.getItem("admin-login-id");
// var admin_accountno = localStorage.getItem("admin-account-no");


if (userid != "" && userid != null) {
  alert("You have already valid session! please logout to proceed to login page.");
  window.location.href = `../../pages/home.html`;
} else {

  let v1 = false,
    v2 = false;
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
    } else {
      $("#" + a4).removeClass("alert-danger");
      $("#" + a4).empty();
      $("#" + a1).addClass("addGreen");
      $("#" + a1).removeClass("addRed");
      if (a1 == "email") v1 = true;
      if (a1 == "password") v2 = true;
    }
    EDsubbtn();
  }
  $("form #email").keyup(function () {
    var regx =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    getInputVals(
      "email",
      regx,
      "Email should be valid. EG: example@example.com",
      "er1"
    );
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

  function EDsubbtn() {
    if (v1 == true && v2 == true) {
      document.querySelector("#LoginSub").disabled = false;
    } else {
      document.querySelector("#LoginSub").disabled = true;
    }
  }

  function sendlogin() {
    let email = document.getElementById("email").value;

    let pass = document.getElementById("password").value;

    var admin = $("#myadmin:checked").val();

    let dat = {
      login: 10,
      email: email,
      password: pass,
    };

    console.log(dat);
    $.ajax({
      url: "/users/authenticate",
      method: "POST",
      data: dat,
      success: function (data) {
        data = data;
        console.log(data);
        let dt = data;
        if (dt.stat == 1) {
          alert(dt.message);
        } else if (dt.stat == 2) {
          alert(dt.message);
        }
        else if (dt.stat == 3) {
          localStorage.setItem("user-email", email);
          // localStorage.setItem("user-account-no", dt[0].account_no);
          alert("Login successfully!");
          // window.location.href = `../dashboard.html?user-id=${email}&account-no=${dt[0].account_no}`;
          window.location.href = `../../pages/home.html`;
        }
        else {
          alert(" Http request or Network Error!");
        }
      },
    });
  }

  $("#LoginSub").on("click", function () {
    sendlogin();
  });

}