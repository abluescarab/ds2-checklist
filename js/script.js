// material imports
import { initialize, getChildByClassName, getParentWithClass, } from "../lib/material/dist/material.js";
import { populate, toggleAll } from "../lib/material/dist/modules/components/tree.js";
// local imports
import { bonfires, bosses, npcs, dynaAndTillo, storageKeys } from "./constants.js";
import { load, changeTheme } from "./utils.js";
import { saveSettings } from "./settings.js";
document.addEventListener("DOMContentLoaded", function () {
    populate(document.getElementById("bonfires"), bonfires);
    populate(document.getElementById("npcs"), npcs);
    populate(document.getElementById("bosses"), bosses);
    populate(document.getElementById("dyna-and-tillo"), dynaAndTillo);
    load();
    initialize();
});
document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget);
});
document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
    localStorage.setItem(storageKeys.tab, e.newValue ?? "");
});
document.getElementById("settings")?.addEventListener("click", (e) => {
    document
        .getElementById("settings-dialog")
        ?.classList.add("md-dialog--visible");
});
document.getElementById("settings-cancel")?.addEventListener("click", (e) => {
    getParentWithClass(e.currentTarget, "md-dialog")?.classList.remove("md-dialog--visible");
});
document.getElementById("settings-save")?.addEventListener("click", () => {
    saveSettings();
    document
        .getElementById("settings-dialog")
        ?.classList.remove("md-dialog--visible");
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
