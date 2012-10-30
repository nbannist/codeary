	/*
	Cragnon Javascript Library
	set up is similar to how jQuery sets it's self up

	[SIP] = still in progress

	TODO: replace document/element.querySelector[All]() 
		with a function that can be overridden for browsers 
		that don't have support for qSA.
*/

(function (window, undefined) {
	"use strict";

	var doc = window.document, // shortcut/alias 
		cragLib = function (selector, context, options) { // cragnon function
			return new cragLib.prototype.init(selector, context, options); // make a new object here so the dev doesn't need to use "new"
		},
		__; // double underscore // local alias

		cragLib.prototype = {
			init: function (selector, context, options) {
				// TODO: conditions that may change selector, context, and even options before sending it to makeCragnon()
				return cragLib.prototype.makeCragnon(selector, context, options);
			},

			// [SIP]
			makeCragnon: function (selector, context, options) {
				var self = this,
					elements = [];

				if (!context) {
					//console.log('context is undefined');
					context = doc;
				} //

				// string; need to make a cragnon object
				if (typeof context === 'string') {
					// selector should be prepended with the context
					//console.log('context is a string (selector) ');
					self.selector = context + ' ' + selector;
					self.context = doc;
				} // cragnon object; get selector;
				else if (__.isCragnon(context)) {
					//console.log('context is a cragnon obj');
					self.selector = context.selector + ' ' + selector;
					self.context = doc;
				} // node (element || document)
				else if (context.nodeType) {
					//console.log('context is an element || window.document');
					self.selector = selector;
					self.context = context; // element should be the context
				}
				else { // default is the document;
					//console.log('context is set to doc');
					self.context = doc;
					self.selector = selector;
				}

				if (self.context && self.selector) {
					// elements = self.context.querySelectorAll(self.selector);
					elements = self.selectAll(self.selector, self.context);
					self.elements = __.nodeListToArray(elements);
				} 
				else {
					self.elements = null;
				}
				

				return self;
			},

			// [SIP]
			// find descendents within the current context (this.context || document);
			// find is normally a "findAll()"
			find: function (selector, options) {
				var self = __.clone(this),
					elements = [];

				self.context = this.context || doc;
				self.selector = self.selector + ' ' + selector;
				// elements = self.context.querySelectorAll(self.selector);
				elements = self.selectAll(self.selector, self.context);
				self.elements = __.nodeListToArray(elements);

				return self;
			},

			// more descriptive version.
			findAll: function (selector, options) {
				return find(selector, options);
			},

			// only returns up to one (if there are any to begin with)
			findFirst: function (selector, options) {},

			// This is used in place of document.querySelectAll()/element.querySelectAll()
			// This is so it can be overriden and replaced for browsers/contexts that don't have
			// those functions available.
			selectAll: function (selector, context) {
				if (!context) {
					context = doc;
				}
				return context.querySelectorAll(selector);
			},
			/* 
			other select functions?
			select: function () {},
			selectFirst: function () {},
			selectLast: function () {},
			*/

			context: doc, // default is window.document; should change to be context of previous  
			constructor: '[object cragnon]',
			elements: null,
			length: 0,

			//[OK] NodeLists aren't regular arrays so we copy the elements to a clean array.
			nodeListToArray: function (nodeList) {
				var i = 0, 
					newArray = [];

				for (i = 0; i < nodeList.length; i++) {
					newArray.push(nodeList[i]);
				}
				newArray = __.removeDuplicateNodes(newArray);

				return newArray;
			},
			removeDuplicateNodes: function (elementArray) {
				/* TEST */
				var i = 0,
					k = 0,
					e, // elements; same as nodes really, just needed a different name
					n; // nodes

				for (i = 0; i < elementArray.length; i++) {
					e = elementArray[i]; // element

					for ( ; k < elementArray.length; k++) {
						
						if (i !== k) { // make sure we're not looking at the same index
							n = elementArray[k]; // node

							if (n === e) {
								console.log('Samesies!');
								console.log('i[' + i + ']/k[' + k + ']');
								console.dir(e);
								console.dir(n);
								elementArray.splice(i, 1);
							}
						}
					}
					k = 0;
				}
				return elementArray;
			},

			//[OK] clone object
			clone: function (obj) {
				var copy,
					prop,
					value,
					i;

				if (obj && obj.nodeType) {
					return obj.cloneNode(false); // not deep; default is deep, which is really heavy.
				}

				if (obj === null || typeof obj === 'undefined' || typeof obj !== 'object') {
					// NOT null, undefined, Object or Object Array.
					// Should be Number, String, Boolean;
					// these aren't passed by reference (odd that strings aren't but whatever) so just return them.
					return obj;
				}

				if (__.isArray(obj)) {
					copy = []; // initialize a new empty Array Object

					for (i = 0; i < obj.length; i++) {
						copy[i] = __.clone(obj[i]);
					}
					return copy;
				}

				if (__.isObject(obj)) {
					copy = {}; // initialize a new empty Object

					for (prop in obj) {
						if (obj.hasOwnProperty(prop)) {
							copy[prop] = __.clone(obj[prop]);
						}
					}
					return copy;
				}
				return undefined; // be explicit 
			},

			//[OK] isNumber -- is the given value a number?
			isNumber: function (value) { 
				// "Javascript: The Good Parts", 'NaN', page 105, by Douglas Crockford 
				return typeof value === 'number' && isFinite(value);
			},

			//[OK] is it a real Object? (not null or an Array)
			isObject: function (obj) { 
				// "Javascript: The Good Parts", 'Confusion', page 61, by Douglas Crockford
				// using the simple version for detecting Arrays but flipping the last part 
				// to make sure it is *not* an array.
				return obj && typeof obj === 'object' && obj.constructor !== Array;
			},

			//[OK] is it an array Object?
			isArray: function (value) { 
				// "Javascript: The Good Parts", 'Confusion', page 61, by Douglas Crockford
				// probably don't need the functionality, 
				// but I'm using the version that can detect Arrays made in a different frame or window.
				return value && typeof value === 'object' && typeof value.length === 'number' && 
						typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
				// other, simpler version
				/* return value && typeof value === 'object' && value.constructor === Array; */
			},

			//[OK] // is nodes a NodeList object?
			isNodeList: function (nodes) {
				// credit: http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
				var result = Object.prototype.toString.call(nodes);

				if (typeof nodes === 'object' && 
					/^\[object (HTMLCollection|NodeList|Object)\]$/.test(result) && // HTMLCollection/Object must be used in non-webkit browsers.
					nodes.hasOwnProperty('length') &&
					(nodes.length === 0 || (typeof nodes[0] === "object" && nodes[0].nodeType > 0))) {
					return true;
				}
				return false; //...otherwise...
			},

			//[OK] checks if the object is a cragnon object (true) or not (false)
			isCragnon: function (obj) {
				if (typeof obj === 'object' && obj.constructor &&
					obj.constructor === '[object cragnon]') {
					return true;
				}
				return false;
			},

			// given an element returns a CSS selector as specific as it can be 
			// (or that you ask for) // not yet coded.
			selectorFromElement: function (element, options) {
				var selector = '', 
					id = '', 
					classes = '',
					attributes = '',
					classRegEx = /[ ]/gi;

				if (element.nodeType && element !== window.document) {
					selector = element.tagName.toLowerCase(); 

					// add ID
					if (element.id && element.id !== '') {
						// id
						selector = selector + '#' + element.id; // (like the Highlander, there can only be one.)
						// TODO: catch if ID is illegal?
					}
					// add class(es)
					if (element.className && element.className !== '') {
						// className
						classes = element.className.replace(classRegEx, '.');
						selector = selector + '.' + classes;
					}
					return selector;
				} // if element === document, then return empty string.
				else {
					return '';
				}
			},

			// Changing Styles
			// styles(properties)
			// @properties can be an object with properties and values we should change: 
			// {"border-radius": "5px", ...},
			// or an array of strings of css properties whose values we should return.
			// ["border-radius", "width", "height"] --> 
			// {"border-radius": :5px", "width": "100px", "height": "200px"}
			styles: function (properties) {
				// this just loops through the properties and calls style(property, value)
				var self = this,
					el = {},
					arrayIndex = 0,
					values = [],
					property = "",
					value = "";

				if (__.isObject(properties)) {
					for (property in properties) {
						if (properties.hasOwnProperty(property)) {
							// call style(property, value)
							if (properties[property]) {
								value = properties[property];
								self.style(property, value); // sets
							}
							else {
								value = self.style(property); // returns {"property": "value"}
								values.push(value);
							}
						}
					}
				}
				else if (__.isArray(properties)) {
					for (arrayIndex = 0; arrayIndex < properties.length; arrayIndex++) {
						if (typeof properties[arrayIndex] === 'string') {
							property = properties[arrayIndex];
							value = self.style(property);
							values.push(value);
						}
						else if (__.isObject(properties[arrayIndex])) {
							for (property in properties[arrayIndex]) {
								// filter out possible inherited properties
								if (properties[arrayIndex].hasOwnProperty(property)) {
									// check to make sure explicitly not undefined and not null 
									// zero is falsy so we don't want to make the condition generic
									if (typeof properties[arrayIndex][property] !== 'undefined' && properties[arrayIndex][property] !== null) {
										self.style(property, properties[arrayIndex][property]);
									}
									else {
										values.push(JSON.parse('{"' + property + '": "' + self.style(property) + '"}'));
									}
								}
							}
						}
					}
				}

				if (values.length > 0) {
					return values;
				}
				// return self if only setting 
				return self;
			},

			// for changing/returning a single style
			// property is a string, value is of the appropriate type 
			style: function (property, value) {
				var self = this,
					el = {},
					elementIndex = 0,
					values = [];

				if (self.elements.length > 0) {
					// console.log('loop through elements');
					for (elementIndex = 0; elementIndex < self.elements.length; elementIndex++) {
						el = self.elements[elementIndex]; // alias
						if (el.nodeType) { // is an element?
							if (typeof value === 'undefined' || value === null) { // get/return value
								values.push(JSON.parse('{"' + property + '": "' + document.defaultView.getComputedStyle(el, null).getPropertyValue(property) + '"}'));
							} // set value instead
							else {
								el.style[property] = value;
							}
						}
					}
				}

				if (values.length > 1) {
					return values;
				} else if (values.length > 0) {
					return values[0]; // more than 0 but less than 2: only return first item
				}

				return self;
			}
			// , ... more functions!

		};

		// methods for uninitialized cragnon object (e.g., "_." or "cragnon." )
		// methods that would be useful even if you don't have an immediate 
		// need to operate on elements
		cragLib.clone = cragLib.prototype.clone;
		cragLib.isArray = cragLib.prototype.isArray;
		cragLib.isCragnon = cragLib.prototype.isCragnon;
		cragLib.isNodeList = cragLib.prototype.isNodeList;
		cragLib.isNumber = cragLib.prototype.isNumber;
		cragLib.isObject = cragLib.prototype.isObject;
		cragLib.makeCragnon = cragLib.prototype.makeCragnon;
		cragLib.selectorFromElement = cragLib.prototype.selectorFromElement;
		

	// shortcut so init()'s prototype is the same as cragnon's prototype
	// so when init() is run, you get a new cragnon (cragLib) object
	cragLib.prototype.init.prototype = cragLib.prototype;
	__ = cragLib.prototype; // alias; double-underscore


	window.cragnon = window._ = cragLib;
} (window || this));

