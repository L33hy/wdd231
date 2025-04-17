document.addEventListener('DOMContentLoaded', () => {
    const displayName = document.getElementById('displayName');
    const displayEmail = document.getElementById('displayEmail');
    const displaySubject = document.getElementById('displaySubject');
    const displayMessage = document.getElementById('displayMessage');
    const storedData = localStorage.getItem('contactFormData');

    if (storedData) {
        const formData = JSON.parse(storedData);
        displayName.textContent = formData.name || 'N/A';
        displayEmail.textContent = formData.email || 'N/A';
        displaySubject.textContent = formData.subject || 'N/A';
        displayMessage.textContent = formData.message || 'N/A';
    } else {
        const submissionDataDiv = document.getElementById('submissionData');
        submissionDataDiv.innerHTML = '<p>No form data found.</p>';
    }

    // Optionally clear the stored data after displaying it once
    localStorage.removeItem('contactFormData');
});