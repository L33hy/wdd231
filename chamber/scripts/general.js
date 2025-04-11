document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('year').textContent = new Date().getFullYear();

	document.getElementById('lastModified').textContent =
		"Last modification: " + document.lastModified;

	// Hamburger menu toggle
	const hamburger = document.querySelector('#hamburger');
	const navMenu = document.querySelector('#nav-links');

	hamburger.addEventListener('click', function () {
		navMenu.classList.toggle('open');
		if (navbar.classList.contains('open')) {
            // navbar.classList.add('open');
            hamburger.textContent = 'X';
        } else {
            hamburger.textContent = '☰';
            // navbar.classList.remove('open');
        }
	});
});