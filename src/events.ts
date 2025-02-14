// document.addEventListener("DOMContentLoaded", function () {
//     loadData();
// });

// // form.addEventListener("reset", (e) => {
// //     // setTimeout waits for reset to finish
// //     setTimeout(() => {
// //         saveData();
// //     }, 1);
// // });

import { cycleThemes } from "../material/material.js";

document.getElementById("change-theme")?.addEventListener("click", (e) => {
    const element = e.currentTarget as HTMLElement;

    if (cycleThemes(document.body, ["light", "dark"]) == "light") {
        element.innerText = "dark_mode";
    } else {
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
