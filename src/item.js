const cart = product => {
	return `
	<div class="col m6 offset-m1 s12">
		<div class="card z-depth-4 hoverable">
			<div class="card-content">
				<div class="card-image">
    	      		<img src="${product.img}">
    	         </div>
				<span class="card-title">${product.title}</span>
				<p style="white-space: pre-line;">${product.description}</p>
				<p style="white-space: pre-line;">${product.price} $</p>
			</div>
			<div class="card-action">
				<button class="btn waves-effect btn-small red js-remove"  onclick="Basket.addToBasket()">
					<i class="material-icons left">add_box</i>add to card
				</button>
			</div>
		</div>
	</div>
	<div class="col m4 s12">
		<div class="card z-depth-4 hoverable"><br>
    		<div class="card-image waves-effect waves-block waves-light">
				<div class="center">
				<i class="large material-icons center">shopping_cart</i>
    			</div>
    		</div>
			<div class="card-content" id="basket">
				<div class="center">
				  <p>Cart is empty</p>
    			  <span class="new badge" data-badge-caption="item">0</span>
    			</div>
    		</div><br>
		</div>
		<div id="recentlyViews"></div>
	</div>`
}

const listViews = view => {
	return `
		<ul class="collection z-depth-4 hoverable">
			<li class="collection-item avatar z-depth-4 hoverable">
    		 	<img src="${view.img}" alt="${view.title}" class="circle">
    		 	<span class="title">${view.title}</span>
    		 	<p>${view.price} $</p>
				<a href="item.html?item=${view.id}" class="secondary-content">
					view <i class="material-icons right">visibility</i>
				</a>
    		</li>
		</ul>
	`;
}

const basket = (count, summ) => {
	return `
		<div class="center">
		  <p><a href="basket.html">Open cart</a></p>
		  <br>
    	  <span class="new red badge" data-badge-caption=" $">${summ}</span>
    	  <span class="new badge" data-badge-caption=" product">${count}</span>
    	</div>`;
}

const logoutUser = `<span class="right" onclick="onLogoutUser()">
	<i class="material-icons left">exit_to_app</i>Logout</span>`;

let user;
let orders = [];
let views = [];
let product;
const key = window.location.search.replace("?item=", "");
const $logout = document.querySelector('#userLogout');

firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

class RecentlyView {
	static reviewItem(_product) {
		const viewItem = new View(_product.addId, _product.title, _product.price, _product.img)
		firebase.database().ref(`/users/${user.id}/views`).once('value').then((res) => {
			const _views = res.val();
			const arrView = [];
			if (_views) {
				Object.keys(_views).forEach(key => {
					const obj = _views[key];
					if (obj.id === viewItem.id) this.removeViewItem(user.id, key);
					arrView.push(new View(key, obj.title, obj.price, obj.img))
				});
				if (arrView.length >= 4) this.removeViewItem(user.id, arrView[0].id);
			}
			this.addViewItem(viewItem, user.id);
		});
	}
	static showViewItems(uid) {
		firebase.database().ref(`/users/${uid}/views`).once('value').then((res) => {
			const _views = res.val();
			if (_views) {
				Object.keys(_views).forEach(key => {
					const obj = _views[key];
					views.push(new View(obj.id, obj.title, obj.price, obj.img));
				});
				const $views = document.querySelector('#recentlyViews');
				$views.innerHTML = 
						`<p class="flow-text center">Recently viewed</p>
						${views.map(view => listViews(view)).join(' ')}`;
			}
		});
	}
	static removeViewItem(uid, id){
		firebase.database().ref(`/users/${uid}/views`).child(id).remove();
	}
	static addViewItem(viewItem, uid){
		firebase.database().ref(`/users/${uid}/views`).push(viewItem).then(() => {
			this.showViewItems(user.id);
		});
	}
}

class ProductApi {

	static fetch(key) {
		return firebase.database().ref('products').child(key).once('value').then(res => {
			let _product = res.val();
			_product.addId = key;
			return _product;
		});
	}
}

class User {
	constructor(id) {
		this.id = id;
	}
}

class View {
	constructor(id, price, title, img) {
		this.id = id,
		this.title = title,
		this.price = price,
		this.img = img
	}
}

class Basket {

	static addToBasket() {
		const order = {
			id: product.addId,
			title: product.title,
			price: product.price,
			img: product.img,
			count: 1,
		}
		firebase.database().ref(`/users/${user.id}/orders`).once('value').then((res) => {
			const _orders = res.val();
			const currentOrder = [];
			if (_orders) {
				Object.keys(_orders).forEach(key => {
					const obj = _orders[key];
					if (obj.id === order.id) currentOrder.push(key, ++obj.count);
				});
			}
			if (currentOrder.length > 0){
				this.updateItemBasket(currentOrder[0], currentOrder[1]);
			} else{
				firebase.database().ref(`/users/${user.id}/orders`).push(order);
			}
			setMessage('Your cart updated', 'teal');
			this.updateBasket(user.id);
		});
	}
	static updateBasket(id) {
		firebase.database().ref(`/users/${id}/orders`).once('value').then((res) => {
			orders = res.val();
			if (orders) {
				let count = 0, summ = 0;
				Object.keys(orders).forEach(key => {
					const item = orders[key];
					count += item.count;
					summ += item.price;
				})
				const $basket = document.querySelector('#basket');
				$basket.innerHTML = basket(count, summ.toFixed(2));
				
			}

		});
	}

	static updateItemBasket(key, _count){
		firebase.database().ref(`/users/${user.id}/orders`).child(key).update({
			count: _count
		});
	}
}

document.addEventListener('DOMContentLoaded', () => {
	if (key === '') document.location.href = 'index.html';
	try {
		firebase.auth().onAuthStateChanged(_user => {
			if (_user) {
				user = new User(_user.uid);
				ProductApi.fetch(key).then((_product) => {
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

function renderProduct(_product = '') {
	product = _product;
	const $apps = document.querySelector('#apps');
	if (_product !== '') {
		$apps.innerHTML = cart(_product);
	} else {
		$apps.innerHTML = `<div class="center">Have no products</div>`;
	}
}

function onLogoutUser() {
	firebase.auth().signOut().then(() => {
		document.location.href = 'index.html';
	}).catch(() => { });
}

function setMessage(message, type) {
	M.toast({
		html: message,
		displayLength: 3000,
		classes: `${type} lighten-2`
	});
}
