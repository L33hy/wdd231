// contact.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contactForm');
    const formDataDisplay = document.getElementById('form-data-display');
    const dataOutput = document.getElementById('data-output');
    const goBackButton = document.getElementById('go-back');

    // Responsive Navigation
    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Form Submission Handling
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        localStorage.setItem('contactFormData', JSON.stringify(formDataObject));
        
        // Redirect to the new page after storing data
        window.location.href = './submission-details.html';
    });

    // Go Back to Form
    goBackButton.addEventListener('click', () => {
        contactForm.classList.remove('hidden');
        formDataDisplay.classList.add('hidden');
        contactForm.reset();
        localStorage.removeItem('contactFormData');
    });

    // Check for Stored Form Data on Load
    const storedData = localStorage.getItem('contactFormData');
    if (storedData) {
        const parsedData = JSON.parse(storedData);
        displayFormData(parsedData);
        contactForm.classList.add('hidden');
        formDataDisplay.classList.remove('hidden');
    }
});