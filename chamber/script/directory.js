document.addEventListener('DOMContentLoaded', () => {
    const directory = document.getElementById('directory');
    const toggleViewBtn = document.getElementById('toggle-view');
    let isGridView = true;

    // Fetch member data and render cards
    async function loadMembers() {
        try {
            const response = await fetch('data/members.json');
            const members = await response.json();
            displayMembers(members);
        } catch (error) {
            console.error("Error fetching members:", error);
        }
    }

    function displayMembers(members) {
        directory.innerHTML = '';
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            memberCard.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p>Membership: ${member.membership}</p>
            `;
            directory.appendChild(memberCard);
        });
    }

    // Toggle between grid and list view
    toggleViewBtn.addEventListener('click', () => {
        isGridView = !isGridView;
        if (isGridView) {
            directory.classList.remove('member-list');
        } else {
            directory.classList.add('member-list');
        }
    });

    // Set copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Set last modified date
    document.getElementById('last-modified').textContent = document.lastModified;

    // Load members on page load
    loadMembers();
});
