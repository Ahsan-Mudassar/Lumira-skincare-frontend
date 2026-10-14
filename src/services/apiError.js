import axios from "axios";

class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

const FALLBACK_MESSAGES = {
    401: "Please log in to continue.",
    403: "You are not allowed to do this.",
    404: "Not Found",
    413: "The data you sent is too large.",
    429: "Too many attepmts.Plase try again later."
}

function normalizeError(error) {

    if (error instanceof ApiError) return error;

    if (axios.isCancel(error)) return error;

    if (error.response) {
        const { status, data } = error.response;
        return new ApiError({
            status,
            message: data?.message || FALLBACK_MESSAGES[status] || "Some thing went wrong.Please try again later.",
            errors: Array.isArray(data?.errors) ? data?.errors : []
        })
    }

    if (error.code === "ECONNABORTED") {
        return new ApiError({ message: "The request timed out. Please try again later." })
    }

    return new ApiError({
        message: "Cannot reach the server.Check your internet connection please!"
    })
}

export { ApiError, normalizeError }