import { cookieNames, cookies } from "./constants.js";
import { cycleThemes, setTheme } from "../material/material.js";

export function changeTheme(
    themeButton: HTMLElement,
    theme: string | null | undefined = null
) {
    if (theme) {
        setTheme(document.body, theme);
    } else {
        theme = cycleThemes(document.body, "light", "dark");
    }

    const buttonText = theme == "light" ? "dark" : "light";
    themeButton.innerText = `${buttonText}_mode`;

    if (cookies.get(cookieNames.allowed) == "true") {
        cookies.set(cookieNames.theme, theme);
    }
}

function toggleSection(target: HTMLElement, expand: boolean) {
    const checkbox = target.previousElementSibling as HTMLElement;

    if (!checkbox || !checkbox.dataset.level) {
        return;
    }

    const checkboxLevel = parseInt(checkbox.dataset.level);
    let next = checkbox.parentElement?.nextElementSibling as HTMLElement;

    while (next) {
        const level: number = next.dataset.level
            ? parseInt(next.dataset.level)
            : -1;

        if (level <= checkboxLevel) {
            break;
        }

        next.style.display = expand ? "flex" : "none";
        next = next.nextElementSibling as HTMLElement;
    }

    target.innerText = expand ? "remove" : "add";
}

function createCheckbox(name: string, level: number) {
    const id = name.replaceAll(/,|'/g, "").replaceAll(" ", "-").toLowerCase();

    const div = document.createElement("div");
    div.classList.add("md-checkbox");
    div.dataset.level = level.toString();

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
    const checkboxes: HTMLElement[] = [];

    for (const [key, value] of Object.entries(map)) {
        let element: HTMLElement | null = null;

        if (Object.keys(value as Object).length > 0) {
            const button = document.createElement("button");
            button.classList.add(
                "md-icon-button",
                "md-icon-button--small",
                "md-symbol"
            );
            button.innerText = "add";

            button.addEventListener("click", (e: MouseEvent) => {
                const el = e.currentTarget as HTMLElement;
                el.classList.toggle("expanded");
                toggleSection(el, el.classList.contains("expanded"));
            });

            element = document.createElement("div");
            element.style.display = "flex";
            element.style.flexDirection = "row";
            element.style.alignItems = "center";
            element.style.gap = "8px";
            element.dataset.level = level.toString();

            element.appendChild(createCheckbox(key, level));
            element.appendChild(button);
        } else {
            element = createCheckbox(key, level);
        }

        if (level > 0) {
            element.style.display = "none";
        }

        checkboxes.push(element);
        checkboxes.push(...populateR(value, level + 1));
    }

    return checkboxes;
}

export function populate(parent: HTMLElement | null, map) {
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

    changeTheme(
        document.getElementById("change-theme") as HTMLElement,
        cookies.get(cookieNames.theme, "light")
    );
}

export function save() {
    if (cookies.get(cookieNames.allowed) != "true") {
        return;
    }

    // TODO: save cookies
}
