import { save, load, changeTheme } from "./utils.js";
import { cookieNames, cookies, bonfires } from "./constants.js";
const cookieBanner = document.getElementById("cookie-banner");
document.addEventListener("DOMContentLoaded", function () {
    const bonfireContainer = document.getElementById("bonfires");
    bonfires.forEach((b) => {
        const card = document.createElement("div");
        card.classList.add("md-card");
        card.dataset.mdType = "outlined";
        const header = document.createElement("span");
        header.dataset.mdTypescale = "body-large";
        header.innerText = b.name;
        card.appendChild(header);
        b.fires.forEach((f) => {
            const name = f
                .replaceAll(/,|'/g, "")
                .replaceAll(" ", "-")
                .toLowerCase();
            const div = document.createElement("div");
            div.classList.add("md-checkbox");
            const input = document.createElement("input");
            input.type = "checkbox";
            input.id = name;
            input.name = name;
            const label = document.createElement("label");
            label.htmlFor = name;
            label.innerText = f;
            div.appendChild(input);
            div.appendChild(label);
            card.appendChild(div);
        });
        bonfireContainer?.appendChild(card);
    });
    load();
});
document.getElementById("change-theme")?.addEventListener("click", (e) => {
    changeTheme(e.currentTarget);
});
document.getElementById("source-link")?.addEventListener("click", (e) => { });
document
    .getElementById("calculator-link")
    ?.addEventListener("click", (e) => { });
document
    .getElementById("accept-cookies")
    ?.addEventListener("click", function (e) {
    cookies.set(cookieNames.allowed, "true");
    cookieBanner?.classList.remove("md-banner--visible");
    save();
});
document
    .getElementById("decline-cookies")
    ?.addEventListener("click", function (e) {
    cookies.set(cookieNames.allowed, "false");
    cookieBanner?.classList.remove("md-banner--visible");
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
