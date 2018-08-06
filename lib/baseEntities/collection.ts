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

import {Locator} from './locators/locator';
import {ByIndexedWebElementLocator} from './locators/byIndexedWebElementLocator';
import {ByFilteredWebElementsLocator} from './locators/byFilteredWebElementsLocator';
import {WebElement} from 'selenium-webdriver';
import {Element} from "./element";
import {Driver} from "./driver";
import {Wait} from "./wait";
import {CollectionCondition} from "../conditions/collectionCondition";
import {Condition} from "../conditions/condition";
import {ElementCondition} from "../conditions/elementCondition";


export class Collection {

    readonly driver: Driver;
    private readonly locator: Locator<Promise<WebElement[]>>;
    private readonly wait: Wait<Collection>;

    constructor(locator: Locator<Promise<WebElement[]>>, driver: Driver) {
        this.locator = locator;
        this.driver = driver;
        this.wait = new Wait(this, driver.config);
    }

    async should(condition: CollectionCondition, timeout?: number): Promise<Collection> {
        return timeout
            ? await this.wait.shouldMatch(condition, timeout)
            : await this.wait.shouldMatch(condition);
    }

    async shouldNot(condition: CollectionCondition, timeout?: number): Promise<Collection> {
        return await this.should(Condition.not(condition), timeout);
    }

    async is(condition: CollectionCondition, timeout?: number): Promise<boolean> {
        return timeout
            ? await this.wait.isMatch(condition, timeout)
            : await this.wait.isMatch(condition);
    }

    async isNot(condition: CollectionCondition, timeout?: number): Promise<boolean> {
        return await this.is(Condition.not(condition), timeout);
    }

    get(index: number): Element {
        return new Element(new ByIndexedWebElementLocator(index, this), this.driver);
    }

    first(): Element {
        return this.get(0);
    }

    filter(condition: ElementCondition): Collection {
        return new Collection(new ByFilteredWebElementsLocator(condition, this), this.driver);
    }

    filterBy(condition: ElementCondition): Collection {
        return this.filter(condition);
    }

    findBy(condition: ElementCondition): Element {
        return new Collection(new ByFilteredWebElementsLocator(condition, this), this.driver)
            .get(0);
    }

    async size(): Promise<number> {
        return (await this.getWebElements()).length;
    }

    async count(): Promise<number> {
        return await this.size();
    }

    async getWebElements(): Promise<WebElement[]> {
        return await this.locator.find();
    }

    toString() {
        return this.locator.toString();
    }
}
//
// export function all(locator: string | By): SelenideCollection {
//     return new SelenideCollection(new ByWebElementsLocator(typeof locator === 'string'
//         ? locator.includes('/') ? With.xpath(locator) : With.css(locator)
//         : locator));
// }