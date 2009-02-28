(function($) {
  $.fn.sprightlyField = function(selectors, clearFields) {
		// If the jquery object doesn't exist on the current page, then don't do anything
		if (this.length > 0){
			/////// Override and extend defaults ///////////////////////////////////
			//var clearFields = $.extend({}, $.fn.sprightlyField.clearFields, clearFields);
			selectors = $.extend({}, $.fn.sprightlyField.selectors, selectors);
	
			var observer = this;
			updateFormForValue(observer.fieldValue()[0], selectors);
			// Whenever our observer changes, update the form
			$(observer).change(function () {
				//TODO: need to add field clearing here if clearFields is set to true
				if (clearFields == true){}
				updateFormForValue(observer.fieldValue()[0], selectors);
			});	    
		}
		return this;// return jquery object
  };

	function showFieldsFor(identifier, selectors) {
		// do not update the fields if the identifier is "doNothing" such as default : "doNothing"
		if (identifier == "doNothing"){ return; }
		
		// For every dynamicField in the form, check to see our identifier fields include this dynamicField
		// If so, set the showthis flag to show the fields. If not, hide the fields contained within the identifier.
		dynamicFields(selectors).each(function(){
			var showThis = false;
			for (i=0; i < $(identifier).length; i++) {
				if ($(this)[0] == $(identifier)[i]) {showThis = true;}
			}
			if (showThis == true){$(this).show();}
			else {$(this).hide();}
		});
	}
	
	function updateFormForValue(value, selectors){
		// If the selectors object/hash responds to the value passed in,
		// send the selector defined by selectors[value]
		if (selectors[value] != undefined){
			showFieldsFor(selectors[value], selectors);
		}
		// If the value is blank, send the selector defined for selectorFor.blank
		else if (value == "" || value == undefined) {
			showFieldsFor(selectors["blank"], selectors);
		}
		// Else send the selector defined by selectorFor.default
		else {
			showFieldsFor(selectors["default"], selectors);
		}
	}
	
	//joins the selectors object to compile dynamic fields automatically
	function dynamicFields(selectors){
		selectorArray = [];
		for ( fieldValue in selectors){
			if(selectors[fieldValue] != "" && selectors[fieldValue] != "doNothing"){
				selectorArray.push(selectors[fieldValue]);
			}
		}
		return $(selectorArray.join(", "));
	};
	
	//////// Defaults ////////////////////////////////
  $.fn.sprightlyField.selectors = {
    "blank": '',
   	"default": ''
  };
	$.fn.sprightlyField.clearFields = false;
	
})(jQuery);