[selenidejs](../README.md) > [BrowserWebElementByLocator](../classes/browserwebelementbylocator.md)

# Class: BrowserWebElementByLocator

## Hierarchy

**BrowserWebElementByLocator**

## Implements

* [Locator](../interfaces/locator.md)<`Promise`<`WebElement`>>

## Index

### Constructors

* [constructor](browserwebelementbylocator.md#constructor)

### Properties

* [browser](browserwebelementbylocator.md#browser)
* [by](browserwebelementbylocator.md#by)

### Methods

* [find](browserwebelementbylocator.md#find)
* [toString](browserwebelementbylocator.md#tostring)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BrowserWebElementByLocator**(by: *`By`*, browser: *[Browser](browser.md)*): [BrowserWebElementByLocator](browserwebelementbylocator.md)

*Defined in [locators/BrowserWebElementByLocator.ts:21](https://github.com/KnowledgeExpert/selenidejs/blob/master/lib/locators/BrowserWebElementByLocator.ts#L21)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| by | `By` |
| browser | [Browser](browser.md) |

**Returns:** [BrowserWebElementByLocator](browserwebelementbylocator.md)

___

## Properties

<a id="browser"></a>

### `<Private>` browser

**● browser**: *[Browser](browser.md)*

*Defined in [locators/BrowserWebElementByLocator.ts:24](https://github.com/KnowledgeExpert/selenidejs/blob/master/lib/locators/BrowserWebElementByLocator.ts#L24)*

___
<a id="by"></a>

### `<Private>` by

**● by**: *`By`*

*Defined in [locators/BrowserWebElementByLocator.ts:23](https://github.com/KnowledgeExpert/selenidejs/blob/master/lib/locators/BrowserWebElementByLocator.ts#L23)*

___

## Methods

<a id="find"></a>

###  find

▸ **find**(): `Promise`<`WebElement`>

*Implementation of [Locator](../interfaces/locator.md).[find](../interfaces/locator.md#find)*

*Defined in [locators/BrowserWebElementByLocator.ts:29](https://github.com/KnowledgeExpert/selenidejs/blob/master/lib/locators/BrowserWebElementByLocator.ts#L29)*

**Returns:** `Promise`<`WebElement`>

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [locators/BrowserWebElementByLocator.ts:33](https://github.com/KnowledgeExpert/selenidejs/blob/master/lib/locators/BrowserWebElementByLocator.ts#L33)*

**Returns:** `string`

___

