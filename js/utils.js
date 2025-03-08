import { cycleThemes, setTheme, } from "../lib/material/dist/material.js";
import { changeTab } from "../lib/material/dist/modules/components/tabs.js";
import { toggle } from "../lib/material/dist/modules/components/tree.js";
import { storageKeys } from "./constants.js";
import { loadSettings } from "./dialogs/settings.js";
export function changeTheme(themeButton, theme = null) {
    if (theme) {
        setTheme(document.body, theme);
    }
    else {
        theme = cycleThemes(document.body, "light", "dark");
    }
    const buttonText = theme == "light" ? "dark" : "light";
    themeButton.innerText = `${buttonText}_mode`;
    if (theme) {
        localStorage.setItem(storageKeys.theme, theme);
    }
}
export function load() {
    changeTheme(document.getElementById("change-theme"), localStorage.getItem(storageKeys.theme) ?? document.body.dataset.mdTheme);
    const tab = localStorage.getItem(storageKeys.tab) ?? "";
    const tabs = document.getElementById("main-tabs");
    if (tabs && tab) {
        changeTab(tabs, tab);
    }
    const settingsKeys = Object.values(storageKeys);
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || settingsKeys.includes(key)) {
            continue;
        }
        const element = document.getElementById(key);
        if (element?.classList.contains("md-tree__subtree")) {
            toggle(element, true);
        }
        else if (element instanceof HTMLInputElement) {
            element.checked = true;
        }
    }
    loadSettings();
}
export function toggleStorage(key, add, value = "", session = false) {
    if (!key) {
        return;
    }
    const storage = session ? sessionStorage : localStorage;
    if (add) {
        storage.setItem(key, value ?? "");
    }
    else {
        storage.removeItem(key);
    }
}
