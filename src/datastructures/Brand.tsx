export default class Brand {
    logo_url: string;
    name: string;

    constructor(name: string, logo_url: string) {
        this.logo_url = logo_url;
        this.name = name;
    }
}