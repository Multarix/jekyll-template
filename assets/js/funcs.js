const elementCache = {};

function scrollToAnchorLink(e) {
	e.preventDefault();
	const anchorLink = `[name='${this.hash.replace("#", "")}']`;
	const targetElement = elementCache[anchorLink] || document.querySelector(anchorLink);
	elementCache[anchorLink] = targetElement;
	const offset = targetElement?.getBoundingClientRect()?.top + window.scrollY;
	if(offset){
		window.scroll({
			top: offset - 65,
			behavior: 'smooth'
		});
	}
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', scrollToAnchorLink);
});

function scrollToAnchorLinkOnLoad() {
	const hash = window.location.hash;
	if(hash){
		const anchorLink = `[id='${hash.replace("#", "")}']`;
		const element = elementCache[anchorLink] || document.querySelector(anchorLink);
		elementCache[anchorLink] = element;
		const offset = element?.getBoundingClientRect()?.top + window.scrollY;
		if(offset){
			window.scroll({
				top: offset - 65,
				behavior: 'smooth'
			});
		}
	}
}


window.onload = scrollToAnchorLinkOnLoad;


function topNavMobile() {
	const x = document.getElementById("navbar");
	x.className = (x.className === "navbar") ? "navbar responsive" : "navbar";
}


/* eslint-disable no-undef */
hljs.highlightAll();
/* eslint-enable no-undef */