export class ErrorMessages {
    public static USERNAME_IS_REQUIRED: string = 'Username is required';
    public static PASSWORD_IS_REQUIRED: string = 'Password is required';
    public static PASSWORDS_DO_NOT_MATCH: string = 'Password and confirmation do not match';
    public static EMAIL_IS_REQUIRED: string = 'Email is required';
    public static SESSION_TOKEN_STR: string = 'Session-Token';
}

enum ToastType {
    END_TURN, FRIEND_REQUEST_RECEIVED, FRIEND_REQUEST_RESPONSE, INVITED_TO_GAME
}

export { ToastType };
