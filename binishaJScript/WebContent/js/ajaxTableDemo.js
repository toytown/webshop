var jsData = new Array();
jsData[0] = {
	iD : 1,
	firstname : "TV",
	lastname : "Müller",
	age : 46
};
jsData[1] = {
	iD : 2,
	firstname : "Desktop",
	lastname : "Petlek",
	age : 22
};
jsData[2] = {
	iD : 3,
	firstname : "Laptop",
	lastname : "Halek",
	age : 43
};
jsData[3] = {
	iD : 4,
	firstname : "Keyboard",
	lastname : "Weinberger",
	age : 25
};
jsData[4] = {
	iD : 5,
	firstname : "Mouse",
	lastname : "Dirmer",
	age : 28
};
jsData[5] = {
	iD : 6,
	firstname : "Telephone",
	lastname : "Meier",
	age : 50
};

// Draw table from jsData array of objects

function drawTable(tbody) {
	var tr, td;
	tbody = document.getElementById(tbody);
	// remove existing rows, if any

	clearTable(tbody);

	// loop through data source
	for ( var i = 0; i < jsData.length; i++) {
		tr = tbody.insertRow(tbody.rows.length);
		td = tr.insertCell(tr.cells.length);

		td.innerHTML = jsData[i].iD;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].firstname;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].lastname;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].age;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = "<a href=\"#\" onclick=\"addToCart(" + jsData[i].iD
				+ ") \">Buy</a>";
	}

};

function addToCart(id) {
	var x = readCookie('ppkcookie');
	console.log("cookie value " + x);
	if (x == null) {
		createCookie('ppkcookie', id, 7);
		updateShoppingCart(id);
	} else {
		addItemToExistingCookie(id);
	}
}

function addItemToExistingCookie(id) {
	var oldVal = readCookie('ppkcookie');
	var val = oldVal + "," + id;
	createCookie('ppkcookie', val, 7);

	updateShoppingCart(val); // update shopping cart list

}

//
function updateShoppingCart(val) {
	var container = document.getElementById('shoppingList');
	var valString = String(val);
	if (valString.indexOf(",") > 0) {
		var values = valString.split(",");

		while (container.hasChildNodes()) {
			container.removeChild(container.firstChild);
		}
		// Create a new <li> element for to insert inside <ul id="myList">
		for ( var i = 0; i < values.length; i++) {
			var new_element = document.createElement('li');

			new_element.innerHTML = "<span>" + getItem(values[i]) + "</span>";
			container.insertBefore(new_element, container.firstChild);
		}
	} else {
		var new_element = document.createElement('li');
		new_element.innerHTML = "<span>" + getItem(val) + "</span>";
		container.insertBefore(new_element, container.firstChild);
	}

}

function getItem(id) {
	for ( var i = 0; i < jsData.length; i++) {
		console.log(jsData[i].iD);
		if (jsData[i].iD == id) {
			return jsData[i].firstname;
		}
	}

}

function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else
		var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for ( var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length, c.length);
	}
	return null;
}

function eraseCookie(name) {
	var container = document.getElementById('shoppingList');
	createCookie(name, "", -1);
	
	while (container.hasChildNodes()) {
		container.removeChild(container.firstChild);
	}
}
// Sorting function dispatcher invoked by table column links

function sortTable(link) {

	switch (link.firstChild.nodeValue) {

	case "Id":
		jsData.sort(sortById);
		break;
	case "FirstName":
		jsData.sort(sortByFirstname);
		break;
	case "LastName":
		jsData.sort(sortByLastname);
		break;
	case "Age":
		jsData.sort(sortByAge);
		break;
	}
	drawTable("content");
	return false;

};

// Sorting function invoked by sortTable

function sortById(a, b) {
	return a.iD - b.iD;

}

function sortByFirstname(a, b) {
	a = a.firstname.toLowerCase();
	b = b.firstname.toLowerCase();
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));

}

function sortByLastname(a, b) {
	a = a.lastname.toLowerCase();
	b = b.lastname.toLowerCase();
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));

}

function sortByAge(a, b) {
	return a.age - b.age;

}

// Remove existing table rows

function clearTable(tbody) {
	while (tbody.rows.length > 0) {
		tbody.deleteRow(0);
	}

};
