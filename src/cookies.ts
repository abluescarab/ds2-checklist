export default class Cookies {
    prefix = "";
    expiryDays = 365;
    path = "/";
    sameSite = "Lax";

    constructor(prefix: string) {
        this.prefix = prefix;
    }

    // modified from https://stackoverflow.com/a/25490531
    get(
        name: string,
        fallback: string | null = null
    ): string | undefined | null {
        let result = document.cookie.match(
            `(^|;)\\s*${this.prefix}${name}\\s*=\\s*([^;]*)`
        );

        return result?.pop() ?? fallback;
    }

    // modified from https://stackoverflow.com/a/24103596
    set(name: string, value: string | null): void {
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
