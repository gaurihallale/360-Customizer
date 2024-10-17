class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

async function loginUser(email, password) {
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            throw new CustomError('User not found', 404); // User not found
        }

        const isPasswordValid = await verifyPassword(user, password);
        if (!isPasswordValid) {
            throw new CustomError('Invalid password', 401); // Invalid password
        }

        return { success: true, user }; // Successful login
    } catch (error) {
        // Return error details
        return {
            success: false,
            message: error.message || 'An unexpected error occurred',
            statusCode: error.statusCode || 500,
        };
    }
}
