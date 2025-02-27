import { cycleThemes, setTheme } from "@material/material.js";
import { storageKeys } from "./constants";

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
        localStorage.getItem(storageKeys.theme ?? "light")
    );
}

export function save(): void {
    // TODO: save selected tab
    // TODO: save checked boxes
    // TODO: save expanded sections
}
