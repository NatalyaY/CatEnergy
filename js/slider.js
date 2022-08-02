'use strict';

function setSliderDraggable() {
    let sliderPointer = document.querySelector(".slider__controller__progressBar__pointer");
    let sliderControllerLinks = Array.from(document.querySelectorAll('.slider__switch__label__link'));
    sliderPointer.addEventListener('pointerdown', () => { document.addEventListener('pointermove', sliderHandler); });
    sliderPointer.ondragstart = () => false
    sliderControllerLinks.forEach((link) => {
        link.addEventListener('click', sliderHandler);
    });
}

function sliderHandler(e) {
    let mousePositionX, sliderControllerLink, offset;

    if (e.type == 'pointermove') {
        document.addEventListener('pointerup', () => {
            document.removeEventListener('pointermove', sliderHandler);
            document.body.classList.remove("selection-none");
        });
        document.body.classList.add("selection-none");
        mousePositionX = e.pageX;
    } else {
        e.preventDefault();
        sliderControllerLink = e.target.closest('a').id;
    };

    let sliderPointer = document.querySelector(".slider__controller__progressBar__pointer");
    let slider = document.querySelector(".slider");
    let progressBar = document.querySelector(".slider__controller__progressBar");
    let leftImgHover = document.querySelector(".slider__hover--left");
    let RightImgHover = document.querySelector(".slider__hover--right");
    let sliderOverlay = document.querySelector(".slider__overlay");
    let sliderImgBlock = document.querySelector(".slider__imgBlock");

    let progressBarLeft = progressBar.getBoundingClientRect().left;
    let progressBarWidth = parseFloat(window.getComputedStyle(progressBar).width);
    let sliderPointerWidth = parseFloat(window.getComputedStyle(sliderPointer).width);
    let sliderLeft = parseFloat(slider.getBoundingClientRect().left);
    let sliderImgBlockLeft = parseFloat(window.getComputedStyle(sliderImgBlock).left);

    if (window.getComputedStyle(leftImgHover).display=='none'||window.getComputedStyle(RightImgHover).display=='none') { // for mobile 
        if (mousePositionX) {
            let offset = mousePositionX - progressBarLeft;
            if ((offset < 0) || (offset < sliderPointerWidth)) {
                 if (window.getComputedStyle(sliderPointer).left != "0px") {
                    sliderPointer.style.left = 0;
                    sliderPointer.style.right = "unset";
                    leftImgHover.style.display = 'block';
                    RightImgHover.style.display = 'none';
                };
            } else if (offset > sliderPointerWidth) {
                if (window.getComputedStyle(sliderPointer).right != "0px") {
                    sliderPointer.style.right = 0;
                    sliderPointer.style.left = "unset";
                    leftImgHover.style.display = 'none';
                    RightImgHover.style.display = 'block';
                };
            };
        } else if (sliderControllerLink == 'before') {
            if (window.getComputedStyle(sliderPointer).left != "0px") {
                sliderPointer.style.left = 0;
                sliderPointer.style.right = "unset";
                leftImgHover.style.display = 'block';
                RightImgHover.style.display = 'none';
            };
        } else if (sliderControllerLink == 'after') {
            if (window.getComputedStyle(sliderPointer).right != "0px") {
                sliderPointer.style.right = 0;
                sliderPointer.style.left = "unset";
                leftImgHover.style.display = 'none';
                RightImgHover.style.display = 'block';
            };
        };
        return;
    };

    if (mousePositionX) { // for desktop and tablet
        offset = mousePositionX - progressBarLeft;
        if ((offset < 0) || (offset < sliderPointerWidth / 2)) {
            offset = sliderPointerWidth / 2;
        } else if (offset > (progressBarWidth - sliderPointerWidth / 2)) {
            offset = progressBarWidth - sliderPointerWidth / 2;
        };
    } else if (sliderControllerLink == 'before') {
        offset = sliderPointerWidth / 2;
    } else if (sliderControllerLink == 'after') {
        offset = progressBarWidth - sliderPointerWidth / 2;
    } else return;

    sliderPointer.style.left = `${offset}px`;
    leftImgHover.style.width = `${offset - sliderImgBlockLeft}px`;
    RightImgHover.style.width = `${progressBarWidth - offset - sliderImgBlockLeft}px`;
    sliderOverlay.style.left = `${offset + (progressBarLeft - sliderLeft)}px`;
}


document.addEventListener('DOMContentLoaded', () => {
    setSliderDraggable(); 
});