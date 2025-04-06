// material imports
import { initialize as initializeMaterial } from "sass-material-design";
import { hasExpanded, populate, toggleAll } from "sass-material-design/tree";
import {
    MaterialChangeEvent,
    MaterialToggleEvent,
    MaterialState,
} from "sass-material-design";

// TODO: add import/export
// TODO: connect elements like Straid's boss soul items and boss item directly

// local imports
import { storageKeys, trees } from "./constants.mjs";
import { initialize as initializeDialogs } from "./dialogs/dialogs.mjs";
import { load, changeTheme, toggleStorage } from "./utils.mjs";

const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = fabExpand?.getElementsByClassName(
    "md-fab__icon"
)[0] as HTMLElement;
const tabs = document.getElementById("main-tabs");

let initialized = false;

function changeFabExpand(expanded: boolean) {
    if (!fabExpandIcon) {
        return;
    }

    const tooltip = document.getElementById("fab-expand-tooltip");

    if (fabExpandIcon) {
        fabExpandIcon.innerText = expanded ? "remove" : "add";
    }

    if (tooltip) {
        tooltip.innerText = expanded ? "Collapse all" : "Expand all";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    for (const [treeElement, items] of Object.entries(trees)) {
        const element = document.getElementById(treeElement);

        if (!element) {
            continue;
        }

        populate(element, items);

        element.addEventListener("material:toggle", (e) => {
            const event = e as MaterialToggleEvent;
            let state = false;

            // if expanded or collapsed
            if (
                event.state == MaterialState.Expanded ||
                event.state == MaterialState.Collapsed
            ) {
                if (event.state == MaterialState.Expanded) {
                    changeFabExpand(true);
                } else if (!hasExpanded(element, false)) {
                    changeFabExpand(false);
                }

                state = event.state == MaterialState.Expanded;
            }

            if (
                event.state == MaterialState.Checked ||
                event.state == MaterialState.Unchecked
            ) {
                state = event.state == MaterialState.Checked;
            }

            toggleStorage(event.source?.id, state);
            event.elements.forEach((el) => toggleStorage(el?.id, state));
        });
    }

    initializeMaterial();
    initializeDialogs();
    load();

    initialized = true;

    const tab = tabs?.dataset.mdTab;

    if (!tab) {
        return;
    }

    const treeElement = document.getElementById(tab);

    if (treeElement && hasExpanded(treeElement)) {
        changeFabExpand(true);
    }
});

document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) =>
        changeTheme(e.currentTarget as HTMLElement)
    );

tabs?.addEventListener("material:change", (e) => {
    if (!initialized) {
        return;
    }

    const ev = e as MaterialChangeEvent<string>;

    if (ev && ev.newValue) {
        const treeElement = document.getElementById(ev.newValue);
        changeFabExpand(treeElement ? hasExpanded(treeElement) : false);
    }

    localStorage.setItem(
        storageKeys.tab,
        (e as MaterialChangeEvent<string>).newValue ?? ""
    );
});

fabExpand?.addEventListener("click", () => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;

    if (!tabName) {
        return;
    }

    const treeElement = document.getElementById(tabName);

    if (!treeElement) {
        return;
    }

    const elements = toggleAll(
        treeElement,
        expand,
        expand ? "expanded" : "collapsed"
    );

    changeFabExpand(expand);
    elements.forEach((el) => toggleStorage(el.id, expand));
});

document.getElementById("fab-top")?.addEventListener("click", () =>
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
);
