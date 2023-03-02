import BASE_URL from './utils/api.js';
import findElement from './utils/findElement.js';
import renderProducts from './utils/renderProducts.js';

const token = localStorage.getItem('token');

if (!token) {
	console.log('tojen');
	window.location.href = '../index.html';
}

const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const loader = findElement('#loader');
const loaderPost = findElement('#loader-post');

const elForm = findElement('#add-form');

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const submitBtn = findElement('#submit-btn');

	submitBtn.disabled = 'true';
	const elTitle = evt.target.title.value;
	const elImage = evt.target.image.value;
	const elPrice = evt.target.price.value;
	const elRating = evt.target.rating.value;
	const elCategory = evt.target.category.value;

	const newProduct = {
		createdAt: new Date(),
		name: elTitle,
		image: elImage,
		price: elPrice,
		category: elCategory,
		rating: elRating,
	};

	loaderPost.style.display = 'inline-block';

	fetch(BASE_URL + '/products', {
		method: 'post',
		body: JSON.stringify(newProduct),
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((data) => {
			loaderPost.style.display = 'none';
			submitBtn.disabled = '';
			getData();
		});
});

let products = [];
let favoriteProducts = [];

function changeLoading(isLoading) {
	if (isLoading) {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

const getData = async () => {
	try {
		changeLoading(true);
		const res = await fetch(BASE_URL + '/products');
		if (res.status === 404) {
			throw new Error('xato ketdi');
		}
		const res2 = await res.json();

		products = res2;

		renderProducts(res2, elTopList, elTopTemplate, true);
	} catch (x) {
		alert(x);
	} finally {
		changeLoading(false);
	}
};

getData();

elTopList.addEventListener('click', (evt) => {
	const target = evt.target;

	if (target.className.includes('btn-danger')) {
		const id = Number(target.dataset.id);

		fetch(BASE_URL + `products/${id}`, {
			method: 'delete',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				changeLoading(true);
				window.location.reload();
			});
	}
});