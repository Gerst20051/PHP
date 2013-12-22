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
	this.pid = 0;
	this.text = "";
	this.open = false;
	this.folder = true;
	this.parent = null;
	this.timestamp = 0;
	this.tree = null;
	this.children = {};

	this.config = function(options){
		for (var key in options) {
			this[key] = options[key];
		}
	};
};

Node.prototype.open = function(){
	this.open = !this.open;
	$('#node_' + this.id).toggleClass('open');
};

Node.prototype.collapse = function(){
	this.open = false;
	$('#node_' + this.id).toggleClass('open');
};

Node.prototype.rename = function(text){
	this.text = text;
	$('#node_' + this.id).children('.text').text(text);
};

Node.prototype.delete = function(){
	this.parent.removeNode(this.id);
	$('#node_' + this.id).remove();
};

Node.prototype.setParent = function(node){
	this.parent = node;
};

Node.prototype.addNode = function(node){
	if (!this.findNode(node.id, false)) {
		this.children['node_' + node.id] = node;
		this.tree.nodes['node_' + node.id] = node;
	}
};

Node.prototype.removeNode = function(id){
	delete this.children['node_' + id];
	delete this.tree.nodes['node_' + id];
};

Node.prototype.findNode = function(id, deep){
	var result = this.children['node_' + id], n;
	if (id === this.id) {
		return this;
	}
	if (!deep || result) {
		return result;
	}
	for (n in this.children) {
		result = this.children[n].findNode(id, deep);
		if (result) {
			return result;
		}
	}
};

Node.prototype.hasChildren = function(){
	return 0 < Object.keys(this.children).length;
};

Node.prototype.getHTML = function(){
	var html = [], node, n;
	if (0 < this.id) {
		html.push('<li id="node_' + this.id + '"');
		if (this.folder) {
			html.push(' class="folder');
			if (this.open) {
				html.push(' open');
			}
			html.push('"');
		}
		html.push('><i></i><div class="text">' + this.text + '</div>');
	}
	if (this.hasChildren()) {
		html.push('<ul>');
		for (n in this.children) {
			html = html.concat(this.children[n].getHTML());
		}
		html.push('</ul>');
	}
	if (0 < this.id) {
		html.push('</li>');
	}
	return html;
};

var TreeView = function(){
	this.selector = "";
	this.data = [];
	this.nodes = {};
	this.root = null;
	this.timestamp = 0;
	this.monitorIntervalID = 0;

	this.config = function(selector){
		this.selector = selector;
		this.attachHandlers();
		return this;
	};

	this.run = function(){
		this.timestamp = Date.now();
		this.parseData();
		this.printTree();
		//this.setMonitorInterval();
	};
};

TreeView.prototype.setData = function(data){
	this.data = data || [];
	return this;
};

TreeView.prototype.updateData = function(data){
	if (data) {
		if (typeof data == "object") {
			this.data = data;
		} else if (typeof data == "string") {
			this.data = JSON.parse(data);
		}
		this.run();
	}
};

TreeView.prototype.parseData = function(){
	var data = this.data, rootnode, nodedata, node, i;
	rootnode = new Node();
	rootnode.config({
		'open': true,
		'tree': this,
		'timestamp': Date.now()
	});
	this.root = rootnode;
	for (i in data) {
		nodedata = data[i];
		node = new Node();
		node.config({
			'id': nodedata.id,
			'pid': nodedata.pid,
			'text': nodedata.text,
			'open': (nodedata.open) ? true : false,
			'folder': (nodedata.folder) ? true : false,
			'parent': this.getNode(nodedata.pid),
			'timestamp': nodedata.timestamp,
			'tree': this
		});
		this.nodes['node_' + nodedata.id] = node;
		this.root.findNode(nodedata.pid, true).addNode(node);
	}
};

TreeView.prototype.getData = function(){
	return this.data;
};

TreeView.prototype.getNodes = function(){
	return this.nodes;
};

TreeView.prototype.getNode = function(id){
	return this.root.findNode(id, true);
};

TreeView.prototype.printTree = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.root.getHTML().join('');
};

TreeView.prototype.attachHandlers = function(){
	var $div = $(this.selector), self = this, id;

	$div.on('click', '.folder i', function(){
		id = $(this).parent().attr('id').slice(5);
		$(this).parent().toggleClass('open');
	});

	$div.on('contextmenu', 'li', function(){
		id = $(this).attr('id').slice(5);
		/*
		if ($(this).hasClass('folder')) {

		} else {

		}
		*/



		return false;
	});
};

TreeView.prototype.setMonitorInterval = function(){
	this.monitorIntervalID = setInterval(this.monitorTree.bind(this), 5000);
};

TreeView.prototype.unsetMonitorInterval = function(){
	clearInterval(this.monitorIntervalID);
};

TreeView.prototype.monitorTree = function(){
	alert("Update Tree!");
};
