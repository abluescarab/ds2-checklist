import Cookies from "./cookies.js";
export const cookieNames = Object.freeze({
    allowed: "cookiesAllowed",
    theme: "theme",
});
export const cookies = new Cookies("ds2Checklist_");
