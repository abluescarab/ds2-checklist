export default class Cookies {
    constructor(prefix) {
        this.prefix = "";
        this.expiryDays = 365;
        this.path = "/";
        this.sameSite = "Lax";
        this.prefix = prefix;
    }
    // modified from https://stackoverflow.com/a/25490531
    get(name, fallback = null) {
        var _a;
        let result = document.cookie.match(`(^|;)\\s*${this.prefix}${name}\\s*=\\s*([^;]*)`);
        return (_a = result === null || result === void 0 ? void 0 : result.pop()) !== null && _a !== void 0 ? _a : fallback;
    }
    // modified from https://stackoverflow.com/a/24103596
    set(name, value) {
        let expires = "";
        if (this.expiryDays > -1) {
            let date = new Date();
            date.setDate(date.getDate() + this.expiryDays);
            expires = date.toUTCString();
        }
        document.cookie =
            `${this.prefix}${name}=${value || ""}; ` +
                `expires=${expires}; ` +
                `path=${this.path}; ` +
                `SameSite=${this.sameSite}`;
    }
}
