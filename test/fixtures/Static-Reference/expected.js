"use strict";

var $ = require("$");

var SomeParent = require("SomeParent");

var staticReference1 = require("staticReference1");

var staticRef = require("staticRef");

var staticReference2 = require("staticReference2");

/**
 * comments are left as it is
 */
var SomeClass = $.inherit(SomeParent, {
    test1: function test1() {
        staticReference1.test(); //static reference --> will be a require()
        var dynamic1 = 33; //dynamic reference  --> will remain as it is

        var s = function s() {
            staticRef.name; //works inside contexts too
            dynamic1 = 4; // this is not considered even though it is static to this scope
        };
    }
}, {
    test2: function test2() {
        staticReference2.test(); //static reference
        var dynamic2 = 33; //dynamic reference
    }
});
module.exports = SomeClass;