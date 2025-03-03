import { storageKeys } from "../constants.js";
import { hideDialog } from "./dialogs.js";
export function initialize() {
    document
        .getElementById("reset-no")
        ?.addEventListener("click", (e) => hideDialog(e.currentTarget));
    document.getElementById("reset-yes")?.addEventListener("click", () => {
        for (const key in storageKeys) {
            localStorage.removeItem(key);
        }
        location.reload();
    });
}
