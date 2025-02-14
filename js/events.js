// document.addEventListener("DOMContentLoaded", function () {
//     loadData();
// });
var _a;
// // form.addEventListener("reset", (e) => {
// //     // setTimeout waits for reset to finish
// //     setTimeout(() => {
// //         saveData();
// //     }, 1);
// // });
import { cycleThemes } from "../material/material.js";
(_a = document.getElementById("change-theme")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    const element = e.currentTarget;
    if (cycleThemes(document.body, ["light", "dark"]) == "light") {
        element.innerText = "dark_mode";
    }
    else {
        element.innerText = "light_mode";
    }
});
// document
//     .getElementById("accept-cookies")
//     .addEventListener("click", function (e) {
//         cookies.set(cookieNames.allowed, "true");
//         document.getElementById("cookie-banner").style.display = "none";
//         saveData();
//     });
// document
//     .getElementById("decline-cookies")
//     .addEventListener("click", function (e) {
//         cookies.set(cookieNames.allowed, "false");
//         document.getElementById("cookie-banner").style.display = "none";
//     });
