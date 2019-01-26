"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cart = function cart(product) {
	return "\n\t<div class=\"col m6 offset-m1 s12\">\n\t\t<div class=\"card z-depth-4 hoverable\">\n\t\t\t<div class=\"card-content\">\n\t\t\t\t<div class=\"card-image\">\n    \t      \t\t<img src=\"" + product.img + "\">\n    \t         </div>\n\t\t\t\t<span class=\"card-title\">" + product.title + "</span>\n\t\t\t\t<p style=\"white-space: pre-line;\">" + product.description + "</p>\n\t\t\t\t<p style=\"white-space: pre-line;\">" + product.price + " $</p>\n\t\t\t</div>\n\t\t\t<div class=\"card-action\">\n\t\t\t\t<button class=\"btn waves-effect btn-small red js-remove\"  onclick=\"Basket.addToBasket()\">\n\t\t\t\t\t<i class=\"material-icons left\">add_box</i>add to card\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<div class=\"col m4 s12\">\n\t\t<div class=\"card z-depth-4 hoverable\"><br>\n    \t\t<div class=\"card-image waves-effect waves-block waves-light\">\n\t\t\t\t<div class=\"center\">\n\t\t\t\t<i class=\"large material-icons center\">shopping_cart</i>\n    \t\t\t</div>\n    \t\t</div>\n\t\t\t<div class=\"card-content\" id=\"basket\">\n\t\t\t\t<div class=\"center\">\n\t\t\t\t  <p>Cart is empty</p>\n    \t\t\t  <span class=\"new badge\" data-badge-caption=\"item\">0</span>\n    \t\t\t</div>\n    \t\t</div><br>\n\t\t</div>\n\t\t<div id=\"recentlyViews\"></div>\n\t</div>";
};

var listViews = function listViews(view) {
	return "\n\t\t<ul class=\"collection z-depth-4 hoverable\">\n\t\t\t<li class=\"collection-item avatar z-depth-4 hoverable\">\n    \t\t \t<img src=\"" + view.img + "\" alt=\"" + view.title + "\" class=\"circle\">\n    \t\t \t<span class=\"title\">" + view.title + "</span>\n    \t\t \t<p>" + view.price + " $</p>\n\t\t\t\t<a href=\"item.html?item=" + view.id + "\" class=\"secondary-content\">\n\t\t\t\t\tview <i class=\"material-icons right\">visibility</i>\n\t\t\t\t</a>\n    \t\t</li>\n\t\t</ul>\n\t";
};

var basket = function basket(count, summ) {
	return "\n\t\t<div class=\"center\">\n\t\t  <p><a href=\"basket.html\">Open cart</a></p>\n\t\t  <br>\n    \t  <span class=\"new red badge\" data-badge-caption=\" $\">" + summ + "</span>\n    \t  <span class=\"new badge\" data-badge-caption=\" product\">" + count + "</span>\n    \t</div>";
};

var logoutUser = "<span class=\"right\" onclick=\"onLogoutUser()\">\n\t<i class=\"material-icons left\">exit_to_app</i>Logout</span>";

var user = void 0;
var orders = [];
var views = [];
var product = void 0;
var key = window.location.search.replace("?item=", "");
var $logout = document.querySelector('#userLogout');

firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

var RecentlyView = function () {
	function RecentlyView() {
		_classCallCheck(this, RecentlyView);
	}

	_createClass(RecentlyView, null, [{
		key: "reviewItem",
		value: function reviewItem(_product) {
			var _this = this;

			var viewItem = new View(_product.addId, _product.title, _product.price, _product.img);
			firebase.database().ref("/users/" + user.id + "/views").once('value').then(function (res) {
				var _views = res.val();
				var arrView = [];
				if (_views) {
					Object.keys(_views).forEach(function (key) {
						var obj = _views[key];
						if (obj.id === viewItem.id) _this.removeViewItem(user.id, key);
						arrView.push(new View(key, obj.title, obj.price, obj.img));
					});
					if (arrView.length >= 4) _this.removeViewItem(user.id, arrView[0].id);
				}
				_this.addViewItem(viewItem, user.id);
			});
		}
	}, {
		key: "showViewItems",
		value: function showViewItems(uid) {
			firebase.database().ref("/users/" + uid + "/views").once('value').then(function (res) {
				var _views = res.val();
				if (_views) {
					Object.keys(_views).forEach(function (key) {
						var obj = _views[key];
						views.push(new View(obj.id, obj.title, obj.price, obj.img));
					});
					var $views = document.querySelector('#recentlyViews');
					$views.innerHTML = "<p class=\"flow-text center\">Recently viewed</p>\n\t\t\t\t\t\t" + views.map(function (view) {
						return listViews(view);
					}).join(' ');
				}
			});
		}
	}, {
		key: "removeViewItem",
		value: function removeViewItem(uid, id) {
			firebase.database().ref("/users/" + uid + "/views").child(id).remove();
		}
	}, {
		key: "addViewItem",
		value: function addViewItem(viewItem, uid) {
			var _this2 = this;

			firebase.database().ref("/users/" + uid + "/views").push(viewItem).then(function () {
				_this2.showViewItems(user.id);
			});
		}
	}]);

	return RecentlyView;
}();

var ProductApi = function () {
	function ProductApi() {
		_classCallCheck(this, ProductApi);
	}

	_createClass(ProductApi, null, [{
		key: "fetch",
		value: function fetch(key) {
			return firebase.database().ref('products').child(key).once('value').then(function (res) {
				var _product = res.val();
				_product.addId = key;
				return _product;
			});
		}
	}]);

	return ProductApi;
}();

var User = function User(id) {
	_classCallCheck(this, User);

	this.id = id;
};

var View = function View(id, price, title, img) {
	_classCallCheck(this, View);

	this.id = id, this.title = title, this.price = price, this.img = img;
};

var Basket = function () {
	function Basket() {
		_classCallCheck(this, Basket);
	}

	_createClass(Basket, null, [{
		key: "addToBasket",
		value: function addToBasket() {
			var _this3 = this;

			var order = {
				id: product.addId,
				title: product.title,
				price: product.price,
				img: product.img,
				count: 1
			};
			firebase.database().ref("/users/" + user.id + "/orders").once('value').then(function (res) {
				var _orders = res.val();
				var currentOrder = [];
				if (_orders) {
					Object.keys(_orders).forEach(function (key) {
						var obj = _orders[key];
						if (obj.id === order.id) currentOrder.push(key, ++obj.count);
					});
				}
				if (currentOrder.length > 0) {
					_this3.updateItemBasket(currentOrder[0], currentOrder[1]);
				} else {
					firebase.database().ref("/users/" + user.id + "/orders").push(order);
				}
				setMessage('Your cart updated', 'teal');
				_this3.updateBasket(user.id);
			});
		}
	}, {
		key: "updateBasket",
		value: function updateBasket(id) {
			firebase.database().ref("/users/" + id + "/orders").once('value').then(function (res) {
				orders = res.val();
				if (orders) {
					var count = 0,
					    summ = 0;
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
	}, {
		key: "updateItemBasket",
		value: function updateItemBasket(key, _count) {
			firebase.database().ref("/users/" + user.id + "/orders").child(key).update({
				count: _count
			});
		}
	}]);

	return Basket;
}();

document.addEventListener('DOMContentLoaded', function () {
	if (key === '') document.location.href = 'index.html';
	try {
		firebase.auth().onAuthStateChanged(function (_user) {
			if (_user) {
				user = new User(_user.uid);
				ProductApi.fetch(key).then(function (_product) {
					renderProduct(_product);
					RecentlyView.reviewItem(_product);
					Basket.updateBasket(user.id);
					$logout.innerHTML = logoutUser;
				});
			} else {
				document.location.href = 'index.html';
			}
		});
	} catch (error) {
		throw new Error(error);
	}
});

function renderProduct() {
	var _product = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	product = _product;
	var $apps = document.querySelector('#apps');
	if (_product !== '') {
		$apps.innerHTML = cart(_product);
	} else {
		$apps.innerHTML = "<div class=\"center\">Have no products</div>";
	}
}

function onLogoutUser() {
	firebase.auth().signOut().then(function () {
		document.location.href = 'index.html';
	}).catch(function () {});
}

function setMessage(message, type) {
	M.toast({
		html: message,
		displayLength: 3000,
		classes: type + " lighten-2"
	});
}