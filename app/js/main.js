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




// Модальные окна

const modalBtn = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay ');
const modals = document.querySelectorAll('.modal');
const closeModalBtn = document.querySelectorAll('.close__modal');



closeModalBtn.forEach(e => {
	e.addEventListener('click',closeModal);
});


function closeModal() {

modals.forEach((el) => {
	el.classList.remove('modal--visible');
});
modalOverlay.classList.remove('modal-overlay--visible');

document.querySelector('.body').style.cssText = `
overflow: auto;
user-select: auto;
`;

};

modalBtn.forEach((el) => {

	el.addEventListener('click' , (e) => {

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});

		modalOverlay.classList.remove('modal-overlay--visible');
		let path = e.currentTarget.getAttribute('data-path');

		document.querySelector('.body').style.cssText = `
		overflow: hidden;
		user-select: none;
`;

		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
		

	});

});



// патерн для поля инпут емаайла



const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Проверка инпута первого модального окна

const EmailInput = document.querySelector('.modal__subscribe-input');

EmailInput.addEventListener('input', checkValidEmail);

const EmailSubmit = document.querySelector('.modal__subscribe-btn');


function checkValidEmail() {

	function ValidateEmail(EmailInput)
	{
	
	if(EmailInput.value.match(emailPattern))
	{
	EmailInput.focus();
	return true;
	}
	else
	{
	EmailInput.focus();
	return false;
	}
	}

	EmailInput.classList.remove('modal__subscribe-input--active');
	EmailSubmit.classList.remove('modal__subscribe-btn--active');
	EmailSubmit.setAttribute("disabled", true);

	if (EmailInput.value.length > 5 && ValidateEmail(EmailInput)==true  ) 

	{

		
	
		EmailInput.classList.add('modal__subscribe-input--active');
		EmailSubmit.classList.add('modal__subscribe-btn--active');
		EmailSubmit.removeAttribute("disabled");
	}



};

// Клик по кнопке отправить первый инпут

EmailSubmit.addEventListener('click', hideInput);

function hideInput ()
{

EmailInput.style.cssText=`
visibility: hidden;
user-select: none;
`;
EmailSubmit.style.cssText=`
visibility: hidden;
user-select: none;
`;


document.querySelector('.modal__subscribe-after-click').style.

cssText=`
visibility:  visible;
opacity: 1;
transform: translateX(0%) translateY(-50%);

`;

}


// Проверка инпута остальных

let EmailInputAnswer = document.querySelectorAll('.modal__answer-input');

EmailInputAnswer.forEach(function (e) { e.addEventListener('input', checkValidAnswer); })

let EmailSubmitAnswer = document.querySelectorAll('.modal__answer-btn');

let form = document.querySelector('.modal__answer-input-wrapper');


function checkValidAnswer(e) {

	let currentElement = e.target;
	let currentValue = e.target.value;
	let btnSubmitAnswer = e.target.nextElementSibling;

	if(emailPattern.test(currentValue) && e.target.value.length > 5 ){
	  //if validchek ok

	  currentElement.classList.add('modal__answer-input--active');
	  btnSubmitAnswer.removeAttribute("disabled");
	 btnSubmitAnswer.classList.add('modal__answer-btn--active');
	 
	}else{
		currentElement.classList.remove('modal__answer-input--active');
		btnSubmitAnswer.classList.remove('modal__answer-btn--active');
		btnSubmitAnswer.setAttribute("disabled", true);
	  //if not okey
	}

  };

// после отправки

EmailSubmitAnswer.forEach(function (e) { e.addEventListener('click',  hideInputAnswer); })

  function hideInputAnswer (e)
  {
   let currentBtn = e.target;
   let currentInput = e.target.previousElementSibling ;
   let afterClickAnswer = e.target.nextElementSibling;


   currentBtn.style.cssText=`
	 visibility: hidden;
	 user-select: none;
	 `;
	 
	 currentInput.style.cssText=`
	 visibility: hidden;
	 user-select: none;
	 `;
	 
	 afterClickAnswer.style.cssText=`
	 visibility:  visible;
	 opacity: 1;
	 transform: translateX( 0%) ;
     `;


document.querySelectorAll('.modal__answer-personal').forEach(function (i){
i.style.

cssText=`
opacity: 0;
pointer-events: none;
user-select: none;
`;

	 });

  };


// Замена стандартной ошибки  вывода не коректного емайл 

let email = document.querySelectorAll('[type = "email"]');

email.forEach(function (e) {

	e.addEventListener("input", function (event) {
		if (e.validity.typeMismatch) {
			e.setCustomValidity("не коректный email");
		} else {
			e.setCustomValidity("");
		}
	});
});

const callBackInput = document.querySelectorAll ('.modal__call-back-input');
const callBackBtn = document.querySelector ('.modal__call-back-btn');

callBackInput.forEach(e => {

e.addEventListener('input', checkValidForm);

});

const PhonePatern = (/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);

function checkValidForm() {

let validPhone = false;

		if(	PhonePatern.test(callBackInput[0].value) )
{
callBackInput[0].classList.add('modal__call-back-input--active');
validPhone = true;
}
else
{

callBackInput[0].classList.remove('modal__call-back-input--active');
validPhone = false;
}


if(	callBackInput[1].value.length > 0 )
{

	
callBackInput[1].classList.add('modal__call-back-input--active');
validName = true;
}
else
{
callBackInput[1].classList.remove('modal__call-back-input--active');
validName = false;
}


if (validName == true && validPhone == true) {


	callBackBtn.removeAttribute("disabled");
	callBackBtn.classList.add('modal__answer-btn--active');
}
else{

	callBackBtn.classList.remove('modal__answer-btn--active');
	callBackBtn.setAttribute("disabled", true);
}
};



callBackBtn.addEventListener('click', hideInputs); 

  function hideInputs (e)
  {

 const afterClickMesage = document.querySelector ('.modal__call-back-after-click');

callBackBtn.style.cssText=`
	 visibility: hidden;
	 user-select: none;
	 `;
	 
	 callBackInput.forEach(e => {
		e.style.cssText=`
		visibility: hidden;
		user-select: none;
		`;
	 });
	
	 
	 afterClickMesage.style.cssText=`
	 visibility:  visible;
	 opacity: 1;
	 transform: translateX( 0%) ;
     `;


document.querySelector('.modal__personal-call-back').style.

cssText=`
opacity: 0;
pointer-events: none;
user-select: none;
`;


  };




// модальные окна end

