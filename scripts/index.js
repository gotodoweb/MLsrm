
import start from "./modules/start.js";

const init = (selector) => {
	const overlay = document.querySelector(selector);
	start(overlay);
};



init('.overlay');
