// main.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const attributionLink = document.getElementById('attributionLink');
    const attributionModal = document.getElementById('attributionModal');
    const closeModalButton = attributionModal.querySelector('.close-button');
    const testimonialContainer = document.getElementById('testimonial-container');
    const loadingTestimonials = document.createElement('p');
    loadingTestimonials.textContent = 'Loading testimonials...';
    testimonialContainer.appendChild(loadingTestimonials);

    // Set ARIA attributes for the modal
    attributionModal.setAttribute('role', 'dialog');
    attributionModal.setAttribute('aria-modal', 'true');
    attributionModal.setAttribute('aria-labelledby', 'attributionModalTitle'); // Assuming you add an ID to the modal's title

    // Responsive Navigation
    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Modal for Attributions
    attributionLink.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Attribution link clicked');
        attributionModal.style.display = 'block';
        closeModalButton.focus();
    });

    closeModalButton.addEventListener('click', () => {
        attributionModal.style.display = 'none';
        attributionLink.focus();
    });

    window.addEventListener('click', (event) => {
        if (event.target === attributionModal) {
            attributionModal.style.display = 'none';
            attributionLink.focus(); 
        }
    });

    // Handle keyboard navigation within the modal
    attributionModal.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        attributionModal.style.display = 'none';
        attributionLink.focus();
      }
    });

    // Fetch Testimonials (using a placeholder API for demonstration)
    async function fetchTestimonials() {
        try {
            const response = await fetch('./data/testimonials.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            testimonialContainer.innerHTML = ''; // Clear loading message
            displayTestimonials(data);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            testimonialContainer.innerHTML = '<p class="error-message">Failed to load testimonials.</p>';
        }
    }

    function displayTestimonials(testimonials) {
        const testimonialsHTML = testimonials.map(testimonial => {
            return `
                <div class="testimonial">
                    <blockquote>${testimonial.quote}</blockquote>
                    <p class="author">${testimonial.author}</p>
                </div>
            `;
        }).join('');
        testimonialContainer.innerHTML = testimonialsHTML;
    }

    fetchTestimonials();
});