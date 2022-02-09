

const deleteControl = (overlay) => {
	overlay.addEventListener('click', e => {
		const target = e.target;
		if (target.classList.contains('active') || target.closest('.modal__close')) {
				overlay.classList.remove('active');
		}
	});
};

export default deleteControl;