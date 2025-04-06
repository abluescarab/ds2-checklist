import { cycleThemes, Nullable, setTheme } from "sass-material-design";
import { changeTab } from "sass-material-design/tabs";
import { toggle } from "sass-material-design/tree";
import { storageKeys } from "./constants.mjs";
import { loadSettings } from "./dialogs/settings.mjs";

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

    const settingsKeys: string[] = Object.values(storageKeys);

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (!key || settingsKeys.includes(key)) {
            continue;
        }

        const element = document.getElementById(key);

        if (element?.classList.contains("md-tree__subtree")) {
            toggle(element, true);
        } else if (element instanceof HTMLInputElement) {
            element.checked = true;
        }
    }

    loadSettings();
}

export function toggleStorage(
    key: Nullable<string>,
    add: boolean,
    value: string | null = "",
    session: boolean = false
) {
    if (!key) {
        return;
    }

    const storage = session ? sessionStorage : localStorage;

    if (add) {
        storage.setItem(key, value ?? "");
    } else {
        storage.removeItem(key);
    }
}
