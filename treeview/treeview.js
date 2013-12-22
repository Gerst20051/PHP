/*
 *********************************************
 ***** TreeView created by Andrew Gerst ******
 *********************************************
 */

function getTimestampPHP(){
	return Date.now && window.parseInt(Date.now() / 1000, 10) || window.parseInt(+new Date / 1000, 10);
}

var Menu = function(selector){
	this.selector = selector + '_menu';
	this.x = 0;
	this.y = 0;
	this.folder = false;
	this.isVisible = false;
	this.panel = "";
};

Menu.prototype.getHTML = function(){
	var html = [];
	html.push('<div id="' + this.selector.slice(1) + '" class="treemenu">');
	html.push('<div class="treemenubuttons">');
	html.push('<i id="rename" class="fa fa-pencil-square-o fa-2x"></i>');
	html.push('<i id="add" class="fa fa-plus-square-o fa-2x"></i>');
	html.push('<i id="random" class="fa fa-random fa-2x"></i>');
	html.push('<i id="delete" class="fa fa-trash-o fa-2x"></i>');
	html.push('</div>');
	html.push('<div class="treemenucontent">');
	html.push('<div class="rename">');
	html.push('Rename');
	html.push('</div>');
	html.push('<div class="add">');
	html.push('Add');
	html.push('</div>');
	html.push('<div class="random">');
	html.push('Random');
	html.push('</div>');
	html.push('<div class="delete">');
	html.push('Delete');
	html.push('</div>');
	html.push('</div>');
	html.push('</div>');
	return html;
};

Menu.prototype.resetClass = function(){
	$(this.selector).attr('class', 'treemenu');
};

Menu.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
	$(this.selector).css({
		'left': this.x,
		'top': this.y
	});
	return this;
};

Menu.prototype.show = function(){
	this.isVisible = true;
	$(this.selector).show();
};

Menu.prototype.hide = function(){
	this.isVisible = false;
	$(this.selector).hide();
};

Menu.prototype.setFolder = function(){
	this.folder = true;
	$(this.selector).addClass('folder');
};

Menu.prototype.unsetFolder = function(){
	this.folder = false;
	$(this.selector).removeClass('folder');
};

Menu.prototype.reset = function(){
	this.hide();
	this.unsetFolder();
	this.resetClass();
};

Menu.prototype.showPanel = function(id){
	this.resetClass();
	$(this.selector).addClass(id);
};

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

Node.prototype.toggle = function(){
	this.timestamp = getTimestampPHP();
	this.open = !this.open;
	$('#node_' + this.id).toggleClass('open');
	// TODO: Update Database
};

Node.prototype.expand = function(){
	this.timestamp = getTimestampPHP();
	this.open = true;
	$('#node_' + this.id).addClass('open');
	// TODO: Update Database
};

Node.prototype.collapse = function(){
	this.timestamp = getTimestampPHP();
	this.open = false;
	$('#node_' + this.id).removeClass('open');
	// TODO: Update Database
};

Node.prototype.rename = function(text){
	this.timestamp = getTimestampPHP();
	this.text = text;
	$('#node_' + this.id).children('.text').text(text);
	// TODO: Update Database
};

Node.prototype.delete = function(){
	this.timestamp = getTimestampPHP();
	this.parent.removeNode(this.id);
	$('#node_' + this.id).remove();
	// TODO: Update Database
	// SET pid TO -1
};

Node.prototype.addNode = function(node){
	if (!this.findNode(node.id, false)) {
		this.children[node.id] = node;
		this.tree.nodes[node.id] = node;
	}
	// TODO: Update Database
};

Node.prototype.removeNode = function(id){
	delete this.children[id];
	delete this.tree.nodes[id];
};

Node.prototype.findNode = function(id, shallow){
	var result = this.children[id], n;
	if (id === this.id) {
		return this;
	}
	if (shallow || result) {
		return result;
	}
	for (n in this.children) {
		result = this.children[n].findNode(id);
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
			if (!this.hasChildren()) {
				html.push(' empty');
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
	this.menu = null;

	this.config = function(selector){
		this.selector = selector;
		this.menu = new Menu(selector);
		this.attachHandlers();
		return this;
	};

	this.run = function(){
		this.timestamp = getTimestampPHP();
		this.parseData();
		this.refresh();
		this.setMonitorInterval();
	};

	this.refresh = function(){
		this.printTree();
		this.appendMenu();
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
	var data = this.data, rootnode, i;
	rootnode = new Node();
	rootnode.config({
		'open': true,
		'tree': this,
		'timestamp': getTimestampPHP()
	});
	this.root = rootnode;
	for (i in data) {
		this.addNode(data[i]);
	}
};

TreeView.prototype.parseChanges = function(data){
	for (var i in data) {
		// this.addNode(data[i]);
	}
};

TreeView.prototype.getNode = function(id){
	return this.root.findNode(id);
};

TreeView.prototype.addNode = function(data){
	var node = new Node();
	node.config({
		'id': data.id,
		'pid': data.pid,
		'text': data.text,
		'open': (data.open) ? true : false,
		'folder': (data.folder) ? true : false,
		'parent': this.getNode(data.pid),
		'timestamp': data.timestamp,
		'tree': this
	});
	this.nodes[data.id] = node;
	this.getNode(data.pid).addNode(node);
};

TreeView.prototype.createNode = function(){
	//this.timestamp = getTimestampPHP();
};

TreeView.prototype.printTree = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.root.getHTML().join('');
};

TreeView.prototype.appendMenu = function(){
	$(this.selector).append(this.menu.getHTML().join(''));
};

TreeView.prototype.attachHandlers = function(){
	var $div = $(this.selector), _this = this, id;

	$div.on('click', 'li', function(e){
		_this.menu.hide();
	});

	$div.on('click', '.folder > i', function(){
		id = $(this).parent().attr('id').slice(5);
		if (_this.getNode(id).hasChildren()) {
			_this.getNode(id).toggle();
		}
	});

	$div.on('contextmenu', 'li', function(e){
		id = $(this).attr('id').slice(5);
		if (_this.getNode(id).folder) {
			_this.menu.setFolder();
		}
		_this.menu.setPosition(e.clientX, e.clientY).show();
		return false;
	});

	$div.on('mouseleave', this.menu.selector, function(){
		_this.menu.reset();
	});

	$div.on('click', this.menu.selector + ' i', function(){
		var panelid = $(this).attr('id');
		_this.menu.showPanel(panelid);
	});
};

TreeView.prototype.setMonitorInterval = function(){
	this.monitorIntervalID = setInterval(this.monitorTree.bind(this), 5000);
};

TreeView.prototype.unsetMonitorInterval = function(){
	clearInterval(this.monitorIntervalID);
};

TreeView.prototype.monitorTree = function(){
	_this = this;
	$.getJSON('ajax.php', {'timestamp': this.timestamp}, function(data){
		_this.parseChanges(data);
		_this.timestamp = getTimestampPHP();
	});
};
