
import deleteData from "./deleteData.js";


export const base = {
	less: '',
	totalPrice: 0,	
	arr: [],
	skidka: '',
	createRow(objarr, dataid, form) {
		let newtr = document.createElement('tr');
		const tr = document.getElementsByTagName('tr');
		let trcount = tr.length;

		if (this.skidka === 0) {
			this.less = 1;
	
		};

		if (this.skidka > 0) {
			this.less = (Number(this.skidka) / 100);			
		};
	

		newtr.innerHTML = `
			<tr>
				<td class="table__cell goods__row"></td>
				<td class="table__cell table__cell_left table__cell_name" data-id=${dataid}>
					<span class="table__cell-id">id:${objarr.id}</span>
					${objarr.title}
				</td>
				<td class="table__cell table__cell_left">${objarr.category}</td>
				<td class="table__cell">${objarr.units}</td>
				<td class="table__cell">${objarr.count}</td>
				<td class="table__cell">$${objarr.price}</td>
				<td class="table__cell">$${objarr.count * objarr.price}</td>
				<td class="table__cell table__cell_btn-wrapper">
					<button class="table__btn table__btn_pic" data-pic=''></button>
					<button class="table__btn table__btn_edit"></button>
					<button class="table__btn table__btn_del"></button>
				</td>
			</tr>
		`;

		
		trcount += 1;
		let allstr = newtr.querySelectorAll('.table__cell');;

		const sum = allstr[6].innerHTML;

		let newsum = sum.replace('$', '');
		newsum = Number(newsum);


		let yes = newsum * this.less;	
		if (this.less === 1) {
			newsum = newsum;
			allstr[6].innerHTML = `$${newsum}`;
		};

		if (this.less !== 1 && this.less > 0) {
			newsum = newsum - yes;
			allstr[6].innerHTML = `$${newsum}`;
		};

		this.less = 0;
		console.log('newtr', newtr);
		return newtr;
	},
	addel(formData, form, overlay) {
		const tb = document.querySelector('.table__body');
		let vendor = document.querySelector('.vendor-code__id');

		let vcid = base.yesid.vcid;		

		let newcontact = Object.fromEntries(formData.entries());

		newcontact.id = vcid;
		vendor.innerHTML = vcid;

		newcontact.title = form.name.value;
		
		let el = base.createRow(newcontact, vcid);

		el.classList.add('contact');
		tb.append(el);
		


		base.arr.push(newcontact);

		/************/
	
		console.log('base.iamge.image', form.image.value);

		const buttonPi = document.querySelector('.table__btn.table__btn_pic');
		let oldString = form.image.value;

		buttonPi.dataset.pic = oldString;
		
		/********** */

		base.calculateItemPrice(base.arr, form);
		deleteData(base.arr, form);

		form.total.value = '';
		form.reset();
		form.total.value = '';
		form.discount_count.setAttribute('disabled', 'true');
		overlay.classList.remove('active');	

		//  ML3L1
		const buttonPic = document.querySelectorAll('.table__btn.table__btn_pic');
		if (buttonPic.length >= 1) {

			for (el of buttonPic) {

				el.addEventListener('click', () => {
					console.log('click');
					el.dataset.pic = './img/car.jpg';
					// el.dataset.pic = form.image.value;
					// el.dataset.pic = 'index.html';
					// buttonPic.setAttribute('data-pic', 'url=./img/car.jpg');

					const win = open(el.dataset.pic, '', 'width=800, height=600');
					console.log('screen', screen.width, screen.height);
					// const win = open('about:blank', '', 'width=`${screen.width / 2}`, height=`${screen.width / 2}`');



					// win.location.replace(buttonPic.dataset.pic);
					// win.location.assign(el.dataset.pic);
					win.moveBy(Number((screen.width - 800) / 2), Number((screen.width - 600) / 6));
					// const width = window.screen.availWidth / 4;
					// const height = window.screen.availHeight / 4;
					// win.moveBy(width, height);

				})
			};

		}


	},
	calculateItemPrice(arr, form) {
		base.clear();
		let ItemPrice = 0;
		this.arr.map((item) => {
			ItemPrice += ((item.price * item.count) - (item.price * item.count * (Number(item.discount_count) / 100)));

		}),
		this.totalPrice = ItemPrice;
		let crmtotol = document.querySelector('.crm__total-price');

		crmtotol.innerHTML = `$ ${this.totalPrice }`;

	}, 
	clear() {
		this.totalPrice = 0;
	},
	yesid(vcid) {
		return vcid;
	},
};



const createData = (overlay) => {
	
		const form = document.querySelector('.modal__form');

		form.name.required = true;
		form.category.required = true;
		form.description.required = true;
		form.units.required = true;
		form.discount.required = true;
		form.discount_count.required = true;
		form.count.required = true;
		form.price.required = true;
		form.total.required = true;

		const { name, category, description, units, discount, discount_count, count, price, image, total } = form;
		form.discount_count.value = 'скидка от 1-30';
		form.discount.addEventListener('click', () => {
			// const target = e.target;
			
			if (form.discount.checked) {
				form.discount_count.value = '';
				
				form.discount_count.removeAttribute('disabled');
				form.discount_count.addEventListener('change', () => {

					base.skidka = form.discount_count.value;
				});
				
			} else {
				form.discount_count.value = 'скидка от 1-30';
				form.discount_count.setAttribute('disabled', 'true');
			}

		});

		
		form.addEventListener('submit', e => {
			e.preventDefault();
			
			if ((Number(form.discount_count.value) >= 0) && (form.total.value !== NaN) && (form.total.value !== '$ 0.00')) {
				
				const formData = new FormData(e.target);
				base.addel(formData, form, overlay);
			}

			
		});
	

		form.price.addEventListener('focus', () => {		
			if ((form.price.value !== '') && (form.count.value !== '')) {
				form.total.value = `$ ${form.count.value * form.price.value - (form.count.value * form.price.value * (Number(form.discount_count.value) / 100))}`;
				
			}
		});	


};








export default createData;

