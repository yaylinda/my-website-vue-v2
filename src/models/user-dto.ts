export class LogRegForm {
    username!: string;
    password!: string;
    passwordConfirmation!: string;
    email!: string;

    constructor() {
        this.username = "";
        this.password = "";
        this.passwordConfirmation = "";
        this.email = "";
    }
}

export class UserDTO {
    username!: string;
    sessionToken!: string;

    constructor() {
        this.username = '';
        this.sessionToken = '';
    }
}