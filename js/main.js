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



const openModal = function() {
	modalcart.classList.add('show');
};

const closeModal = function() {
	modalcart.classList.remove('show');
};

buttonCart.addEventListener('click' , openModal);

modalcart.addEventListener('click' , event => {
    const target = event.target;
	if (target.classList.contains('overlay') || target.classList.contains('modal-close')){
		closeModal()
	}
	
 })



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

// goods
const longGoodsList = document.querySelector('.long-goods-list');
const viewAll = document.querySelectorAll('.view-all');
const navigationLink = document.querySelectorAll('.navigation-link:not(.view-all)');

const getGoods = async function () {
      const result = await fetch('db/db.json');
	  if (!result.ok){
		  throw 'Ошибочка вышла: ' + result.status
	  }
	  return await result.json();
};

const createCard = function (objCard) {
      const card = document.createElement('div');
	  card.className = 'col-lg-3 col-sm-6';

	  card.innerHTML = `
	  <div class="goods-card">
	     ${objCard.label ? 
			`<span class="label">${objCard.label}</span>` : 
			''}
	     <img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
	     <h3 class="goods-title">${objCard.name}</h3>
	     <p class="goods-description">${objCard.description}</p>
	     <button class="button goods-card-btn add-to-cart" data-id="${objCard.id}">
		     <span class="button-price">$${objCard.price}</span>
	     </button>
     </div> 
	  `;

     return card;
};

const renderCards = function(data) {
      longGoodsList.textContent = '';
      const cards = data.map(createCard)
	  longGoodsList.append(...cards)
	  document.body.classList.add('show-goods')
};

const showAll = function(event) {
	event.preventDefault();
	getGoods().then(renderCards);
}

viewAll.forEach(function(elem) {
	elem.addEventListener('click' , function(event) {
		event.preventDefault();
		getGoods().then(renderCards);
	});
});


const filterCards = function(field, value) {
	getGoods()
	.then(function (data){
		return data.filter(function(good){
			return good[field] === value;
		})
	})
	.then(renderCards);
};

navigationLink.forEach(function (link) {
    link.addEventListener('click' , function(event) {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	})
});
