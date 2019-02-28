import {updateEmail, updateFirstName, updateLastName} from './updatestorage.js';

function addToTable(value) {
	
	var bodyClass = 'emp-body-row';
	var cellClass = 'emp-body-cell';
	var transparent = 'transparent';
	
	var dataTable = document.getElementById('emp-body');
	
	//Creating row
	var row = document.createElement('div');
	row.setAttribute('class', bodyClass);
	dataTable.appendChild(row);
	
	//Creating ID Cell
	var idCell = document.createElement('div');
	idCell.setAttribute('class', cellClass);
	idCell.style.textAlign = 'right';
	idCell.innerHTML = value.id;
	
	//Creating First name cell
	var fNameCell = document.createElement('div');
	fNameCell.setAttribute('class', cellClass);
	var fNameText = document.createElement('input');
	fNameText.setAttribute('type', 'text');
	fNameText.setAttribute('class', transparent);
	fNameText.value = value.first_name;
	fNameText.addEventListener('focusout', function(e) {
		var value = this.value;
		var id = this.parentNode.parentNode.firstChild.firstChild.data;
		console.log(id);
		updateFirstName(Number(id), value);
	});
	fNameCell.appendChild(fNameText);
	
	var lNameCell = document.createElement('div');
	lNameCell.setAttribute('class', cellClass);
	var lNameText = document.createElement('input');
	lNameText.setAttribute('type', 'text');
	lNameText.setAttribute('class', transparent);
	lNameText.addEventListener('focusout', function(e) {
		var value = this.value;
		var id = this.parentNode.parentNode.firstChild.firstChild.data;
		updateLastName(id, value);
	});
	lNameText.value = value.last_name;
	lNameCell.appendChild(lNameText);
	
	var emailCell = document.createElement('div');
	emailCell.setAttribute('class', cellClass);
	var emailText = document.createElement('input');
	emailText.setAttribute('type', 'email');
	emailText.setAttribute('class', transparent);
	emailText.value = value.email;
	emailText.addEventListener('focusout', function(e) {
		var value = this.value;
		var id = this.parentNode.parentNode.firstChild.firstChild.data;
		updateEmail(id, value);
	});
	emailCell.appendChild(emailText);
	
	row.appendChild(idCell);
	row.appendChild(fNameCell);
	row.appendChild(lNameCell);
	row.appendChild(emailCell);
}

export {addToTable};