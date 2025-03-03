import { cycleThemes, setTheme } from "../lib/material/dist/material.js";
import { storageKeys } from "./constants.js";
import { loadSettings } from "./dialogs/settings.js";
import { changeTab } from "../lib/material/dist/modules/components/tabs.js";
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
    loadSettings();
}
