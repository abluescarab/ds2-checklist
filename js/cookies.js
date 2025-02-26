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
        let result = document.cookie.match(`(^|;)\\s*${this.prefix}${name}\\s*=\\s*([^;]*)`);
        return result?.pop() ?? fallback;
    }
    // modified from https://stackoverflow.com/a/24103596
    set(name, value) {
        let expires = "";
        if (this.expiryDays > -1) {
            const date = new Date();
            date.setDate(date.getDate() + this.expiryDays);
            expires = date.toUTCString();
        }
        document.cookie =
            `${this.prefix}${name}=${value ?? ""}; ` +
                `expires=${expires}; ` +
                `path=${this.path}; ` +
                `SameSite=${this.sameSite}`;
    }
}
