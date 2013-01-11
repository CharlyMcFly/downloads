/**
 * <pre>
 * Creates a new MindMapModel. 
 * 
 * This object represents the underlying mind map model and provides access 
 * to the document, the mind map and the currently selected node.
 * 
 * All changes to the mind map pass through this object, either through calling
 * methods directly or using the executeAction() method to perform NodeActions.
 * </pre>
 * 

 * @constructor
 * @param {mindmaps.EventBus} eventBus
 * @param {mindmaps.CommandRegistry} commandRegistry
 */

var kMAPA = "mapaModel";
var realDoc= null;

gapi.hangout.data.onStateChanged.add(onStateChange);

function onStateChange() {
  console.log("entró en onStateChange");
  //alert("entro a onStageChange");
  var existe = gapi.hangout.data.getValue('mapaModel');
  alert("modelo del mapa: "+mapaModel);
  if(existe){
    console.log("existe 12: " + existe);
    //cargaMapa(existe);
    //pintaMapa(existe);
    cargaMapa2(existe);
  }
};

  

function pintaMapa(json) {  
  //return mindmaps.Document.fromJSON(json);    
  //alert("JSON==101" + json);
  
  //cargaMapa(json);
  //mindmaps.Document.fromJSON = function(json) {
   
  doc = mindmaps.Document.fromJSON(json); //convertir la cadena JSON a objeto y mostrar el documento
  alert("Nose por que no pinto el mapa1"+json);
  this.document = doc;
  //alert("Nose por que no pinto el mapa2"+this.document);
  //
  
  //eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, mindmaps.Document.fromObject(doc));
  gapi.hangout.data.setValue("mapaModel","doc");
  //gapi.hangout.data.setValue("mapaModel","doc);
  alert("Nose por que no pinto el mapa3");
  
  //this.cargaMapa2(json);
  
};

//this.getDocument = function() {
	//alert("document");
  //  return this.document;
  //};

function cargaMapa(json){
//this.cargaMapa = function(){
//	alert("Entre a cargar mapa 0"+json);
	//var json = '{"id":"1d4ba05e-6d15-4923-88a2-23dc91f9f09b","title":"New Document","mindmap":{"root":{"id":"dea33add-4352-4fec-adfa-f71b12f57020","parentId":null,"text":{"caption":"Idea Principal","font":{"style":"normal","weight":"bold","decoration":"none","size":20,"color":"#000000"}},"offset":{"x":0,"y":0},"foldChildren":false,"branchColor":"#000000","children":[{"id":"fc30c175-854a-4b8c-abbc-7b851b74a44b","parentId":"dea33add-4352-4fec-adfa-f71b12f57020","text":{"caption":"Concepto","font":{"style":"normal","weight":"normal","decoration":"none","size":15,"color":"#000000"}},"offset":{"x":-133,"y":124},"foldChildren":false,"branchColor":"#cb13ef","children":[{"id":"def37363-5d4f-4fef-8289-df61fbbdcb47","parentId":"fc30c175-854a-4b8c-abbc-7b851b74a44b","text":{"caption":"Concepto","font":{"style":"normal","weight":"normal","decoration":"none","size":15,"color":"#000000"}},"offset":{"x":-102,"y":-34},"foldChildren":false,"branchColor":"#cb13ef","children":[{"id":"6255a910-b2b4-40a8-9044-bb5b05e38373","parentId":"def37363-5d4f-4fef-8289-df61fbbdcb47","text":{"caption":"Concepto","font":{"style":"normal","weight":"normal","decoration":"none","size":15,"color":"#000000"}},"offset":{"x":-101,"y":115},"foldChildren":false,"branchColor":"#cb13ef","children":[]}]}]}]}},"dates":{"created":1357753219805},"dimensions":{"x":4000,"y":2000},"autosave":false}';
  //function cargaMapa(json){
  //doc = this.document;
  //this.document = doc;
    doc = mindmaps.Document.fromJSON(json); //convertir la cadena JSON a objeto y mostrar el documento
  this.document = doc;
    if (doc) {
  //  	alert("Entre a cargar mapa 1"+doc);
    	///eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
      eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, doc);
    //  alert("Entre a cargar mapa 2"+doc);
    } else {
    //	alert("Entre a cargar mapa 3");
      eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
    }
  };
  
 function cargaMapa2(json){
  //this.getDocument = function() {
       //alert("document");
   //return this.document;
       alert("json2 " + json);
       realDoc = mindmaps.Document.fromJSON(json);
       
       //alert("realDoc " + realDoc);
       this.document = realDoc;
     if (realDoc) {
    	//alert("Entre a cargar mapa 1"+realDoc);
    	///eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
      eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, realDoc);
      alert("Pase por aqui");
      //gapi.hangout.data.setValue("realDoc");
      alert("Pase por aca");
      //alert("Entre a cargar mapa 2"+realDoc);
    } else {
    	//alert("Entre a cargar mapa 3");
      eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
    }
     //  return this.document;
     ///  alert("fin carga 2");
 };



/*function onStateChange() {
	console.log("entró en onStateChange");
	var existe = gapi.hangout.data.getValue('mapaModel');
	if(existe){
		console.log("existe: " + existe);
		pintaMapa(existe);
	}
};

gapi.hangout.data.onStateChanged.add(onStateChange);

function pintaMapa(json) {
	alert("json+++++" + json);
}

gapi.hangout.onApiReady.add(function(eventObj){
	try {
		if (eventObj.isApiReady) {
		console.log("entró en isApiReady");
		var existe = gapi.hangout.data.getValue('mapaModel');
		if(existe){
			console.log("existe: " + existe);
			pintaMapa(existe);
			
		}
		}
	}
	catch (e) {
	console.log(e.stack);
}
});*/




mindmaps.MindMapModel = function(eventBus, commandRegistry, undoController) {
  var self = this;  
  this.document = null;
  this.selectedNode = null;

  /**
   * Gets the current document.
   * 
   * @returns {mindmaps.Document} the current document.
   */
  this.getDocument = function() {
	//alert("document 9000");
	if (realDoc!=null)
		return realDoc;
	else 
		return this.document;
    //return this.document;
  };

  /**
   * Sets the current document and will publish a DOCUMENT_OPENED or
   * DOCUMENT_CLOSED event.
   * 
   * @param {mindmaps.Document} doc or pass null to close the document
   */
  this.setDocument = function(doc) {
  	
  /*	alert("ACDC"+doc);
  	if (json !=""){
  		cargaMapa2(json);
  	}
  	else{
  	*/
    	this.document = doc;
    		if (doc) {
      			eventBus.publish(mindmaps.Event.DOCUMENT_OPENED, doc);
    		} else {
      			eventBus.publish(mindmaps.Event.DOCUMENT_CLOSED);
		    }
  //	}
  };

  /**
   * Gets the current mind map associated with the document.
   * 
   * @returns {mindmaps.MindMap} the mind map or null
   */
  this.getMindMap = function() {
    if (this.document) {
      //return this.document.mindmap;
	  /*var doc = this.document;
	  var jsonString = doc.serialize();
	  //alert("json" + jsonString);*/
	  return this.document.mindmap;
    }
    return null;
  };
  
  /*this.obtenerJson = function() {
	var doc = this.document;
	var jsonString = doc.serialize();
	 alert("json " + jsonString);
  };*/

  /*function obtenerJson(){
	var doc = this.document;
	var jsonString = doc.serialize();
	 alert("json " + jsonString);
  }*/
  
  /**
   * Initialise.
   * 
   * @private
   */
  this.init = function() {
    var createNodeCommand = commandRegistry.get(mindmaps.CreateNodeCommand);
    createNodeCommand.setHandler(this.createNode.bind(this));

    var createSiblingNodeCommand = commandRegistry
        .get(mindmaps.CreateSiblingNodeCommand);
    createSiblingNodeCommand.setHandler(this.createSiblingNode.bind(this));

    var deleteNodeCommand = commandRegistry.get(mindmaps.DeleteNodeCommand);
    deleteNodeCommand.setHandler(this.deleteNode.bind(this));

    eventBus.subscribe(mindmaps.Event.DOCUMENT_CLOSED, function() {
      createNodeCommand.setEnabled(false);
      createSiblingNodeCommand.setEnabled(false);
      deleteNodeCommand.setEnabled(false);
    });

    eventBus.subscribe(mindmaps.Event.DOCUMENT_OPENED, function() {
      createNodeCommand.setEnabled(true);
      createSiblingNodeCommand.setEnabled(true);
      deleteNodeCommand.setEnabled(true);
    });
  };

  /**
   * Deletes a node or the currently selected one if no argument is passed.
   * 
   * @param {mindmaps.Node} [node] defaults to currently selected.
   */
  this.deleteNode = function(node) {
    if (!node) {
      node = this.selectedNode;
    }
    var map = this.getMindMap();
    var action = new mindmaps.action.DeleteNodeAction(node, map);
    this.executeAction(action);
  };

  /**
   * Attaches a new node the mind map. If invoked without arguments, it will
   * add a new child to the selected node with an automatically generated
   * position.
   * 
   * @param {mindmaps.Node} node the new node
   * @param {mindmaps.Node} parent
   */
  this.createNode = function(node, parent) {
	//alert("agrega nodo al mapa");
    var map = this.getMindMap();
    if (!(node && parent)) {
      parent = this.selectedNode;
      var action = new mindmaps.action.CreateAutoPositionedNodeAction(
          parent, map);
    } else {
      var action = new mindmaps.action.CreateNodeAction(node, parent, map);
    }

    this.executeAction(action);
	//obtener documento y serializarlo para obtener un json
	var doc = this.document;
	var jsonString = doc.serialize();
	alert("json " + jsonString);
  gapi.hangout.data.setValue(kMAPA, jsonString);
  };

  /**
   * Creates a new auto positioned node as a sibling to the current selected
   * node.
   */
  this.createSiblingNode = function() {
    var map = this.getMindMap();
    var selected = this.selectedNode;
    var parent = selected.getParent();

    // root nodes dont have a parent
    if (parent === null) {
      return;
    }

    var action = new mindmaps.action.CreateAutoPositionedNodeAction(parent,
        map);
    this.executeAction(action);
  };

  /**
   * Sets the node as the currently selected.
   * 
   * @param {mindmaps.Node} node
   */
  this.selectNode = function(node) {
    if (node === this.selectedNode) {
      return;
    }

    var oldSelected = this.selectedNode;
    this.selectedNode = node;
    eventBus.publish(mindmaps.Event.NODE_SELECTED, node, oldSelected);
  };

  /**
   * Changes the caption for the passed node or for the selected one if node
   * is null.
   * 
   * @param {mindmaps.Node} node
   * @param {String} caption
   */
  this.changeNodeCaption = function(node, caption) {
    if (!node) {
      node = this.selectedNode;
    }

    var action = new mindmaps.action.ChangeNodeCaptionAction(node, caption);
    this.executeAction(action);
  };

  /**
   * Executes a node action. An executed action might raise an event over the
   * event bus and cause an undo event to be emitted via
   * MindMapModel#undoAction.
   * 
   * @param {mindmaps.Action} action
   */
  this.executeAction = function(action) {
    // a composite action consists of multiple actions which are
    // processed individually.
    if (action instanceof mindmaps.action.CompositeAction) {
      var execute = this.executeAction.bind(this);
      action.forEachAction(execute);
      return;
    }

    var executed = action.execute();

    // cancel action if false was returned
    if (executed !== undefined && !executed) {
      return false;
    }

    // publish event
    if (action.event) {
      if (!Array.isArray(action.event)) {
        action.event = [ action.event ];
      }
      eventBus.publish.apply(eventBus, action.event);
    }

    // register undo function if available
    if (action.undo) {
      var undoFunc = function() {
        self.executeAction(action.undo());
      };

      // register redo function
      if (action.redo) {
        var redoFunc = function() {
          self.executeAction(action.redo());
        };
      }

      undoController.addUndo(undoFunc, redoFunc);
    }
  };

  /**
   * Saves a document to the localstorage and publishes DOCUMENT_SAVED event on success.
   *
   * @returns {Boolean} whether the save was successful.
   */
  this.saveToLocalStorage = function() {
    var doc = this.document.prepareSave();
    var success = mindmaps.LocalDocumentStorage.saveDocument(doc);
    if (success) {
      eventBus.publish(mindmaps.Event.DOCUMENT_SAVED, doc);
    }

    return success;
  }

  this.init();
};
