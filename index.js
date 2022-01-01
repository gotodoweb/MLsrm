'use strict';

const overlay = document.querySelector('.overlay.active ');
const td = document.querySelector('.table__body');

overlay.classList.remove('active');


const createRow = (objarr) => {

	let newtr = document.createElement('tr');

	newtr.innerHTML = `
			<tr>
				<td class="table__cell ">${objarr.id + 1}</td>
				<td class="table__cell table__cell_left" data-id="24601654816512">${objarr.title}</td>
				<td class="table__cell table__cell_left">${objarr.category}</td>
				<td class="table__cell">шт</td>
				<td class="table__cell">${objarr.count}</td>
				<td class="table__cell">${objarr.price}</td>
				<td class="table__cell">${objarr.count * objarr.price}</td>
				<td class="table__cell table__cell_btn-wrapper">
					<button class="table__btn table__btn_pic"></button>
					<button class="table__btn table__btn_edit"></button>
					<button class="table__btn table__btn_del"></button>
				</td>
			</tr>
		`;
	console.log(newtr);

	return newtr;
}

const objarr = [
	{
		"id": 1,
		"title": "Смартфон Xiaomi 11T 8/128GB",
		"price": 27000,
		"description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
		"category": "mobile-phone",
		"discont": false,
		"count": 3,
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
		"images": {
			"small": "img/tvboxmecool-m.jpg",
			"big": "img/tvboxmecool-b.jpg"
		}
	}
]

const renderGoods = (arr) => {

	for (let i = 0; i < arr.length; i++) {
		let el = createRow(arr[i]);

		td.append(el);

	}

}

renderGoods(objarr);