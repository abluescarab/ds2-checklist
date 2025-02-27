// material imports
import {
    initialize,
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
import { load, changeTheme } from "./utils";
import { saveSettings } from "./settings";

const fabExpand = document.getElementById("fab-expand");
const fabExpandIcon = getChildByClassName(
    fabExpand,
    "md-fab__icon"
) as HTMLElement;

document.addEventListener("DOMContentLoaded", function () {
    for (const [tree, items] of Object.entries(trees)) {
        const element = document.getElementById(tree);
        populate(element, items);

        element?.addEventListener("material:toggle", (e) => {
            const ev = e as MaterialToggleEvent;

            if (ev.state == MaterialState.Expanded) {
                fabExpandIcon.innerText = "remove";
            } else if (
                ev.state == MaterialState.Collapsed &&
                !hasExpanded(element, false)
            ) {
                fabExpandIcon.innerText = "add";
            }
        });
    }

    load();
    initialize();
});

document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget as HTMLElement);
});

document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
        const ev = e as MaterialChangeEvent<string>;

        if (ev && ev.newValue) {
            const tree = document.getElementById(ev.newValue);

            if (hasExpanded(tree)) {
                fabExpandIcon.innerText = "remove";
            } else {
                fabExpandIcon.innerText = "add";
            }
        }

        localStorage.setItem(
            storageKeys.tab,
            (e as MaterialChangeEvent<string>).newValue ?? ""
        );
    });

fabExpand?.addEventListener("click", (e) => {
    const expand = fabExpandIcon?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;

    if (tabName && fabExpandIcon) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, expand ? "expanded" : "collapsed");
        fabExpandIcon.innerText = expand ? "remove" : "add";
    }
});

document.getElementById("fab-top")?.addEventListener("click", (e) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

document.getElementById("settings")?.addEventListener("click", (e) => {
    document
        .getElementById("settings-dialog")
        ?.classList.add("md-dialog--visible");
});

document.getElementById("settings-cancel")?.addEventListener("click", (e) => {
    getParentWithClass(e.currentTarget, "md-dialog")?.classList.remove(
        "md-dialog--visible"
    );
});

document.getElementById("settings-save")?.addEventListener("click", () => {
    saveSettings();

    document
        .getElementById("settings-dialog")
        ?.classList.remove("md-dialog--visible");
});
