/// <reference types="node" />
import { Element } from "./element";
import { ActionSequence, By, WebDriver } from "selenium-webdriver";
import { Driver } from "./driver";
import { Configuration } from "./config/configuration";
import { Collection } from "./collection";
import { DriverCondition } from "../conditions/driverCondition";
export declare namespace Browser {
    let selenideDriver: Driver;
    let config: Configuration;
    function setDriver(driver: WebDriver | Driver, configuration?: Configuration): void;
    function get(url: string): Promise<void>;
    function close(): Promise<void>;
    function quit(): Promise<void>;
    function url(): Promise<string>;
    function title(): Promise<string>;
    function pageSource(): Promise<string>;
    function screenshot(): Promise<Buffer>;
    function resizeWindow(width: number, height: number): Promise<void>;
    function actions(): ActionSequence;
    function element(cssOrXpathOrBy: string | By): Element;
    function all(cssOrXpathOrBy: string | By): Collection;
    function should(condition: DriverCondition, timeout?: number): Promise<Driver>;
    function shouldNot(condition: DriverCondition, timeout?: number): Promise<Driver>;
    function is(condition: DriverCondition, timeout?: number): Promise<boolean>;
    function isNot(condition: DriverCondition, timeout?: number): Promise<boolean>;
    function executeScript(script: string | Function, ...args: any[]): Promise<{}>;
    function nextTab(): Promise<void>;
    function previousTab(): Promise<void>;
    function switchToFrame(frameElement: Element): Promise<void>;
    function switchToDefaultFrame(): Promise<void>;
    function clearCacheAndCookies(): Promise<void>;
}