

	var jsData = new Array();
	jsData[0] = { iD:1, firstname:"Frank", lastname:"MŸller", age:46 };
	jsData[1] = { iD:2, firstname:"Mike", lastname:"Petlek", age:22 };
	jsData[2] = { iD:3, firstname:"Alinak", lastname:"Halek", age:43 };
	jsData[3] = { iD:4, firstname:"Anal", lastname:"Weinberger", age:25 };
	jsData[4] = { iD:5, firstname:"Sebi", lastname:"Dirmer", age:28 };
	jsData[5] = { iD:6, firstname:"Firtz", lastname:"Meier", age:50 };

// Draw table from jsData array of objects

function drawTable(tbody) {
	var tr, td;
	tbody=document.getElementById(tbody);
	// remove existing rows, if any
	
	clearTable(tbody);
	
	// loop through data source
	for ( var i = 0; i < jsData.length; i++){
		tr = tbody.insertRow(tbody.rows.length);
		td = tr.insertCell(tr.cells.length);
		
		td.innerHTML = jsData[i].iD;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].firstname;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].lastname;
		td = tr.insertCell(tr.cells.length);
		td.innerHTML = jsData[i].age;
	}

};
	

// Sorting function dispatcher invoked by table column links

function sortTable(link) {

	alert(link.firstChild.nodeValue);
	switch(link.firstChild.nodeValue){

	case "Id" :
		jsData.sort(sortById);
		break;
	case "FirstName" :
		jsData.sort(sortByFirstname);
		break;
	case "LastName" :
		jsData.sort(sortByLastname);
		break;
	case "Age" :
		jsData.sort(sortByAge);
		break;
	}
	drawTable("content");
	return false ;

};

//Sorting function invoked by sortTable

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
	while (tbody.rows.length > 0){
		tbody.deleteRow(0);
	}

};
