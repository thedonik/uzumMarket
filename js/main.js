const elTopList = findElement('#products-top');
const elTopTemplate = findElement('#product-template');

const loader = findElement('#loader');

const topButton = findElement('#to-top');

function toTop() {
	// click button to top page
	window.scrollTo(0, 0);
	// console.log(window.scrollY);
	// window.scrollY = '0';
}

let products = [];
let favoriteProducts = [];

function changeLoading(isLoading) {
	if (isLoading) {
		loader.style.display = 'block';
	} else {
		loader.style.display = 'none';
	}
}

const BASE_URL = 'https://63d3e856a93a149755b5c8f1.mockapi.io/';
//IIFE
async function getData() {
	try {
		changeLoading(true);
		const res = await fetch(BASE_URL + '/products');
		if (res.status === 404) {
			throw new Error('xato ketdi');
		}
		const res2 = await res.json();

		products = res2;

		renderProducts(res2, elTopList, elTopTemplate);
	} catch (x) {
		alert(x);
	} finally {
		changeLoading(false);
	}
}

getData();

elTopList.addEventListener('click', (evt) => {
	const target = evt.target;
	
	console.log(target.id);
	if (target.id.includes('like') || target.id === 'path') {
		const id = Number(target.dataset.id);
		
		console.log(products);
		products.forEach((product) => {
			console.log(product.id, id);
			
			if (+product.id === id) {
				product.isFavorite = !product.isFavorite;
				
				fetch(
					`https://63d3e856a93a149755b5c8f1.mockapi.io/products/${id}`,
					{
						method: 'put',
						body: JSON.stringify({
							...product,
							isFavorite: product.isFavorite,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					}
					)
					.then((res) => res.json())
					.then((res) => {
						console.log(res);
					});
				}
			});
			
			renderProducts(products, elTopList, elTopTemplate);
		}
	});