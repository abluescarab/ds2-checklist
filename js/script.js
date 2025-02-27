// material imports
import { initialize, getChildByClassName } from "../lib/material/dist/material.js";
import { populate, toggleAll } from "../lib/material/dist/modules/components/tree.js";
// local imports
import { bonfires, bosses, npcs, dynaAndTillo } from "./constants.js";
import { load, changeTheme } from "./utils.js";
const cookieBanner = document.getElementById("cookie-banner");
document.addEventListener("DOMContentLoaded", function () {
    populate(document.getElementById("bonfires"), bonfires);
    populate(document.getElementById("npcs"), npcs);
    populate(document.getElementById("bosses"), bosses);
    populate(document.getElementById("dyna-and-tillo"), dynaAndTillo);
    initialize();
    initializeDialog();
    load();
});
document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget);
});
document.getElementById("settings")?.addEventListener("click", (e) => {
    console.log("Click");
    document
        .getElementById("settings-dialog")
        ?.classList.add("md-dialog--visible");
});
document.getElementById("fab-expand")?.addEventListener("click", (e) => {
    const fab = getChildByClassName(e.currentTarget, "md-fab__icon");
    const expand = fab?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;
    if (tabName && fab) {
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
