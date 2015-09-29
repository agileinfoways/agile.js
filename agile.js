(function () {
	"use strict";

	/** UTILITY FUNCTIONS */

	/**
	 * Validates argument type and throws exception if needed
	 * @arg any type
	 * @type string - To be passed manually eg.: number, string, bulk(for multiple args)
	 * @return string
	 */

	function typecheck(arg, type) {
		switch (type) {
			case 'string':
				if (!arg || typeof arg !== 'string') {
					throw "Data Type Error : Expecting string. Found " + typeof arg + '.';
				}
				break;
			case 'number':
				if (arg !== 0 && (!arg || typeof arg !== 'number')) {
					throw "Data Type Error : Expecting number. Found " + typeof arg + '.';
				}

				break;
			case 'array':
				if (arg !== 0 && (!arg || typeof arg !== 'number')) {
					throw "Data Type Error : Expecting number. Found " + typeof arg + '.';
				}

				break;		
			case 'bulk':
				if (!arg || !(arg instanceof Array)) {
					throw "Data Type Error : Expecting Array. Found " + typeof arg + '.';
				}
				if (arg.length === 0) {
					throw "The first argument supplied is an empty Array. Please supply array elements.";
				}

				var i;
				for (i = 0; i < arg.length; i++) {
					if (arg[i].arg === undefined) {
						throw "Missing Argument " + (i + 1) + '.';
					} else if (arg[i].expected === 'array') {
						if (!(arg[i].arg instanceof Array)) {
							throw "Data Type Error : Expecting " + arg[i].expected + " for Argument " + (i + 1) + ', but found ' + typeof arg[i].arg + ".";
						}
					} else {
						if (typeof arg[i].arg !== arg[i].expected) {
							throw "Data Type Error : Expecting " + arg[i].expected + " for Argument " + (i + 1) + ', but found ' + typeof arg[i].arg + ".";
						}
					}
				}
				break;
		}
	}

	/** VALIDATIONS FUNCTIONS */

	/**
	 * Validates if string is valid email or not
	 * @return boolean
	 */
	String.prototype.isEmail = function() {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(this.trim());
	};

	/**
	 * Returns a character from the specified ASCII value.
	 * @return character 
	 */
	function chr(asc) {
		return String.fromCharCode(asc);
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
		* Convert first letter to upper case of a string
		* @return `string`
	 */
	String.prototype.ucfirst = function() {
		var opStr = this.trim();
		return opStr.charAt(0).toUpperCase() + opStr.substr(1);
	};

	/**
	 * Compare two strings 
	 * @return number
	 */
	String.prototype.cmp = function(secondStr) {
		return this.trim().localeCompare(secondStr.trim());
	};

	/**
	 * Pad a string with the characters that are given as arguments
	 * @padCh  	string
	 * @padLen 	number - [Default 1]
	 * @padMode string - 'LEFT', 'RIGHT', 'BOTH' [Default 1]
	 * @return 	string
	 */
	String.prototype.pad = function(padCh, padLen, padMode) {
		var result = this;

		padLen = padLen || 1;
		padMode = padMode || "LEFT";
		padMode = padMode.toUpperCase();

		typecheck([{
			arg: padCh,
			expected: 'string'
		}, {
			arg: padLen,
			expected: 'number'
		}, {
			arg: padMode,
			expected: 'string'
		}], 'bulk');

		if (!(padMode === 'LEFT' || padMode === 'RIGHT' || padMode === 'BOTH')) {
			throw "Data Value Error: Expecting LEFT, RIGHT or BOTH for third argument. Found " + padMode + '.';
		}

		if (padMode === 'LEFT' || padMode === 'BOTH') {
			result = padCh.repeat(padLen) + result;
		}

		if (padMode === 'RIGHT' || padMode === 'BOTH') {
			result = result + padCh.repeat(padLen);
		}

		return result;
	};

	/**
	* Repeats a specific string till 'len' number of times
	* @param  number len - number of repetitions that user wants to have.
	* @return string 
	*/
	String.prototype.repeat = function(len) {
		return new Array(len + 1).join(this);
	};

	/**
	* Upper case first letter of the word.
	* @return `string` String with uppercase first letter of word.
	*/
	String.prototype.ucwords = function() {
		var i, strArray = this.trim().split(' ');
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
		var t;
		t = document.createElement('textarea');
		t.style.display = "none";
		t.innerHTML = this;
		return t.innerText;
	};

	/**
	 * Reverse the string
	 * @return `string`
	 */
	String.prototype.reverse = function() {
		return this.split('').reverse().join('');
	};

	/**
	 * Trims specified character from the end of th string, by default removes space
	 * @param  `string` c Character to be trimmed
	 * @return `string`
	 */
	String.prototype.rtrim = function(c) {
		if (c){
			typecheck(c, 'string');
		}
		var a = this.replace(/\s+$/, "");
		c = c ? c : "\s";
		return a.replace(new RegExp("[" + c + "]+$"), "");
	};

	/**
	 * Trims specified character from the beginning of the string, by default removes space
	 * @param  `string` c Character to be trimmed
	 * @return `string`
	 */
	String.prototype.ltrim = function(c) {
		var str = this.reverse();
		if (c){
			typecheck(c, 'string');
		}
		var a = str.replace(/\s+$/, "");
		c = c ? c : "\s";
		return a.replace(new RegExp("[" + c + "]+$"), "").reverse();
	};

	/**
	 * Returns string after the given string if bool is false else returns string before the given string.
	 * @param `needle` string which we will use as needle
	 * @param  `bool` flag which we will use to give output
	 * @return `string`
	 */
	String.prototype.strstr = function(needle,bool) {
		var pos = 0,string = this;
		string += '';
		pos = string.indexOf(needle);
		if (pos == -1) {
			throw "Needle string should not be empty!";
		} else {
			if (bool) {
				return string.substr(0, pos);
			} else {
				return string.slice(pos);
			}
		}
	};

	/**
	 * Split a string into smaller chunks.
	 * @param `length` length of chunks
	 * @param  `character` character to add at every chunklength and end
	 * @return `string`
	 */
	String.prototype.chunk_split = function(length, character) {
		length = parseInt(length, 10) || 76;
		character = character || '\r\n';
		if (length < 1) {
			return false;
		}
		return this.match(new RegExp('.{0,' + length + '}', 'g')).join(character);
	};

	/**
	 * Returns shuffled string
	 * @return `string`
	 */
	String.prototype.shuffle = function() {
		var same, single = true,
			op;

		function shuffle(str) {
			var a = str.split(""),
				n = a.length,
				i, j, tmp;
			if (n == 1) {
				return a.join("");
			} else {
				single = false;
				for (i = n - 1; i > 0; i--) {
					j = Math.floor(Math.random() * (i + 1));
					tmp = a[i];
					a[i] = a[j];
					a[j] = tmp;
				}
				return a.join("").trim();
			}
		}

		op = shuffle(this);
		if (!single) {
			if (op == this) {
				same = true;
			}
		}
		if (same) {
			return this.shuffle();
		}
		return op;
	};

	/**
	* Returns string with '<br />' or '<br>' inserted before all newlines (\r\n, \n\r, \n and \r).
	* @return `string`
	*/
	String.prototype.nl2br = function(is_xhtml) {
		return this.replace(/\r\n|\n\r|\n|\r|/g, "<br" + (typeof is_xhtml !== undefined && is_xhtml === true ? ' /' : '') + ">");
	};

	/**
	 * Replaces a part of a string with another string.
	 * @param `string` specified string to replace
	 * @param `replace` string / character to replace
	 * @param `start` start replacing at the specified position. If the start parameter is a negative number and length is less than or equal to start, length becomes 0.
	 * @param `length` a length of string to be replaced.
	 * @return `string`
	 */
	String.prototype.substr_replace = function(replace, start, length) {
		if (!start) {
			throw "Please enter starting index.";
		}

		if (start < 0) {
			start = start + this.length;
		}

		length = length !== undefined ? length : this.length;
		if (length < 0) {
			length = length + this.length - start;
		}

		if (start > this.length) {
			throw "Please enter valid index.";
		}
		return this.slice(0, start) + replace.substr(0, length) + replace.slice(length) + this.slice(start + length);

	};

	/** ARRAY FUNCTIONS */

	/**
	 * Get Unique elements from array
	 * @return [array] Array of unique elements
	 */
	Array.prototype.unique = function() {
		var u = {},
			a = [],
			i,
			l;
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
			i, status, j;
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
			k, j;
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
			i, j;
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
			i, j;
		for (i = 0, j = this.length; i < j; i++) {
			obj[this[i][key]] = (obj[this[i][key]] || 0) + 1;
		}
		return obj;
	};

	/**
	 * Find first index of a value based on key for associative array
	 * @param  `string` 		value 	String to be find index of
	 * @param  `string|number` 	key  	Associative array key
	 * @return `number`       			First Index where the element is found
	 */
	Array.prototype.indexOfAssoc = function(value, key) {

		if (!key && key !== 0) {
			throw "Please provide a key to find index of.";
		}

		var i;
		for (i = 0; i < this.length; i++) {

			typecheck([{arg:this[i], expected:'object'}], 'bulk');

			if (this[i][key] === value) {
				return i;
			}
		}
	};

	/**
	 * Find last index of a value based on key for associative array
	 */
	Array.prototype.lastIndexOfAssoc = function(value, key) {
		typecheck(key, 'string');
		
		var i;

		if (!key && key !== 0) {
			throw "Please provide a key to find index of.";
		}
		
		for (i = this.length - 1; i >= 0; i--) {
			if (this[i][key] === value) {
				return i;
			}
		}
	};

}());
