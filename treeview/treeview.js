/*
 *********************************************
 ***** TreeView created by Andrew Gerst ******
 *********************************************
 */

function getTimestampPHP(){
	return Date.now && window.parseInt(Date.now() / 1E3, 10) || window.parseInt(+new Date / 1E3, 10);
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Menu = function(selector){
	this.selector = selector + '_menu';
	this.x = 0;
	this.y = 0;
	this.root = false;
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
	html.push('<i class="fa fa-level-up"></i>');
	html.push('<span class="editnode"><span class="text">Edit Node</span><input class="nodetext" type="text"></span>');
	html.push('<span class="editfactory"><span class="text">Edit Factory</span><input class="factorytext" type="text">');
	html.push('<input class="rangemin" type="number" min="0"><input class="rangemax" type="number" min="0"></span>');
	html.push('<i class="fa fa-thumbs-up fa-2x"></i><i class="fa fa-thumbs-down fa-2x"></i>');
	html.push('</div>');
	html.push('<div class="add">');
	html.push('<i class="fa fa-level-up"></i>');
	html.push('<span class="addnode"><span class="text">Add Node</span><input class="nodetext" type="text"></span>');
	html.push('<span class="addfactory"><span class="text">Add Factory</span><input class="factorytext" type="text">');
	html.push('<input class="rangemin" type="number" min="0" placeholder="Min"><input class="rangemax" type="number" min="0" placeholder="Max"></span>');
	html.push('<i class="fa fa-thumbs-up fa-2x"></i><i class="fa fa-thumbs-down fa-2x"></i>');
	html.push('</div>');
	html.push('<div class="random">');
	html.push('<i class="fa fa-level-up"></i><span class="text">Random <output class="rangeoutput" for="randomnumbers">10</output></span>');
	html.push('<input type="range" name="randomnumbers" min="1" max="15" value="10">');
	html.push('<i class="fa fa-thumbs-up fa-2x"></i><i class="fa fa-thumbs-down fa-2x"></i>');
	html.push('</div>');
	html.push('<div class="delete">');
	html.push('<i class="fa fa-level-up"></i><span class="text">Confirm Delete</span><i class="fa fa-thumbs-up fa-2x"></i><i class="fa fa-thumbs-down fa-2x"></i>');
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

Menu.prototype.setRoot = function(){
	this.root = true;
	$(this.selector).addClass('root');
};

Menu.prototype.unsetRoot = function(){
	this.root = false;
	$(this.selector).removeClass('root');
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
	this.unsetRoot();
	this.unsetFolder();
	this.resetClass();
	this.panel = "";
	$(this.selector).find('.rangeoutput').text('10').end().find('.random input').val('10');
};

Menu.prototype.populate = function(node){
	// TODO: Populate Input Values
	console.log(node);
};

Menu.prototype.showPanel = function(id){
	this.panel = id;
	$(this.selector).addClass(id);
	if (!this.folder) {
		$(this.selector).addClass('node');
	}
};

Menu.prototype.hidePanel = function(){
	$(this.selector).removeClass(this.panel);
};

Menu.prototype.methods = {
	// TODO: Call Node Functions
	rename: function(){
		alert('rename');
	},
	add: function(){
		alert('add');
	},
	random: function(){
		alert('random');
	},
	delete: function(){
		alert('delete');
	}
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
	//this.tree.updateDatabase(this);
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
	// TODO: Tree.createNode();
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

Node.prototype.getChildren = function(){
	this.tree.childrenIDs.length = 0;
	this.recurseChildren();
	return this.tree.childrenIDs;
};

Node.prototype.recurseChildren = function(){
	_this = this;
	$.each(this.children, function(i, v){
		_this.tree.childrenIDs.push(v.id);
		v.folder && v.recurseChildren();
	});
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
	this.childrenIDs = [];
	this.nodeID = 0;

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
	// TODO: Send to server and receive new node with node id.
};

TreeView.prototype.printTree = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.root.getHTML().join('');
};

TreeView.prototype.appendMenu = function(){
	$(this.selector).append(this.menu.getHTML().join(''));
};

TreeView.prototype.attachHandlers = function(){
	var $div = $(this.selector), _this = this;

	$div.on('click', 'li', function(e){
		_this.menu.hide();
	});

	$div.on('click', '.folder > i', function(){
		_this.nodeID = $(this).parent().attr('id').slice(5);
		if (_this.getNode(_this.nodeID).hasChildren()) {
			_this.getNode(_this.nodeID).toggle();
		}
	});

	$div.on('contextmenu', 'li', function(e){
		_this.nodeID = $(this).attr('id').slice(5);
		if (_this.getNode(_this.nodeID).folder) {
			_this.menu.setFolder();
			if (_this.getNode(_this.nodeID).parent.id === 0) {
				_this.menu.setRoot();
			}
		}
		_this.menu.setPosition(e.clientX, e.clientY).show();
		return false;
	});

	$div.on('mouseleave', this.menu.selector, function(){
		_this.menu.reset();
	});

	$div.on('click', this.menu.selector + ' .treemenubuttons > i', function(){
		if ($(this).attr('id') === "rename") {
			_this.menu.populate(_this.getNode(_this.nodeID));
		}
		_this.menu.showPanel($(this).attr('id'));
	});

	$div.on('click', this.menu.selector + ' .treemenucontent i', function(){
		if ($(this).hasClass('fa-level-up')) {
			_this.menu.hidePanel();
		} else if ($(this).hasClass('fa-thumbs-up')) {
			_this.menu.methods[_this.menu.panel] && _this.menu.methods[_this.menu.panel]();
		} else if ($(this).hasClass('fa-thumbs-down')) {
			_this.menu.reset();
		}
	});

	$div.on('change', this.menu.selector + '.random input', function(){
		$(this).parent().find('.rangeoutput').text($(this).val());
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

TreeView.prototype.updateDatabase = function(data){
	// TODO: Define Interface
	$.post('ajax.php', {/*action: 'update', */data: data}, function(response){
		alert('Updated');
	});
};
