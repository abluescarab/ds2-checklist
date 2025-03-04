// material imports
import {
    initialize as initializeMaterial,
    getChildByClassName,
    getParentWithClass,
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
const fabExpandIcon = getChildByClassName(
    fabExpand,
    "md-fab__icon"
) as HTMLElement;

let initialized = false;

function changeFabExpand(expanded: boolean) {
    const tooltip = document.getElementById(
        "fab-expand-tooltip"
    ) as HTMLElement;

    fabExpandIcon.innerText = expanded ? "remove" : "add";
    tooltip.innerText = expanded ? "Collapse all" : "Expand all";
}

document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);
        populate(element, items);

        element?.addEventListener("material:toggle", (e) => {
            const ev = e as MaterialToggleEvent;
            let state = false;

            // if expanded or collapsed
            if (
                ev.state == MaterialState.Expanded ||
                ev.state == MaterialState.Collapsed
            ) {
                if (ev.state == MaterialState.Expanded) {
                    changeFabExpand(true);
                } else if (!hasExpanded(element, false)) {
                    changeFabExpand(false);
                }

                state = ev.state == MaterialState.Expanded;
            }

            if (
                ev.state == MaterialState.Checked ||
                ev.state == MaterialState.Unchecked
            ) {
                state = ev.state == MaterialState.Checked;
            }

            if (ev.source?.id) {
                toggleStorage(ev.source?.id, state, "");
            }

            for (const el of ev.elements) {
                if (el.id) {
                    toggleStorage(el.id, state, "");
                }
            }
        });
    }

    initializeMaterial();
    initializeDialogs();
    load();

    initialized = true;
});

document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) =>
        changeTheme(e.currentTarget as HTMLElement)
    );

document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
        if (!initialized) {
            return;
        }

        const ev = e as MaterialChangeEvent<string>;

        if (ev && ev.newValue) {
            const tree = document.getElementById(ev.newValue);
            changeFabExpand(hasExpanded(tree) ?? false);
        }

        localStorage.setItem(
            storageKeys.tab,
            (e as MaterialChangeEvent<string>).newValue ?? ""
        );
    });

fabExpand?.addEventListener("click", () => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;

    if (tabName) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, expand ? "expanded" : "collapsed");
        changeFabExpand(expand);
    }
});

document.getElementById("fab-top")?.addEventListener("click", () =>
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
);
