const paginationTemplate = item => {
	return `<li class="${item.class}"><a href="#!" onclick="${item.function}">${item.num}</a></li>`
}
const listItem = product => {
	return `
 	<li class="collection-item avatar z-depth-4 hoverable">
     	<img src="${product.img}" alt="" class="circle">
     	<span class="title">${product.title}</span>
     	<p>${product.description}</p>
     	<p>${product.price} $</p>
		<a href="item.html?item=${product._id}" class="secondary-content" style="margin-top:15px">
			view detail<i class="material-icons right">visibility</i>
		</a>
    </li>`
}

const signForm = `
	<div class="row">
    	<div class="col s8 offset-s2">
    	  <ul class="tabs">
    	    <li class="tab col s6"><a href="#test1">Register</a></li>
    	    <li class="tab col s6"><a class="active" href="#test2">Login</a></li>
    	  </ul>
		</div>
		<div id="test1" class="col s12">
			<form id="registerForm" class="col m8 offset-m2 s12"><br>
				<div class="modal-content">
					<h5>Register</h5><br>
					<div class="input-field">
						<input id="email" type="email" class="validate">
						<label for="email">Email</label>
						<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
					</div>
					<div class="input-field">
						<input id="pass" type="password" class="validate">
						<label for="pass">Password</label>
						<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
					</div>
					<div class="input-field">
						<button class="btn waves-effect waves-red red  lighten-2" type="submit" name="action">
							<i class="material-icons right">send</i>Register
						</button>
					</div>
				</div>
			</form>
		</div>
		<div id="test2" class="col s12">
			<form id="loginForm" class="col m8 offset-m2 s12"><br>
				<div class="modal-content">
					<h5>Login</h5><br>
					<div class="input-field">
						<input id="logemail" type="email" class="validate">
						<label for="logemail">Email</label>
						<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
					</div>
					<div class="input-field">
						<input id="logpass" type="password" class="validate">
						<label for="logpass">Password</label>
						<span class="helper-text" data-error="wrong" data-success="right">Helper text</span>
					</div>
					<div class="input-field">
						<button class="btn waves-effect waves-red red  lighten-2" type="submit" name="action">
							<i class="material-icons right">send</i>Login
						</button>
					</div>
				</div>
			</form>
		</div>
  </div>`;

const basket = (count, summ) => {
	return `
		<div class="center">
		  <p><a class="teal-text text-lighten-1" href="basket.html">Open cart</a></p>
		  <br>
    	  <span class="new red badge" data-badge-caption=" $">${summ}</span>
    	  <span class="new badge" data-badge-caption=" product">${count}</span>
    	</div>`;
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

const logoutUser = `<span class="right" onclick="onLogoutUser()">
	<i class="material-icons left">exit_to_app</i>Logout</span>`;

let modal;
let user;
let pagination;
let orders = [];
let views = [];
let products = [];
const $apps = document.querySelector('#apps');
const $logout = document.querySelector('#userLogout');
const $pagination = document.querySelector('#pagination');
firebase.initializeApp({
	apiKey: "AIzaSyAN6ojrL-1p3rm20SFOcM3BZt_jlVw62UQ",
	authDomain: "treo-labs.firebaseapp.com",
	databaseURL: "https://treo-labs.firebaseio.com",
	projectId: "treo-labs",
	storageBucket: "treo-labs.appspot.com",
	messagingSenderId: "185131231342"
});

class ProductApi {

	static fetchLimit() {
		return firebase.database().ref('products').once('value').then((_products) => {
			let resultAds = []
			const ads = _products.val();
			Object.keys(ads).forEach(key => {
				const ad = ads[key];
				resultAds.push({
					title: ad.title, description: ad.description, img: ad.img, price: ad.price, _id: key
				});
			})
			pagination = new Pagination(resultAds.length, 7, 0, 1, Math.ceil(resultAds.length / 7));
			renderPagination(pagination);
			products = resultAds;
			return resultAds.slice(pagination.current, pagination.limit);;
		});
	}
}

class Auth {
	static login(email, password) {
		firebase.auth().signInWithEmailAndPassword(email, password).then((resp) => {
			user = new User(resp.user.uid);
			return true;
		}).catch(error => {
			setMessage(error.message, 'red')
			return false;
		});
	}
	static register(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password).then((resp) => {
			user = new User(resp.user.uid);
			return true;
		}).catch( error => {
			setMessage(error.message, 'red')
			return false;
		});
	}
}

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
					arrView.push(new View(obj.id, obj.title, obj.price, obj.img))
				});
				if (arrView.length > 5) this.removeViewItem(user.id, arrView[0].id);
			}
			this.addViewItem(viewItem, user.id);
		});
	}
	static showViewItems(uid) {
		firebase.database().ref(`/users/${uid}/views`).once('value').then((res) => {
			const _views = res.val();
			views = [];
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
	static removeViewItem(uid, id) {
		firebase.database().ref(`/users/${uid}/views`).child(id).remove();
	}
	static addViewItem(viewItem, uid) {
		firebase.database().ref(`/users/${uid}/views`).push(viewItem).then(() => {
			this.showViewItems(user.id);
		});
	}
}

class User {
	constructor (id) {
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
class Pagination {
	constructor(count, limit, current, currentPage, countPage){
		this.count = count;
		this.limit = limit;
		this.current = current;
		this.currentPage = currentPage;
		this.countPage = countPage;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	
	firebase.auth().onAuthStateChanged(_user => {
		if(_user) {
			user = new User(_user.uid);
			ProductApi.fetchLimit().then((_products) => {
				renderProducts(_products);
				RecentlyView.showViewItems(user.id);
				updateBasket(user.id);
				$logout.innerHTML = logoutUser;
			});
		} else {
			$apps.innerHTML = signForm;
			const $tabs = document.querySelector('.tabs');
			M.Tabs.init($tabs);
			document.querySelector('#registerForm').addEventListener('submit', onRegisterForm);
			document.querySelector('#loginForm').addEventListener('submit', onLoginForm);
		}
	});
});

function renderProducts(_products = []) { 
	if (_products.length > 0) {
		$apps.innerHTML = 
			`<div class="row">
				<div class="input-field col m4 s12">
        		  <input id="searchInput" type="text" class="validate" onkeyup="searchByAttribute()">
        		  <label for="searchInput">Search</label>
				</div>
				<div class="input-field col m4 s12">
 				  <select id="searchSelect">
 				    <option value="description" selected>Description</option>
 				    <option value="price">Price</option>
					 <option value="title">Title</option>
					 </select>
					 <label>Choice search options</label>
			 </div></div>
			 <div class="row">
				<div class="input-field col m4 s12">
 				  <select id="sortSelect" onchange="sortByAttribute()">
 				    <option value="description" selected>Description</option>
 				    <option value="price">Price</option>
					 <option value="title">Title</option>
					 </select>
					 <label>Sort options</label>
				 </div>
				 <div class="input-field col m4 s12">
 				  <select id="sortOrder" onchange="sortByAttribute()">
 				    <option value="asc" selected>Ascending sorting</option>
 				    <option value="dsc">Descending sorting</option>
				  </select>
 				</div>
			</div>
			<div class="col m8 s12"><ul class="collection z-depth-4 hoverable" id="listProduct">
			 	${_products.map(product => listItem(product)).join(' ')} 
			 </ul></div>
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
					</div>
					<br>
				  </div>
				  <div id="recentlyViews"></div>
			 </div>
			 `;
		let elemsSearch = document.querySelectorAll('#searchSelect');
		let elemsSort = document.querySelectorAll('#sortSelect');
		let sortOrder = document.querySelectorAll('#sortOrder');
		let instancesSearch = M.FormSelect.init(elemsSearch, '');
		let instancesSort = M.FormSelect.init(elemsSort, '');
		let instancesSortOrder = M.FormSelect.init(sortOrder, '');
	} else {
		$apps.innerHTML = `<div class="center">Have no products</div>`;
	}
}

function onRegisterForm(event) {
	event.preventDefault();
	const email = document.querySelector('#email').value;
	const pass = document.querySelector('#pass').value;
	if (email && pass) {
		if (Auth.register(email, pass)){
			ProductApi.fetchLimit(firebase).then((_products) => {
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
	const email = document.querySelector('#logemail').value;
	const pass = document.querySelector('#logpass').value;
	if (email && pass) {
		if (Auth.login(email, pass)){
			ProductApi.fetchLimit(firebase).then((_products) => {
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

function onLogoutUser(){
	firebase.auth().signOut().then(() => {
			$apps.innerHTML = signForm;
			$logout.innerHTML = '';
			$pagination.innerHTML = '';
		});
}

function updateBasket(id) {
	firebase.database().ref(`/users/${id}/orders`).once('value').then((res) => {
		if(res.val()){
			orders = res.val();
			let count = 0;
			let summ = 0;
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

function renderPagination(_pagination){
	let arrayItem = [];
	let current;
	for(let i = 1; i <= _pagination.countPage; i++){
		let classItem, func, page, limit;
		page = i;
		if(i === _pagination.currentPage) {
			classItem = "active teal lighten-1";
			func = ``;
		} else {
			if(i === 1) {
				classItem = "waves-effect";
				func = `setPage(0, 7, 1)`;
			} else {
				limit = _pagination.limit * i;
				current = limit - _pagination.limit;
				classItem = "waves-effect";
				func = `setPage(${current}, ${limit}, ${page})`;
			}
		}
		arrayItem.push({num: i, class: classItem, function: func});
	}
	$pagination.innerHTML = `
		<ul class="pagination">
			${arrayItem.map(item => paginationTemplate(item)).join(' ')}
		</ul >`;
}

function setPage(current, limit, page){
	const $listProduct = document.querySelector('#listProduct');
	pagination.current = current;
	pagination.currentPage = page;
	renderPagination(pagination);
	let _products = products;
	$listProduct.innerHTML = _products.slice(current, limit).map(product => listItem(product)).join(' ');
}

function searchByAttribute(){
	const input = document.querySelector('#searchInput').value;
	const $listProduct = document.querySelector('#listProduct');
	let elems = document.querySelectorAll('#searchSelect');
	const option = elems[0][elems[0].selectedIndex].value;
	const matchProduct = products.filter(elem => {
		return elem[option].toLowerCase().match(input.toLowerCase());
	});
	if (matchProduct.length > 7){
		let _pagination = new Pagination(matchProduct.length, 7, 0, 1, Math.ceil(matchProduct.length / 7));
		renderPagination(_pagination);
		$listProduct.innerHTML = matchProduct.slice(_pagination.current, _pagination.limit)
				.map(product => listItem(product)).join(' ');
	} else if (matchProduct.length > 0) {
		$listProduct.innerHTML = matchProduct.map(product => listItem(product)).join(' ');
		$pagination.innerHTML = '';
	} else {
		$listProduct.innerHTML = `<li class="collection-item avatar z-depth-4 hoverable center">
		<br><p class="flow-text center">No match</p>
		</li>`;
		$pagination.innerHTML = '';
	}
}

function sortByAttribute(){
	const $listProduct = document.querySelector('#listProduct');
	let sortOrder = document.querySelectorAll('#sortOrder');
	let sortSelector = document.querySelectorAll('#sortSelect');
	const orderSort = sortOrder[0][sortOrder[0].selectedIndex].value;
	const sortSelect = sortSelector[0][sortSelector[0].selectedIndex].value;
	const sortProduct = products;
	if (orderSort === 'asc'){
		sortProduct.sort((a, b) => {
			return a[sortSelect] - b[sortSelect];
		});
	} else {
		sortProduct.reverse((a, b) => {
			return b[sortSelect] - a[sortSelect];
		});
	}
	$listProduct.innerHTML = sortProduct.slice(pagination.current, pagination.limit)
		.map(product => listItem(product)).join(' ');
	renderPagination(pagination);
}

function setMessage(message, type){
	M.toast({ 
		html: message,
		displayLength: 3000,
		classes: `${type} lighten-2`
	});
}