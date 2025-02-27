// material imports
import {
    initialize,
    getChildByClassName,
    getParentWithClass,
    MaterialChangeEvent,
} from "@material/material";
import { populate, toggleAll } from "@material/modules/components/tree";

// local imports
import { bonfires, bosses, npcs, dynaAndTillo, storageKeys } from "./constants";
import { load, changeTheme } from "./utils";
import { saveSettings } from "./settings";

document.addEventListener("DOMContentLoaded", function () {
    populate(document.getElementById("bonfires"), bonfires);
    populate(document.getElementById("npcs"), npcs);
    populate(document.getElementById("bosses"), bosses);
    populate(document.getElementById("dyna-and-tillo"), dynaAndTillo);

    load();
    initialize();
});

document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget as HTMLElement);
});

document
    .getElementById("main-tabs")
    ?.addEventListener("material:change", (e) => {
        localStorage.setItem(
            storageKeys.tab,
            (e as MaterialChangeEvent<string>).newValue ?? ""
        );
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

document.getElementById("fab-expand")?.addEventListener("click", (e) => {
    const fab = getChildByClassName(e.currentTarget, "md-fab__icon");
    const expand = fab?.innerText == "add";
    const tabName = document.getElementById("main-tabs")?.dataset.mdTab;

    if (tabName && fab) {
        const tree = document.getElementById(tabName);
        toggleAll(tree, expand, true);
        fab.innerText = expand ? "remove" : "add";
    }
});

document.getElementById("fab-top")?.addEventListener("click", (e) => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
});

// form.addEventListener("reset", (e) => {
//     // setTimeout waits for reset to finish
//     setTimeout(() => {
//         saveData();
//     }, 1);
// });
