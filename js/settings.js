import { storageKeys } from "./constants.js";
const cascadeCheckedControl = document.getElementById("cascade-checked");
const cascadeUncheckedControl = document.getElementById("cascade-unchecked");
const cascadeCollapseControl = document.getElementById("cascade-collapse");
function changeTreeSettings(cascadeChecked, cascadeCollapse) {
    for (const element of document.getElementsByClassName("md-tree")) {
        const tree = element;
        tree.dataset.mdCascadeChecked = cascadeChecked;
        if (cascadeCollapse) {
            tree.dataset.mdCascadeCollapse = "";
        }
        else {
            delete tree.dataset.mdCascadeCollapse;
        }
    }
}
export function loadSettings() {
    const cascadeChecked = localStorage.getItem(storageKeys.cascadeChecked) ?? "";
    const cascadeCollapse = localStorage.getItem(storageKeys.cascadeCollapse) != null;
    cascadeCheckedControl.checked =
        cascadeChecked == "checked" || cascadeChecked == "both";
    cascadeUncheckedControl.checked =
        cascadeChecked == "unchecked" || cascadeChecked == "both";
    cascadeCollapseControl.checked = cascadeCollapse;
}
export function saveSettings() {
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
    if (cascadeCheckedValue != "") {
        localStorage.setItem(storageKeys.cascadeChecked, cascadeCheckedValue);
    }
    else {
        localStorage.removeItem(storageKeys.cascadeChecked);
    }
    if (cascadeCollapseControl.checked) {
        localStorage.setItem(storageKeys.cascadeCollapse, "");
    }
    else {
        localStorage.removeItem(storageKeys.cascadeCollapse);
    }
    changeTreeSettings(cascadeCheckedValue, cascadeCollapseControl.checked);
}
