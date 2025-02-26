// material imports
import { initialize, getChildByClassName } from "@material/material";
import { populate, toggleAll } from "@material/modules/components/tree";
// local imports
import { save, load, changeTheme } from "./utils.js";
import { cookieNames, cookies, bonfires, bosses, npcs, dynaAndTillo, } from "./constants.js";
const cookieBanner = document.getElementById("cookie-banner");
document.addEventListener("DOMContentLoaded", function () {
    populate(document.getElementById("bonfires"), bonfires);
    populate(document.getElementById("npcs"), npcs);
    populate(document.getElementById("bosses"), bosses);
    populate(document.getElementById("dyna-and-tillo"), dynaAndTillo);
    initialize();
    load();
});
document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget);
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
document.getElementById("fab-expand")?.addEventListener("click", (e) => {
    const fab = getChildByClassName(e.currentTarget, "md-fab__icon");
    const expand = fab?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;
    if (tabName) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, true);
        fab.innerText = expand ? "remove" : "add";
    }
});
document.getElementById("fab-top")?.addEventListener("click", (e) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});
// form.addEventListener("reset", (e) => {
//     // setTimeout waits for reset to finish
//     setTimeout(() => {
//         saveData();
//     }, 1);
// });
