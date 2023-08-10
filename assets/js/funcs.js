const anchorCache = new Map();

function topNavMobile() {
	const x = document.getElementById("navbar");
	x.className = (x.className === "navbar") ? "navbar responsive" : "navbar";
}


/** @param {HTMLElement} element */
function updateURL(element) {
	if(!element) return;
	if(!element.href) return;

	const hashLink = window.location.href.split('#')[0] + element.getAttribute('href');

	history.replaceState(null, null, hashLink);
	navigator.clipboard.writeText(hashLink);
}


function scrollToAnchorLink(e) {
	e.preventDefault();

	const id = this.getAttribute('href').replace("#", "");
	const element = anchorCache[id] || document.getElementById(id);
	const offset = element.getBoundingClientRect().top + window.scrollY - 60;

	if(offset){
		window.scroll({
			top: offset,
			behavior: 'smooth'
		});
	}

}


function scrollToAnchorLinkOnLoad() {
	const hash = window.location.hash;

	if(hash){
		const id = hash.replace("#", "");
		const element = anchorCache[id] || document.getElementById(id);
		const offset = element.getBoundingClientRect().top + window.scrollY - 60;

		if(offset){
			window.scroll({
				top: offset,
				behavior: 'smooth'
			});
		}
	}
}


function onLoad() {
	// Make all links with class "open-in-new" open in a new tab
	document.querySelectorAll('a.open-in-new').forEach(link => {
		link.target = "_blank";
	});


	// Make all links that start with "#" scroll to the element with the id
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		const id = anchor.getAttribute('href').replace("#", "");
		anchorCache[id] = document.getElementById(id);

		anchor.addEventListener('click', scrollToAnchorLink);
	});


	// "Copy Code to Clipboard" buttons for code blocks
	document.querySelectorAll('pre code').forEach(codeBlockElement => {
		const parentElement = codeBlockElement.parentElement;

		const copyButtonElement = document.createElement('button');
		copyButtonElement.type = "button";
		copyButtonElement.ariaLabel = "Copy code to clipboard";
		copyButtonElement.innerText = "content_copy";
		copyButtonElement.className = "material-icons copy-button";
		copyButtonElement.title = "Copy code to clipboard";

		copyButtonElement.onclick = async () => {

			navigator.clipboard.writeText(codeBlockElement.innerText);
			copyButtonElement.className += " clicked";

			setTimeout(() => {
				copyButtonElement.className = "material-icons copy-button";
				copyButtonElement.blur();
			}, 2010);

		};

		parentElement.prepend(copyButtonElement);
	});


	// Place all tables, and codeblocks into a div with class "overflow-container"
	document.querySelectorAll('table:not(.overflow-container table)').forEach(tableElement => {
		const parentElement = tableElement.parentElement;

		const overflowContainerElement = document.createElement('div');
		overflowContainerElement.className = "overflow-container";

		parentElement.insertBefore(overflowContainerElement, tableElement);
		overflowContainerElement.appendChild(tableElement);
	});

	document.querySelectorAll('pre code').forEach(codeBlock => {
		const preElement = codeBlock.parentElement;
		const parentElement = preElement?.parentElement;

		if(parentElement?.className.includes("overflow-container")) return;

		const overflowContainerElement = document.createElement('div');
		overflowContainerElement.className = "overflow-container";

		parentElement.insertBefore(overflowContainerElement, preElement);
		overflowContainerElement.appendChild(preElement);
	});
}


window.onload = scrollToAnchorLinkOnLoad;


onLoad();


/* eslint-disable no-undef */
hljs.highlightAll();
/* eslint-enable no-undef */