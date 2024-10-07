
const message = document.querySelector('#message');

function getCurrentTimestamp() {
	return new Date().getTime();
}

const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');

if (lastVisitTimestamp) {
	const currentTime = getCurrentTimestamp();
	const lastVisitTime = parseInt(lastVisitTimestamp, 10);

	const timeDifference = currentTime - lastVisitTime;
	const milliSecondsPerDay = 24 * 60 * 60 * 1000;

	if (timeDifference < milliSecondsPerDay) {
		message.innerHTML = 'Back so soon! <strong><em>Awesome!</em></strong>';
	}else {
		const daysSinceLastVisit = Math.floor(timeDifference / milliSecondsPerDay);
		let word = 'days';
		if (daysSinceLastVisit === 1) {
			word = 'day';
		}
		message.innerHTML = `You last visited <strong><em>${daysSinceLastVisit} ${word}</em></strong> ago.`;
	}
}else {
	message.innerHTML = '<em><strong>Welcome!</strong></em> Let us know if you have any questions.';
}

localStorage.setItem('lastVisitTimestamp', getCurrentTimestamp().toString());