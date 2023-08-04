const elementCache = {};

// "Copy Code to Clipboard" buttons for code blocks
document.querySelectorAll('pre code').forEach(codeblock => {
	const parent = codeblock.parentNode;

	const copyButton = document.createElement('button');
	copyButton.type = "button";
	copyButton.ariaLabel = "Copy code to clipboard";
	copyButton.innerText = "content_copy";
	copyButton.className = "material-icons copy-button";

	copyButton.onclick = async () => {

		navigator.clipboard.writeText(codeblock.innerText);

		copyButton.style.opacity = 1;
		copyButton.style.color = "transparent";
		copyButton.style.backgroundColor = "#538b58";

		setTimeout(() => {
			copyButton.innerText = "check";
			copyButton.style.color = "white";
		}, 205);

		setTimeout(() => {
			copyButton.style.color = "white";
		}, 210);

		setTimeout(() => {
			copyButton.style.opacity = 0;
		}, 1515);

		setTimeout(() => {
			copyButton.innerText = "content_copy";
			copyButton.style = "";
			copyButton.blur();
		}, 1720);

	};

	parent.prepend(copyButton);
});


// Place all tables into a div with class "table-container"
document.querySelectorAll('table').forEach(table => {
	const parent = table.parentNode;
	if(parent.className === "table-container") return;

	const div = document.createElement('div');
	div.className = "table-container";

	parent.insertBefore(div, table);
	div.appendChild(table);
});


function scrollToAnchorLink(e) {
	e.preventDefault();
	const anchorLink = `[id='${this.hash.replace("#", "")}']`;
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


function scrollToLink(element) {
	if(!element) return;
	if(!element.href) return;

	const hashLink = window.location.href.split('#')[0] + element.getAttribute('href');

	history.replaceState(null, null, hashLink);
	navigator.clipboard.writeText(hashLink);
}


/* eslint-disable no-undef */
hljs.highlightAll();
/* eslint-enable no-undef */