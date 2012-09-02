var jsData = new Array();

// Draw table from jsData array of objects
function sleep(delay) { 
    var start = new Date().getTime(); 
    while (new Date().getTime() < start + delay); 
}

function drawTable(tbody) {
	sndReq();
	
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
		td.innerHTML = jsData[i].product;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].desc;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].price;
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
			return jsData[i].product;
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
	case "Product":
		jsData.sort(sortByProduct);
		break;

	case "Price":
		jsData.sort(sortByPrice);
		break;
	}
	drawTable("content");
	return false;

};

// Sorting function invoked by sortTable

function sortById(a, b) {
	return a.iD - b.iD;

}

function sortByProduct(a, b) {
	a = a.product.toLowerCase();
	b = b.product.toLowerCase();
	return ((a < b) ? -1 : ((a > b) ? 1 : 0));

}

function sortByPrice(a, b) {
	return a.price - b.price;

}

// Remove existing table rows

function clearTable(tbody) {
	while (tbody.rows.length > 0) {
		tbody.deleteRow(0);
	}

	
};

// *********************Ajax

var ajaxHandler = new XMLHttpRequest();
ajaxHandler.onreadystatechange = handleResponse;

function sndReq() {
	ajaxHandler.open("GET", "products.txt");
	ajaxHandler.send(null);
}

function handleResponse() {
	if (ajaxHandler.readyState == 4) {
		var fileContent = ajaxHandler.responseText;

		loadData(fileContent);
	
	}
}

function loadData(fileContent) {
	// first split fileContent with newline character \n
	var lines = fileContent.split("\n");
	jsData = new Array();
	for ( var i = 0; i < lines.length; i++) {
		var columns = lines[i].split(";");
		
			jsData[jsData.length] = {iD:columns[0], product:columns[1], desc:columns[2], price:columns[3] };
			
		
	}

	// for each line split the column values with column separator ;

}
