import { cycleThemes, setTheme } from "../lib/material/dist/material.js";
import { storageKeys } from "./constants.js";
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
    changeTheme(document.getElementById("change-theme"), localStorage.getItem(storageKeys.theme ?? "light"));
}
export function save() {
    // TODO: save selected tab
    // TODO: save checked boxes
    // TODO: save expanded sections
}
