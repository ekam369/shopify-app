import { BASE_URL } from "./config";

export const Helper = async (url) => {
    console.log(url, "urll")
    console.log(BASE_URL, "urll")
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": true,
            },
        });
        return response.json();
    } catch (error) {
        return error
    }
};
