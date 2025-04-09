function getQueryParams() {
	var params = {};
	var pairs = window.location.search.substring(1).split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
	}
	return params;
}

var params = getQueryParams();
var userInfoDiv = document.getElementById("userInfo");

var fields = {
	firstName: "First Name",
	lastName: "Last Name",
	email: "Email Address",
	mobile: "Mobile Phone Number",
	organization: "Organization Name",
    id: "Member ID",
    title: "Organizational Title",
    membership: "Membership Level",
    description: "Organizational Description",
	timestamp: "Submission Date and Time",
};

if (params["firstName"]) {
	document.getElementById("thankYouHeader").textContent =
		"Thank You, " +
		decodeURIComponent(params["firstName"].replace(/\+/g, " ")) +
		"!";
}

var table = document.createElement("table");
table.classList.add("user-info-table");

for (var key in fields) {
	if (params[key]) {
		var row = document.createElement("tr");

		var cellLabel = document.createElement("th");
		cellLabel.textContent = fields[key];
		row.appendChild(cellLabel);

		var cellValue = document.createElement("td");
		var value = decodeURIComponent(params[key].replace(/\+/g, " "));

		if (key === "timestamp") {
			var date = new Date(value);

			if (!isNaN(date.getTime())) {
				var options = {
					year: "numeric",
					month: "long",
					day: "numeric",
					hour: "numeric",
					minute: "numeric",
					second: "numeric",
					timeZoneName: "short",
				};
				value = date.toLocaleString("en-US", options);
			} else {
				value = "Invalid date";
			}
		}

		cellValue.textContent = value;
		row.appendChild(cellValue);

		table.appendChild(row);
	}
}

userInfoDiv.appendChild(table);

// Add the registration success message
const successMessage = document.createElement("p");
successMessage.textContent = `Hi ${firstName} ${lastName} you have been registered successfully!`;
successMessage.style.marginTop = "2rem"; // Add some spacing above
successMessage.style.marginBottom = "1.5rem"; // Add some spacing below
container.appendChild(successMessage); // Append after the userInfo table

// Create the back to homepage link button
const backHomeLink = document.createElement("a");
backHomeLink.href = "./index.html";
backHomeLink.textContent = "Homepage";
backHomeLink.classList.add("cta-btn"); // Add a class for styling
container.appendChild(backHomeLink);