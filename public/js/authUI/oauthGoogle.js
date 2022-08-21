$(document).ready(() => {
    $.ajax({
        url: "/check_server",
        method: "POST",
        success: function(data) {
            console.log(data);
            $('#liveToast2 .toast-body').html(data);
            $('#liveToast2').toast('show');
        },
        error: function(err) {
            console.log(err.responseText);
            $('#liveToast1 .toast-body').html(err.responseText);
            $('#liveToast1').toast('show');

        }
    });
});

var userid = localStorage.getItem("user-email");
var googleSign = false;

// Client ID and API key from the Developer Console
var CLIENT_ID =
    "172737440267-f8an2073rpl1uu9t2a4v6eqlaegivhi6.apps.googleusercontent.com";
var API_KEY = "AIzaSyDEzWdWkai7FtPz7MYTh-dBdP3fYD4dHjA";

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/drive/v2/rest",
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES =
    "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.apps.readonly";

var authorizeButton = document.getElementById("authorize_button");
var signoutButton = document.getElementById("signout_button");

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load("client:auth2", initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client
        .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        })
        .then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick = handleSignoutClick;
        });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        googleSign = true;
        authorizeButton.style.display = "none";
        signoutButton.style.display = "block";
    } else {
        googleSign = false;
        authorizeButton.style.display = "block";
        signoutButton.style.display = "none";
    }
    if (userid != "" && userid != null) {
        logoutBTNS();
    }
}

/**
 *  Sign in the user upon button click.
 */
async function handleAuthClick(event) {
    await gapi.auth2.getAuthInstance().signIn();
    gapi.client.load("oauth2", "v2", function() {
        gapi.client.oauth2.userinfo.get().execute(function(resp) {
            console.log(resp);
            localStorage.setItem("user-email", resp.email);
            alert("Login successfully!");
            window.location.href = `../../pages/home.html`;
        });
    });
}

/**
 *  Sign out the user upon button click.
 */
async function handleSignoutClick(event) {
    await gapi.auth2.getAuthInstance().signOut();
    localStorage.setItem("user-email", "");
    alert("Logged out successfully!!!");
    window.location.href = "../";
}

function getUserDetails() {
    return new Promise((resolve, reject) => {
        gapi.client.load("oauth2", "v2", function() {
            gapi.client.oauth2.userinfo.get().execute(function(resp) {
                if (resp != undefined) {
                    resolve(resp);
                } else {
                    reject(resp);
                }
            });
        });
    });
}