// import listerners
import { addFormListeners } from "./index.js";

// Route Function
export function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  //
  $(".login-Form .signin-Form div").off("click", "**");
  $(".login-Form .signin-Form .signinBTN").off("click", "**");

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      // console.log("data " + data);
      console.log("data: " + pageID);
      $("#app").html(data);
      // Set Listerners on other pages

      // Set Listeners if on login.html page
      if (pageID == "login") {
        $.get(`pages/${pageID}.html`, function (data) {
          $("#app").html(data);
          addFormListeners();
        });
      }
    }).fail(function (error) {
      console.log("Error: ", error);
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      // console.log("data " + data);
      console.log(pageID);
      $("#app").html(data);
    }).fail(function (error) {
      console.log("Error: ", error);
    });
  }
}
