const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

//cart

const buttonCart = document.querySelector('.button-cart');
const modalcart = document.querySelector('#modal-cart');
const modalClose = document.querySelector('.modal-close');

const openModal = function() {
	modalcart.classList.add('show');
};

const closeModal = function() {
	modalcart.classList.remove('show');
};

buttonCart.addEventListener('click' , openModal);
modalClose.addEventListener('click', closeModal);


//scrooll smooth

const scroollLinks = document.querySelectorAll('a.scroll-link');

for(let i = 0; i < scroollLinks.length; i++) {
    scroollLinks[i].addEventListener('click' , function(event){
    event.preventDefault();
	const id = scroollLinks[i].getAttribute('href');
	document.querySelector(id).scrollIntoView({
		behavior: 'smooth' , 
		block: 'start', 
	})
	});
}