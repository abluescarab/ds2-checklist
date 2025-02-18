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
export function populate(parent, map, sortKeys = false, sortValues = false) {
    const keys = Object.keys(map);
    if (sortKeys) {
        keys.sort();
    }
    for (let i = 0; i < keys.length; i++) {
        const card = document.createElement("div");
        card.classList.add("md-card");
        card.dataset.mdType = "outlined";
        const header = document.createElement("span");
        header.dataset.mdTypescale = "title-medium";
        header.innerText = keys[i];
        card.appendChild(header);
        const values = map[keys[i]];
        if (sortValues) {
            values.sort();
        }
        for (let j = 0; j < values.length; j++) {
            const name = values[j]
                .replaceAll(/,|'/g, "")
                .replaceAll(" ", "-")
                .toLowerCase();
            const div = document.createElement("div");
            div.classList.add("md-checkbox");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = name;
            input.name = name;
            const label = document.createElement("label");
            label.htmlFor = name;
            label.innerText = values[j];
            div.appendChild(input);
            div.appendChild(label);
            card.appendChild(div);
        }
        if (!parent) {
            parent = document.body;
        }
        parent.appendChild(card);
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
    changeTheme(document.getElementById("change-theme"), cookies.get(cookieNames.theme, "light"));
}
export function save() {
    if (cookies.get(cookieNames.allowed) != "true") {
        return;
    }
    // TODO: save cookies
}
