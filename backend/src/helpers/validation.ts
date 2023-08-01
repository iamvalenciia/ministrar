export function validatePassword(password: string) {
    // Check minimum length
    if (password.length < 8) {
        return false;
    }

    // Check for uppercase letters
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check for lowercase letters
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Check for numbers
    if (!/\d/.test(password)) {
        return false;
    }

    // Password is valid
    return true;
}
