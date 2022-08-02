'use strict';

function setHeaderFixed() {
	let observerOptions = { 
		root: null,
        rootMargin: '0px',
        threshold: 0.8};
	let targetToObserve = document.body.firstElementChild;
	let observer = new IntersectionObserver((entries, observer) => {
		let entry = entries[0];
		let header = document.querySelector(".header__nav");
		if ((entry.intersectionRatio == 1)&&
			(!header.classList.contains('header__nav--fixed'))&&(entry.boundingClientRect.top==0)) return;
		header.classList.toggle('header__nav--fixed');
	}, observerOptions);
	observer.observe(targetToObserve);
}

document.addEventListener('DOMContentLoaded', () => {
    setHeaderFixed();
});