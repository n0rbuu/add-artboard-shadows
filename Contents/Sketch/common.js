// sets the layer color to white
function setFillStyle(layer) {
	var fill = layer.style().addStylePartOfType(0);
	fill.color = MSColor.colorWithRed_green_blue_alpha(255/255,255/255,255/255,1.0);
}

// adds a shadow with the standard sketch shadow parameters
function setShadowStyle(layer) {
	var shadow = layer.style().addStylePartOfType(2);

	// using the default shadow color provided by Sketch
	shadow.color = MSColor.colorWithRed_green_blue_alpha(0/255,0/255,0/255,0.5);
	shadow.setBlurRadius(4);
	shadow.setOffsetX(0);
	shadow.setOffsetY(2);
	shadow.setIsEnabled(true);
	shadow.setSpread(0);
}

// returns true if a layer exists on the page, given its name and type.
// Note: does not go through child groups
function doesLayerExist(page, layerName, layerClass) {
	var layers = page.layers(), layer;
	for(var i = 0; i < layers.length; i++) {
		layer = layers[i];
		if((layer.name() == layerName) && (layer.class() == layerClass)) {
			return true;
		}
	}
	return false;
}

// using the new API for this
function moveLayerToBackOfPage(sketchAPIObject, layerName) {
	sketchAPIObject.selectedDocument.selectedPage.iterateWithFilter("isGroup", function(layer) {
		if(layer.name == layerName) {
			layer.moveToBack();
		}
	});
}