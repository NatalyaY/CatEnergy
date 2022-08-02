'use strict';

const form = document.querySelector('.form');
const requiredInputs = form.querySelectorAll('.form__input[required]');
const formSubmitBtn = form.querySelector('.form__button');
const inputsWithMask = form.querySelectorAll('[data-mask]');


function setInputValues() {
	Array.from(requiredInputs).forEach((el)=>{
		el.addEventListener('keyup', (e) => {
			e.target.setAttribute("value", e.target.value);
			if (e.target.value != "") {
				e.target.classList.remove('invalid') 
			} else if (!e.target.classList.contains('invalid')) {
				e.target.classList.add("invalid");
			};
		});
	});
};

function markEmptyRequuiredInputs(e) {
	e.preventDefault();
	let emptyRequiredInputs = form.querySelectorAll('.form__input[required][value=""]');
	Array.from(emptyRequiredInputs).forEach((el) => {
		el.classList.add("invalid");
	});
	let firstInvalidInput = form.querySelector('.form__input[required][value=""]');
	let header = document.querySelector('.header__nav');
	let firstInvalidInputTop = firstInvalidInput?.getBoundingClientRect().top;
	let headerHeight = header ? parseFloat(window.getComputedStyle(header).height) : 0;

	if (firstInvalidInputTop) window.scrollTo(0, firstInvalidInputTop + pageYOffset - headerHeight - 10);
}

function useInputMask(input) {
	const mask = input.dataset.mask.split('');

	function applyMask(inputValue) {

		let inputData = inputValue.slice();

		let maskedValue = [];

		for (let i = 0; i < mask.length; i++) {
			if ((inputData.length == 0)&&(maskedValue.length >= mask.indexOf("_"))) break;

			if (mask[i] != "_") { 
				maskedValue.push(mask[i]);
				continue;
			};
			if (inputData.length != 0) {
				maskedValue.push(inputData.shift());
				continue;
			};
		};

		return maskedValue.join('');
	}

	function inputChange(e) {
		let selectionStart = input.selectionStart;
		let selectionEnd = input.selectionEnd;

		let cleanInputValue = input.value.split('').slice(3).filter((char) => /\d/.test(char));

		if (e.type == 'blur') {
			if (cleanInputValue.length == 0) {
				input.value = "";
				return;
			};
		};

		input.value = applyMask(cleanInputValue);

		if (cleanInputValue.length == 0) {
			return;
		};

		if (input.selectionEnd != selectionEnd) {
			while(input.selectionEnd != selectionEnd) {
				if (!/\d|s/.test(input.value[selectionEnd-1])) {
					if (input.selectionEnd < selectionEnd) {
						selectionEnd--;
						selectionStart--;
					} else {
						selectionEnd++;
						selectionStart++;
					};
					
				} else {
					input.selectionEnd = selectionEnd;
					input.selectionStart = selectionStart;
				}
			};
		}

		input.selectionEnd = selectionEnd;
		input.selectionStart = selectionStart;

	}

	input.addEventListener('click', (e) => inputChange(e));
	input.addEventListener('keyup', (e) => inputChange(e));
	input.addEventListener('blur', (e) => inputChange(e));
}

document.addEventListener('DOMContentLoaded', setInputValues);

formSubmitBtn.addEventListener('click', (e) => markEmptyRequuiredInputs(e));

Array.from(inputsWithMask).forEach((el) => useInputMask(el));
