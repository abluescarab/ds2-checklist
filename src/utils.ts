import { cycleThemes, setTheme } from "@material/material.js";
import { storageKeys } from "./constants";
import { loadSettings } from "./dialogs/settings";
import { changeTab } from "@material/modules/components/tabs";

export function changeTheme(
    themeButton: HTMLElement,
    theme: string | null | undefined = null
): void {
    if (theme) {
        setTheme(document.body, theme);
    } else {
        theme = cycleThemes(document.body, "light", "dark");
    }

    const buttonText = theme == "light" ? "dark" : "light";
    themeButton.innerText = `${buttonText}_mode`;

    if (theme) {
        localStorage.setItem(storageKeys.theme, theme);
    }
}

export function load(): void {
    changeTheme(
        document.getElementById("change-theme") as HTMLElement,
        localStorage.getItem(storageKeys.theme) ?? document.body.dataset.mdTheme
    );

    const tab = localStorage.getItem(storageKeys.tab) ?? "";
    const tabs = document.getElementById("main-tabs");

    if (tabs && tab) {
        changeTab(tabs, tab);
    }

    loadSettings();
}
