import { cookieNames, cookies } from "./constants.js";
import { cycleThemes, setTheme } from "../material/material.js";

export function changeTheme(
    themeButton: HTMLElement,
    theme: string | null = null
) {
    let buttonText = theme;

    if (theme) {
        setTheme(document.body, theme);
    } else {
        theme = cycleThemes(document.body, ["light", "dark"]);
    }

    buttonText = theme == "light" ? "dark" : "light";
    themeButton.innerText = `${buttonText}_mode`;

    if (cookies.get(cookieNames.allowed) == "true") {
        cookies.set(cookieNames.theme, theme);
    }
}

export function load() {
    const banner = document.getElementById("cookie-banner");
    const cookiesAllowed = cookies.get(cookieNames.allowed);

    if (cookiesAllowed == null) {
        banner?.classList.add("md-banner--visible");
    }

    if (cookiesAllowed != "true") {
        return;
    }

    changeTheme(
        document.getElementById("change-theme") as HTMLElement,
        cookies.get(cookieNames.theme)
    );
}

export function save() {
    if (cookies.get(cookieNames.allowed) != "true") {
        return;
    }

    // TODO: save cookies
}
