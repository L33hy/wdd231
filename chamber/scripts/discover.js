document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const visitMessageDiv = document.getElementById('visit-message');
    const gallery = document.querySelector('.photo-gallery');
     
    // Responsive Navigation
    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
    
    // Last Visit Logic
    const lastVisitTime = localStorage.getItem('lastVisit');
    const currentTime = Date.now();
    localStorage.setItem('lastVisit', currentTime);

    if (!lastVisitTime) {
        visitMessageDiv.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentTime - parseInt(lastVisitTime);
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference < 1) {
            visitMessageDiv.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            visitMessageDiv.textContent = "You last visited 1 day ago.";
        } else {
            visitMessageDiv.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }

    // Fetch and Display Local Interests
    async function fetchLocalInterests() {
        try {
            const response = await fetch('./data/local-interest.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayLocalInterests(data);
        } catch (error) {
            console.error('Error fetching local interests:', error);
            gallery.innerHTML = '<p>Failed to load local interests.</p>';
        }
    }

    function displayLocalInterests(interests) {
        gallery.innerHTML = '';
        interests.slice(0, 8).forEach(item => {
            const card = document.createElement('figure');
            card.innerHTML = `
                <img src="./images/${item.photo}.webp" alt="${item.name}" loading="lazy">
                <h2>${item.name}</h2>
                <address>${item.address}</address>
                <p>${item.description}</p>
            `;
            gallery.appendChild(card);
        });
    }

    fetchLocalInterests();
});