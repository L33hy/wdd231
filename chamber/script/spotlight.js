
const contentURL = "https://l33hy.github.io/wdd231/chamber/data/member.json";
const cards = document.querySelector('#article');

async function getContent(contentURL) {
    const response = await fetch(contentURL);
    
    if(response.ok) {
        const data = await response.json();
        displayContent(data.organizations);
    }
}

function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

const displayContent = (organizations) => {
    let arr = [];

    organizations.forEach(member => {
        if (member.level == "Gold" || member.level == "Silver") {
            arr.push(member);
        }
    })

    final_arr = [];

    for (let i = 0; i < 3; i++) {
        let object = arr[Math.floor(Math.random() * arr.length)];
        if (containsObject(object, final_arr) == false ) {
            final_arr.push(object);
        }
    }
    
    final_arr.forEach(member => {
        let card = document.createElement('section');
        card.classList.add("spotlight");

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

        cards.appendChild(card);
    })

        
  
}

getContent(contentURL);
