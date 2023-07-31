// utils
function delegate(delegateTarget, eventName, eventHandler, selector) {
	if (selector) {
		const wrappedHandler = (e) => {
			if (!e.target) return;
			const el = e.target.closest(selector);
			if (el) {
				const newEvent = Object.create(e, {
					delegateTarget: {
						value: delegateTarget
					},
					target: {
						value: el
					}
				});
				eventHandler.call(el, newEvent);
			}
		};
		delegateTarget.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	} else {
		const wrappedHandler = (e) => {
			eventHandler.call(delegateTarget, e);
		};
		delegateTarget.addEventListener(eventName, wrappedHandler);
		return wrappedHandler;
	}
}

function throttle(fn, wait) {
	var scrollTimeout;
	return function () {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(function () {
				scrollTimeout = null;
				fn();
			}, wait);
		}
	};
}

// scroll top
const toTopBtn = document.querySelector('.scroll-top')

window.addEventListener('scroll', throttle(() => {
	toTopBtn.classList.toggle('scroll-top_visible', window.scrollY > 200);
}, 300));

// mobile nav
const navToggleBtn = document.querySelector('.nav-toggle')
const nav = document.querySelector('.nav')

navToggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('nav-scroll-lock')
	navToggleBtn.classList.toggle('hamburger_active')
	document.querySelector('.header').classList.toggle('header_open')
})

delegate(nav, 'click', subnavToggle, '.nav__btn')

function navToggle() {
	navToggleBtn.classList.toggle('nav-toggle_active')
	nav.classList.toggle('nav_open')
}

function subnavToggle() {
	this.closest('.nav__dropdown').classList.toggle('nav__dropdown_expanded')
	this.classList.toggle('nav__btn_active')
}

// languages
document.querySelector('.languages__toggle-btn').addEventListener('click', languagesShow)

function languagesShow({target}) {
	target.closest('.languages').classList.add('languages_open')
	document.addEventListener('click', handleClickOutsideLanguages)
}

function languagesHide() {
	document.querySelector('.languages_open').classList.remove('languages_open')
	document.removeEventListener('click', handleClickOutsideLanguages)
}

function handleClickOutsideLanguages({target}) {
	console.log('click outside');
	if(!target.closest('.languages'))
		languagesHide()
}