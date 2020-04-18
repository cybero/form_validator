//DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error msg
function showError(input, message) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}

//Show success outline
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}

//Check email is valid
//Regex found on stack overflow
function checkEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, 'Email is not valid');
	}
	//return;
}

//Check required fields
function checkRequired(inputArray) {
	inputArray.forEach(function(input) {
		if (input.value === '') {
			showError(input, `${getFieldName(input)} is required`); //See getField function below
		} else {
			showSuccess(input);
		}
	});
}

//Check Input Length
function checkLength(input, min, max) {
	if (input.value.length < min) {
		showError(input, `${getFieldName(input)} must be at least ${min} characters`);
	} else if (input.value.length > max) {
		showError(input, `${getFieldName(input)} must be less than ${max} characters`);
	} else {
		showSuccess(input);
	}
}

//Check passwords match
function checkPasswordsMatch(input1, input2) {
	if (input1.value !== input2.value) {
		showError(input2, 'Passwords do not match');
	}
}

//Get field name to return input ID with uppercase first letter
//charAt gives us the first letter
//slice starts the returned ID at position 1
function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check fields for blank spaces
function checkSpaces(inputArray) {
	inputArray.forEach(function(input) {
		if (input.value.indexOf(' ') !== -1) {
			showError(input, 'Spaces are not allowed');
		}
	});
}

//Event Listener & call functions
form.addEventListener('submit', function(e) {
	e.preventDefault();

	checkRequired([ username, email, password, password2 ]);
	checkLength(username, 3, 15); //min and max number of characters in username
	checkLength(password, 6, 25);
	checkEmail(email);
	checkPasswordsMatch(password, password2);
	checkSpaces([ username, password, password2 ]);
});

//Made by Cybero 2020
