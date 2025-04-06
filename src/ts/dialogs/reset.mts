import { storageKeys } from "../constants.mjs";
import { hideDialog } from "./dialogs.mjs";

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
