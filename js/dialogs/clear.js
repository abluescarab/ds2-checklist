import { hideDialog } from "./dialogs.js";
export function initialize() {
    document
        .getElementById("clear-no")
        ?.addEventListener("click", (e) => hideDialog(e.currentTarget));
    document.getElementById("clear-yes")?.addEventListener("click", (e) => {
        localStorage.clear();
        location.reload();
    });
}
