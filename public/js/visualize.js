var userid = localStorage.getItem("user-email");
// var accountno = localStorage.getItem("user-account-no");

console.log(userid);
if (userid == "" || userid == null) {
  document.body.innerHTML = "";
  alert("Current Valid Session is not found! please login to continue.");
  window.location.href = `../`;
} else {
  function logout() {
    let isExecuted = confirm("Are you sure want to logout?");
    if (isExecuted) {
      localStorage.setItem("user-email", "");
      alert("Logged out successfully!!!");
      window.location.href = "../";
    } else {
      console.log("Not logged out! Staying here.");
    }
  }

  function logoutBTNS() {
    console.log(googleSign);

    if (googleSign) {
      document.querySelector("#logoutBTN1").style.display = "none";
      document.querySelector("#logoutBTN2").style.display = "block";
    } else {
      document.querySelector("#logoutBTN2").style.display = "none";
      document.querySelector("#logoutBTN1").style.display = "block";
    }
  }

  //smooth scroll onclick nav-link
  $('footer a[href*="#"]').on("click", function (e) {
    e.preventDefault();

    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  $(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
    });
  });

  //sign out the current user
  function Logout() {
    window.location.href = "./controllers/auth/logout.php";
  }

  // Popovers
  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  // Or, pass the months and weekdays as an array for each invocation.
  $(".datepicker").pickadate({
    format: "yyyy-mm-dd",
    formatSubmit: "yyyy-mm-dd",
  });

  // Material Select Initialization
  $(document).ready(function () {
    $(".mdb-select").materialSelect();
  });

  // toggle between dashboard pages
  $("#bologna-listL a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    let alinks = ["lg1", "lg2", "lg3", "lg4", "lg5", "lg6"];
    for (var i = 0; i < alinks.length; i++) {
      if (alinks[i] == this.id) {
        document.querySelector(
          "#bologna-listL #" + alinks[i]
        ).children[0].style.color = "black";
        document.querySelector(
          "#bologna-listL #" + alinks[i]
        ).children[0].style.backgroundcolor = "white";
      } else {
        document.querySelector(
          "#bologna-listL #" + alinks[i]
        ).children[0].style.color = "white";
        document.querySelector(
          "#bologna-listL #" + alinks[i]
        ).children[0].style.backgroundcolor = "black";
      }
    }
  });

  // toggle between dashboard pages
  $("#bologna-listF a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    let alinks = ["fn1", "fn2", "fn3"];
    for (var i = 0; i < alinks.length; i++) {
      if (alinks[i] == this.id) {
        document.querySelector(
          "#bologna-listF #" + alinks[i]
        ).children[0].style.color = "black";
        document.querySelector(
          "#bologna-listF #" + alinks[i]
        ).children[0].style.backgroundcolor = "white";
      } else {
        document.querySelector(
          "#bologna-listF #" + alinks[i]
        ).children[0].style.color = "white";
        document.querySelector(
          "#bologna-listF #" + alinks[i]
        ).children[0].style.backgroundcolor = "black";
      }
    }
  });

  // toggle between dashboard pages
  $("#bologna-listS a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
    let alinks = ["tn1", "tn2", "tn3"];
    for (var i = 0; i < alinks.length; i++) {
      if (alinks[i] == this.id) {
        document.querySelector(
          "#bologna-listS #" + alinks[i]
        ).children[0].style.color = "black";
        document.querySelector(
          "#bologna-listS #" + alinks[i]
        ).children[0].style.backgroundcolor = "white";
      } else {
        document.querySelector(
          "#bologna-listS #" + alinks[i]
        ).children[0].style.color = "white";
        document.querySelector(
          "#bologna-listS #" + alinks[i]
        ).children[0].style.backgroundcolor = "black";
      }
    }
  });
}
