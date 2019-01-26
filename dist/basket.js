"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var list = function list(order) {
	return "\n \t<li class=\"collection-item avatar z-depth-4 hoverable\">\n\t \t<img src=\"" + order.img + "\" alt=\"\" class=\"circle\">\n\t\t<div class=\"right\" style=\"margin-top:15px;\">\n\t\t\t <a class=\"waves-effect waves-light red btn-small\" onclick=\"OrdersApi.deleteOrder('" + order.id + "')\">Delete</a>\n\t\t</div>\n     \t<span class=\"title\">" + order.title + "</span>\n     \t<p>" + order.price + " $, <span> " + order.count + " item</span></p>\n    </li>";
};

var logoutUser = "<span class=\"right\" onclick=\"onLogoutUser()\">\n\t<i class=\"material-icons left\">exit_to_app</i>Logout</span>";

var user = void 0;
var $logout = document.querySelector('#userLogout');

firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

var OrdersApi = function () {
	function OrdersApi() {
		_classCallCheck(this, OrdersApi);
	}

	_createClass(OrdersApi, null, [{
		key: "fetchOrders",
		value: function fetchOrders(id) {
			return firebase.database().ref("/users/" + id + "/orders").once('value').then(function (res) {
				var objOrders = res.val();
				var _orders = [];
				if (objOrders) {
					Object.keys(objOrders).forEach(function (key) {
						var obj = objOrders[key];
						_orders.push(new Order(key, obj.count, obj.price, obj.title, obj.id, obj.img));
					});
					return _orders;
				} else {
					return null;
				}
			});
		}
	}, {
		key: "deleteOrder",
		value: function deleteOrder(id) {
			firebase.database().ref("/users/" + user.id + "/orders").child(id).remove();
			this.fetchOrders(user.id).then(function (_orders) {
				renderOrders(_orders);
			});
			setMessage('Item removed', 'red');
		}
	}]);

	return OrdersApi;
}();

var User = function User(id) {
	_classCallCheck(this, User);

	this.id = id;
};

var Order = function Order(id, count, price, title, _id, img) {
	_classCallCheck(this, Order);

	this.id = id;
	this.count = count;
	this.price = price;
	this.title = title;
	this.itemId = _id;
	this.img = img;
};

document.addEventListener('DOMContentLoaded', function () {
	try {
		firebase.auth().onAuthStateChanged(function (_user) {

			if (_user) {
				user = new User(_user.uid);
				OrdersApi.fetchOrders(user.id).then(function (_orders) {
					renderOrders(_orders);
				});
				$logout.innerHTML = logoutUser;
			} else {
				document.location.href = 'index.html';
			}
		});
	} catch (error) {
		throw new Error(error);
	}
});

function renderOrders() {
	var _orders = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	var $apps = document.querySelector('#apps');
	if (_orders) {
		$apps.innerHTML = "<ul class=\"collection z-depth-4 hoverable\">\n\t\t\t\t" + _orders.map(function (order) {
			return list(order);
		}).join(' ') + "\n\t\t\t</ul>";
	} else {
		$apps.innerHTML = "<div class=\"center\">You have no orders</div>";
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
		displayLength: 2000,
		classes: type + " lighten-1"
	});
}