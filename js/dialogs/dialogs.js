import { getParentWithClass } from "../../lib/material/dist/material.js";
import { initialize as initializeClear } from "./clear.js";
import { initialize as initializeReset } from "./reset.js";
import { initialize as initializeSettings } from "./settings.js";
export function closeDialog(target) {
    getParentWithClass(target, "md-dialog")?.classList.remove("md-dialog--visible");
}
export function showDialog(id) {
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
