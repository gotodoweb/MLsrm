import deleteControl from "./deleteControl.js";
import createData from "./createData.js";
import { base } from './createData.js';


const start = (overlay) => {
	overlay.classList.remove('active');
	modalControl(overlay);
};


const getvendorid = () => {
	function getRandomInRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	return getRandomInRange(1, 100000000);
};


const modalControl = (overlay) => {
	const addbtn = document.querySelector('.panel__add-goods');
	const mtp = document.querySelector('.modal__total-price');
	let vendorid = document.querySelector('.vendor-code__id');
	addbtn.addEventListener('click', () => {
		overlay.classList.add('active');
		let vcid = getvendorid();
		vendorid.innerHTML = vcid;
		mtp.innerHTML = `$ 0.00`;		
	
		base.yesid.vcid = vcid;
		
	});

	const delCon = deleteControl(overlay);
	const getData = createData(overlay);
}


export default start;