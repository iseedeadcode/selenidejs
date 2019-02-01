"use strict";
// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
const conditionDoesNotMatchError_1 = require("./errors/conditionDoesNotMatchError");
const wait_1 = require("./wait");
const queries_1 = require("./refactor/queries");
const utils_1 = require("./utils");
var lambda = utils_1.Utils.lambda;
var Conditions;
(function (Conditions) {
    /* tslint:disable:object-literal-shorthand */
    /* tslint:disable:no-invalid-this */
    /* tslint:disable:only-arrow-functions */
    function throwIfNot(reason, predicate) {
        return (actual) => {
            if (predicate(actual)) {
                return true;
            }
            else {
                throw new Error(`${reason}: ${actual}`);
            }
        };
    }
    let predicate;
    (function (predicate) {
        predicate.equals = (expected) => (actual) => actual === expected;
        predicate.isMoreThan = (expected) => (actual) => actual > expected;
        predicate.isLessThan = (expected) => (actual) => actual < expected;
        predicate.includes = (expected) => (actual) => actual.includes(expected);
        predicate.includesWord = (expected) => (actual) => actual.split(' ').includes(expected);
        predicate.arrayCompareBy = (f) => ([x, ...xs]) => ([y, ...ys]) => x === undefined && y === undefined
            ? true
            : Boolean(f(x)(y)) && predicate.arrayCompareBy(f)(xs)(ys);
        predicate.equalsToArray = predicate.arrayCompareBy(predicate.equals);
        predicate.equalsByContainsToArray = predicate.arrayCompareBy(predicate.includes);
    })(predicate || (predicate = {}));
    function described(predicate) {
        const condition = async (entity) => {
            const value = await predicate(entity);
            if (!value) {
                throw new conditionDoesNotMatchError_1.ConditionDoesNotMatchError(`${predicate}? = ${value}`);
            }
            return value;
        };
        condition.toString = () => predicate.toString();
        return condition;
    }
    /* todo: check the following style of implementation:

    function described<E>(description: string, predicate: Condition<E>) {
        const condition = (entity: E) => predicate(entity)
                .then(value => {
                    if (!value) {
                        throw new Error('false');
                    }
                    return value;
                })
                .catch(error => { throw new FailedToMatchConditionWithReasonError(description, error); });
        condition.toString = () => description; // todo: `Entity ${entity} ${description}` ?
        return condition;
    }
     */
    let element;
    (function (element_1) {
        // todo: isVisible vs visible, etc.
        element_1.isVisible = described(queries_1.query.element.isVisible);
        element_1.isHidden = wait_1.Condition.not(element_1.isVisible, 'is hidden');
        element_1.hasVisibleElement = (by) => described(lambda(`has visible element located by ${by}`, async (element) => element.element(by).matches(element_1.isVisible) // todo: should we move it to query.element.here?
        ));
        element_1.hasAttribute = (name) => described(queries_1.query.element.hasAttribute(name));
        element_1.isSelected = element_1.hasAttribute('elementIsSelected');
        element_1.isEnabled = described(queries_1.query.element.isEnabled);
        element_1.isDisabled = wait_1.Condition.not(element_1.isEnabled, 'is disabled');
        element_1.isPresent = described(queries_1.query.element.isPresent);
        element_1.isAbsent = wait_1.Condition.not(element_1.isPresent, 'is absent');
        element_1.isFocused = described(queries_1.query.element.isFocused);
        // todo: condition... should it be Promise<boolean> or as currently Promise<boolean | throws } ?
        function hasText(text) {
            return described(lambda(`has text: ${text}`, async (element) => queries_1.query.element.text(element).then(throwIfNot('actual text', predicate.includes(text)) // todo: is it possible to refactor
            // to same style as query.element.includesText?
            )));
        }
        element_1.hasText = hasText;
        function hasExactText(text) {
            return described(lambda(`has exact text: ${text}`, async (element) => queries_1.query.element.text(element).then(throwIfNot('actual text', predicate.equals(text)))));
        }
        element_1.hasExactText = hasExactText;
        function hasAttributeWithValue(name, value) {
            return described(lambda(`has attribute '${name}' with value '${value}'`, async (element) => queries_1.query.element.attribute(name)(element).then(throwIfNot('actual value', predicate.equals(value)))));
        }
        element_1.hasAttributeWithValue = hasAttributeWithValue;
        function hasAttributeWithValueContaining(name, partialValue) {
            return described(lambda(`has attribute '${name}' with value '${partialValue}'`, async (element) => queries_1.query.element.attribute(name)(element).then(throwIfNot('actual value', predicate.includes(partialValue)))));
        }
        element_1.hasAttributeWithValueContaining = hasAttributeWithValueContaining;
        function hasCssClass(cssClass) {
            return described(lambda(`has css class '${cssClass}'`, async (element) => queries_1.query.element.attribute('class')(element).then(throwIfNot('actual class attribute value', predicate.includesWord(cssClass)))));
        }
        element_1.hasCssClass = hasCssClass;
    })(element = Conditions.element || (Conditions.element = {}));
    let collection;
    (function (collection_1) {
        function hasSize(size) {
            return described(lambda(`has size ${size}`, async (collection) => collection.size().then(throwIfNot('actual size', predicate.equals(size)))));
        }
        collection_1.hasSize = hasSize;
        function hasSizeMoreThan(size) {
            return described(lambda(`has size more than ${size}`, async (collection) => collection.size().then(throwIfNot('actual size', predicate.isMoreThan(size)))));
        }
        collection_1.hasSizeMoreThan = hasSizeMoreThan;
        function hasSizeLessThan(size) {
            return described(lambda(`has size less than ${size}`, async (collection) => collection.size().then(throwIfNot('actual size', predicate.isLessThan(size)))));
        }
        collection_1.hasSizeLessThan = hasSizeLessThan;
        function hasTexts(texts) {
            return described(lambda(`has texts ${texts}`, async (collection) => queries_1.query.collection.texts(collection).then(throwIfNot('actual texts', predicate.equalsByContainsToArray(texts)))));
        }
        collection_1.hasTexts = hasTexts;
        function hasExactTexts(texts) {
            return described(lambda(`has exact texts ${texts}`, async (collection) => queries_1.query.collection.texts(collection).then(throwIfNot('actual texts', predicate.equalsByContainsToArray(texts)))));
        }
        collection_1.hasExactTexts = hasExactTexts;
    })(collection = Conditions.collection || (Conditions.collection = {}));
    let browser;
    (function (browser_1) {
        function hasUrlContaining(partialUrl) {
            return described(lambda(`has url containing ${partialUrl}`, async (browser) => queries_1.query.browser.url(browser).then(throwIfNot('actual url', predicate.includes(partialUrl)))));
        }
        browser_1.hasUrlContaining = hasUrlContaining;
        function hasUrl(url) {
            return described(lambda(`has url ${url}`, async (browser) => queries_1.query.browser.url(browser).then(throwIfNot('actual url', predicate.equals(url)))));
        }
        browser_1.hasUrl = hasUrl;
        function hasTabsNumber(num) {
            return described(lambda(`has tabs number ${num}`, async (browser) => queries_1.query.browser.tabsNumber(browser).then(throwIfNot('actual tabs number', predicate.equals(num)))));
        }
        browser_1.hasTabsNumber = hasTabsNumber;
        function hasTabsNumberMoreThan(num) {
            return described(lambda(`has tabs number more than ${num}`, async (browser) => queries_1.query.browser.tabsNumber(browser).then(throwIfNot('actual tabs number', predicate.isMoreThan(num)))));
        }
        browser_1.hasTabsNumberMoreThan = hasTabsNumberMoreThan;
        function hasTabsNumberLessThan(num) {
            return described(lambda(`has tabs number less than ${num}`, async (browser) => queries_1.query.browser.tabsNumber(browser).then(throwIfNot('actual tabs number', predicate.isLessThan(num)))));
        }
        browser_1.hasTabsNumberLessThan = hasTabsNumberLessThan;
    })(browser = Conditions.browser || (Conditions.browser = {}));
})(Conditions = exports.Conditions || (exports.Conditions = {}));
//# sourceMappingURL=conditions.js.map