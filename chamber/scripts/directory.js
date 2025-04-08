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

document.addEventListener('DOMContentLoaded', function() {
    const spotlightContainer = document.querySelector('.spotlight-container');

    async function fetchAndDisplaySpotlights() {
        try {
            const response = await fetch('./data/members.json');
            const members = await response.json();

            if (!members || members.length < 3) {
                spotlightContainer.innerHTML = '<p>Not enough members to display spotlights.</p>';
                return;
            }

            // Filter for Gold or Silver members (membership level 2 or 3)
            const featuredMembers = members.filter(member => member.membership === 2 || member.membership === 3);

            if (featuredMembers.length < 3) {
                // If not enough featured members, just pick any 3 randomly
                shuffleArray(members);
                displayRandomMembers(members.slice(0, 3));
            } else {
                // Randomly select 3 featured members
                shuffleArray(featuredMembers);
                displayRandomMembers(featuredMembers.slice(0, 3));
            }

        } catch (error) {
            console.error('Error fetching or displaying spotlight members:', error);
            spotlightContainer.innerHTML = '<p>Failed to load spotlight members.</p>';
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function displayRandomMembers(selectedMembers) {
        spotlightContainer.innerHTML = ''; // Clear previous content
        selectedMembers.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('spotlight-card');

            const image = document.createElement('img');
            image.src = member.image;
            image.alt = `${member.name} Logo`;
            image.onerror = function(){
                this.src = "./images/placeholder.jpg"; // Placeholder if image fails
            };

            const name = document.createElement('h3');
            name.textContent = member.name;

            const description = document.createElement('p');
            description.textContent = member.description;

            const websiteLink = document.createElement('a');
            websiteLink.href = member.website;
            websiteLink.textContent = 'Visit Website';
            websiteLink.target = '_blank';

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(description);
            card.appendChild(websiteLink);

            spotlightContainer.appendChild(card);
        });
    }

    fetchAndDisplaySpotlights();
});