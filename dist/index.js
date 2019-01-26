'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var paginationTemplate = function paginationTemplate(item) {
	return '<li class="' + item.class + '"><a href="#!" onclick="' + item.function + '">' + item.num + '</a></li>';
};
var listItem = function listItem(product) {
	return '\n \t<li class="collection-item avatar z-depth-4 hoverable">\n     \t<img src="' + product.img + '" alt="" class="circle">\n     \t<span class="title">' + product.title + '</span>\n     \t<p>' + product.description + '</p>\n     \t<p>' + product.price + ' $</p>\n\t\t<a href="item.html?item=' + product._id + '" class="secondary-content" style="margin-top:15px">\n\t\t\tview detail<i class="material-icons right">visibility</i>\n\t\t</a>\n    </li>';
};

var signForm = '\n\t<div class="row">\n    \t<div class="col s8 offset-s2">\n    \t  <ul class="tabs">\n    \t    <li class="tab col s6"><a href="#test1">Register</a></li>\n    \t    <li class="tab col s6"><a class="active" href="#test2">Login</a></li>\n    \t  </ul>\n\t\t</div>\n\t\t<div id="test1" class="col s12">\n\t\t\t<form id="registerForm" class="col m8 offset-m2 s12"><br>\n\t\t\t\t<div class="modal-content">\n\t\t\t\t\t<h5>Register</h5><br>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<input id="email" type="email" class="validate">\n\t\t\t\t\t\t<label for="email">Email</label>\n\t\t\t\t\t\t<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<input id="pass" type="password" class="validate">\n\t\t\t\t\t\t<label for="pass">Password</label>\n\t\t\t\t\t\t<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<button class="btn waves-effect waves-red red  lighten-2" type="submit" name="action">\n\t\t\t\t\t\t\t<i class="material-icons right">send</i>Register\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n\t\t<div id="test2" class="col s12">\n\t\t\t<form id="loginForm" class="col m8 offset-m2 s12"><br>\n\t\t\t\t<div class="modal-content">\n\t\t\t\t\t<h5>Login</h5><br>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<input id="logemail" type="email" class="validate">\n\t\t\t\t\t\t<label for="logemail">Email</label>\n\t\t\t\t\t\t<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<input id="logpass" type="password" class="validate">\n\t\t\t\t\t\t<label for="logpass">Password</label>\n\t\t\t\t\t\t<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="input-field">\n\t\t\t\t\t\t<button class="btn waves-effect waves-red red  lighten-2" type="submit" name="action">\n\t\t\t\t\t\t\t<i class="material-icons right">send</i>Login\n\t\t\t\t\t\t</button>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</form>\n\t\t</div>\n  </div>';

var basket = function basket(count, summ) {
	return '\n\t\t<div class="center">\n\t\t  <p><a class="teal-text text-lighten-1" href="basket.html">Open cart</a></p>\n\t\t  <br>\n    \t  <span class="new red badge" data-badge-caption=" $">' + summ + '</span>\n    \t  <span class="new badge" data-badge-caption=" product">' + count + '</span>\n    \t</div>';
};

var listViews = function listViews(view) {
	return '\n\t\t<ul class="collection z-depth-4 hoverable">\n\t\t\t<li class="collection-item avatar z-depth-4 hoverable">\n    \t\t \t<img src="' + view.img + '" alt="' + view.title + '" class="circle">\n    \t\t \t<span class="title">' + view.title + '</span>\n    \t\t \t<p>' + view.price + ' $</p>\n\t\t\t\t<a href="item.html?item=' + view.id + '" class="secondary-content">\n\t\t\t\t\tview <i class="material-icons right">visibility</i>\n\t\t\t\t</a>\n    \t\t</li>\n\t\t</ul>\n\t';
};

var logoutUser = '<span class="right" onclick="onLogoutUser()">\n\t<i class="material-icons left">exit_to_app</i>Logout</span>';

var modal = void 0;
var user = void 0;
var pagination = void 0;
var orders = [];
var views = [];
var products = [];
var $apps = document.querySelector('#apps');
var $logout = document.querySelector('#userLogout');
var $pagination = document.querySelector('#pagination');
firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

var ProductApi = function () {
	function ProductApi() {
		_classCallCheck(this, ProductApi);
	}

	_createClass(ProductApi, null, [{
		key: 'fetchLimit',
		value: function fetchLimit() {
			return firebase.database().ref('products').once('value').then(function (_products) {
				var resultAds = [];
				var ads = _products.val();
				Object.keys(ads).forEach(function (key) {
					var ad = ads[key];
					resultAds.push({
						title: ad.title, description: ad.description, img: ad.img, price: ad.price, _id: key
					});
				});
				pagination = new Pagination(resultAds.length, 7, 0, 1, Math.ceil(resultAds.length / 7));
				renderPagination(pagination);
				products = resultAds;
				return resultAds.slice(pagination.current, pagination.limit);;
			});
		}
	}]);

	return ProductApi;
}();

var Auth = function () {
	function Auth() {
		_classCallCheck(this, Auth);
	}

	_createClass(Auth, null, [{
		key: 'login',
		value: function login(email, password) {
			firebase.auth().signInWithEmailAndPassword(email, password).then(function (resp) {
				user = new User(resp.user.uid);
				return true;
			}).catch(function (error) {
				setMessage(error.message, 'red');
				return false;
			});
		}
	}, {
		key: 'register',
		value: function register(email, password) {
			firebase.auth().createUserWithEmailAndPassword(email, password).then(function (resp) {
				user = new User(resp.user.uid);
				return true;
			}).catch(function (error) {
				setMessage(error.message, 'red');
				return false;
			});
		}
	}]);

	return Auth;
}();

var RecentlyView = function () {
	function RecentlyView() {
		_classCallCheck(this, RecentlyView);
	}

	_createClass(RecentlyView, null, [{
		key: 'reviewItem',
		value: function reviewItem(_product) {
			var _this = this;

			var viewItem = new View(_product.addId, _product.title, _product.price, _product.img);
			firebase.database().ref('/users/' + user.id + '/views').once('value').then(function (res) {
				var _views = res.val();
				var arrView = [];
				if (_views) {
					Object.keys(_views).forEach(function (key) {
						var obj = _views[key];
						if (obj.id === viewItem.id) _this.removeViewItem(user.id, key);
						arrView.push(new View(obj.id, obj.title, obj.price, obj.img));
					});
					if (arrView.length > 5) _this.removeViewItem(user.id, arrView[0].id);
				}
				_this.addViewItem(viewItem, user.id);
			});
		}
	}, {
		key: 'showViewItems',
		value: function showViewItems(uid) {
			firebase.database().ref('/users/' + uid + '/views').once('value').then(function (res) {
				var _views = res.val();
				views = [];
				if (_views) {
					Object.keys(_views).forEach(function (key) {
						var obj = _views[key];
						views.push(new View(obj.id, obj.title, obj.price, obj.img));
					});
					var $views = document.querySelector('#recentlyViews');
					$views.innerHTML = '<p class="flow-text center">Recently viewed</p>\n\t\t\t\t\t' + views.map(function (view) {
						return listViews(view);
					}).join(' ');
				}
			});
		}
	}, {
		key: 'removeViewItem',
		value: function removeViewItem(uid, id) {
			firebase.database().ref('/users/' + uid + '/views').child(id).remove();
		}
	}, {
		key: 'addViewItem',
		value: function addViewItem(viewItem, uid) {
			var _this2 = this;

			firebase.database().ref('/users/' + uid + '/views').push(viewItem).then(function () {
				_this2.showViewItems(user.id);
			});
		}
	}]);

	return RecentlyView;
}();

var User = function User(id) {
	_classCallCheck(this, User);

	this.id = id;
};

var View = function View(id, price, title, img) {
	_classCallCheck(this, View);

	this.id = id, this.title = title, this.price = price, this.img = img;
};

var Pagination = function Pagination(count, limit, current, currentPage, countPage) {
	_classCallCheck(this, Pagination);

	this.count = count;
	this.limit = limit;
	this.current = current;
	this.currentPage = currentPage;
	this.countPage = countPage;
};

document.addEventListener('DOMContentLoaded', function () {

	firebase.auth().onAuthStateChanged(function (_user) {
		if (_user) {
			user = new User(_user.uid);
			ProductApi.fetchLimit().then(function (_products) {
				renderProducts(_products);
				RecentlyView.showViewItems(user.id);
				updateBasket(user.id);
				$logout.innerHTML = logoutUser;
			});
		} else {
			$apps.innerHTML = signForm;
			var $tabs = document.querySelector('.tabs');
			M.Tabs.init($tabs);
			document.querySelector('#registerForm').addEventListener('submit', onRegisterForm);
			document.querySelector('#loginForm').addEventListener('submit', onLoginForm);
		}
	});
});

function renderProducts() {
	var _products = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	if (_products.length > 0) {
		$apps.innerHTML = '<div class="row">\n\t\t\t\t<div class="input-field col m4 s12">\n        \t\t  <input id="searchInput" type="text" class="validate" onkeyup="searchByAttribute()">\n        \t\t  <label for="searchInput">Search</label>\n\t\t\t\t</div>\n\t\t\t\t<div class="input-field col m4 s12">\n \t\t\t\t  <select id="searchSelect">\n \t\t\t\t    <option value="description" selected>Description</option>\n \t\t\t\t    <option value="price">Price</option>\n\t\t\t\t\t <option value="title">Title</option>\n\t\t\t\t\t </select>\n\t\t\t\t\t <label>Choice search options</label>\n\t\t\t </div></div>\n\t\t\t <div class="row">\n\t\t\t\t<div class="input-field col m4 s12">\n \t\t\t\t  <select id="sortSelect" onchange="sortByAttribute()">\n \t\t\t\t    <option value="description" selected>Description</option>\n \t\t\t\t    <option value="price">Price</option>\n\t\t\t\t\t <option value="title">Title</option>\n\t\t\t\t\t </select>\n\t\t\t\t\t <label>Sort options</label>\n\t\t\t\t </div>\n\t\t\t\t <div class="input-field col m4 s12">\n \t\t\t\t  <select id="sortOrder" onchange="sortByAttribute()">\n \t\t\t\t    <option value="asc" selected>Ascending sorting</option>\n \t\t\t\t    <option value="dsc">Descending sorting</option>\n\t\t\t\t  </select>\n \t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="col m8 s12"><ul class="collection z-depth-4 hoverable" id="listProduct">\n\t\t\t \t' + _products.map(function (product) {
			return listItem(product);
		}).join(' ') + ' \n\t\t\t </ul></div>\n\t\t\t <div class="col m4 s12">\n\t\t\t\t <div class="card z-depth-4 hoverable"><br>\n    \t\t\t\t<div class="card-image waves-effect waves-block waves-light">\n\t\t\t\t\t\t<div class="center">\n\t\t\t\t\t\t<i class="large material-icons center">shopping_cart</i>\n    \t\t\t\t\t</div>\n    \t\t\t\t</div>\n\t\t\t\t\t<div class="card-content" id="basket">\n\t\t\t\t\t\t<div class="center">\n\t\t\t\t\t\t  <p>Cart is empty</p>\n\t\t\t\t\t\t  <span class="new badge" data-badge-caption="item">0</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<br>\n\t\t\t\t  </div>\n\t\t\t\t  <div id="recentlyViews"></div>\n\t\t\t </div>\n\t\t\t ';
		var elemsSearch = document.querySelectorAll('#searchSelect');
		var elemsSort = document.querySelectorAll('#sortSelect');
		var sortOrder = document.querySelectorAll('#sortOrder');
		var instancesSearch = M.FormSelect.init(elemsSearch, '');
		var instancesSort = M.FormSelect.init(elemsSort, '');
		var instancesSortOrder = M.FormSelect.init(sortOrder, '');
	} else {
		$apps.innerHTML = '<div class="center">Have no products</div>';
	}
}

function onRegisterForm(event) {
	event.preventDefault();
	var email = document.querySelector('#email').value;
	var pass = document.querySelector('#pass').value;
	if (email && pass) {
		if (Auth.register(email, pass)) {
			ProductApi.fetchLimit(firebase).then(function (_products) {
				$logout.innerHTML = logoutUser;
				renderProducts(_products);
				RecentlyView.showViewItems(user.id);
				updateBasket(user.id);
			});
		}
	}
}

function onLoginForm(event) {
	event.preventDefault();
	var email = document.querySelector('#logemail').value;
	var pass = document.querySelector('#logpass').value;
	if (email && pass) {
		if (Auth.login(email, pass)) {
			ProductApi.fetchLimit(firebase).then(function (_products) {
				$logout.innerHTML = logoutUser;
				renderProducts(_products);
				RecentlyView.showViewItems(user.id);
				updateBasket(user.id);
			});
		} else {
			return;
		}
	}
}

function onLogoutUser() {
	firebase.auth().signOut().then(function () {
		$apps.innerHTML = signForm;
		$logout.innerHTML = '';
		$pagination.innerHTML = '';
	});
}

function updateBasket(id) {
	firebase.database().ref('/users/' + id + '/orders').once('value').then(function (res) {
		if (res.val()) {
			orders = res.val();
			var count = 0;
			var summ = 0;
			Object.keys(orders).forEach(function (key) {
				var item = orders[key];
				count += item.count;
				summ += item.price;
			});
			var $basket = document.querySelector('#basket');
			$basket.innerHTML = basket(count, summ.toFixed(2));
		}
	});
}

function renderPagination(_pagination) {
	var arrayItem = [];
	var current = void 0;
	for (var i = 1; i <= _pagination.countPage; i++) {
		var classItem = void 0,
		    func = void 0,
		    page = void 0,
		    limit = void 0;
		page = i;
		if (i === _pagination.currentPage) {
			classItem = "active teal lighten-1";
			func = '';
		} else {
			if (i === 1) {
				classItem = "waves-effect";
				func = 'setPage(0, 7, 1)';
			} else {
				limit = _pagination.limit * i;
				current = limit - _pagination.limit;
				classItem = "waves-effect";
				func = 'setPage(' + current + ', ' + limit + ', ' + page + ')';
			}
		}
		arrayItem.push({ num: i, class: classItem, function: func });
	}
	$pagination.innerHTML = '\n\t\t<ul class="pagination">\n\t\t\t' + arrayItem.map(function (item) {
		return paginationTemplate(item);
	}).join(' ') + '\n\t\t</ul >';
}

function setPage(current, limit, page) {
	var $listProduct = document.querySelector('#listProduct');
	pagination.current = current;
	pagination.currentPage = page;
	renderPagination(pagination);
	var _products = products;
	$listProduct.innerHTML = _products.slice(current, limit).map(function (product) {
		return listItem(product);
	}).join(' ');
}

function searchByAttribute() {
	var input = document.querySelector('#searchInput').value;
	var $listProduct = document.querySelector('#listProduct');
	var elems = document.querySelectorAll('#searchSelect');
	var option = elems[0][elems[0].selectedIndex].value;
	var matchProduct = products.filter(function (elem) {
		return elem[option].toLowerCase().match(input.toLowerCase());
	});
	if (matchProduct.length > 7) {
		var _pagination = new Pagination(matchProduct.length, 7, 0, 1, Math.ceil(matchProduct.length / 7));
		renderPagination(_pagination);
		$listProduct.innerHTML = matchProduct.slice(_pagination.current, _pagination.limit).map(function (product) {
			return listItem(product);
		}).join(' ');
	} else if (matchProduct.length > 0) {
		$listProduct.innerHTML = matchProduct.map(function (product) {
			return listItem(product);
		}).join(' ');
		$pagination.innerHTML = '';
	} else {
		$listProduct.innerHTML = '<li class="collection-item avatar z-depth-4 hoverable center">\n\t\t<br><p class="flow-text center">No match</p>\n\t\t</li>';
		$pagination.innerHTML = '';
	}
}

function sortByAttribute() {
	var $listProduct = document.querySelector('#listProduct');
	var sortOrder = document.querySelectorAll('#sortOrder');
	var sortSelector = document.querySelectorAll('#sortSelect');
	var orderSort = sortOrder[0][sortOrder[0].selectedIndex].value;
	var sortSelect = sortSelector[0][sortSelector[0].selectedIndex].value;
	var sortProduct = products;
	if (orderSort === 'asc') {
		sortProduct.sort(function (a, b) {
			return a[sortSelect] - b[sortSelect];
		});
	} else {
		sortProduct.reverse(function (a, b) {
			return b[sortSelect] - a[sortSelect];
		});
	}
	$listProduct.innerHTML = sortProduct.slice(pagination.current, pagination.limit).map(function (product) {
		return listItem(product);
	}).join(' ');
	renderPagination(pagination);
}

function setMessage(message, type) {
	M.toast({
		html: message,
		displayLength: 3000,
		classes: type + ' lighten-2'
	});
}