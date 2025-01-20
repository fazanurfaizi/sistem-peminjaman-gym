export function emailValidation (email: string|null) {    
    if (email) {
        // Regular expression to check if email ends with @widyatama.ac.id
        const emailRegex = /^[a-zA-Z0-9._%+-]+@widyatama\.ac\.id$/;

        return emailRegex.test(email)
    }

    return false
}