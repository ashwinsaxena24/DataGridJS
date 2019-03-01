var update = (function() {
	
	function updateStorage(id, key, value) {
		var data = JSON.parse(localStorage.getItem('data'));
		id = Number(id);
		key = key.toString();
		value = value.toString();

		for(let i = 0; i < data.length; i++) {
			if(data[i].id == id) {
				data[i][key] = value;
			}
		}
		localStorage.setItem('data', JSON.stringify(data));
	}
	
	return {
		updateData: updateStorage
	}
}());

export {update};