(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ShuffleText = factory());
}(this, (function () { 'use strict';

	/*
	 * The MIT License
	 *
	 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
	 * Visit http://clockmaker.jp/ for documentation, updates and examples.
	 *
	 * Copyright (c) 2012-2017 Yasunobu Ikeda
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	 * THE SOFTWARE.
	 */
	/**
	 * ShuffleText is random text effect class for DOM Elements.
	 * ShuffleTextã¯DOMã‚¨ãƒ¬ãƒ¡ãƒ³ãƒˆç”¨ãƒ©ãƒ³ãƒ€ãƒ ãƒ†ã‚­ã‚¹ãƒˆã‚¯ãƒ©ã‚¹ã§ã™ã€‚
	 * @author Yasunobu Ikeda
	 */
	var ShuffleText = (function () {
	    /**
	     * Constructor.
	     * @param element DOMã‚¨ãƒ¬ãƒ¡ãƒ³ãƒˆ
	     */
	    function ShuffleText(element) {
	        /**
	         * The string for random text.
	         * ãƒ©ãƒ³ãƒ€ãƒ ãƒ†ã‚­ã‚¹ãƒˆã«ç”¨ã„ã‚‹æ–‡å­—åˆ—ã§ã™ã€‚
	         * @type {string}
	         * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
	         */
	        this.sourceRandomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
	        /**
	         * The string for effect space.
	         * ç©ºç™½ã«ç”¨ã„ã‚‹æ–‡å­—åˆ—ã§ã™ã€‚
	         * @type {string}
	         * @default '-'
	         */
	        this.emptyCharacter = '-';
	        /**
	         * The milli seconds of effect time.
	         * ã‚¨ãƒ•ã‚§ã‚¯ãƒˆã®å®Ÿè¡Œæ™‚é–“ã§ã™ã€‚
	         * @type {number}
	         * @default 600
	         */
	        this.duration = 800;
	        this._isRunning = false;
	        this._originalStr = '';
	        this._originalLength = 0;
	        this._timeCurrent = 0;
	        this._timeStart = 0;
	        this._randomIndex = [];
	        this._requestAnimationFrameId = 0;
	        this._element = element;
	        this.setText(element.innerHTML);
	    }
	    /** ãƒ†ã‚­ã‚¹ãƒˆã‚’è¨­å®šã—ã¾ã™ã€‚ */
	    ShuffleText.prototype.setText = function (text) {
	        this._originalStr = text;
	        this._originalLength = text.length;
	    };
	    Object.defineProperty(ShuffleText.prototype, "isRunning", {
	        /**
	         * It is running flag. å†ç”Ÿä¸­ã‹ã©ã†ã‹ã‚’ç¤ºã™ãƒ–ãƒ¼ãƒ«å€¤ã§ã™ã€‚
	         * @returns {boolean}
	         */
	        get: function () {
	            return this.isRunning;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    /** å†ç”Ÿã‚’é–‹å§‹ã—ã¾ã™ã€‚ */
	    ShuffleText.prototype.start = function () {
	        var _this = this;
	        this.stop();
	        this._randomIndex = [];
	        var str = '';
	        for (var i = 0; i < this._originalLength; i++) {
	            var rate = i / this._originalLength;
	            this._randomIndex[i] = Math.random() * (1 - rate) + rate;
	            str += this.emptyCharacter;
	        }
	        this._timeStart = new Date().getTime();
	        this._isRunning = true;
	        this._requestAnimationFrameId = requestAnimationFrame(function () {
	            _this._onInterval();
	        });
	        this._element.innerHTML = str;
	    };
	    /** åœæ­¢ã—ã¾ã™ã€‚ */
	    ShuffleText.prototype.stop = function () {
	        this._isRunning = false;
	        cancelAnimationFrame(this._requestAnimationFrameId);
	    };
	    ShuffleText.prototype.dispose = function () {
	        this.sourceRandomCharacter = null;
	        this.emptyCharacter = null;
	        this._isRunning = false;
	        this.duration = 0;
	        this._originalStr = null;
	        this._originalLength = 0;
	        this._timeCurrent = 0;
	        this._timeStart = 0;
	        this._randomIndex = null;
	        this._element = null;
	        this._requestAnimationFrameId = 0;
	    };
	    /**
	     * ã‚¤ãƒ³ã‚¿ãƒ¼ãƒãƒ«ãƒãƒ³ãƒ‰ãƒ©ãƒ¼ã§ã™ã€‚
	     * @private
	     */
	    ShuffleText.prototype._onInterval = function () {
	        var _this = this;
	        this._timeCurrent = new Date().getTime() - this._timeStart;
	        var percent = this._timeCurrent / this.duration;
	        var str = '';
	        for (var i = 0; i < this._originalLength; i++) {
	            if (percent >= this._randomIndex[i]) {
	                str += this._originalStr.charAt(i);
	            }
	            else if (percent < this._randomIndex[i] / 3) {
	                str += this.emptyCharacter;
	            }
	            else {
	                str += this.sourceRandomCharacter.charAt(Math.floor(Math.random() * (this.sourceRandomCharacter.length)));
	            }
	        }
	        if (percent > 1) {
	            str = this._originalStr;
	            this._isRunning = false;
	        }
	        this._element.innerHTML = str;
	        if (this._isRunning === true) {
	            this._requestAnimationFrameId = requestAnimationFrame(function () {
	                _this._onInterval();
	            });
	        }
	    };
	    return ShuffleText;
	}());

	return ShuffleText;

})));
//# sourceMappingURL=shuffle-text.js.map
