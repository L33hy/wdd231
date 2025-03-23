    document.addEventListener('DOMContentLoaded', function() { 
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastmodified").textContent = `Last modified: ${document.lastModified}`;
    
    //  Fetch the JSON data
    fetch('./data/members.json') // Corrected path to the JSON file
        .then(response => response.json())
        .then(directoryData => {
            const card1 = document.getElementById("business-card-1");
            const card2 = document.getElementById("business-card-2");
            const card3 = document.getElementById("business-card-3");

            function populateCard(card, data) {
                const nameElement = card.querySelector(".business-name");
                const descriptionElement = card.querySelector(".business-description");
                const imageElement = card.querySelector(".business-image");
                const addressElement = card.querySelector(".business-address");
                const phoneElement = card.querySelector(".business-phone");
                const websiteButton = card.querySelector(".website-button");
                const membershipElement = card.querySelector('li'); // create a new li element
                membershipElement.textContent = `Membership: ${data.membership}`; // add the membership data.
                card.querySelector("ul").appendChild(membershipElement); // append the membership to the ul list.
                nameElement.textContent = data.name;
                descriptionElement.textContent = data.description;
                imageElement.src = data.image;

                //fix image loading issue.
                imageElement.onerror = function(){
                    imageElement.src = "./images/placeholder.jpg"; // if image fail to load, load a placeholder.
                }

                imageElement.alt = data.name + " Logo"; // Added alt attribute for accessibility
                addressElement.textContent =  data.address ;
                phoneElement.textContent =  data.phone ;
                websiteButton.dataset.website = data.website;
            }
            populateCard(card1, directoryData[0]);
            populateCard(card2, directoryData[1]);
            populateCard(card3, directoryData[2]);

            // Event listener for website buttons
            document.querySelectorAll('.website-button').forEach(button => {
                button.addEventListener('click', function() {
                    const website = this.dataset.website;
                    if (website) {
                        window.open(website, '_blank');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching directory data:', error));
});