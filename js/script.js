var _a, _b, _c;
import { save, load, changeTheme } from "./utils.js";
import { cookieNames, cookies } from "./constants.js";
const cookieBanner = document.getElementById("cookie-banner");
document.addEventListener("DOMContentLoaded", function () {
    load();
});
(_a = document.getElementById("change-theme")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
    changeTheme(e.currentTarget);
});
(_b = document
    .getElementById("accept-cookies")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (e) {
    cookies.set(cookieNames.allowed, "true");
    cookieBanner === null || cookieBanner === void 0 ? void 0 : cookieBanner.classList.remove("md-banner--visible");
    save();
});
(_c = document
    .getElementById("decline-cookies")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function (e) {
    cookies.set(cookieNames.allowed, "false");
    cookieBanner === null || cookieBanner === void 0 ? void 0 : cookieBanner.classList.remove("md-banner--visible");
});
// form.addEventListener("reset", (e) => {
//     // setTimeout waits for reset to finish
//     setTimeout(() => {
//         saveData();
//     }, 1);
// });
