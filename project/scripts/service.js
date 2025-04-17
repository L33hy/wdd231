// services.js
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navLinks = document.querySelector('.nav-links');
    const serviceListContainer = document.getElementById('service-list-container');
    
    // Responsive Navigation
    hamburgerButton.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });

    // Function to fetch services data
  async function fetchServices() {
    // Create and append loading message *before* fetching
    const loadingMessage = document.createElement('p');
    loadingMessage.id = 'service-loading'; // Add ID for easier removal
    loadingMessage.textContent = 'Loading services...';
    if (serviceListContainer) {
        serviceListContainer.appendChild(loadingMessage);
    } else {
        console.error("Service list container not found! Cannot display loading message.");
        return; // Exit if container doesn't exist
    }

    try {
        // Corrected path to fetch from the 'data' subfolder within 'scripts'
        const response = await fetch('./data/service.json'); // Assuming your JSON file is named services.json
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayServices(data); // Display data on success
    } catch (error) {
        console.error('Error fetching services:', error);
        if (serviceListContainer) {
             serviceListContainer.innerHTML = '<p class="error-message">Failed to load services. Please try again later.</p>';
        }
    } finally {
        // Remove loading message regardless of outcome
        const loadingElem = document.getElementById('service-loading');
        if (loadingElem) {
            loadingElem.remove();
        }
    }
  }

  // Modal functionality (for "Learn More")
  const serviceModal = document.createElement('div');
  serviceModal.id = 'serviceDetailModal';
  serviceModal.classList.add('modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('span');
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';

  const modalTitle = document.createElement('h3');
  const modalDescription = document.createElement('p');
  const modalDetailsTitle = document.createElement('h4');
  modalDetailsTitle.textContent = 'Key Features:';
  const modalDetailsList = document.createElement('ul');

  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalContent.appendChild(modalDetailsTitle);
  modalContent.appendChild(modalDetailsList);
  serviceModal.appendChild(modalContent);

  document.body.appendChild(serviceModal);

  function openServiceModal(service) {
    if (!service) return;
    // Populate modal with data from the clicked service
    modalTitle.textContent = service.name;
    modalDescription.textContent = service.description;
    modalDetailsList.innerHTML = service.details.map(detail => `<li>${detail}</li>`).join('');
    serviceModal.classList.add('visible');
  }

  function closeServiceModal() {
    // Hide modal (using a class)
    serviceModal.classList.remove('visible');
}

    closeButton.addEventListener('click', closeServiceModal);
  window.addEventListener('click', (event) => {
    if (event.target === serviceModal) {
        closeServiceModal();
    }
  });

    // Display Services Dynamically
    function displayServices(services) {
        if (!serviceListContainer) return;

        const servicesHTML = services.map(service => {
            const imagePath = service.image || '../images/agric-solution.webp'; // Use icon field, provide fallback

            return `
                <div class="service-item" data-service-id="${service.id}">
                    <img src="${imagePath}" alt="${service.name}" loading="lazy" width="300" height="auto">
                    <h3>${service.name}</h3>
                    <p class="service-description-hidden">${service.description}</p>
                    <h4 class="service-details-hidden">Key Features:</h4>
                    <ul class="service-details-hidden">
                        ${service.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                    <button class="learn-more-button" data-service-id="${service.id}">Learn More</button>
                </div>
      `;
    }).join('');
    serviceListContainer.innerHTML = servicesHTML;

    // Add event listeners AFTER items are added to the DOM
    serviceListContainer.querySelectorAll('.learn-more-button').forEach(button => {
        button.addEventListener('click', function() {
            const serviceId = parseInt(this.dataset.serviceId, 10); // Get ID from button
            // Find the full service data object using the ID
            const serviceData = services.find(s => s.id === serviceId);
            if (serviceData) {
                // Pass the complete service object to the modal function
                openServiceModal(serviceData);
            } else {
                console.error(`Service data not found for ID: ${serviceId}`);
            }
        });
    });
  }

  // Initial fetch
  fetchServices();
});
