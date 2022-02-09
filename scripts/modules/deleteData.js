import createData from "./createData.js";
import { base } from './createData.js';



const deleteData = (arr, form) => {
	const tr = document.getElementsByTagName('tr');
	

	const tb = document.querySelector('.table__body');

	tb.addEventListener('click', el => {	
		const target = el.target;
	
		if (target.closest('.table__btn.table__btn_del')) {

			let first = target.closest('tr');

			let num = (first.firstElementChild);
			
			
			let index = Number(num.innerHTML);			

			let num2 = (num.nextSibling);			

			let num21 = (num2.nextElementSibling);			

			let num21ch = (num21.lastElementChild);
			

			let need = num21ch.innerHTML;
			let needid = need.replace('id:', '');
			

			let idtoremove = Number(needid);
		

			let newdata = arr.filter(el => el.id !== idtoremove);
		

			arr = newdata;
			
		
			
			el.target.closest('.contact').remove();
			base.clear();
			// base.calculateItemPrice(newdata);

			let newTotoalPrice = 0;

			arr.map((item) => {				
				newTotoalPrice += ((item.price * item.count) - (item.price * item.count * (Number(item.discount_count) / 100)));
			});

			let totalPrices = newTotoalPrice;
			
			let mto = document.querySelector('.crm__total-price');

			mto.innerHTML = `$ ${totalPrices}`;
			base.arr = arr;
			base.totalPrice = totalPrices;
			
			newTotoalPrice = 0;
			totalPrices = 0;
		}
		
	});

	
}

export default deleteData;