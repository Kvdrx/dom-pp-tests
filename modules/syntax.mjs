/*
	A lineage library for DOM nodes
	MIT License

	Copyright (c) 2020-2021 Amadou Ba, Sylvain Hallé
	Eckinox Média and Université du Québec à Chicoutimi

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

// Local imports

import { ComposedFunction } from "./composed-function.mjs";
import { BooleanAnd, BooleanNot, BooleanOr } from "./booleans.mjs";
import { ExistentialQuantifier, UniversalQuantifier } from "./quantifier.mjs";
import { Enumerate } from "./enumerate.mjs";
import { Addition, GreaterOrEqual, GreaterThan, IsEqualTo, LesserThan, LesserOrEqual, Substraction } from "./numbers.mjs";
import { DimensionHeight, DimensionWidth, FindBySelector } from "./web-element.mjs";

/**
 * A module defining function methods that simplify the instantiation of common
 * functions. These methods make constructors and the recurrent use of
 * {@link ComposedFunction}s implicit, thereby shortening the expression of
 * asssertions. Ultimately, the library should only expose the functions defined
 * in this module to the end user.
 */
//class Syntax {

    function And() {
        return new ComposedFunction(new BooleanAnd(arguments.length), ...arguments);
    }
    
    function Or() {
        return new ComposedFunction(new BooleanOr(arguments.length), ...arguments);
    }
    
    function Implies(op1, op2) {
        return new ComposedFunction(new BooleanOr(), new ComposedFunction(new BooleanNot(), op1), op2);
    }
    
    function Not() {
        return new ComposedFunction(new BooleanNot(), arguments[0]);
    }
    
    function ForAll() {
        if (arguments.length == 2) {
            return new UniversalQuantifier(arguments[0], new Enumerate(), arguments[1]);
        }
        return new UniversalQuantifier(arguments[0], arguments[1], arguments[2]);
    }
    
    function Exists() {
        if (arguments.length == 2) {
            return new ExistentialQuantifier(arguments[0], new Enumerate(), arguments[1]);
        }
        return new ExistentialQuantifier(arguments[0], arguments[1], arguments[2]);
    }
    
    function IsGreaterThan() {
        if (arguments.length == 0) {
            return new GreaterThan();
        }
        if (arguments.length == 2) {
            return new ComposedFunction(new GreaterThan(), arguments[0], arguments[1]);
        }
    }
    
    function IsGreaterOrEqual() {
        if (arguments.length == 0) {
            return new GreaterOrEqual();
        }
        if (arguments.length == 2) {
            return new ComposedFunction(new GreaterOrEqual(), arguments[0], arguments[1]);
        }
    }
    
    function IsLessThan() {
        if (arguments.length == 0) {
            return new LessThan();
        }
        if (arguments.length == 2) {
            return new ComposedFunction(new LesserThan(), arguments[0], arguments[1]);
        }
    }
    
    function IsLessOrEqual() {
        if (arguments.length == 0) {
            return new LesserOrEqual();
        }
        if (arguments.length == 2) {
            return new ComposedFunction(new LesserOrEqual(), arguments[0], arguments[1]);
        }
    }

    function Find(x) {
        return new FindBySelector(x);
    }

    function Width(o) {
        return new ComposedFunction(new DimensionWidth(), o);
    }

    function Height(o) {
        return new ComposedFunction(new DimensionHeight(), o);
    }

    function Equals(op1, op2) {
        return new ComposedFunction(new IsEqualTo(), op1, op2);
    }

    function Plus() {
        return new ComposedFunction(new Addition(arguments.length), ...arguments);
    }

    function Minus() {
        return new ComposedFunction(new Substraction(arguments.length), ...arguments);
    }

//}

export {
    And,
    Equals,
    Exists,
    Find,
    ForAll,
    Height,
    Implies,
    IsGreaterOrEqual,
    IsGreaterThan,
    IsLessOrEqual,
    IsLessThan,
    Minus,
    Not,
    Or,
    Plus,
    Width };