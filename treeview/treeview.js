/*
 *********************************************
 ***** TreeView created by Andrew Gerst ******
 *********************************************
 */

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

Menu.prototype.$ = function(){
	return $(this.selector);
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
	html.push('<span class="addnode"><span class="text">Add Node</span><input class="nodetext" type="text" placeholder="Name"></span>');
	html.push('<span class="addfactory"><span class="text">Add Factory</span><input class="factorytext" type="text" placeholder="Factory Name">');
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
	this.$().attr('class', 'treemenu');
};

Menu.prototype.setPosition = function(x, y){
	this.x = x;
	this.y = y;
	this.$().css({
		'left': this.x,
		'top': this.y
	});
	return this;
};

Menu.prototype.show = function(){
	this.isVisible = true;
	this.$().show();
};

Menu.prototype.hide = function(){
	this.isVisible = false;
	this.$().hide();
};

Menu.prototype.setRoot = function(){
	this.root = true;
	this.$().addClass('root');
};

Menu.prototype.unsetRoot = function(){
	this.root = false;
	this.$().removeClass('root');
};

Menu.prototype.setFolder = function(){
	this.folder = true;
	this.$().addClass('folder');
};

Menu.prototype.unsetFolder = function(){
	this.folder = false;
	this.$().removeClass('folder');
};

Menu.prototype.reset = function(){
	this.hide();
	this.unsetRoot();
	this.unsetFolder();
	this.resetClass();
	this.panel = "";
	this.$().find('.rangeoutput').text('10').end().find('.random input').val('10');
};

Menu.prototype.populate = function(node){
	var $span, textparts, text, range, min, max;
	if (this.folder && !this.root) {
		textparts = node.text.split(': (');
		text = textparts[0];
		range = textparts[1].replace(/[()]/g, '').split(':').map(Function.prototype.call, String.prototype.trim);
		min = range[0];
		max = range[1];
		$span = this.$().find('.rename .editfactory');
		$span.find('.factorytext').val(text);
		$span.find('.rangemin').val(min);
		$span.find('.rangemax').val(max);
	} else {
		$span = this.$().find('.rename .editnode');
		$span.find('.nodetext').val(node.text);
	}
};

Menu.prototype.showPanel = function(id){
	this.panel = id;
	this.$().addClass(id);
	if (!this.folder) {
		this.$().addClass('node');
	}
};

Menu.prototype.hidePanel = function(){
	this.$().removeClass(this.panel);
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

Node.prototype.getData = function(){
	return {
		'id': this.id,
		'pid': this.pid,
		'text': this.text,
		'open': (this.open) ? 1 : 0,
		'folder': (this.folder) ? 1 : 0,
		'timestamp': this.timestamp
	};
};

Node.prototype.getChildrenData = function(){
	var data = [], i;
	for (i in this.children) {
		data.push(this.children[i].getData());
	}
	return data;
};

Node.prototype.update = function(data){
	if (data.pid === -1) {
		this.delete();
	}
	this.text = data.text;
	this.open = (data.open) ? true : false;
	this.timestamp = data.timestamp;
	this.rename(this.text);
	if (this.open) {
		this.expand();
	} else {
		this.collapse();
	}
};

Node.prototype.$ = function(){
	return $('#node_' + this.id);
};

Node.prototype.toggle = function(){
	this.timestamp = this.tree.getTimestampPHP();
	this.open = !this.open;
	this.$().toggleClass('open');
	this.tree.updateDatabase([this.getData()]);
};

Node.prototype.expand = function(){
	this.$().addClass('open');
};

Node.prototype.collapse = function(){
	this.$().removeClass('open');
};

Node.prototype.rename = function(text){
	this.$().children('.text').text(text);
};

Node.prototype.addNode = function(node){
	if (!this.findNode(node.id, false)) {
		this.children[node.id] = node;
		this.tree.nodes[node.id] = node;
	}
};

Node.prototype.delete = function(){
	this.parent.deleteChild(this.id);
	this.$().remove();
};

Node.prototype.deleteChild = function(id){
	delete this.children[id];
	delete this.tree.nodes[id];
};

Node.prototype.deleteChildren = function(){
	var ids = this.getChildren(), i;
	for (i = ids.length; i--;) {
		this.tree.getNode(ids[i]).delete();
	}
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
	var _this = this;
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
	html.push('<ul>');
	if (this.hasChildren()) {
		for (n in this.children) {
			html = html.concat(this.children[n].getHTML());
		}
	}
	html.push('</ul>');
	if (0 < this.id) {
		html.push('</li>');
	}
	return html;
};

Node.prototype.menuMethods = {
	rename: function($div){
		var inputs = $div.find('input'), text, min, max;
		this.timestamp = this.tree.getTimestampPHP();
		if (this.folder && this.pid !== 0) {
			text = inputs.filter('.factorytext').val();
			min = inputs.filter('.rangemin').val();
			max = inputs.filter('.rangemax').val();
			this.text = text + ': (' + min + ':' + max + ')';
		} else {
			this.text = inputs.filter('.nodetext').val();
		}
		this.rename(this.text);
		this.tree.updateDatabase([this.getData()]);
	},
	add: function($div){
		var inputs = $div.find('input'), text, min, max, data = [], id;
		if (this.folder) {
			text = inputs.filter('.factorytext').val();
			min = inputs.filter('.rangemin').val();
			max = inputs.filter('.rangemax').val();
			text += ': (' + min + ':' + max + ')';
		} else {
			text = inputs.filter('.nodetext').val();
		}
		data.push({
			'pid': this.id,
			'text': text,
			'open': (this.folder) ? 1 : 0,
			'folder': (this.folder) ? 1 : 0,
			'timestamp': this.tree.getTimestampPHP()
		});
		this.tree.createNodes(data);
	},
	random: function($div){
		var _this = this, amount = $div.find('input').val(),
			textparts, range, min, max, children, id, ids, node, nodes = [], i;
		if (!this.folder || this.pid === 0) {
			return;
		}
		textparts = this.text.split(': (');
		console.log(textparts);
		range = textparts[1].replace(/[()]/g, '').split(':').map(Function.prototype.call, String.prototype.trim);
		min = +range[0];
		max = +range[1];
		if (this.hasChildren()) {
			children = [];
			ids = this.getChildren();
			for (i = ids.length; i--;) {
				node = this.tree.getNode(ids[i]);
				node.pid = -1;
				node.timestamp = this.tree.getTimestampPHP();
				children.push(node.getData());
			}
			this.deleteChildren();
			this.tree.updateDatabase(children);
		}
		for (i = 0; i < amount; i++) {
			nodes.push({
				'pid': this.id,
				'text': getRandomInt(min, max),
				'open': 0,
				'folder': 0,
				'timestamp': this.tree.getTimestampPHP()
			});
		}
		this.$().removeClass('empty');
		this.tree.createNodes(nodes);
	},
	delete: function($div){
		var data = [], ids, node, i;
		if (this.hasChildren()) {
			ids = this.getChildren();
			for (i = ids.length; i--;) {
				node = this.tree.getNode(ids[i]);
				node.pid = -1;
				node.timestamp = this.tree.getTimestampPHP();
				data.push(node.getData());
			}
			this.deleteChildren();
		}
		this.timestamp = this.tree.getTimestampPHP();
		this.pid = -1;
		data.push(this.getData());
		if (!this.parent.hasChildren()) {
			this.parent.$().addClass('empty');
		}
		this.delete();
		this.tree.updateDatabase(data);
	}
};

var TreeView = function(){
	this.selector = "";
	this.data = [];
	this.nodes = {};
	this.root = null;
	this.start = 0;
	this.timestamp = 0;
	this.monitorIntervalID = 0;
	this.menu = null;
	this.childrenIDs = [];
	this.nodeID = 0;
	this.forceUpdate = false;

	this.config = function(selector){
		this.selector = selector;
		this.menu = new Menu(selector);
		this.attachHandlers();
		return this;
	};

	this.run = function(){
		this.loadTimestamp();
		this.parseData();
		this.refresh();
		this.setMonitorInterval();
	};

	this.refresh = function(){
		this.printTree();
		this.appendMenu();
	};
};

TreeView.prototype.getTimestampPHP = function(){
	return this.start + performance.now() / 1E3 | 0;
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
		'timestamp': this.getTimestampPHP()
	});
	this.root = rootnode;
	for (i in data) {
		this.addNode(data[i]);
	}
};

TreeView.prototype.parseChanges = function(data){
	var refresh = false, i;
	for (i in data) {
		if (this.hasNode(data[i].id)) {
			this.getNode(data[i].id).update(data[i]);
		} else {
			this.addNode(data[i]);
			refresh = true;
		}
	}
	if (refresh === true) {
		this.refresh();
	}
};

TreeView.prototype.parseNodes = function(data, ids){
	var i;
	for (i in data) {
		data[i].id = ids[i];
		this.addNode(data[i]);
	}
	this.refresh();
};

TreeView.prototype.getNode = function(id){
	return this.root.findNode(id);
};

TreeView.prototype.hasNode = function(id){
	return !!this.root.findNode(id);
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

TreeView.prototype.printTree = function(){
	document.getElementById(this.selector.slice(1)).innerHTML = this.root.getHTML().join('');
};

TreeView.prototype.appendMenu = function(){
	$(this.selector).append(this.menu.getHTML().join(''));
};

TreeView.prototype.attachHandlers = function(){
	var $div = $(this.selector), _this = this, node;

	$div.on('click', 'li', function(e){
		_this.menu.hide();
	});

	$div.on('click', '.folder > i', function(){
		_this.nodeID = $(this).parent().attr('id').slice(5);
		node = _this.getNode(_this.nodeID);
		if (node.hasChildren()) {
			node.toggle();
		}
	});

	$div.on('contextmenu', 'li', function(e){
		_this.nodeID = $(this).attr('id').slice(5);
		node = _this.getNode(_this.nodeID);
		if (node.folder) {
			_this.menu.setFolder();
			if (node.pid === 0) {
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
		node = _this.getNode(_this.nodeID);
		if ($(this).attr('id') === "rename") {
			_this.menu.populate(node);
		}
		_this.menu.showPanel($(this).attr('id'));
	});

	$div.on('click', this.menu.selector + ' .treemenucontent i', function(){
		if ($(this).hasClass('fa-level-up')) {
			_this.menu.hidePanel();
		} else if ($(this).hasClass('fa-thumbs-up')) {
			node = _this.getNode(_this.nodeID);
			node.menuMethods[_this.menu.panel] && node.menuMethods[_this.menu.panel].call(node, $(this).closest('div'));
			_this.menu.reset();
		} else if ($(this).hasClass('fa-thumbs-down')) {
			_this.menu.reset();
		}
	});

	$div.on('change', this.menu.selector + '.random input', function(){
		$(this).parent().find('.rangeoutput').text($(this).val());
	});
};

TreeView.prototype.setMonitorInterval = function(){
	this.monitorIntervalID = setInterval(this.monitorTree.bind(this), 2000);
};

TreeView.prototype.unsetMonitorInterval = function(){
	clearInterval(this.monitorIntervalID);
};

TreeView.prototype.loadTimestamp = function(){
	var _this = this;
	$.getJSON('ajax.php', {'action': 'timestamp'}, function(response){
		if (response.time) {
			_this.start = response.time;
			_this.timestamp = _this.getTimestampPHP();
		}
	});
};

TreeView.prototype.monitorTree = function(){
	var _this = this;
	$.getJSON('ajax.php', {'action': 'ping', 'timestamp': this.timestamp}, function(response){
		if (response.nodes.length) {
			_this.timestamp = _this.getTimestampPHP();
			_this.parseChanges(response.nodes);
		}
	});
};

TreeView.prototype.createNodes = function(data){
	var _this = this;
	$.post('ajax.php', {action: 'create', nodes: data}, function(response){
		if (_this.forceUpdate === true) {
			_this.timestamp = _this.getTimestampPHP();
		}
		if (response.ids.length) {
			_this.parseNodes(data, response.ids);
		} else if (response.error === true) {
			console.log('Error Creating Nodes!');
		}
	});
};

TreeView.prototype.updateDatabase = function(data){
	var _this = this;
	$.post('ajax.php', {action: 'update', nodes: data}, function(response){
		if (_this.forceUpdate === true) {
			_this.timestamp = _this.getTimestampPHP();
		}
		if (response.error === true) {
			console.log('Error Updating Database!');
		}
	});
};
