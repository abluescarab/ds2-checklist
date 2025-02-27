import { storageKeys } from "./constants";

// tree behavior
const cascadeCheckedControl = document.getElementById(
    "cascade-checked"
) as HTMLInputElement;
const cascadeUncheckedControl = document.getElementById(
    "cascade-unchecked"
) as HTMLInputElement;
const cascadeCollapsedControl = document.getElementById(
    "cascade-collapsed"
) as HTMLInputElement;

// page settings
const hideExpandAllControl = document.getElementById(
    "hide-expand-all-button"
) as HTMLInputElement;
const hideScrollToTopControl = document.getElementById(
    "hide-scroll-to-top-button"
) as HTMLInputElement;

function toggleStorage(key: string, add: boolean, value: string | null = "") {
    if (add) {
        localStorage.setItem(key, value ?? "");
    } else {
        localStorage.removeItem(key);
    }
}

function changePageSettings(hideExpandAll: boolean, hideScrollToTop: boolean) {
    const expandAllButton = document.getElementById("fab-expand");
    const scrollToTopButton = document.getElementById("fab-top");

    if (expandAllButton) {
        expandAllButton.style.display = hideExpandAll ? "none" : "flex";
    }

    if (scrollToTopButton) {
        scrollToTopButton.style.display = hideScrollToTop ? "none" : "flex";
    }
}

function changeTreeSettings(cascadeChecked: string, cascadeToggled: string) {
    for (const element of document.getElementsByClassName("md-tree")) {
        const tree = element as HTMLElement;

        tree.dataset.mdCascadeChecked = cascadeChecked;
        tree.dataset.mdCascadeToggled = cascadeToggled;
    }
}

export function loadSettings() {
    // page settings
    const hideExpandAll =
        localStorage.getItem(storageKeys.hideExpandAll) != null;
    const hideScrollToTop =
        localStorage.getItem(storageKeys.hideScrollToTop) != null;

    hideExpandAllControl.checked = hideExpandAll;
    hideScrollToTopControl.checked = hideScrollToTop;

    changePageSettings(hideExpandAll, hideScrollToTop);

    // tree behavior
    const cascadeChecked =
        localStorage.getItem(storageKeys.cascadeChecked) ?? "";
    const cascadeToggled =
        localStorage.getItem(storageKeys.cascadeToggled) ?? "";

    cascadeCheckedControl.checked =
        cascadeChecked == "checked" || cascadeChecked == "both";
    cascadeUncheckedControl.checked =
        cascadeChecked == "unchecked" || cascadeChecked == "both";
    cascadeCollapsedControl.checked = cascadeToggled == "collapsed";

    changeTreeSettings(cascadeChecked, cascadeToggled);
}

export function saveSettings() {
    // page settings
    toggleStorage(storageKeys.hideExpandAll, hideExpandAllControl.checked);
    toggleStorage(storageKeys.hideScrollToTop, hideScrollToTopControl.checked);

    changePageSettings(
        hideExpandAllControl.checked,
        hideScrollToTopControl.checked
    );

    // tree behavior
    const cascadeToggledValue = cascadeCollapsedControl.checked
        ? "collapsed"
        : "";
    let cascadeCheckedValue: string = "";

    // TODO: replace with dropdown/dialog/etc.
    if (cascadeCheckedControl.checked && !cascadeUncheckedControl.checked) {
        cascadeCheckedValue = "checked";
    } else if (
        cascadeUncheckedControl.checked &&
        !cascadeCheckedControl.checked
    ) {
        cascadeCheckedValue = "unchecked";
    } else if (
        cascadeCheckedControl.checked &&
        cascadeUncheckedControl.checked
    ) {
        cascadeCheckedValue = "both";
    }

    toggleStorage(
        storageKeys.cascadeChecked,
        cascadeCheckedValue != "",
        cascadeCheckedValue
    );

    toggleStorage(
        storageKeys.cascadeToggled,
        cascadeCollapsedControl.checked,
        "collapsed"
    );

    changeTreeSettings(cascadeCheckedValue, cascadeToggledValue);
}
