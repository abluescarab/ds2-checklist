import { save, load, changeTheme } from "./utils.js";
import { cookieNames, cookies } from "./constants.js";

const cookieBanner = document.getElementById("cookie-banner");

document.addEventListener("DOMContentLoaded", function () {
    load();
});

document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget as HTMLElement);
});

document
    .getElementById("accept-cookies")
    ?.addEventListener("click", function (e) {
        cookies.set(cookieNames.allowed, "true");
        cookieBanner?.classList.remove("md-banner--visible");
        save();
    });

document
    .getElementById("decline-cookies")
    ?.addEventListener("click", function (e) {
        cookies.set(cookieNames.allowed, "false");
        cookieBanner?.classList.remove("md-banner--visible");
    });

// form.addEventListener("reset", (e) => {
//     // setTimeout waits for reset to finish
//     setTimeout(() => {
//         saveData();
//     }, 1);
// });
