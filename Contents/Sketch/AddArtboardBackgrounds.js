
/* 
This plugin adds shadows to artboards by drawing rectangles (with shadows) behind each of them.
Here are some planned updates:
1. Allow the user to customize the shadow, i.e x, y, blur, color. Currently does whatever Layer->Style->Add Shadow does
2. The approach used to set a shadow/lock layer is(clearly) a hack. Once I figure out the Sketch API for add shadow/lock I'll fix it.
3. I'm removing the user's current selection, to avoid any unintended interference. In the next update I'll avoid that.
4. I need to handle the case where the user has previously already added artboard shadows. 
*/

var addShadows = function(context) {

	var sketch = context.api();
	var document = sketch.selectedDocument;
	var page = document.selectedPage;

	//clearing the user's current selection. Sorry about this! 
	document.selectedLayers.clear();

	//creating a new group within the current page, to contain the backgrounds
	var group = page.newGroup({name: "ArtboardBackgrounds"});

	//moving this group below every other layer in the page, so as not to interfere with anything else
	group.moveToBack();

	//iterates through all the artboards
	page.iterateWithFilter("isArtboard", function(layer) {
		//creating rects
		var rect = new sketch.Rectangle(layer.frame.x, layer.frame.y, layer.frame.width, layer.frame.height);
		var shape = group.newShape({frame: rect, name: "bg" + layer.name, fills: ["#ffffff"]});
		shape.addToSelection();
		//adding background + locking rect
		performMenuActions(context, ["MSAddShadowAction", "MSLockLayerAction"]);
		shape.deselect();
	});
}

// A function that will perform a series of actions in sequence. The action should map to a menu item
function performMenuActions(context, actions)
{
	var doc = context.document;
	for(var i = 0;i < actions.length; i++) {
		var actionToPerform = doc.actionsController().actionForID(actions[i]);
		if(actionToPerform.validate()){
			actionToPerform.doPerformAction(null);
			actionToPerform.imageName = "Icon";
		}
		else
		{
			doc.showMessage("Couldn't perform action:" + actions[i]);
		}
	}
}