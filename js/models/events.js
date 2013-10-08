//Use the following to NOT REVEAL the extenion publicly
var Events = (function (oType) {
	var _searchEvents = function(params){
		//Insert here the logic to send request to the server
		var _list = [{"Name": "John"}, {"Name": "Steve"}, {"Name": "Darius"}, {"Name": "Chirag"}];
		return this.load(_list);
	};
	var _extension = {
		"search": _searchEvents
	};
	return new kb.setModel(oType,_extension);
})("events");

/*var evs1 = new Events({list:[{"Name": "John"}, {"Name": "Steve"}, {"Name": "Darius"}, {"Name": "Chirag"}]});
evs1.clean();
evs1.search();
evs1.filter(function(){return this.Name.indexOf("h")>=0;});*/
