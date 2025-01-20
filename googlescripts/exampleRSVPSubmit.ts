interface RSVPFormData {
    name: string;
    attending: boolean;
    email: string;
}

const handleRSVPSubmit = async (formData: RSVPFormData) => {
    const url = 'GOOGLE_APPS_SCRIPT_URL';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: formData.email})
        });

        const result = await response.json();
        return result.status === 'success';
    } catch (error) {
        return false;
    }
};
