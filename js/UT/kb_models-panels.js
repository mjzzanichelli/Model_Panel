beforeEach(function() {
	this.addMatchers({
		toBeEmpty: function(oType) {
      		oType = oType || Array;
			var actual = this.actual
				, notText = this.isNot ? " not" : ""
				, ret = false
			;

			this.message = function () {
				return "Expected " + actual + notText + " to be an empty "+oType.name;
			};
  
  			ret = (actual.constructor == oType);
  			if (ret) {
  				for (var i in actual){
  					if (actual.hasOwnProperty(i)){
  						ret = false;
  						break;
  					}
  				}
  			}
			
			return ret;
		}
	});
});



/*
* Create Model constructor
* Create Model constructor + extension
* Model's instance access load
* Model's instance access list
* Model's instance access filter
* Model's instance access templist
* Model's instance access clean
* Model's instance access dump
* Model's instance functionality cannot be overwritten
* extend Model
* Model's instance can access extended functionality
* unextend Model
* Model's instance cannot access unextended functionality
* Models extended functionalities can be overwritten re-extending
* Native Model functionality cannot be unextended 
* Dumped Model's instance cannot access any native functionality
* Instances dumped as "false" will only remove it from the Model collection
* Instances dumped as "undefined" or "max" will be cleaned completely 
* Instances dumped as "min" will not clean the extension
* Instances of a dumped Model are dumped when "clean" = true
* Instances of a dumped Model are NOT dumped when "clean" = false || undefined
* Instances dumped from a dumped Model will use third parameter "dump" type when "clean" = true 


* Create Panel constructor
* Create Panel constructor + models
* Create Panel constructor + models + extension
- Panel's instance access load
- Panel's instance access list
- Panel's instance access filter
- Panel's instance access templist
- Panel's instance access clean
- Panel's instance access dump
- Panel's instance functionality cannot be overwritten
- extend Panel
- Panel's instance can access extended functionality
- unextend Panel
- Panel's instance cannot access unextended functionality
- Panel extended functionalities can be overwritten re-extending
- Native Panel functionality cannot be unextended 
- Dumped Panel's instance cannot access any native functionality
- Models instances attached to dumped Panel's instance are dumped too applying the same dumping type
- Instances dumped as "false" will only remove it from the Panel collection
- Instances dumped as "undefined" or "max" will be cleaned completely 
- Instances dumped as "min" will not clean the extension
- Instances of a dumped Panel are dumped when "clean" = true
- Instances of a dumped Panel are NOT dumped when "clean" = false || undefined
- Instances dumped from a dumped Panel will use third parameter "dump" type when "clean" = true

*/

describe("KB Model/Panel Framework", function() {
	it("kb is included", function() {
        expect(kb).not.toBeEmpty(Object);
    });
    
    it("creates new Model", function() {
        expect(new kb.setModel("testmodel")).not.toBeUndefined();
    });
    
    it("removes existing Model", function() {
        expect(kb.stopModel("testmodel")).toBe(true);
    });
    
    it("creates new Panel", function() {
        expect(new kb.setPanel("testpanel")).not.toBeUndefined();
    });
    
    it("removes existing Panel", function() {
        expect(kb.stopPanel("testpanel")).toBe(true);
    });
	
	describe("Working with Models", function() {
	
		describe("Creation of Models constructor", function() {
		
			describe("kb.setModel(params) -> params = <undefined>", function() {
				it("expecting at least 1 argument to be a string containing the Model Type", function() {
		           var kbModels = kb.getModel()
		            	, NewModel = new kb.setModel();
		            expect(NewModel.prototype).toBeUndefined();
		            expect(kb.getModel()).toBe(kbModels);
		        });
			});
	        
			describe("kb.setModel(params) -> params = ModelType<string>", function() {
				var NewModel,modelType;
				
		        beforeEach(function(){
		        	modelType = "newmodel";
		        	NewModel = new kb.setModel(modelType);
		        });
		        
		        afterEach(function(){
		        	NewModel = kb.stopModel(modelType);
		        });
		    	
				it("sets Model type name", function() {
		            expect(NewModel.prototype.type).toBe(modelType);
		        });
		        it("sets Model native methods", function() {
		            expect(NewModel.prototype.load).toEqual(jasmine.any(Function));
		            expect(NewModel.prototype.filter).toEqual(jasmine.any(Function));
		            expect(NewModel.prototype.clean).toEqual(jasmine.any(Function));
		            expect(NewModel.prototype.dump).toEqual(jasmine.any(Function));
		        });
		        /*it("sets Model native properties", function() {
		            expect(NewModel.prototype.list).toEqual(jasmine.any(Array));;
		        });*/
		        it("sets Model instances collection", function() {
		            expect(NewModel.inst).toBeEmpty(Object);
		        });
				it("new Model added to kb", function() {
		            expect(NewModel).toBe(kb.getModel(modelType));
		        });
			});
			
			describe("kb.setModel(params) -> params = ModelType<string>, Extension<object>", function() {
				var NewModel,modelType,extension;
				
		        beforeEach(function(){
		        	modelType = "newmodel";
		        	extension = {"newFn":function(){}};
		        	NewModel = new kb.setModel(modelType,extension);
		        });
		        
		        afterEach(function(){
		        	NewModel = kb.stopModel(modelType,true,"max");
		        });
		    	
		    	it("adds extension functionalities to a new Model", function() {
		            for (var prop in extension) expect(NewModel.prototype.hasOwnProperty(prop)).toBeTruthy();	
		        });
			});
			
			describe("var NewModel = kb.setModel(\"newmodel\")", function() {
				var NewModel,modelType;
				
		        beforeEach(function(){
		        	modelType = "newmodel";
		        	NewModel = new kb.setModel(modelType);
		        });
		        
		        afterEach(function(){
		        	NewModel = kb.stopModel(modelType,true,"max");
		        });
		        
				it("\"newmodel\" constructor is accessible using the NewModel function", function() {
					expect(NewModel).toBe(kb.getModel(modelType));
				});
			});
			
			describe("new kb.setModel(\"newmodel\")", function() {
				var modelType;
				
		        beforeEach(function(){
		        	modelType = "newmodel";
		        	kb.setModel(modelType);
		        });
		        
		        afterEach(function(){
		        	kb.stopModel(modelType,true,"max");
		        });
		        
				it("\"newmodel\" constructor is accessible using kb only", function() {
					expect(kb.getModel(modelType).prototype.type).toBe(modelType);
				});
			});
		});
		
		describe("Search for existing Models", function() {
			
			var NewModel,modelType,extension;
				
	        beforeEach(function(){
	        	modelType = "newmodel";
	        	extension = {"newFn":function(){}};
	        	NewModel = new kb.setModel(modelType);
	        });
	        
	        afterEach(function(){
	        	NewModel = kb.stopModel(modelType,true,"max");
	        });
		        
			describe("kb.getModel(params) -> params = <undefined>", function() {
				it("gets list of Models", function() {
					expect(kb.getModel()[modelType]).toBe(NewModel);
				});
			});
			
			describe("kb.getModel(params) -> params = ModelType<string>", function() {
				it("gets specific Model", function() {
					expect(kb.getModel(modelType)).toBe(NewModel);
				});
			});
		});
		
		describe("Model's Instance and native functionalities", function() {
			var NewModel,modelType,ObjectModel;
				
	        beforeEach(function(){
	        	modelType = "newmodel";
	        	NewModel = new kb.setModel(modelType);
	        	ObjectModel = new NewModel();
	        });
	        
	        afterEach(function(){
	        	NewModel = kb.stopModel(modelType,true,"max");
	        });
	        
	        describe("var ObjectModel = new NewModel()", function() {
	        	it("creates a Model instance", function() {
					expect(ObjectModel.type).toBe(NewModel.prototype.type);
				});
				it("associates an ID", function() {
					expect(ObjectModel.index).not.toBeNull();
					expect(ObjectModel.index).not.toBeUndefined();
				});
				it("adds a reference of the instance to the Model instances collection", function() {
					expect(NewModel.inst[ObjectModel.index]).toBe(ObjectModel);
				});
	        	it("applies all native functionalities to it", function() {
					var isConstructor = true;
					for (var prop in NewModel.prototype)if (!prop in ObjectModel) isConstructor = false;
					expect(isConstructor).toBeTruthy();
				});
			});
			
	        describe("ObjectModel.load(params) -> params = List<array>", function() {
				it("returns the instance with ObjectModel.list and ObjectModel.templist equally populated", function() {
					var _list = ["item","item","item","item"];
					expect(ObjectModel.load(_list).list).toBe(_list);
					expect(ObjectModel.load(_list).templist).toBe(_list);
					expect(ObjectModel.list).toBe(ObjectModel.templist);
				});
				it("overwrites ObjectModel.list and ObjectModel.templist pre-existing values", function() {
					var _pre_list = ["item","item","item","item"];
					var _post_list = ["newitem","newitem","newitem","newitem"];
					expect(ObjectModel.load(_pre_list).list).not.toBe(ObjectModel.load(_post_list).list);
					expect(ObjectModel.load(_pre_list).templist).not.toBe(ObjectModel.load(_post_list).templist);
				});
			});
			
			describe("ObjectModel.load(params) -> params = List<object>", function() {
				it("ObjectModel.list and ObjectModel.templist are automatically converted into objects", function() {
					var _list = {"name":"Joe","surname":"Bloggs"};
					expect(ObjectModel.load(_list).list).toEqual(jasmine.any(Object));
				});
			});
			
			describe("ObjectModel.load(params) -> params = Item<any>, Item<any>, Item<any>", function() {
				it("arguments are used as array of values when more then 1 or neither array nor object", function() {
					var 
						_item1 = "Joe"
						, _item2 = "Bloggs"
						, _item3 = 1
						, _item4 = function(){}
						, _item5 = {"name":"Joe","surname":"Bloggs"}
						, _item6 = ["Joe","Bloggs"]
					;
					expect(ObjectModel.load(_item1,_item2,_item3,_item4,_item5,_item6).list).toEqual(jasmine.any(Array));
					expect(ObjectModel.load(_item5,_item5).list).toEqual(jasmine.any(Array));
				});
			});

			describe("ObjectModel.filter(params) -> params = Criteria<function>", function() {
				it("returns ObjectModel.templist of items in ObjectModel.list matched by the Criteria argument", function() {
					var _list = ["Joe","Bloggs"];
					expect(ObjectModel.load(_list).filter(function(i) { return this[i].indexOf("J")>=0;})).toEqual(jasmine.any(_list.constructor));
					expect(ObjectModel.templist.length).toBe(1);
					expect(ObjectModel.templist[0]).toBe("Joe");
				});
				it("excludes unmatching items in ObjectModel.templist also when ObjectModel.list is <object>", function() {
					var _list = {"name":"Joe","surname":"Bloggs"};
					ObjectModel.load(_list);
					expect(ObjectModel.list).toBe(ObjectModel.templist);
					ObjectModel.filter(function(item){return item=="name";});
					expect(ObjectModel.list).not.toBe(ObjectModel.templist);
					expect(ObjectModel.templist["name"]).toBe(_list["name"]);
					expect(ObjectModel.templist["surname"]).toBeUndefined();
				});
			});
			
			describe("ObjectModel.clean()", function() {
				it("sets ObjectModel.list to empty <array>", function() {
					var _list = {"name":"Joe","surname":"Bloggs"};
					ObjectModel.load(_list);
					expect(ObjectModel.list).toBe(_list);
					ObjectModel.clean();
					expect(ObjectModel.list).toBeEmpty(Array);
				});
				it("sets ObjectModel.templist to empty <array>", function() {
					var _list = ["Joe","Bloggs"];
					ObjectModel.load(_list);
					expect(ObjectModel.list).toBe(_list);
					expect(ObjectModel.list).toBe(ObjectModel.templist);
					ObjectModel.filter(function(i){return i==0;});
					expect(ObjectModel.list).not.toBe(ObjectModel.templist);
					ObjectModel.clean();
					expect(ObjectModel.templist).toBeEmpty(Array);
					expect(ObjectModel.list).toBe(ObjectModel.templist);
				});
			});
			
			describe("ObjectModel.dump(params) -> params = \"max\"<string> || <undefined>", function() {
				it("removes the instance from the Model instances collection", function() {
					var _index = ObjectModel.index;
					expect(NewModel.inst[_index]).toBe(ObjectModel);
					ObjectModel.dump();
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectModel.dump();
					expect(ObjectModel.dumped).toBeTruthy();
				});
				it("resets all methods as null", function() {
					ObjectModel.dump();
					expect(ObjectModel.load).toBeNull();
		            expect(ObjectModel.filter).toBeNull();
		            expect(ObjectModel.clean).toBeNull();
		            expect(ObjectModel.dump).toBeNull();
					
				});
				it("resets all properties as null", function() {
					ObjectModel.load(["Joe","Bloggs"]);
					ObjectModel.dump();
		            expect(ObjectModel.type).toBeNull();
		            expect(ObjectModel.list).toBeNull();
				});
				it("returns <undefined>", function() {
					expect(ObjectModel.dump()).toBeUndefined();
				});
			});
			
			describe("ObjectModel.dump(params) -> params = \"min\"<string>", function() {
				it("removes the instance from the Model instances collection", function() {
					var _index = ObjectModel.index;
					expect(NewModel.inst[_index]).toBe(ObjectModel);
					ObjectModel.dump("min");
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectModel.dump("min");
					expect(ObjectModel.dumped).toBeTruthy();
				});
				it("resets all methods to return error", function() {
					ObjectModel.dump("min");
					expect(ObjectModel.load).not.toBeNull();
		            expect(ObjectModel.filter).not.toBeNull();
		            expect(ObjectModel.clean).not.toBeNull();
		            expect(ObjectModel.dump).not.toBeNull();
					expect(function(){return ObjectModel.load();}).toThrow();
		            expect(function(){return ObjectModel.filter();}).toThrow();
		            expect(function(){return ObjectModel.clean();}).toThrow();
		            expect(function(){return ObjectModel.dump();}).toThrow();
				});
				it("resets only properties \"list\" as null", function() {
					ObjectModel.load(["Joe","Bloggs"]);
					ObjectModel.dump("min");
		            expect(ObjectModel.list).toBeNull();
				});
				it("returns <undefined>", function() {
					expect(ObjectModel.dump()).toBeUndefined();
				});
			});
			
			describe("ObjectModel.dump(params) -> params = false<boolean>", function() {
				it("removes the instance from the Model instances collection", function() {
					var _index = ObjectModel.index;
					expect(NewModel.inst[_index]).toBe(ObjectModel);
					ObjectModel.dump(false);
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectModel.dump(false);
					expect(ObjectModel.dumped).toBeTruthy();
				});
				it("resets all methods to return error", function() {
					ObjectModel.dump(false);
					expect(ObjectModel.load).not.toBeNull();
		            expect(ObjectModel.filter).not.toBeNull();
		            expect(ObjectModel.clean).not.toBeNull();
		            expect(ObjectModel.dump).not.toBeNull();
					expect(function(){return ObjectModel.load();}).toThrow();
		            expect(function(){return ObjectModel.filter();}).toThrow();
		            expect(function(){return ObjectModel.clean();}).toThrow();
		            expect(function(){return ObjectModel.dump();}).toThrow();
				});
				it("maintains value for property \"list\"", function() {
					var _list = ["Joe","Bloggs"];
					ObjectModel.load(_list);
					ObjectModel.dump(false);
		            expect(ObjectModel.list).toBe(_list);
				});
				it("returns <undefined>", function() {
					expect(ObjectModel.dump()).toBeUndefined();
				});
			});
			
			describe("var ObjectModel = new NewModel(params) -> Options<object>", function() {
	        	it("Options.list<array||object> -> passing \"list\" in the Options the Model the instance is created with the list pre-loaded", function() {
					var _list = ["item","item","item","item"];
		        	ObjectModel = new NewModel({"list":_list});
		        	expect(ObjectModel.list).toBe(_list);
		        	expect(ObjectModel.list).toEqual(jasmine.any(_list.constructor));
				});
			});
			
		});
		
		describe("Models Extension", function() {
			var NewModel
				, modelType
				, extension
			;
			
	        beforeEach(function(){
	        	modelType = "newmodel";
				extension = {"newFn":function(){}};
	        	NewModel = new kb.setModel(modelType);
	        });
	        
	        afterEach(function(){
	        	NewModel = kb.stopModel("newmodel",true,"max");
	        });
	        
			describe("kb.extendModel(params) -> params = ModelType<string>, Extension<object>", function() {
				
				
				it("adds functionalities to the existing Model", function() {
		           kb.extendModel(modelType,extension);
		           for (var prop in extension) expect(NewModel.prototype.hasOwnProperty(prop)).toBeTruthy();
		        });
		        it("overwrites extended functionalities", function() {
		           kb.extendModel(modelType,extension);
		           for (var prop in extension) expect(NewModel.prototype.hasOwnProperty(prop)).toBeTruthy();
		           var new_extension = kb.clone(extension);
		           for (var prop in extension) new_extension[prop] = "overwritten";
		           kb.extendModel(modelType,new_extension);
		           for (var prop in extension) {
		           		expect(NewModel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(NewModel.prototype[prop]).toBe(new_extension[prop]);
		           }
		        });
		        it("allows new instances of the Model to apply the extension", function() {
		           kb.extendModel(modelType,extension);
		           var ObjectModel = new NewModel();
		           for (var prop in extension) expect(ObjectModel[prop]).toBe(extension[prop]);	
		        });
		        it("allows previous instances of the Model to also apply the extension", function() {
		           var ObjectModel = new NewModel();
		           kb.extendModel(modelType,extension);
		           for (var prop in extension) expect(ObjectModel[prop]).toBe(extension[prop]);	
		        });
		        it("overwrites instances applied functionalities", function() {
		           var ObjectModel = new NewModel();
		           kb.extendModel(modelType,extension);
		           for (var prop in extension) expect(NewModel.prototype.hasOwnProperty(prop)).toBeTruthy();
		           for (var prop in extension) expect(ObjectModel[prop]).toBe(extension[prop]);
		           var new_extension = kb.clone(extension);
		           for (var prop in extension) new_extension[prop] = "overwritten";
		           kb.extendModel(modelType,new_extension);
		           for (var prop in extension) {
		           		expect(NewModel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(NewModel.prototype[prop]).toBe(new_extension[prop]);
		           		expect(ObjectModel[prop]).not.toBe(extension[prop]);
		           		expect(ObjectModel[prop]).toBe(new_extension[prop]);
		           }
		        });
		        it("does NOT overwrite any Model's native method", function() {
		           var ObjectModel = new NewModel();
		           extension = {"load":"overwrite","filter":"overwrite","clean":"overwrite","dump":"overwrite"};
		           kb.extendModel(modelType,extension);
		           for (var prop in extension) {
		           		expect(NewModel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(ObjectModel[prop]).not.toBe(extension[prop]);
		           		expect(ObjectModel[prop]).toBe(NewModel.prototype[prop]);
		           		
		           }
		        });
		        it("ObjectModel.dump(\"min\") -> extended properties are maintained", function() {
					var ObjectModel = new NewModel();
					var new_extension = kb.clone(extension);
					for (var prop in extension) new_extension[prop] = "overwritten";
		           	kb.extendModel(modelType,new_extension);
		           	ObjectModel.dump("min");
		           	for (var prop in new_extension) expect(ObjectModel[prop]).toBe(new_extension[prop]);
		        });
		        it("ObjectModel.dump(false) -> extended properties are maintained", function() {
					var ObjectModel = new NewModel();
					var new_extension = kb.clone(extension);
					for (var prop in extension) new_extension[prop] = "overwritten";
		           	kb.extendModel(modelType,new_extension);
		           	ObjectModel.dump(false);
		           	for (var prop in new_extension) expect(ObjectModel[prop]).toBe(new_extension[prop]);
		        });
			});
			describe("kb.unextendModel(params) -> params = ModelType<string>, ExtensionName<string>", function() {
				it("removes previously extended functionality from the existing Model", function() {
					kb.extendModel(modelType,extension);
					for (var prop in extension) expect(NewModel.prototype.hasOwnProperty(prop)).toBeTruthy();
					for (var prop in extension) {
						kb.unextendModel(modelType,prop);
						expect(NewModel.prototype.hasOwnProperty(prop)).toBeFalsy();
					}
		        });
		        it("forbid instances of the Model to access the unextend functionality", function() {
		           kb.extendModel(modelType,extension);
		           var ObjectModel = new NewModel();
		           for (var prop in extension) expect(ObjectModel[prop]).toBe(extension[prop]);
		           for (var prop in extension) {
						kb.unextendModel(modelType,prop);
						expect(ObjectModel[prop]).toBeUndefined();
					}	
		        });
		        it("does NOT unextend any Model's native methods", function() {
					var ObjectModel = new NewModel();
					extension = {"load":"overwrite","filter":"overwrite","clean":"overwrite","dump":"overwrite"};
					for (var prop in extension) {
						kb.unextendModel(modelType,prop);
						expect(prop in NewModel.prototype).toBeTruthy();
						expect(prop in ObjectModel).toBeTruthy();
						expect(ObjectModel[prop]).toBe(NewModel.prototype[prop]);	
		           	}
		        });
			});
		});

		describe("Stop Models", function() {
			var NewModel
				, modelType
				, extension
			;
			
	        beforeEach(function(){
	        	modelType = "newmodel";
				extension = {"newFn":function(){}};
	        	NewModel = new kb.setModel(modelType);
	        });
	        
			describe("kb.stopModel(params) -> params = ModelType<string>", function() {
				it("removes the Model from kb, it stops to extend/unextend",function(){
					var models = kb.getModel();
					expect(kb.stopModel(modelType)).toBeTruthy();
					expect(kb.getModel()).not.toBe(models);
					expect(kb.getModel(modelType)).toBeUndefined();
				});
				it("the Model and its instances can still operate, but not be dumped",function(){
					kb.stopModel(modelType);
					var 
						list = ["item1","item2","item3","item4"]
						, ObjectModel = new NewModel({list:list})
					;
					expect(ObjectModel.list).toBe(list);
					expect(ObjectModel.filter(function(i){return i==2;})[0]).toBe(list[2]);
					ObjectModel.clean();
					expect(ObjectModel.list).toBeEmpty(Array);
					expect(ObjectModel.templist).toBeEmpty(Array);
					expect(function(){ObjectModel.dump();}).toThrow();
				});
			});
			
			describe("kb.stopModel(params) -> params = ModelType<string>, Clean<boolean>", function() {
				it("dumps all Model instances when Clean is true<boolean>, default is false",function(){
					var 
						list = ["item1","item2","item3","item4"]
						, ObjectModel = new NewModel({list:list})
						, _index = ObjectModel.index
					;
					kb.stopModel(modelType,true);
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
					expect(ObjectModel.dumped).toBeTruthy();
					expect(ObjectModel.load).toBeNull();
					expect(ObjectModel.filter).toBeNull();
					expect(ObjectModel.clean).toBeNull();
					expect(ObjectModel.dump).toBeNull();
					expect(ObjectModel.type).toBeNull();
					expect(ObjectModel.list).toBeNull();
				});
			});
			
			describe("kb.stopModel(params) -> params = ModelType<string>, Clean<boolean>, Dump<string||boolean>", function() {
				it("kb.stopModel(ModelType<string>,true,\"min\") -> dumps stopped Model instances applying \"min\" dumping mode",function(){
					var 
						list = ["item1","item2","item3","item4"]
						, ObjectModel = new NewModel({list:list})
						, _index = ObjectModel.index
					;
					kb.stopModel(modelType,true,"min");
					
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
					expect(ObjectModel.dumped).toBeTruthy();
					expect(ObjectModel.load).not.toBeNull();
					expect(ObjectModel.filter).not.toBeNull();
					expect(ObjectModel.clean).not.toBeNull();
					expect(ObjectModel.dump).not.toBeNull();
					expect(function(){return ObjectModel.load();}).toThrow();
					expect(function(){return ObjectModel.filter();}).toThrow();
					expect(function(){return ObjectModel.clean();}).toThrow();
					expect(function(){return ObjectModel.dump();}).toThrow();
					expect(ObjectModel.list).toBeNull();
				});
			});
			
			describe("kb.stopModel(params) -> params = ModelType<string>, Clean<boolean>, Dump<string||boolean>", function() {
				it("kb.stopModel(ModelType<string>,true,false) -> dumps stopped Model instances applying false dumping mode",function(){
					var 
						list = ["item1","item2","item3","item4"]
						, ObjectModel = new NewModel({list:list})
						, _index = ObjectModel.index
					;
					kb.stopModel(modelType,true,false);
					
					expect(NewModel.inst[_index]).not.toBe(ObjectModel);
					expect(ObjectModel.dumped).toBeTruthy();
					expect(ObjectModel.load).not.toBeNull();
					expect(ObjectModel.filter).not.toBeNull();
					expect(ObjectModel.clean).not.toBeNull();
					expect(ObjectModel.dump).not.toBeNull();
					expect(function(){return ObjectModel.load();}).toThrow();
					expect(function(){return ObjectModel.filter();}).toThrow();
					expect(function(){return ObjectModel.clean();}).toThrow();
					expect(function(){return ObjectModel.dump();}).toThrow();
					expect(ObjectModel.list).not.toBeNull();
				});
			});
		});
	});
	
	describe("Working with Panels", function() {
		
		describe("Creation of Panels constructor", function() {
			
			describe("kb.setPanel(params) -> params = <undefined>)", function() {
				it("expecting at least 1 argument to be a string containing the Panel Type", function() {
		            var kbPanels = kb.getPanel()
		            	, NewPanel = new kb.setPanel();
		            expect(NewPanel.prototype).toBeUndefined();
		            expect(kb.getPanel()).toBe(kbPanels);
		        });	
			});

			describe("kb.setPanel(params) -> params = PanelType<string>)", function() {
				var NewPanel;
				
		        beforeEach(function(){
		        	NewPanel = new kb.setPanel("newpanel");
		        });
		        
		        afterEach(function(){
		        	NewPanel = kb.stopPanel("newpanel");
		        });
		    	
				it("sets Panel type", function() {
		            expect(NewPanel.prototype.type).toBe("newpanel");
		        });
		        it("sets Panel native methods", function() {
		            expect(NewPanel.prototype.dump).toEqual(jasmine.any(Function));
		        });
		        it("sets Panel native properties", function() {
		            expect(NewPanel.prototype.models).toEqual(undefined);
		        });
		        it("sets Panel instances collection", function() {
		            expect(NewPanel.inst).toBeEmpty(Object);
		        });
				it("news Panel added to kb", function() {
		            expect(NewPanel).toBe(kb.getPanel("newpanel"));
		        });
		        
			});
			
			describe("kb.setPanel(params) -> params = PanelType<string>, ModelTypes<array>", function() {
				var NewPanel,models;
				
				
		        beforeEach(function(){
		        	models = [(new kb.setModel("model1")).prototype.type,(new kb.setModel("model2")).prototype.type];
		        	NewPanel = new kb.setPanel("newpanel",models);
		        });
		        
		        afterEach(function(){
		        	NewPanel = kb.stopPanel("newpanel",true,"max");
		        	for (var i in models) if (models.hasOwnProperty(i)) kb.stopModel(models[i],true,"max");
		        });
		    	
		    	it("includes models into a new Panel", function() {
		            for (var i in models) if (models.hasOwnProperty(i)) expect(([""].concat(NewPanel.prototype.models).concat([""]).join()).indexOf(","+ models[i] +",")>=0).toBeTruthy();
		        });
			});
			
			describe("kb.setPanel(params) -> params = PanelType<string>, ModelTypes<array>, Extension<object>", function() {
				var NewPanel,models,extension;
				
				
		        beforeEach(function(){
		        	models = [(new kb.setModel("model1")).prototype.type,(new kb.setModel("model2")).prototype.type];
		        	extension = {"newFn":function(){}};
		        	NewPanel = new kb.setPanel("newpanel",models,extension);
		        });
		        
		        afterEach(function(){
		        	NewPanel = kb.stopPanel("newpanel",true,"max");
		        	for (var i in models) if (models.hasOwnProperty(i)) kb.stopModel(models[i],true,"max");
		        });
		    	
		    	it("adds extension functionalities to a new Panel", function() {
					for (var prop in extension) expect(NewPanel.prototype.hasOwnProperty(prop)).toBeTruthy();	
		        });
		        
	
			});
			
			describe("var NewPanel = kb.setPanel(\"newpanel\")", function() {
				var NewPanel,panelType;
				
		        beforeEach(function(){
		        	panelType = "newpanel";
		        	NewPanel = new kb.setPanel(panelType);
		        });
		        
		        afterEach(function(){
		        	NewPanel = kb.stopPanel(panelType,true,"max");
		        });
		        
				it("\"newpanel\" constructor is accessible using the NewPanel function", function() {
					expect(NewPanel).toBe(kb.getPanel(panelType));
				});
			});
			
			describe("new kb.setPanel(\"newpanel\")", function() {
				var panelType;
				
		        beforeEach(function(){
		        	panelType = "newmodel";
		        	kb.setPanel(panelType);
		        });
		        
		        afterEach(function(){
		        	kb.stopPanel(panelType,true,"max");
		        });
		        
				it("\"newpanel\" constructor is accessible using kb only", function() {
					expect(kb.getPanel(panelType).prototype.type).toBe(panelType);
				});
			});
		});
		
		describe("Search for existing Panels", function() {
			
			var NewPanel,panelType,extension;
				
	        beforeEach(function(){
	        	panelType = "newpanel";
	        	extension = {"newFn":function(){}};
	        	NewPanel = new kb.setPanel(panelType);
	        });
	        
	        afterEach(function(){
	        	NewPanel = kb.stopPanel(panelType,true,"max");
	        });
		        
			describe("kb.getPanel(params) -> params = <undefined>", function() {
				it("gets list of Panels", function() {
					expect(kb.getPanel()[panelType]).toBe(NewPanel);
				});
			});
			
			describe("kb.getPanel(params) -> params = PanelType<string>", function() {
				it("gets specific Panels", function() {
					expect(kb.getPanel(panelType)).toBe(NewPanel);
				});
			});
		});
		
		describe("Panel's Instance and native functionalities", function() {
			var NewPanel,panelType,models,ObjectPanel;
			
			beforeEach(function(){
	        	panelType = "newpanel";
	        	models = [(new kb.setModel("model1")).prototype.type,(new kb.setModel("model2")).prototype.type];
	        	NewPanel = new kb.setPanel(panelType,models);
	        	ObjectPanel = new NewPanel();
	        });
	        
	        afterEach(function(){
	        	NewPanel = kb.stopPanel(panelType,true,"max");
	        	for (var i in models) if (models.hasOwnProperty(i)) kb.stopModel(models[i],true,"max");
	        });
	        
	        describe("var ObjectPanel = new NewPanel()", function() {
	        	it("creates a Panel instance", function() {
					expect(ObjectPanel.type).toBe(NewPanel.prototype.type);
				});
				it("associates an ID", function() {
					expect(ObjectPanel.index).not.toBeNull();
					expect(ObjectPanel.index).not.toBeUndefined();
				});
				it("adds a reference of the instance to the Panel instances collection", function() {
					expect(NewPanel.inst[ObjectPanel.index]).toBe(ObjectPanel);
				});
	        	it("generates Models instances and populates ObjectPanel.models<object>", function() {
					for (var i in models) if (models.hasOwnProperty(i)) expect(kb.getModel(models[i]).inst[ObjectPanel.models[models[i]].index]).toBe(ObjectPanel.models[models[i]]);
				});
				it("applies \"dump\" functionality to the Panel instance", function() {
					var isConstructor = true;
					expect(ObjectPanel.dump).toBe(NewPanel.prototype.dump);
				});
			});
			
			describe("ObjectPanel.dump(params) -> params = \"max\"<string> || <undefined>", function() {
				
				it("removes the instance from the Panel instances collection", function() {
					var _index = ObjectPanel.index;
					expect(NewPanel.inst[_index]).toBe(ObjectPanel);
					ObjectPanel.dump();
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectPanel.dump();
					expect(ObjectPanel.dumped).toBeTruthy();
				});
				it("executes dump for Model instances in ObjectPanel.models passing (\"max\"||undefined)", function() {
					var _models = ObjectPanel.models;
					ObjectPanel.dump();
		            for (var i in _models) {
		            	expect(_models[i].dumped).toBeTruthy();
		            	expect(_models[i].load).toBeNull();
						expect(_models[i].filter).toBeNull();
						expect(_models[i].clean).toBeNull();
						expect(_models[i].dump).toBeNull();
						expect(_models[i].type).toBeNull();
						expect(_models[i].list).toBeNull();
		            }
				});
				it("resets all methods as null", function() {
					ObjectPanel.dump();
					expect(ObjectPanel.dump).toBeNull();
					
				});
				it("resets all properties as null", function() {
					ObjectPanel.dump();
		            expect(ObjectPanel.type).toBeNull();
		            expect(ObjectPanel.models).toBeNull();
				});
				it("returns <undefined>", function() {
					expect(ObjectPanel.dump()).toBeUndefined();
				});
			});
			
			describe("ObjectPanel.dump(params) -> params = \"min\"<string>", function() {
				it("removes the instance from the Panel instances collection", function() {
					var _index = ObjectPanel.index;
					expect(NewPanel.inst[_index]).toBe(ObjectPanel);
					ObjectPanel.dump("min");
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectPanel.dump("min");
					expect(ObjectPanel.dumped).toBeTruthy();
				});
				it("executes dump for Model instances in ObjectPanel.models passing (\"min\")", function() {
					var _models = ObjectPanel.models
					;
					ObjectPanel.dump("min");
		            for (var i in _models) {
		            	expect(_models[i].dumped).toBeTruthy();
		            	expect(_models[i].load).not.toBeNull();
						expect(_models[i].filter).not.toBeNull();
						expect(_models[i].clean).not.toBeNull();
						expect(_models[i].dump).not.toBeNull();
						expect(function(){return _models[i].load();}).toThrow();
						expect(function(){return _models[i].filter();}).toThrow();
						expect(function(){return _models[i].clean();}).toThrow();
						expect(function(){return _models[i].dump();}).toThrow();
						expect(_models[i].list).toBeNull();
		            }
				});
				it("resets all methods to return error", function() {
					ObjectPanel.dump("min");
		            expect(ObjectPanel.dump).not.toBeNull();
					expect(function(){return ObjectPanel.dump();}).toThrow();
				});
				it("resets only properties \"list\" as null", function() {
					ObjectPanel.dump("min");
		            expect(ObjectPanel.models).toBeNull();
				});
				it("returns <undefined>", function() {
					expect(ObjectPanel.dump()).toBeUndefined();
				});
			});
			
			describe("ObjectPanel.dump(params) -> params = false<boolean>", function() {
				it("removes the instance from the Panel instances collection", function() {
					var _index = ObjectPanel.index;
					expect(NewPanel.inst[_index]).toBe(ObjectPanel);
					ObjectPanel.dump(false);
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
				});
				it("sets \"dumped\" property as true<boolean>", function() {
					ObjectPanel.dump(false);
					expect(ObjectPanel.dumped).toBeTruthy();
				});
				it("executes dump for Model instances in ObjectPanel.models passing (false)", function() {
					var _models = ObjectPanel.models;
					ObjectPanel.dump(false);
		            for (var i in _models) {
		            	expect(_models[i].dumped).toBeTruthy();
		            	expect(_models[i].load).not.toBeNull();
						expect(_models[i].filter).not.toBeNull();
						expect(_models[i].clean).not.toBeNull();
						expect(_models[i].dump).not.toBeNull();
						expect(function(){return _models[i].load();}).toThrow();
						expect(function(){return _models[i].filter();}).toThrow();
						expect(function(){return _models[i].clean();}).toThrow();
						expect(function(){return _models[i].dump();}).toThrow();
						expect(_models[i].list).not.toBeNull();
		            }
				});
				it("resets all methods to return error", function() {
					ObjectPanel.dump(false);
					expect(ObjectPanel.dump).not.toBeNull();
					expect(function(){return ObjectPanel.dump();}).toThrow();
				});
				it("returns <undefined>", function() {
					expect(ObjectPanel.dump()).toBeUndefined();
				});
			});
		});
		
		
		
		
		
		
		
		
		
		describe("Panels Extension", function() {
			var NewPanel
				, panelType
				, extension
			;
			
	        beforeEach(function(){
	        	panelType = "newpanel";
				extension = {"newFn":function(){}};
	        	NewPanel = new kb.setPanel(panelType);
	        });
	        
	        afterEach(function(){
	        	NewPanel = kb.stopPanel(panelType,true,"max");
	        });
	        
	        describe("kb.extendPanel(params) -> params = PanelType<string>, Extension<object>", function() {
        		it("adds functionalities to the existing Panel", function() {
		           kb.extendPanel(panelType,extension);
		           for (var prop in extension) expect(NewPanel.prototype.hasOwnProperty(prop)).toBeTruthy();
		        });
		        it("overwrites extended functionalities", function() {
		           kb.extendPanel(panelType,extension);
		           for (var prop in extension) expect(NewPanel.prototype.hasOwnProperty(prop)).toBeTruthy();
		           var new_extension = kb.clone(extension);
		           for (var prop in extension) new_extension[prop] = "overwritten";
		           kb.extendPanel(panelType,new_extension);
		           for (var prop in extension) {
		           		expect(NewPanel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(NewPanel.prototype[prop]).toBe(new_extension[prop]);
		           }
		        });
		        it("allows new instances of the Panel to apply the extension", function() {
		           kb.extendPanel(panelType,extension);
		           var ObjectPanel = new NewPanel();
		           for (var prop in extension) expect(ObjectPanel[prop]).toBe(extension[prop]);	
		        });
		        it("allows previous instances of the Panel to also apply the extension", function() {
		           var ObjectPanel = new NewPanel();
		           kb.extendPanel(panelType,extension);
		           for (var prop in extension) expect(ObjectPanel[prop]).toBe(extension[prop]);	
		        });
		        it("overwrites instances applied functionalities", function() {
		           var ObjectPanel = new NewPanel();
		           kb.extendPanel(panelType,extension);
		           for (var prop in extension) expect(NewPanel.prototype.hasOwnProperty(prop)).toBeTruthy();
		           for (var prop in extension) expect(ObjectPanel[prop]).toBe(extension[prop]);
		           var new_extension = kb.clone(extension);
		           for (var prop in extension) new_extension[prop] = "overwritten";
		           kb.extendPanel(panelType,new_extension);
		           for (var prop in extension) {
		           		expect(NewPanel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(NewPanel.prototype[prop]).toBe(new_extension[prop]);
		           		expect(ObjectPanel[prop]).not.toBe(extension[prop]);
		           		expect(ObjectPanel[prop]).toBe(new_extension[prop]);
		           }
		        });
		        it("does NOT overwrite any Panel's native method", function() {
		           var ObjectPanel = new NewPanel();
		           extension = {"dump":"overwrite"};
		           kb.extendPanel(panelType,extension);
		           for (var prop in extension) {
		           		expect(NewPanel.prototype[prop]).not.toBe(extension[prop]);
		           		expect(ObjectPanel[prop]).not.toBe(extension[prop]);
		           		expect(ObjectPanel[prop]).toBe(NewPanel.prototype[prop]);
		           		
		           }
		        });
		        it("ObjectPanel.dump(\"min\") -> extended properties are maintained", function() {
					var ObjectPanel = new NewPanel();
					var new_extension = kb.clone(extension);
					for (var prop in extension) new_extension[prop] = "overwritten";
		           	kb.extendPanel(panelType,new_extension);
		           	ObjectPanel.dump("min");
		           	for (var prop in new_extension) expect(ObjectPanel[prop]).toBe(new_extension[prop]);
		        });
		        it("ObjectPanel.dump(false) -> extended properties are maintained", function() {
					var ObjectPanel = new NewPanel();
					var new_extension = kb.clone(extension);
					for (var prop in extension) new_extension[prop] = "overwritten";
		           	kb.extendPanel(panelType,new_extension);
		           	ObjectPanel.dump(false);
		           	for (var prop in new_extension) expect(ObjectPanel[prop]).toBe(new_extension[prop]);
		        });
        	});
        	
        	describe("kb.unextendPanel(params) -> params = PanelType<string>, ExtensionName<string>", function() {
				it("removes previously extended functionality from the existing Panel", function() {
					kb.extendPanel(panelType,extension);
					for (var prop in extension) expect(NewPanel.prototype.hasOwnProperty(prop)).toBeTruthy();
					for (var prop in extension) {
						kb.unextendPanel(panelType,prop);
						expect(NewPanel.prototype.hasOwnProperty(prop)).toBeFalsy();
					}
		        });
		        it("forbid instances of the Panel to access the unextend functionality", function() {
		           kb.extendPanel(panelType,extension);
		           var ObjectPanel = new NewPanel();
		           for (var prop in extension) expect(ObjectPanel[prop]).toBe(extension[prop]);
		           for (var prop in extension) {
						kb.unextendPanel(panelType,prop);
						expect(ObjectPanel[prop]).toBeUndefined();
					}	
		        });
		        it("does NOT unextend any Panel's native methods", function() {
					var ObjectPanel = new NewPanel();
					extension = {"dump":"overwrite"};
					for (var prop in extension) {
						kb.unextendPanel(panelType,prop);
						expect(prop in NewPanel.prototype).toBeTruthy();
						expect(prop in ObjectPanel).toBeTruthy();
						expect(ObjectPanel[prop]).toBe(NewPanel.prototype[prop]);	
		           	}
		        });
			});
			
        });
		
		describe("Stop Panels", function() {
			var NewPanel
				, panelType
				, models
				, extension
				
			;
			
	        beforeEach(function(){
	        	panelType = "newmodel";
				extension = {"newFn":function(){}};
				models = [(new kb.setModel("model1")).prototype.type,(new kb.setModel("model2")).prototype.type];
	        	NewPanel = new kb.setPanel(panelType,models);
	        });
	        
	        describe("kb.stopPanel(params) -> params = PanelType<string>", function() {
				it("removes the Panel from kb, it stops to extend/unextend",function(){
					var panels = kb.getPanel();
					expect(kb.stopPanel(panelType)).toBeTruthy();
					expect(kb.getPanel()).not.toBe(panels);
					expect(kb.getPanel(panelType)).toBeUndefined();
				});
				it("the Panel and its instances can still operate, but not be dumped",function(){
					kb.stopPanel(panelType);
					var list = ["item1","item2","item3","item4"]
						, ObjectPanel = new NewPanel()
					;
					for (var i in ObjectPanel.models) ObjectPanel.models[i].load(list);
					for (var i in ObjectPanel.models) expect(ObjectPanel.models[i].list).toBe(list);
					for (var i in ObjectPanel.models) ObjectPanel.models[i].clean();
					for (var i in ObjectPanel.models) expect(ObjectPanel.models[i].list).toBeEmpty(Array);
					expect(ObjectPanel.models).not.toBeEmpty(Object);
					expect(function(){ObjectPanel.dump();}).toThrow();
				});
				it("Model's instances included in the Panel cannot be dumped too",function(){
					kb.stopPanel(panelType);
					var ObjectPanel = new NewPanel();
					for (var i in ObjectPanel.models) expect(function(){ObjectPanel.dump();}).toThrow();
				});
			});
			
			describe("kb.stopPanel(params) -> params = PanelType<string>, Clean<boolean>", function() {
				it("dumps all Panel instances when Clean is true<boolean>, default is false",function(){
					var ObjectPanel = new NewPanel()
						, _index = ObjectPanel.index
					;
					kb.stopPanel(panelType,true);
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
					expect(ObjectPanel.dumped).toBeTruthy();
					expect(ObjectPanel.dump).toBeNull();
					expect(ObjectPanel.models).toBeNull();
				});
			});
			
			describe("kb.stopPanel(params) -> params = PanelType<string>, Clean<boolean>, Dump<string||boolean>", function() {
				it("kb.stopPanel(PanelType<string>,true,\"min\") -> dumps stopped Panel instances applying \"min\" dumping mode",function(){
					var ObjectPanel = new NewPanel()
						, _index = ObjectPanel.index
					;
					kb.stopPanel(panelType,true,"min");
					
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
					expect(ObjectPanel.dumped).toBeTruthy();
					expect(ObjectPanel.dump).not.toBeNull();
					expect(function(){return ObjectPanel.dump();}).toThrow();
					expect(ObjectPanel.models).toBeNull();
				});
			});
			
			describe("kb.stopPanel(params) -> params = PanelType<string>, Clean<boolean>, Dump<string||boolean>", function() {
				it("kb.stopPanel(PanelType<string>,true,false) -> dumps stopped Panel instances applying false dumping mode",function(){
					var ObjectPanel = new NewPanel()
						, _index = ObjectPanel.index
					;
					kb.stopPanel(panelType,true,false);
					expect(NewPanel.inst[_index]).not.toBe(ObjectPanel);
					expect(ObjectPanel.dumped).toBeTruthy();
					expect(ObjectPanel.dump).not.toBeNull();
					expect(function(){return ObjectPanel.dump();}).toThrow();
					expect(ObjectPanel.models).not.toBeNull();
					expect(ObjectPanel.models).not.toBeEmpty(Object);
				});
			});
			
		});
		
		
	});
});