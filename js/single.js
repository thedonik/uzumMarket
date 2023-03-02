import BASE_URL from './utils/api.js';
import findElement from './utils/findElement.js';
import renderProducts from './utils/renderProducts.js';

const template = findElement('#product-template');
const card = findElement('.card');
const id = localStorage.getItem('id');

fetch(BASE_URL + 'products/' + id)
	.then((res) => res.json())
	.then((data) => {
		console.log(data);

		renderProducts([data], card, template);
	});