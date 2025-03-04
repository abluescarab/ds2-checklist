// material imports
import { initialize as initializeMaterial, getChildByClassName, MaterialState, } from "../lib/material/dist/material.js";
import { hasExpanded, populate, toggleAll, } from "../lib/material/dist/modules/components/tree.js";
// local imports
import { storageKeys, trees } from "./constants.js";
import { initialize as initializeDialogs } from "./dialogs/dialogs.js";
import { load, changeTheme } from "./utils.js";
const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = getChildByClassName(fabExpand, "md-fab__icon");
let initialized = false;
function changeFabExpand(expanded) {
    const tooltip = document.getElementById("fab-expand-tooltip");
    fabExpandIcon.innerText = expanded ? "remove" : "add";
    tooltip.innerText = expanded ? "Collapse all" : "Expand all";
}
document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);
        populate(element, items);
        element?.addEventListener("material:toggle", (e) => {
            const ev = e;
            if (ev.state == MaterialState.Expanded) {
                changeFabExpand(true);
            }
            else if (ev.state == MaterialState.Collapsed &&
                !hasExpanded(element, false)) {
                changeFabExpand(false);
            }
        });
    }
    initializeMaterial();
    initializeDialogs();
    initialized = true;
    load();
});
document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) => changeTheme(e.currentTarget));
document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
    if (!initialized) {
        return;
    }
    const ev = e;
    if (ev && ev.newValue) {
        const tree = document.getElementById(ev.newValue);
        changeFabExpand(hasExpanded(tree) ?? false);
    }
    localStorage.setItem(storageKeys.tab, e.newValue ?? "");
});
fabExpand?.addEventListener("click", () => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;
    if (tabName) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, expand ? "expanded" : "collapsed");
        changeFabExpand(expand);
    }
});
document.getElementById("fab-top")?.addEventListener("click", () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
}));
