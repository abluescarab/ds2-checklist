import { getParentWithClass } from "@material/material";
import { initialize as initializeClear } from "./clear";
import { initialize as initializeReset } from "./reset";
import { initialize as initializeSettings } from "./settings";

export function closeDialog(target: Element | EventTarget | null) {
    getParentWithClass(target, "md-dialog")?.classList.remove(
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
