import { cycleThemes, Nullable, setTheme } from "@material/material";
import { changeTab } from "@material/modules/components/tabs";
import { storageKeys } from "./constants";
import { loadSettings } from "./dialogs/settings";

export function changeTheme(
    themeButton: HTMLElement,
    theme: Nullable<string> = null
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

export function toggleStorage(
    key: string,
    add: boolean,
    value: string | null = "",
    session: boolean = false
) {
    const storage = session ? sessionStorage : localStorage;

    if (add) {
        storage.setItem(key, value ?? "");
    } else {
        storage.removeItem(key);
    }
}
