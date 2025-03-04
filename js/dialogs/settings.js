import { hideDialog, showDialog } from "./dialogs.js";
import { storageKeys } from "../constants.js";
import { toggleStorage } from "../utils.js";
// tree behavior
let cascadeCheckedControl = null;
let cascadeUncheckedControl = null;
let cascadeCollapsedControl = null;
// page settings
let hideExpandAllControl = null;
let hideScrollToTopControl = null;
function changePageSettings(hideExpandAll, hideScrollToTop) {
    const expandAllButton = document.getElementById("fab-expand");
    const scrollToTopButton = document.getElementById("fab-top");
    if (expandAllButton) {
        expandAllButton.style.display = hideExpandAll ? "none" : "flex";
    }
    if (scrollToTopButton) {
        scrollToTopButton.style.display = hideScrollToTop ? "none" : "flex";
    }
}
function changeTreeSettings(cascadeChecked, cascadeToggled) {
    for (const element of document.getElementsByClassName("md-tree")) {
        const tree = element;
        tree.dataset.mdCascadeChecked = cascadeChecked;
        tree.dataset.mdCascadeToggled = cascadeToggled;
    }
}
export function initialize() {
    document.getElementById("settings")?.addEventListener("click", () => {
        document
            .querySelectorAll(".md-tooltip--visible")
            .forEach((t) => t.classList.remove("md-tooltip--visible"));
        showDialog("settings-dialog");
    });
    document
        .getElementById("settings-reset")
        ?.addEventListener("click", () => showDialog("reset-dialog"));
    document
        .getElementById("settings-clear")
        ?.addEventListener("click", () => showDialog("clear-dialog"));
    document
        .getElementById("settings-cancel")
        ?.addEventListener("click", (e) => hideDialog(e.currentTarget));
    document.getElementById("settings-save")?.addEventListener("click", (e) => {
        saveSettings();
        hideDialog(e.currentTarget);
    });
    cascadeCheckedControl = document
        .getElementById("cascade-checked")
        ?.querySelector("input");
    cascadeUncheckedControl = document
        .getElementById("cascade-unchecked")
        ?.querySelector("input");
    cascadeCollapsedControl = document
        .getElementById("cascade-collapsed")
        ?.querySelector("input");
    hideExpandAllControl = document
        .getElementById("hide-expand-all-button")
        ?.querySelector("input");
    hideScrollToTopControl = document
        .getElementById("hide-scroll-to-top-button")
        ?.querySelector("input");
}
export function loadSettings() {
    if (!hideExpandAllControl ||
        !hideScrollToTopControl ||
        !cascadeCheckedControl ||
        !cascadeUncheckedControl ||
        !cascadeCollapsedControl) {
        return;
    }
    // page settings
    const hideExpandAll = localStorage.getItem(storageKeys.hideExpandAll) != null;
    const hideScrollToTop = localStorage.getItem(storageKeys.hideScrollToTop) != null;
    hideExpandAllControl.checked = hideExpandAll;
    hideScrollToTopControl.checked = hideScrollToTop;
    changePageSettings(hideExpandAll, hideScrollToTop);
    // tree behavior
    const cascadeChecked = localStorage.getItem(storageKeys.cascadeChecked) ?? "";
    const cascadeToggled = localStorage.getItem(storageKeys.cascadeToggled) ?? "";
    cascadeCheckedControl.checked =
        cascadeChecked == "checked" || cascadeChecked == "both";
    cascadeUncheckedControl.checked =
        cascadeChecked == "unchecked" || cascadeChecked == "both";
    cascadeCollapsedControl.checked = cascadeToggled == "collapsed";
    changeTreeSettings(cascadeChecked, cascadeToggled);
}
export function saveSettings() {
    if (!cascadeCheckedControl ||
        !cascadeUncheckedControl ||
        !cascadeCollapsedControl ||
        !hideExpandAllControl ||
        !hideScrollToTopControl) {
        return;
    }
    // page settings
    toggleStorage(storageKeys.hideExpandAll, hideExpandAllControl.checked);
    toggleStorage(storageKeys.hideScrollToTop, hideScrollToTopControl.checked);
    changePageSettings(hideExpandAllControl.checked, hideScrollToTopControl.checked);
    // tree behavior
    const cascadeToggledValue = cascadeCollapsedControl.checked
        ? "collapsed"
        : "";
    let cascadeCheckedValue = "";
    // TODO: replace with dropdown/dialog/etc.
    if (cascadeCheckedControl.checked && !cascadeUncheckedControl.checked) {
        cascadeCheckedValue = "checked";
    }
    else if (cascadeUncheckedControl.checked &&
        !cascadeCheckedControl.checked) {
        cascadeCheckedValue = "unchecked";
    }
    else if (cascadeCheckedControl.checked &&
        cascadeUncheckedControl.checked) {
        cascadeCheckedValue = "both";
    }
    toggleStorage(storageKeys.cascadeChecked, cascadeCheckedValue != "", cascadeCheckedValue);
    toggleStorage(storageKeys.cascadeToggled, cascadeCollapsedControl.checked, "collapsed");
    changeTreeSettings(cascadeCheckedValue, cascadeToggledValue);
}
