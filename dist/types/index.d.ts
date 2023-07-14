export type Subscriber = () => void;
declare class Signal<T> extends Function {
    private _value;
    private _subscribers;
    constructor(initialValue: T);
    _call(): unknown;
    set(newValue: T): void;
    subscribe(callback: Subscriber): () => void;
    destroy(): void;
    valueOf(): any;
    toString(): string;
}
export declare function use<T>(initialValue: T): Signal<T> & (() => T);
export declare function effect<T>(callback: Subscriber): () => void;
export declare function derived<T>(deriveFn: () => T): Signal<T>;
export {};
