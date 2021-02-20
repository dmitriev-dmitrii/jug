const slider = document.querySelector('.swiper-container');

const mySwiper = new Swiper(slider, {
	slidesPerView: 1,
	spaceBetween: 20,
	loop: true,
	lazy: {
		loadPrevNext: true,
	},

	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})

const hideBtn = document.querySelectorAll('.hide__btn');

hideBtn.forEach(btn => {


let itemList= Array.from(btn.previousElementSibling);

itemList.forEach(e => {

	e.style.cssText = 'overflow: hidden;'

});

let itemListChilds= Array.from(btn.previousElementSibling.children);
let hideItemsQuantity = (Math.floor(itemListChilds.length * 0.5));
let hideItems = itemListChilds.slice (-(hideItemsQuantity));



hideItems.forEach(item => {
	item.classList.add('hide-items');
});

btn.addEventListener('click', function name() 
{
	hideItems.forEach(item => {
		item.classList.toggle('hide-items--active');
	});

	if (btn.innerHTML === "показать еще") {
		btn.innerHTML = "скрыть";
	  } else {
		btn.innerHTML = "показать еще";
	  }

})

});

