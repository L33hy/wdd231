// For showing invitation picture
const d = new Date();
let day = d.getDay();

if (day === 1 || day === 2 || day === 3) {
    const image = document.querySelector('.hero');
    const main = document.querySelector('#index_main');

    let figure = document.createElement('figure');
    image.setAttribute('src', 'images/meet-invite.webp');
    image.setAttribute('alt', 'An invitation to attend the chamber meet and greet on wednesday by 7pm');

    const content = document.createElement('button');
    content.textContent = '❌';

    content.addEventListener('click', () => {
        image.setAttribute('src', 'images/hero.webp');
        image.setAttribute('alt', 'A hero banner with a picture of city traffic and welcoming words');
        content.setAttribute('id', 'remove');
    })

    main.appendChild(content)
    image.classList.add('invite');
}