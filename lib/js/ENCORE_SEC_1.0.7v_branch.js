/*!
 * ENCORE SUPER ELEMENT CREATOR
 * Author: NATSKI
 * MIT License
 */

export function jsonElementify(elementData) {
	if (Array.isArray(elementData)) {
		return jsonMultiElementify(elementData);
	}

	let element = document.createElement(elementData.tag);

	if (elementData.innerHTML) {
		element.innerHTML = elementData.innerHTML;
	}

	if (elementData.classes) {
		if (Array.isArray(elementData.classes)) {
			for (const value of elementData.classes) {
				element.classList.add(value);
			}
		} else {
			element.classList.add(elementData.classes);
		}
	}

	if (elementData.events) {
		for (const [eventType, event] of Object.entries(elementData.events)) {
			if (event) {
				element.addEventListener(
					eventType,
					functionType(event, element),
					event.options,
				);
			}
		}
	}

	if (elementData.attributes) {
		for (const [attribute, value] of Object.entries(
			elementData.attributes,
		)) {
			if (checkExists(value)) {
				element.setAttribute(attribute, value);
			}
		}
	}

	if (elementData.dataset) {
		for (const [dataName, value] of Object.entries(elementData.dataset)) {
			if (checkExists(value)) {
				elementData.dataset[
					dataName
						.split('-')
						.map((element, index) => {
							if (!index) return element;
							return element[0].toUpperCase() + element.slice(1);
						})
						.join('')
				] = value;
			}
		}
	}

	if (elementData.children) {
		appendChildren(element, jsonElementify(elementData.children));
	}

	return element;
}

export function appendChildren(element, children) {
	if (Array.isArray(children)) {
		for (const child of children) {
			element.appendChild(child);
		}
	} else {
		element.appendChild(children);
	}
}

function jsonMultiElementify(elements) {
	let arr = [];

	for (const element of elements) {
		if (checkForKeys(element)) {
			arr.push(jsonElementify(element));
		}
	}

	return arr;
}

function checkForKeys(obj) {
	return Object.keys(obj).length !== 0 && obj.constructor === Object;
}

function functionType(event, element) {
	if (checkExists(event.var)) {
		if (Array.isArray(event.var) && event.var.length > 1) {
			if (event.var[0] === 'self') {
				return () => event.func(element, ...event.var.slice(1));
			} else if (event.var[0] === 'event') {
				return (ev) => event.func(ev, ...event.var.slice(1));
			} else {
				return () => event.func(...event.var);
			}
		} else {
			if (Array.isArray(event.var)) event.var = event.var[0];
			if (event.var === 'self') {
				return () => event.func(element);
			} else if (event.var === 'event') {
				return (ev) => event.func(ev);
			} else {
				return () => event.func(event.var);
			}
		}
	} else {
		return () => event.func();
	}
}

export function checkExists(data) {
	return undefined !== data && data !== null;
}

export function setFallback(data, fallback) {
	if (checkExists(data)) return data;
	return fallback;
}

export function elementJsonify(element) {
	let json = {};

	json.tag = element.tagName;

	if (element.attributes) {
		json.attributes = {};
		for (const attribute of element.attributes) {
			if (attribute.nodeName !== 'class') {
				json.attributes[attribute.nodeName] = attribute.nodeValue;
			}
		}
	}

	if (element.className) {
		json.classes = element.className.split(' ');
	}

	if (element.children.length > 0) {
		json.children = [];
		for (const child of element.children) {
			json.children.push(elementJsonify(child));
		}
	} else {
		json.innerHTML = element.innerHTML;
	}
	return json;
}

function itterator(items, operaton) {
	switch (w) {
	}

	if (Array.isArray(elements)) {
		for (const element of elements) {
			operaton(element);
		}
	} else {
		operaton(element);
	}
}

//
// component functions
//

export function component(data) {
	// {data, component}
	return SEC.jsonElementify(data.component(data.data));
}

export function setComponentFromValue(data) {
	setComponent();
}

export function setComponent(data) {
	// {component, data: [{}]}

	if (
		!(
			SEC.checkExists(data.component) &&
			typeof data.component === 'function'
		)
	) {
		return;
	}

	let elements = document.querySelectorAll(data.component.name);

	if (Array.isArray(elements)) {
		for (let i = 0; i < elements.length; i++) {
			if (Array.isArray(data.data)) {
				elements[i].replaceWith(component(data.data[i]));
			} else {
				elements[i].replaceWith(component(data.data));
			}
		}
	} else {
		if (Array.isArray(data.data)) {
			elements.replaceWith(component(data));
		} else {
			elements.replaceWith(component(data[0]));
		}
	}
}
