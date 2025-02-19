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
function createCheckbox(name, level) {
    const id = name.replaceAll(/,|'/g, "").replaceAll(" ", "-").toLowerCase();
    const div = document.createElement("div");
    div.classList.add("md-checkbox");
    div.style.marginLeft = `${level * 32}px`;
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = id;
    input.name = id;
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = name;
    div.appendChild(input);
    div.appendChild(label);
    return div;
}
function populateR(map, level = 0) {
    const checkboxes = [];
    for (const [key, value] of Object.entries(map)) {
        checkboxes.push(createCheckbox(key, level));
        checkboxes.push(...populateR(value, level + 1));
    }
    return checkboxes;
}
export function populate(parent, map) {
    for (const [key, value] of Object.entries(map)) {
        const card = document.createElement("div");
        card.classList.add("md-card");
        card.dataset.mdType = "outlined";
        const header = document.createElement("span");
        header.dataset.mdTypescale = "title-medium";
        header.innerText = key;
        card.appendChild(header);
        card.append(...populateR(value));
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
