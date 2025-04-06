import { getParentByClassName } from "sass-material-design";
import { initialize as initializeClear } from "./clear.mjs";
import { initialize as initializeReset } from "./reset.mjs";
import { initialize as initializeSettings } from "./settings.mjs";

export function hideDialog(target: Element | EventTarget | null) {
    if (!(target instanceof Element)) {
        return;
    }

    getParentByClassName(target, "md-dialog")?.classList.remove(
        "md-dialog--visible"
    );
}

export function showDialog(id: string) {
    const dialog = document.getElementById(id);

    if (!dialog?.classList.contains("md-dialog")) {
        return;
    }

    dialog.classList.add("md-dialog--visible");
}

export function initialize() {
    initializeSettings();
    initializeReset();
    initializeClear();
}
