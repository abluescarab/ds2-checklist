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
import { load, changeTheme } from "./utils";

const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = getChildByClassName(
    fabExpand,
    "md-fab__icon"
) as HTMLElement;

function changeFabExpand(expanded: boolean) {
    const tooltip = document.getElementById(
        "fab-expand-tooltip"
    ) as HTMLElement;

    fabExpandIcon.innerText = expanded ? "remove" : "add";
    tooltip.innerText = expanded ? "Collapse all" : "Expand all";
}

function confirm(headline: string, content: string, onYes: () => void) {
    const dialog = document.getElementById("confirmation-dialog");
    const headlineElement = getChildByClassName(dialog, "md-dialog__headline");
    const contentElement = getChildByClassName(dialog, "md-dialog__content");
    const yesButton = document.getElementById(
        "confirmation-yes"
    ) as HTMLElement;

    if (!headlineElement || !contentElement) {
        return;
    }

    headlineElement.innerText = headline;
    contentElement.innerText = content;

    dialog?.classList.add("md-dialog--visible");
}

document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);
        populate(element, items);

        element?.addEventListener("material:toggle", (e) => {
            const ev = e as MaterialToggleEvent;

            if (ev.state == MaterialState.Expanded) {
                changeFabExpand(true);
            } else if (
                ev.state == MaterialState.Collapsed &&
                !hasExpanded(element, false)
            ) {
                changeFabExpand(false);
            }
        });
    }

    load();
    initializeMaterial();
    initializeDialogs();
});

document
    .getElementById("change-theme")
    ?.addEventListener("click", (e) =>
        changeTheme(e.currentTarget as HTMLElement)
    );

document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
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

fabExpand?.addEventListener("click", (e) => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;

    if (tabName) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, expand ? "expanded" : "collapsed");
        changeFabExpand(expand);
    }
});

document.getElementById("fab-top")?.addEventListener("click", (e) =>
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    })
);
