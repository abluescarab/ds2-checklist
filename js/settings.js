import { storageKeys } from "./constants.js";
const cascadeCheckedControl = document.getElementById("cascade-checked");
const cascadeUncheckedControl = document.getElementById("cascade-unchecked");
const cascadeCollapsedControl = document.getElementById("cascade-collapsed");
function changeTreeSettings(cascadeChecked, cascadeToggled) {
    for (const element of document.getElementsByClassName("md-tree")) {
        const tree = element;
        tree.dataset.mdCascadeChecked = cascadeChecked;
        tree.dataset.mdCascadeToggled = cascadeToggled;
    }
}
export function loadSettings() {
    const cascadeChecked = localStorage.getItem(storageKeys.cascadeChecked) ?? "";
    const cascadeToggled = localStorage.getItem(storageKeys.cascadeToggled) ?? "";
    cascadeCheckedControl.checked =
        cascadeChecked == "checked" || cascadeChecked == "both";
    cascadeUncheckedControl.checked =
        cascadeChecked == "unchecked" || cascadeChecked == "both";
    cascadeCollapsedControl.checked = cascadeToggled == "collapsed";
}
export function saveSettings() {
    const cascadeToggledValue = cascadeCollapsedControl.checked
        ? "collapsed"
        : "";
    let cascadeCheckedValue = "";
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
    if (!cascadeCheckedValue) {
        localStorage.removeItem(storageKeys.cascadeChecked);
    }
    else {
        localStorage.setItem(storageKeys.cascadeChecked, cascadeCheckedValue);
    }
    if (cascadeCollapsedControl.checked) {
        localStorage.setItem(storageKeys.cascadeToggled, "collapsed");
    }
    else {
        localStorage.removeItem(storageKeys.cascadeToggled);
    }
    changeTreeSettings(cascadeCheckedValue, cascadeToggledValue);
}
