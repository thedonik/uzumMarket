import renderProducts from './utils/renderProducts.js';
import changeLoading from './utils/changeLoading.js';
import findElement from './utils/findElement.js';
import BASE_URL from './utils/api.js';
let PageSize = 20;
let activePage = 1;

const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const ulCategories = findElement('#categories');
const loader = findElement('#loader');

const loginBtn = findElement('#login-btn');
const adminLink = findElement('#admin-link');

let allProductsCount = 0;
let token = localStorage.getItem('token');
const elPaginationList = findElement('.pagination');

const getData = async () => {
	try {
		changeLoading(true);
		const res = await fetch(BASE_URL + '/products');
		if (res.status === 404) {
			throw new Error('xato ketdi');
		}
		const res2 = await res.json();
		allProductsCount = res2.length;

		elPaginationList.innerHTML = `
		<li id="prev" class="opacity-50 page-item page-link">
								&laquo;
							</li>`;
		for (let i = 0; i < Math.ceil(allProductsCount / PageSize); i++) {
			let newLi = document.createElement('li');

			newLi.className = 'page-item page-link page-number';
			newLi.textContent = i + 1;
			if (activePage === i + 1) {
				newLi.style.color = '#fff';
				newLi.style.backgroundColor = 'blue';
			}
			elPaginationList.appendChild(newLi);
		}
		elPaginationList.innerHTML += `
							<li id="next" class="page-item page-link">
							&raquo;
							</li>`;

		products = res2;

		renderProducts(res2.slice(0, 20), elTopList, elTopTemplate);
	} catch (x) {
		alert(x);
	} finally {
		changeLoading(false);
	}
};

elPaginationList.addEventListener('click', (evt) => {
	const prevBtn = document.querySelector('#prev');
	const nextBtn = document.querySelector('#next');

	if (evt.target.className.includes('page-number')) {
		const page = evt.target.textContent;

		activePage = page;

		renderProducts(
			products.slice(PageSize * (page - 1), PageSize * page),
			elTopList,
			elTopTemplate
		);
	}
	if (evt.target.id === 'prev') {
		if (activePage != 1) {
			activePage--;

			renderProducts(
				products.slice(
					PageSize * (activePage - 1),
					PageSize * activePage
				),
				elTopList,
				elTopTemplate
			);
		}
	}
	if (evt.target.id === 'next') {
		activePage++;

		renderProducts(
			products.slice(PageSize * (activePage - 1), PageSize * activePage),
			elTopList,
			elTopTemplate
		);
	}
	const lastPage = Math.ceil(products.length / PageSize);

	elPaginationList.innerHTML = `
		<li id="prev" class="${
			activePage == 1 ? 'opacity-50' : ' '
		}  page-item page-link">
								&laquo;
		</li>`;

	for (let i = 0; i < Math.ceil(allProductsCount / PageSize); i++) {
		let newLi = document.createElement('li');

		newLi.className = 'page-item page-link page-number';
		newLi.textContent = i + 1;
		if (activePage == i + 1) {
			newLi.style.color = '#fff';
			newLi.style.backgroundColor = 'blue';
		}
		elPaginationList.appendChild(newLi);
	}
	elPaginationList.innerHTML += `
							<li id="next" class="${
								activePage == lastPage ? 'opacity-50' : ' '
							} page-item page-link">
							&raquo;
							</li>`;
});

getData();

if (token) {
	loginBtn.textContent = 'Chiqish';
	adminLink.style.display = 'block';
} else {
	adminLink.style.display = 'none';
	loginBtn.textContent = 'Kirish';
}

loginBtn.addEventListener('click', () => {
	let token = localStorage.getItem('token');

	if (token) {
		adminLink.style.display = 'none';
		localStorage.removeItem('token');

		loginBtn.textContent = 'Kirish';
	} else {
		window.location.href = '../pages/login.html';
	}
});

let products = [];
let favoriteProducts = [];
let categories = [];

fetch(BASE_URL + 'categories')
	.then((res) => res.json())
	.then((res) => {
		categories = res;
		renderCategories(categories, ulCategories);
	});

const renderCategories = (array, parent) => {
	const newli = document.createElement('li');
	newli.className = 'list-group-item';

	newli.textContent = 'All';

	parent.appendChild(newli);
	array.forEach((category) => {
		const newli = document.createElement('li');
		newli.className = 'list-group-item';

		newli.textContent = category.name;

		parent.appendChild(newli);
	});
};

ulCategories.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.className.includes('list-group-item')) {
		const category = target.textContent;

		const result = [];

		if (category.toLowerCase() !== 'all'.toLowerCase()) {
			products.forEach((product) => {
				if (product.category === category) {
					result.push(product);
				}
			});
			renderProducts(result, elTopList, elTopTemplate);
		} else {
			renderProducts(products, elTopList, elTopTemplate);
		}
	}
});

// 0 20

elTopList.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.id.includes('like') || target.id === 'path') {
		const id = Number(target.dataset.id);

		products.forEach((product) => {
			if (+product.id === id) {
				product.isFavorite = !product.isFavorite;

				fetch(BASE_URL + `products/${id}`, {
					method: 'put',
					body: JSON.stringify({
						...product,
						isFavorite: product.isFavorite,
					}),
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json',
					},
				})
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
					});
			}
		});

		renderProducts(products, elTopList, elTopTemplate);
	}
});

const file = findElement('#file');

const elImage = findElement('#test-file');
file.addEventListener('change', (evt) => {
	const image = file.files[0];

	elImage.src = URL.createObjectURL(image);

	
	const formData = new FormData();

	formData.append('image', image);
});