/*
 *********************************************
 ***** TreeView created by Andrew Gerst ******
 *********************************************
 */

function addEvent(obj, type, fn){
	if (obj.attachEvent) {
		obj['e'+type+fn] = fn;
		obj[type+fn] = function(){obj['e'+type+fn](window.event);}
		obj.attachEvent('on'+type, obj[type+fn]);
	} else {
		obj.addEventListener(type, fn, false);
	}
}

function removeEvent(obj, type, fn){
	if (obj.detachEvent) {
		obj.detachEvent('on'+type, obj[type+fn]);
		obj[type+fn] = null;
	} else {
		obj.removeEventListener(type, fn, false);
	}
}

var Node = function(){
	this.id = 0;
	this.text = "";
	this.open = false;
	this.parent = null;
	this.children = [];
};

Node.prototype.open = function(){
	this.open = !this.open;
	// TODO: manipulate DOM
	document.getElementById('node_' + this.id).getElementsByClassName('.children').hide();
};

Node.prototype.collapse = function(){
	this.open = false;
	// TODO: manipulate DOM
};

Node.prototype.rename = function(text){
	this.text = text;
	// TODO: manipulate DOM
};

Node.prototype.delete = function(){
	this.parent.children = this.parent.children.slice(this.parent.children.indexOf(this), 1);
	// TODO: manipulate DOM
};

Node.prototype.setParent = function(node){
	this.parent = node;
};

Node.prototype.addFolder = function(){
	var node = new Node();
	node.setParent(this);
	//this.children[] = node;
};

Node.prototype.addChild = function(){
	var node = new Node();
	node.setParent(this);
	//this.children[] = node;
};

var TreeView = function(){
	this.selector = "";
	this.nodes = [];
	this.tree = [];
	this.output = [];

	this.config = function(selector){
		this.selector = selector;
		this.attachHandlers();
		return this;
	};

	this.run = function(){
		//this.parseData();
		this.printTree();
	};
};

TreeView.prototype.setData = function(data){
	this.nodes = data || [];
	return this;
};

TreeView.prototype.updateData = function(data){
	if (data) {
		this.output.length = 0;
		if (typeof data == "object") {
			this.nodes = data;
		} else if (typeof data == "string") {
			this.nodes = JSON.parse(data);
		}
		this.run();
	}
};

TreeView.prototype.getNodes = function(){
	return this.nodes;
};

TreeView.prototype.printTree = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.output.join('');
};

TreeView.prototype.attachHandlers = function(){
	var $div = $(this.selector), self = this;

	$div.on('click', '.folder i', function(){
		$(this).parent().toggleClass('open');
	});

	$div.on('contextmenu', 'li', function(){
		/*
		if ($(this).hasClass('folder')) {

		} else {

		}
		*/



		return false;
	});
};
