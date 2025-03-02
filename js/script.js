// material imports
import { initialize as initializeMaterial, getChildByClassName, MaterialState, } from "../lib/material/dist/material.js";
import { hasExpanded, populate, toggleAll, } from "../lib/material/dist/modules/components/tree.js";
// local imports
import { storageKeys, trees } from "./constants.js";
import { initialize as initializeDialogs } from "./dialogs/dialogs.js";
import { load, changeTheme } from "./utils.js";
const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = getChildByClassName(fabExpand, "md-fab__icon");
function changeFabExpand(expanded) {
    const tooltip = document.getElementById("fab-expand-tooltip");
    fabExpandIcon.innerText = expanded ? "remove" : "add";
    tooltip.innerText = expanded ? "Collapse all" : "Expand all";
}
function confirm(headline, content, onYes) {
    const dialog = document.getElementById("confirmation-dialog");
    const headlineElement = getChildByClassName(dialog, "md-dialog__headline");
    const contentElement = getChildByClassName(dialog, "md-dialog__content");
    const yesButton = document.getElementById("confirmation-yes");
    if (!headlineElement || !contentElement) {
        return;
    }
    headlineElement.innerText = headline;
    contentElement.innerText = content;
    dialog?.classList.add("md-dialog--visible");
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
    load();
    initializeMaterial();
    initializeDialogs();
});
document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) => changeTheme(e.currentTarget));
document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
    const ev = e;
    if (ev && ev.newValue) {
        const tree = document.getElementById(ev.newValue);
        changeFabExpand(hasExpanded(tree) ?? false);
    }
    localStorage.setItem(storageKeys.tab, e.newValue ?? "");
});
fabExpand?.addEventListener("click", (e) => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;
    if (tabName) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, expand ? "expanded" : "collapsed");
        changeFabExpand(expand);
    }
});
document.getElementById("fab-top")?.addEventListener("click", (e) => window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
}));
