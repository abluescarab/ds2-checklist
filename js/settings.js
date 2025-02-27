import { storageKeys } from "./constants.js";
// tree behavior
const cascadeCheckedControl = document.getElementById("cascade-checked");
const cascadeUncheckedControl = document.getElementById("cascade-unchecked");
const cascadeCollapsedControl = document.getElementById("cascade-collapsed");
// page settings
const hideExpandAllControl = document.getElementById("hide-expand-all-button");
const hideScrollToTopControl = document.getElementById("hide-scroll-to-top-button");
function toggleStorage(key, add, value = "") {
    if (add) {
        localStorage.setItem(key, value ?? "");
    }
    else {
        localStorage.removeItem(key);
    }
}
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
export function loadSettings() {
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
