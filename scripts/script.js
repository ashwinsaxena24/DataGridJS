import {addToTable} from './adddata.js';

function addData(data) {
	if(typeof data !== 'undefined') {
		data = JSON.parse(data);
		data.forEach(addToTable);
	}
}

function getData() {
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
}

getData();