import {update} from './update.js';

class CreateTable extends HTMLElement {
	
	shadow;
	
	constructor() {
		super();
		this.shadow = this.attachShadow({mode: 'open'});
		this.shadow.innerHTML = `
			<style>
				.transparent, input:focus {
					border: none;
				}

				#emp-table {
					display: table;
				}

				#emp-table {
					display: table;
					width: 95%;
				}

				#emp-header {
					display: table-header-group;
					background-color: lightgray;
					font-weight: bold;
					font-size: 16px;
				}

				.emp-header-cell {
					display: table-cell;
					padding: 10px;
					border: 1px solid black;
				}

				#emp-body {
					display: table-row-group;
				}

				.emp-body-row {
					display: table-row;
				}

				.emp-body-cell {
					display: table-cell;
					text-align: left;
					padding: 10px;
					border: 1px solid black;
				}
			</style>`;
	}
	
	static get observedAttributes() {
		return ['data', 'columns'];
	}
	
	get columms() {
		return this.getAttribute('columns');
	}
	
	set columns(value) {
		this.setAttribute('columns', value);
	}
	
	get data() {
		return this.getAttribute('data');
	}
	
	set data(value) {
		this.setAttribute('data', value);
	}
	
	attributeChangedCallback(name, oldValue, newValue) {
		switch(name) {
			case 'data':
				if(this.hasAttribute('columns')) {
					var cols = this.columms;
					if(newValue.length > 0)
						this.createTable(newValue, cols);
				}
				else {
					this.createTable(newValue);
				}
				break;
			case 'columns':
				if(this.hasAttribute('data')) {
					this.changeHeaders(newValue);
				}
				
		}
	}
	
	createTable(data, columns = []) {
		data = JSON.parse(JSON.stringify(data));
		var empTable = document.createElement('div');
		empTable.setAttribute('id', 'emp-table');
		var empHeader = this.createHeaders(data, columns);
		var empBody = this.createBody(data);
		empTable.appendChild(empHeader);
		empTable.appendChild(empBody);
		this.shadow.appendChild(empTable);
	}
	
	createHeaders(data, cols) {
		cols = cols.split(',');
		var headers = this.getHeaders(data, cols);
		
		var empHeader = document.createElement('div');
		empHeader.setAttribute('id', 'emp-header');
		
		headers.forEach(function(value) {
			var cell = document.createElement('div');
			cell.setAttribute('class', 'emp-header-cell');
			cell.innerHTML = value.toString();
			empHeader.appendChild(cell);
		});
		
		return empHeader;
	}
	
	getHeaders(data, cols) {
		var keys = [];
		if(cols.length == 0 && data.length > 0) {
			data = JSON.parse(data);
			keys = Object.keys(data[0]);
		}
		else {
			keys = cols;
		}
		return keys;
	}
	
	createBody(data) {
		data = JSON.parse(data);
		
		var empBody = document.createElement('div');
		empBody.setAttribute('id', 'emp-body')
		
		for(let i = 0; i < data.length; i++) {
			var row = this.createRow(data[i]);
			empBody.appendChild(row);
		}
		return empBody;
	}
	
	createRow(data) {
		var empRow = document.createElement('div');
		empRow.setAttribute('class', 'emp-body-row');
		
		for(let current in data) {
			if(data.hasOwnProperty(current)) {
				var cell = this.createCell(current, data[current]);
				empRow.appendChild(cell);
			}
		}
		return empRow;
	}
	
	createCell(key, data) {
		var text = document.createElement('input');
		text.setAttribute('type', 'text');
		text.setAttribute('class', 'transparent');
		text.value = data;
		text.addEventListener('focusout', function(e) {
			var thisKey = e.target.parentNode.getAttribute('data-key');
			var thisId = e.target.parentNode.parentNode.childNodes[0].childNodes[0].value;
			update.updateData(thisId, thisKey, e.target.value);
		});
		var cell = document.createElement('div');
		cell.setAttribute('class', 'emp-body-cell');
		cell.setAttribute('data-key', key);
		cell.appendChild(text);
		return cell;
	}
	
	changeHeaders(cols) {
		cols = cols.split(',');
		var header = this.shadow.getElementById('emp-header');
		header.childNodes.forEach(function(row) {
			row.innerHTML = cols.shift();
		});
	}
}
export {CreateTable};