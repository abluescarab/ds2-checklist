// material imports
import { populate, toggleAll } from "../material/modules/components/tree.js";
import { initialize } from "../material/material.js";

// local imports
import { save, load, changeTheme } from "./utils.js";
import {
    cookieNames,
    cookies,
    bonfires,
    bosses,
    npcs,
    dynaAndTillo,
} from "./constants.js";

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
    changeTheme(e.currentTarget as HTMLElement);
});

document.getElementById("source-link")?.addEventListener("click", (e) => {});

document
    .getElementById("calculator-link")
    ?.addEventListener("click", (e) => {});

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
