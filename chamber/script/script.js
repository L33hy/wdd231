const contentURL = "https://l33hy.github.io/wdd231/chamber/data/member.json";
const cards = document.querySelector('#article');
const btn = document.querySelector('#grid-btn');


async function getContent(contentURL) {
    const response = await fetch(contentURL);
    
    if(response.ok) {
        const data = await response.json();
        //console.log(data);
        displayContent(data.organizations);
    }
}

const displayContent = (organizations) => {
    organizations.forEach(member => {
        let card = document.createElement('section');

        let memberLogo = document.createElement('img');
        memberLogo.setAttribute('src', `${member.img}`);
        memberLogo.setAttribute('alt', 'Company Logo');
        memberLogo.setAttribute('loading', 'lazy');
        memberLogo.setAttribute('width', '200');
        memberLogo.setAttribute('height', '180');

        let memberName = document.createElement('h3');
        memberName.textContent = `${member.name}`;

        let memberAddress = document.createElement('p');
        memberAddress.textContent = `${member.address}`;

        let memberPhone = document.createElement('p');
        memberPhone.textContent = `${member.phone}`;
        
        let memberURLHolder = document.createElement('p');

        let memberURL = document.createElement('a');
        memberURL.setAttribute('href', `${member.url}`)
        memberURL.textContent = `${member.url}`;

        memberURLHolder.appendChild(memberURL);

        let memberLevel = document.createElement('h4');
        memberLevel.textContent = `${member.level}`;
        

        card.appendChild(memberLogo);
        card.appendChild(memberName);
        card.appendChild(memberAddress);
        card.appendChild(memberPhone);
        card.appendChild(memberURLHolder);
        card.appendChild(memberLevel);

        cards.appendChild(card);
    });
}

getContent(contentURL);

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#article");

// The following code could be written cleaner. How? We may have to simplfiy our HTMl and think about a default view.

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", showList); // example using defined function

function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}