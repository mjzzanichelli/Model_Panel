var Searchbar = (function (pType) {
	var _extension = {"test":"this is a test for panel"};
	return new kb.setPanel(pType,["events","binders"],_extension);
})("searchbars");

/*
var src1 = new Searchbar();
var src2 = new Searchbar();
					
src1.models.events.search();
src1.models.events.filter(function(){return this.Name.indexOf("h")>=0;});
src1 = undefined;
console.log(src1)
console.log(src2)
*/

/*
console.log(src1.models.events.list,src1.models.events.templist);
console.log(src2.models.events.list,src2.models.events.templist);
*/
