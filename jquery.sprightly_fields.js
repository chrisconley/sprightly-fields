//separate showing/hiding jquery functions from managing the dynamic fields

var sf = {};
(function($) {
  $.fn.sprightlyFields = function(selectors, options) {
    //return error if jquery.form is not included?
		if (fieldExists(this)){
			initialize(this, selectors, options)
			$(sf.field).change(function () {
				updateFormForValue(sf.field_value, selectors);
			});	    
		}
		return this;
  };

	function updateFormForValue(value){
	  if (sf.options.clearFields == true){ 
	    $(":input", sf.dynamicFields).clearFields();
	  }
	  
		if (sf.selectors[value] != undefined){ 
		  showFieldsFor(sf.selectors[value]);
		}
		else if (value == "" || value == undefined) {
		  showFieldsFor(sf.selectors["blank"]);
		}
		else { showFieldsFor(sf.selectors["default"]); }
	}
	
	
	function showFieldsFor(identifier) {
		// do not update the fields if the identifier is "doNothing" such as default : "doNothing"
		if (identifier == "doNothing"){ return; }
		
		// For every dynamicField in the form, check to see our identifier fields include this dynamicField
		// If so, set the showthis flag to show the fields. If not, hide the fields contained within the identifier.
		
		//change this loop to delete the selector from the selectors array and create a new selector for jquery to use.
		sf.dynamicFields.each(function(){
			var showThis = false;
			for (i=0; i < $(identifier).length; i++) {
				if ($(this)[0] == $(identifier)[i]) {showThis = true;}
			}
			if (showThis == true){$(this).show();}
			else {$(this).hide();}
		});
	}

	//move these dynamic field function to their own class and rename
	function dynamicFields(){
		return $(dynamicFieldSelectorArray().join(", "));
	};
	
	function dynamicFieldSelectorArray(){
		selectorArray = [];
		for ( fieldValue in sf.selectors){
			if(sf.selectors[fieldValue] != "" && sf.selectors[fieldValue] != "doNothing"){
				selectorArray.push(sf.selectors[fieldValue]);
			}
		}
		return selectorArray;
	};
	
	//move to 
	function fieldExists(field){
	  if (field.length > 0){return true};
	};
	
	function initialize(field, selectors, options){
	  sf.options = $.extend({}, $.fn.sprightlyFields.options, options);
		sf.selectors = $.extend({}, $.fn.sprightlyFields.selectors, selectors);
		sf.dynamicFields = dynamicFields(selectors);
		sf.field = field;
		sf.field_value = field.fieldValue()[0];
		updateFormForValue(sf.field_value, sf.selectors);
	};
	
	//////// Defaults ////////////////////////////////
  $.fn.sprightlyFields.selectors = {
    "blank": '',
   	"default": ''
  };
	$.fn.sprightlyFields.options = {
		clearFields: false
	};
	
})(jQuery);