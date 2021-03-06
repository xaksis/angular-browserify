module.exports = function($http, $q, $timeout){
	var service = {};
	// ========== Start functions from sheetjs.com demo ============ //
	function Workbook() {
		if(!(this instanceof Workbook)) return new Workbook();
		this.SheetNames = [];
		this.Sheets = {};
	}

	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i=0; i!=s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}
 	
 	function sheet_from_array_of_arrays(data, opts) {
		var ws = {};
		var range = {s: {c:10000000, r:10000000}, e: {c:0, r:0 }};
		for(var R = 0; R != data.length; ++R) {
			for(var C = 0; C != data[R].length; ++C) {
				if(range.s.r > R) range.s.r = R;
				if(range.s.c > C) range.s.c = C;
				if(range.e.r < R) range.e.r = R;
				if(range.e.c < C) range.e.c = C;
				var cell = {v: data[R][C] };
				if(cell.v == null) continue;
				var cell_ref = XLSX.utils.encode_cell({c:C,r:R});
				
				if(typeof cell.v === 'number') cell.t = 'n';
				else if(typeof cell.v === 'boolean') cell.t = 'b';
				else if(cell.v instanceof Date) {
					cell.t = 'n'; cell.z = XLSX.SSF._table[14];
					cell.v = datenum(cell.v);
				}
				else cell.t = 's';
				
				ws[cell_ref] = cell;
			}
		}
		if(range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
		return ws;
	}
	// ========== End functions from sheetjs.com demo ============ //


	var formatReport = function(jsonArray){
		var columns = [];
		var sheet = [];
		//first thing we need to do is extract column headers
		_.forOwn(jsonArray[0], function(value, key){
			//we don't want row id... so decrement each column order
			//by 1.
			//if(key != 'row_id')
			columns.push(key);
		});
		sheet.push(columns);
		//now lets iterate through the objects and add values
		_.map(jsonArray, function(buyRow){
			var row = [];
			_.map(columns, function(key){
				row.push(buyRow[key]);
			});
			sheet.push(row);
		});
		return sheet;
	}

	service.downloadCsv = function(jsonArray, title, fname){
		//get the data first
		var reportData = formatReport(jsonArray);
		console.log(reportData);
		//create the workbook
		var wb = new Workbook();
 		var buysheetTitle = title;
		wb.SheetNames.push(buysheetTitle);
		var ws_buysheet = sheet_from_array_of_arrays(reportData);
		wb.Sheets[buysheetTitle] = ws_buysheet;

		var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});

		var blob = new Blob([s2ab(wbout)],{type:"application/octet-stream"});
		var filename = fname + '.xlsx';
		saveAs(blob, filename);
	}

	return service; 
}