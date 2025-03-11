// material imports
import { initialize as initializeMaterial, getChildByClassName, MaterialState, } from "../lib/material/dist/material.js";
import { hasExpanded, populate, toggleAll, } from "../lib/material/dist/modules/components/tree.js";
// local imports
import { storageKeys, trees } from "./constants.js";
import { initialize as initializeDialogs } from "./dialogs/dialogs.js";
import { load, changeTheme, toggleStorage } from "./utils.js";
const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = fabExpand
    ? getChildByClassName(fabExpand, "md-fab__icon")
    : null;
const tabs = document.getElementById("main-tabs");
let initialized = false;
function changeFabExpand(expanded) {
    if (!fabExpandIcon) {
        return;
    }
    const tooltip = document.getElementById("fab-expand-tooltip");
    fabExpandIcon.innerText = expanded ? "remove" : "add";
    if (tooltip) {
        tooltip.innerText = expanded ? "Collapse all" : "Expand all";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);
        if (!element) {
            continue;
        }
        populate(element, items);
        element.addEventListener("material:toggle", (e) => {
            const event = e;
            let state = false;
            // if expanded or collapsed
            if (event.state == MaterialState.Expanded ||
                event.state == MaterialState.Collapsed) {
                if (event.state == MaterialState.Expanded) {
                    changeFabExpand(true);
                }
                else if (!hasExpanded(element, false)) {
                    changeFabExpand(false);
                }
                state = event.state == MaterialState.Expanded;
            }
            if (event.state == MaterialState.Checked ||
                event.state == MaterialState.Unchecked) {
                state = event.state == MaterialState.Checked;
            }
            toggleStorage(event.source?.id, state);
            event.elements.forEach((el) => toggleStorage(el?.id, state));
        });
    }
    initializeMaterial();
    initializeDialogs();
    load();
    initialized = true;
    const tab = tabs?.dataset.mdTab;
    if (!tab) {
        return;
    }
    const tree = document.getElementById(tab);
    if (tree && hasExpanded(tree)) {
        changeFabExpand(true);
    }
});
document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) => changeTheme(e.currentTarget));
tabs?.addEventListener("material:change", (e) => {
    if (!initialized) {
        return;
    }
    const ev = e;
    if (ev && ev.newValue) {
        const tree = document.getElementById(ev.newValue);
        changeFabExpand(tree ? hasExpanded(tree) : false);
    }
    localStorage.setItem(storageKeys.tab, e.newValue ?? "");
});
fabExpand?.addEventListener("click", () => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;
    if (!tabName) {
        return;
    }
    const tree = document.getElementById(tabName);
    if (!tree) {
        return;
    }
    const elements = toggleAll(tree, expand, expand ? "expanded" : "collapsed");
    changeFabExpand(expand);
    elements.forEach((el) => toggleStorage(el.id, expand));
});
document.getElementById("fab-top")?.addEventListener("click", () => window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
}));
