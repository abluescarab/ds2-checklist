// material imports
import {
    initialize as initializeMaterial,
    getChildByClassName,
    MaterialChangeEvent,
    MaterialToggleEvent,
    MaterialState,
} from "@material/material";
import {
    hasExpanded,
    populate,
    toggleAll,
} from "@material/modules/components/tree";

// local imports
import { storageKeys, trees } from "./constants";
import { initialize as initializeDialogs } from "./dialogs/dialogs";
import { load, changeTheme, toggleStorage } from "./utils";

const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = fabExpand
    ? (getChildByClassName(fabExpand, "md-fab__icon") as HTMLElement)
    : null;
const tabs = document.getElementById("main-tabs");

let initialized = false;

function changeFabExpand(expanded: boolean) {
    if (!fabExpandIcon) {
        return;
    }

    const tooltip = document.getElementById("fab-expand-tooltip");

    fabExpandIcon.innerText = expanded ? "remove" : "add";

    if (tooltip) {
        tooltip.innerText = expanded ? "Collapse all" : "Expand all";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);

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

    const tree = document.getElementById(tab);

    if (tree && hasExpanded(tree)) {
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
        const tree = document.getElementById(ev.newValue);
        changeFabExpand(tree ? hasExpanded(tree) : false);
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

    const tree = document.getElementById(tabName);

    if (!tree) {
        return;
    }

    const elements = toggleAll(tree, expand, expand ? "expanded" : "collapsed");

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
