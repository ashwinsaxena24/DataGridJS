import {CreateTable} from './CreateTable.js';

function addData(data) {
	var table = document.getElementById('emp');
	table.setAttribute('data', data);
	var cols = ['ID', 'First Name', 'Last Name', 'Email'];
	table.setAttribute('columns', cols);
}

(function() {
	var data;
	data = localStorage.getItem('data');
	if(data == null) {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				var data = JSON.parse(JSON.stringify(this.responseText));
				addData(data);
				localStorage.setItem('data', data.toString());
				console.log('getting data');
			}
		}
		ajax.open('GET', './data/employees.json', true);
		ajax.send();
	}
	else {
		addData(data);
		console.log('already saved');
	}
}());

customElements.define('custom-table', CreateTable);