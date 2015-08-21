function typecheck(arg, type) {
	switch (type) {
		case 'string':
			if (!arg || typeof arg !== 'string') {
				throw "Expecting string. Found " + typeof arg + '.';
			}
			break;
		case 'number':
		if (!arg || typeof arg !== 'number') {
			throw "Expecting number. Found " + typeof arg + '.';
		}
		break;
		default:
			break;

	}
}

/** STRING FUNCTIONS */

/**
 * Convert first letter to lower case of a string
 * @return `string`
 */
String.prototype.lcfirst = function() {
	var opStr = this.trim();
	return opStr.charAt(0).toLowerCase() + opStr.substr(1);
};


/**
 * Upper case first letter of the word.
 * @return `string` String with uppercase first letter of word.
 */
String.prototype.ucwords = function() {

	var strArray = this.trim().split(' ');
	for (i = 0; i < strArray.length; i++) {
		strArray[i] = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
	}
	return strArray.join(" ");
};

/**
 * Convert special characters to HTML entities
 * @param  `string` The string being converted. 
 * @return `object` The converted string. 
 */

String.prototype.htmlspecialchars = function() {
	var map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};

	return this.replace(/[&<>"']/g, function(m) {
		return map[m];
	});

};

/**
 * Converts html entities to characters
 * @return `string`
 */
String.prototype.html_entities_decode = function() {
	var t, x;
	t = document.createElement('textarea');
	t.style.display = "none";
	t.innerHTML = this;
	return t.innerText;
};

/** ARRAY FUNCTIONS */

/**
 * Get Unique elements from array
 * @return [array] Array of unique elements
 */
Array.prototype.unique = function() {
	var u = {},
		a = [],
		i;
	for (i = 0, l = this.length; i < l; ++i) {
		if (u.hasOwnProperty(this[i])) {
			continue;
		}
		a.push(this[i]);
		u[this[i]] = 1;
	}
	return a;
};

/**
 * If array has duplicate elements it will return true else false
 * @return {Boolean} 
 */
Array.prototype.has_duplicates = function() {
	var obj = {},
		i, status;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i]] = (obj[this[i]] || 0) + 1;
	}

	for (var key in obj) {
		if (obj[key] > 1) {
			status = true;
			break;
		}
	}
	return status;
};

/**
 * If array has duplicate elements in specified key it will return true else false
 * @return {Boolean} 
 */
Array.prototype.has_duplicates_assoc = function(key) {

	typecheck(key, 'string');

	var obj = {},
		i, status = false,
		k;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i][key]] = (obj[this[i][key]] || 0) + 1;
	}

	for (k in obj) {
		if (obj[k] > 1) {
			status = true;
			break;
		}
	}
	return status;
};

/**
 * Finds duplicates from one dimention array
 * @return `object` Duplicate elements containing their occurences
 */
Array.prototype.duplicates = function() {
	var obj = {},
		i;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i]] = (obj[this[i]] || 0) + 1;
	}

	return obj;
};

/**
 * Finds duplicates from two dimention array based on key provided
 * @param  `string` key Used to find duplicates of same key
 * @return `object`     Duplicate elements containing their occurences
 */
Array.prototype.duplicates_assoc = function(key) {

	typecheck(key, 'string');

	if (!key) {
		throw "Please provide a key to find duplicates.";
	}
	var obj = {},
		i;
	for (i = 0, j = this.length; i < j; i++) {
		obj[this[i][key]] = (obj[this[i][key]] || 0) + 1;
	}
	return obj;
};

/**
 * Returns shuffled string
 * @return `string`
 */
String.prototype.shuffle = function () {
	var same, single = true, op;
	function shuffle(str){
		var a = str.split(""), n = a.length, i, j, temp;
		if(n == 1){
			return a.join("");
		} else{
			single = false;
			for(i = n - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				tmp = a[i];
				a[i] = a[j];
				a[j] = tmp;
			}
			return a.join("").trim();
		}
	}

	op = shuffle(this);
	if(!single){
		if(op == this){
			same = true;
		}
	}
	if(same){
		return this.shuffle();
	}
	return op;
};