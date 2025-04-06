import { hideDialog } from "./dialogs.mjs";

export function initialize() {
    document
        .getElementById("clear-no")
        ?.addEventListener("click", (e) => hideDialog(e.currentTarget));

    document.getElementById("clear-yes")?.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}
