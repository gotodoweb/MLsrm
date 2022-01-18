
'use strict';

const objarr = [
	{
		"id": 1,
		"title": "Смартфон Xiaomi 11T 8/128GB",
		"price": 27000,
		"description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
		"category": "mobile-phone",
		"discont": false,
		"count": 3,
		"units": "шт",
		"images": {
			"small": "img/smrtxiaomi11t-m.jpg",
			"big": "img/smrtxiaomi11t-b.jpg"
		}
	},
	{
		"id": 2,
		"title": "Радиоуправляемый автомобиль Cheetan",
		"price": 4000,
		"description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
		"category": "toys",
		"discont": 5,
		"count": 1,
		"units": "шт",
		"images": {
			"small": "img/cheetancar-m.jpg",
			"big": "img/cheetancar-b.jpg"
		}
	},
	{
		"id": 3,
		"title": "ТВ приставка MECOOL KI",
		"price": 12400,
		"description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
		"category": "tv-box",
		"discont": 15,
		"count": 4,
		"units": "шт",
		"images": {
			"small": "img/tvboxmecool-m.jpg",
			"big": "img/tvboxmecool-b.jpg"
		}
	},
	{
		"id": 4,
		"title": "Витая пара PROConnect 01-0043-3-25",
		"price": 22,
		"description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
		"category": "cables",
		"discont": false,
		"count": 420,
		"units": "v",
		"images": {
			"small": "img/lan_proconnect43-3-25.jpg",
			"big": "img/lan_proconnect43-3-25-b.jpg"
		}
	}

]

const overlay = document.querySelector('.overlay.active ');
const td = document.querySelector('.table__body');
const tdcell = document.querySelector('.table__body .table__cell');
const tr = document.getElementsByTagName('tr');

const addbtn = document.querySelector('.panel__add-goods');

const btnclose = document.querySelector('.modal__close');

const form = document.querySelector('.modal__form');
const overmod = document.querySelector('.overlay__modal');


let trcount = tr.length;

overlay.classList.remove('active');
/****************LESSON7************************************************** */

const { name, category, description, units, discount, discount_count, count, price, image, total } = form;

const vendorid = document.querySelector('.vendor-code__id');
const crmtotol = document.querySelector('.crm__total-price');


const getvendorid = () => {
	function getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return getRandomInRange(1, 100000000);
};


let itogo;
let sumarr = [];
let arrsum;
let allstr;

/****************LESSON7************************************************************* */

const createRow = (objarr) => {

	let newtr = document.createElement('tr');

	newtr.innerHTML = `
			<tr>
				<td class="table__cell">${trcount}</td>
				<td class="table__cell table__cell_left table__cell_name" data-id=${getvendorid()}>
					<span class="table__cell-id">id:${objarr.id}</span>
					${objarr.title}
				</td>
				<td class="table__cell table__cell_left">${objarr.category}</td>
				<td class="table__cell">${objarr.units}</td>
				<td class="table__cell">${objarr.count}</td>
				<td class="table__cell">$${objarr.price}</td>
				<td class="table__cell">$${objarr.count * objarr.price}</td>
				<td class="table__cell table__cell_btn-wrapper">
					<button class="table__btn table__btn_pic"></button>
					<button class="table__btn table__btn_edit"></button>
					<button class="table__btn table__btn_del"></button>
				</td>
			</tr>
		`;
	
	allstr = newtr.querySelectorAll('.table__cell');
	const sum = allstr[6].innerHTML;
	let newsum = sum.replace('$', '');
	newsum = Number(newsum);
	
	sumarr.push(newsum);

	let arrsum = sumarr.reduce((a, b) => a + b, 0);
	// console.log('arrsum', arrsum);

	const crmtotol = document.querySelector('.crm__total-price');
	// console.log('crmtotol: ', crmtotol.innerHTML);
	crmtotol.innerHTML = `$ ${arrsum + 15500}`;
	itogo = `${arrsum + 15500}`
	return newtr;
}
/***********************LESSON7**************************************************** */

const modalControl = () => {
	addbtn.addEventListener('click', () => {
		overlay.classList.add('active');
		let dataid = getvendorid();
		vendorid.innerHTML = dataid;
		form.total.value = '';
	});
}

const deleteContol = () => {
	// используем делегирование для закрытия модального окна
	overlay.addEventListener('click', e => {
		const target = e.target;
		if (target.classList.contains('active') || target.closest('.modal__close')) {
			// console.log(target);
			overlay.classList.remove('active');
		}
	});

	let delpush = [];
	td.addEventListener('click', el => {

		const target = el.target;
		// console.log(target);

		if (target.closest('.table__btn.table__btn_del')) {
			
			el.target.closest('.contact').remove();

			// удаляем из массива объект
			let first = target.closest('tr');
			// console.log('first', first);
			let num = (first.firstElementChild);
			// console.log('num', num);
			const index = Number(num.innerHTML);
			// console.log('index', index);

			if (index >= 3) {

				let i = objarr[index - 3];
				// console.log('allstr[6].innerHTML)', allstr[6].innerHTML);

				let delneed = target.closest('.table__cell');

				console.log('delneed', delneed.previousElementSibling);
				let del = delneed.previousElementSibling.innerHTML;
				// console.log('del', del);
				let newdelneed = del.replace('$', '');
				newdelneed = Number(newdelneed);
				// console.log('newdelneed', newdelneed);

				delpush.push(newdelneed);

				let d = delpush.reduce((a, b) => a + b, 0);

				let needl = Number(d);
				// console.log('needl', needl);

				// console.log('itogo', itogo);
				crmtotol.innerHTML = `$${itogo - needl}`;

				console.log('Объект который удаляем((id+3) c учетом разметки)', i);
				delete objarr[index - 3];
				// console.log('Массив после удаления', objarr);

				console.log('/***************/');

			} else {
				if (index === 2) {
					crmtotol.innerHTML = `$${500}`;
				}
				if (index === 1) {
					crmtotol.innerHTML = `$${0}`;
				}
			}

		};

	});
}

const renderGoods = (arr) => {	

	arr.forEach((item, index, arr) => {		
		let el = createRow(item);
		el.classList.add('contact');
		td.append(el);	
		// console.log(index);
		trcount += 1;		
	});

	modalControl();
	deleteContol();
	form.name.required = true;
	form.category.required = true;
	form.description.required = true;
	form.units.required = true;
	form.discount.required = true;
	form.discount_count.required = true;
	form.count.required = true;
	form.price.required = true;
	form.total.required = true;


	form.discount.addEventListener('click', () => {
		// const target = e.target;

		if (form.discount.checked) {
		
			form.discount_count.removeAttribute('disabled');
			form.discount_count.addEventListener('change', () => {
				// console.log('form.discount_count.value', form.discount_count.value);
				// console.log('form.discount_count', form.discount_count);
			});
		} else {			
			form.discount_count.value = '';
			form.discount_count.setAttribute('disabled', 'true');
		}

	});

	form.price.addEventListener('focus', () => {
		// const target = e.target;
		if ((form.price.value !== '') && (form.count.value !== '')) {
			form.total.value = `$ ${form.count.value * form.price.value}`;
			// console.log('form.total,value', form.total.value);
		}
	});

	form.addEventListener('submit', e => {
		e.preventDefault();
		
		const formData = new FormData(e.target);
	
		let newcontact = Object.fromEntries(formData.entries());
		// console.log('newcontact', newcontact);
		// console.log(createRow(newcontact));


		const newcon = () => {
			let vcid = getvendorid();		
			vendorid.innerHTML = vcid;
			newcontact.id = vcid;
			// console.log('newcontact.id', newcontact.id);
			newcontact.title = form.name.value
			let el = createRow(newcontact);
			el.classList.add('contact');
			td.append(el);
			// console.log(index);
			trcount += 1;

		};

		newcon();

		form.total.value = '';
		form.reset();
		form.total.value = '';
		form.discount_count.setAttribute('disabled', 'true');

	});

};

renderGoods(objarr);
