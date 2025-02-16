import { cookieNames, cookies } from "./constants.js";
import { cycleThemes, setTheme } from "../material/material.js";
export function changeTheme(themeButton, theme = null) {
    if (theme) {
        setTheme(document.body, theme);
    }
    else {
        theme = cycleThemes(document.body, "light", "dark");
    }
    const buttonText = theme == "light" ? "dark" : "light";
    themeButton.innerText = `${buttonText}_mode`;
    if (cookies.get(cookieNames.allowed) == "true") {
        cookies.set(cookieNames.theme, theme);
    }
}
export function load() {
    const banner = document.getElementById("cookie-banner");
    const cookiesAllowed = cookies.get(cookieNames.allowed);
    if (cookiesAllowed == null) {
        banner === null || banner === void 0 ? void 0 : banner.classList.add("md-banner--visible");
    }
    if (cookiesAllowed != "true") {
        return;
    }
    changeTheme(document.getElementById("change-theme"), cookies.get(cookieNames.theme, "light"));
}
export function save() {
    if (cookies.get(cookieNames.allowed) != "true") {
        return;
    }
    // TODO: save cookies
}
