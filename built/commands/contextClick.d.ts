import { Element } from '../baseEntities/element';
import { Command } from './command';
export declare class ContextClick implements Command<Element> {
    perform(element: Element, ...args: any[]): Promise<void>;
}
