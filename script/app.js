(() => {
	const inputs = [...document.querySelectorAll('.input')];
	const inputsParentItems = [...document.querySelectorAll('.form__item')];
	const submitBtn = document.querySelector('[data-submit]');
	const data = {
		first: '',
		last: '',
		email: '',
		password: '',
	};

	const setData = (target, valueInput) => {
		data[target.dataset.name] = valueInput;
	};

	const checkEmptyValuesArray = values => {
		return values.map(value => value !== '');
	};

	const clearInputs = () => {
		inputs.forEach(input => (input.value = ''));
	};

	const generateError = inner => {
		const error = document.createElement('p');
		error.classList.add('error', 'u-active');
		error.textContent = `${inner} can't be empty.`;
		return error;
	};
	const generateErrorIcon = () => {
		const errorIcon = document.createElement('div');
		errorIcon.classList.add('error__icon', 'u-active');
		errorIcon.innerHTML = `<img src="./assets/images/icon-error.svg" alt="Error" />`;
		return errorIcon;
	};

	const renderErrorItems = (item, input) => {
		const root = item;
		clearError(root);
		root.appendChild(generateErrorIcon());
		root.appendChild(generateError(input.title));
	};

	const clearError = item => {
		const error = item.querySelector('.error');
		const errorIcon = item.querySelector('.error__icon');

		if (errorIcon !== null) {
			errorIcon.remove();
		}

		if (error !== null) {
			error.remove();
		}
	};

	const renderErrors = emptyValues => {
		emptyValues.forEach((emptyValue, index) => {
			if (!emptyValue) {
				renderErrorItems(inputsParentItems[index], inputs[index]);
			} else {
				clearError(inputsParentItems[index]);
			}
		});
	};
	const clearData = () => {
		for (const item in data) {
			data[item] = '';
		}
	};

	const sendData = () => {
		submitBtn.innerHTML = `<img class="success" src="./assets/images/icon-success.svg" alt="Success send data" />`;
		setTimeout(() => {
			submitBtn.textContent = 'Claim your free trial';
			clearData();
			clearInputs();
		}, 1000);
	};

	const sendFormToClient = () => {
		const dataValues = Object.values(data);
		const checkEmptyValues = checkEmptyValuesArray(dataValues);

		renderErrors(checkEmptyValues);

		if (!checkEmptyValues.includes(false)) {
			-sendData();

			return;
		}
	};

	inputs.forEach(input => {
		input.addEventListener('input', ({ target }) => {
			setData(target, target.value);
		});
	});

	submitBtn.addEventListener('click', e => {
		e.preventDefault();
		sendFormToClient();
	});

	submitBtn.addEventListener('keydown', e => {
		if (e.key === 'Enter' || e.key === '') {
			e.preventDefault();
			sendFormToClient();
		}
	});
})();
