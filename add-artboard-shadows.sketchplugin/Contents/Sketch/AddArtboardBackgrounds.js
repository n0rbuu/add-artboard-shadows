@import 'common.js'

const const_artboardClassName = "MSArtboardGroup";
const const_shadowGroupName = "Artboard Shadows";
const const_groupClassName = "MSLayerGroup";

var onRun = function(context) {
	var doc = context.document;
	var page = doc.currentPage();

	if(doesLayerExist(page, const_shadowGroupName, const_groupClassName)) {
		// won't create a group if it already exists
		doc.showMessage("Shadows group already exists. Delete and run again.");
	}
	else {
		//creating a new group of shadow rectangles, behind the artboards
		var shadowsGroup = MSLayerGroup.new();
		shadowsGroup.setName(const_shadowGroupName);
		createRects(page, shadowsGroup);
		moveLayerToBackOfPage(context.api(),const_shadowGroupName);
	}
}

function createRects(page, group) {
	var layers = page.layers();
	for(var i = 0; i < layers.length; i++) {
		var layer = layers[i];
		if(layer.class() == const_artboardClassName) {
			createRect(group, layer);
		}
	}
	page.addLayer(group);
}

// creating a rectangle of the same size as the artboard, colored white, and with a default shadow
function createRect(group, artboard) {
	var rect = MSRectangleShape.alloc().init();
	var frame = artboard.frame();
	rect.frame = MSRect.rectWithRect(NSMakeRect(frame.x(),frame.y(), frame.width(), frame.height()));

	var shapeGroup=MSShapeGroup.shapeWithPath(rect);
	shapeGroup.setName("Background:" + artboard.name());

	setFillStyle(shapeGroup);
	setShadowStyle(shapeGroup);
	group.addLayer(shapeGroup);

	shapeGroup.setIsLocked(true);
}

