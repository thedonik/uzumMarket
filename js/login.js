import findElement from './utils/findElement.js';

const BASE_URL = '​https://reqres.in/api/';

const emailInput = findElement('#email');
const passwordInput = findElement('#password');
const submitBtn = findElement('#submit-btn');
const errMessage = findElement('#error-message');

submitBtn.addEventListener('click', () => {
	errMessage.textContent = '';
	passwordInput.className = 'form-control form-control-lg';
	emailInput.className = 'form-control form-control-lg';

	const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (!emailInput.value.match(mailformat)) {
		emailInput.className += ' error-active';
		errMessage.textContent = "email noto'g'ri formatda";
		return;
	}

	if (!(passwordInput.value.trim().length > 5)) {
		passwordInput.className += ' error-active';
		errMessage.textContent =
			"parol minimum 5 ta harfdan iborat bo'lishi kerak";
		return;
	}

	fetch('https://reqres.in/api/register', {
		method: 'post',
		body: JSON.stringify({
			email: emailInput.value,
			password: passwordInput.value,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.error) {
				throw new Error(res.error);
			}

			const token = res.token;

			localStorage.setItem('token', token);

			window.location.href = '../index.html';
		})
		.catch((err) => {
			errMessage.textContent = 'email yoki parol xato';
		});
});