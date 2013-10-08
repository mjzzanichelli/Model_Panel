var app = angular.module('SearchBar', []);

app.directive('searchinput', function(){
	return {
		restrict: 'A', // only activate on element attribute
		require: '?ngModel', // get a hold of NgModelController
		link: function(scope, element, attrs, ngModel) {
			//console.log(scope, element, attrs, ngModel)
			var _value = 'Search...';
			ngModel.$setViewValue(_value);
			ngModel.$render();
			
			/*scope.$watch('searchtext', function(value){
				console.log("watch",value)
				if (value===undefined) ngModel.$setViewValue(_value);	//Set Model default value
				ngModel.$render();
			});*/
			
			element.on('blur focus', function(e) {
				if (element.val()=="") element.val(_value);	//Resetting default when leaving the input 
				else if (element.val()==_value) element.val(""); //Cleaning the input when accessing 
			});
			
			ngModel.$parsers.push(function(value){
				//var _events = new Events();
			});
		}
	};
});


kb.extendModel("events",{"dump":function(){alert("hello");}});
var ev = new Events();
kb.extendModel("events",{"test2":function(){alert("hello2");}});
kb.unextendModel("events","dump");

kb.extendPanel("searchbars",{"test":function(){alert("hello");}});
var src = new Searchbar();
kb.extendPanel("searchbars",{"test2":function(){alert("hello2");}});
kb.unextendPanel("searchbars","dump");
/*
var mds = [];
function create(){
	var i = 10000
		, time = new Date()
	;
	//while(i--)mds.push((new Searchbar()).models.events.load([{"Name": "John"}, {"Name": "Steve"}, {"Name": "Darius"}, {"Name": "Chirag"}]))
	while(i--)mds.push(new Searchbar())
	console.log((new Date).getTime()-time.getTime())
}
function dump(type){
var i = mds.length
	, time = new Date;
	while(i--) mds[i].dump(type);
	console.log((new Date).getTime()-time.getTime())
}
*/


/*		
var src1 = new Searchbar();
var src2 = new Searchbar();
					
src1.models.events.search();
src1.models.events.filter(function(){return this.Name.indexOf("h")>=0;});

console.log(kb.extend(Searchbar.inst),{})
src1.dump()
console.log(kb.extend(Searchbar.inst),{})
var src3 = new Searchbar();
console.log(src3)
console.log(kb.clone(Searchbar.inst),{})*/
/*
src1.dump();

src2.models.events.search();
src2.models.events.filter(function(){return this.Name.indexOf("h")>=0;});
//console.log(src1)


var evs1 = new Events();

evs1.load([{"Name": "John"}, {"Name": "Steve"}, {"Name": "Darius"}, {"Name": "Chirag"}]);
evs1.dump("min");

src2.dump("min");
*/



//evs1.search();
//console.log(evs1.test)

//console.log(evs1)
//console.log(evs1.list)
//console.log(evs1.list)
//

/*console.log(Searchbar.inst)
console.log(src2.index)*/
		
