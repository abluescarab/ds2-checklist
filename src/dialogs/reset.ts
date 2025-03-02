import { storageKeys } from "../constants";
import { closeDialog } from "./dialogs";

export function initialize() {
    document
        .getElementById("reset-no")
        ?.addEventListener("click", (e) => closeDialog(e.currentTarget));

    document.getElementById("reset-yes")?.addEventListener("click", () => {
        for (const key in storageKeys) {
            localStorage.removeItem(key);
        }

        location.reload();
    });
}
