
const elLangSelect = findElement('#language-select');

const elLoginBtn = findElement('#login-btn');

// language
let lang = localStorage.getItem('lang');

elLangSelect.value = lang;

if (lang === 'uz') {
	document.title = "Internet do'kon";
} else if (lang === 'en') {
	document.title = 'E-commerce';
} else if (lang === 'ru') {
	document.title = 'Интернет магазин';
}

elLangSelect.addEventListener('change', () => {
	const value = elLangSelect.value;

	localStorage.setItem('lang', value);
	lang = value;
	if (lang === 'uz') {
		document.title = "Internet do'kon";
	} else if (lang === 'en') {
		document.title = 'E-commerce';
	} else if (lang === 'ru') {
		document.title = 'Интернет магазин';
	}
});
const isLogin = localStorage.getItem('login');

if (!isLogin) {
	elLoginBtn.textContent = 'Chiqish';
}

function loginHandler() {
	if (elLoginBtn.textContent.trim() === 'Kirish') {
		localStorage.setItem('login', true);
		elLoginBtn.textContent = 'Chiqish';
	} else {
		elLoginBtn.textContent = 'Kirish';

		localStorage.removeItem('login');
	}
}