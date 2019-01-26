const list = order => {
	return `
 	<li class="collection-item avatar z-depth-4 hoverable">
	 	<img src="${order.img}" alt="" class="circle">
		<div class="right" style="margin-top:15px;">
			 <a class="waves-effect waves-light red btn-small" onclick="OrdersApi.deleteOrder('${order.id}')">Delete</a>
		</div>
     	<span class="title">${order.title}</span>
     	<p>${order.price} $, <span> ${order.count} item</span></p>
    </li>`
}

const logoutUser = `<span class="right" onclick="onLogoutUser()">
	<i class="material-icons left">exit_to_app</i>Logout</span>`;

let user;
const $logout = document.querySelector('#userLogout');

firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

class OrdersApi {

	static fetchOrders(id) {
		return firebase.database().ref(`/users/${id}/orders`).once('value').then((res) => {
			const objOrders = res.val();
			let _orders = [];
			if(objOrders){
				Object.keys(objOrders).forEach(key => {
					const obj = objOrders[key];
					_orders.push(new Order(key, obj.count, obj.price, obj.title, obj.id, obj.img));
				});
				return _orders;
			} else {
				return null;
			}
		});
	}
	static deleteOrder(id) {
		firebase.database().ref(`/users/${user.id}/orders`).child(id).remove();
		this.fetchOrders(user.id).then(_orders => {
			renderOrders(_orders);
		});
		setMessage('Item removed', 'red');
	}
}

class User {
	constructor(id) {
		this.id = id;
	}
}

class Order {
	constructor(id, count, price, title, _id, img){
		this.id = id;
		this.count = count;
		this.price = price;
		this.title = title;
		this.itemId = _id;
		this.img = img;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	try {
		firebase.auth().onAuthStateChanged((_user) => {
			
			if (_user) {
				user = new User(_user.uid);
				OrdersApi.fetchOrders(user.id).then(_orders => {
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

function renderOrders(_orders = []) {
	const $apps = document.querySelector('#apps');
	if (_orders) {
		$apps.innerHTML = 
			`<ul class="collection z-depth-4 hoverable">
				${_orders.map(order => list(order)).join(' ')}
			</ul>`;
	} else {
		$apps.innerHTML = `<div class="center">You have no orders</div>`;
	}
}

function onLogoutUser() {
	firebase.auth().signOut().then(() => {
		document.location.href = 'index.html';
	}).catch(()=> {});
}

function setMessage(message, type) {
	M.toast({
		html: message,
		displayLength: 2000,
		classes: `${type} lighten-1`
	});
}
