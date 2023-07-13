export type Subscriber = () => void;
interface Signal<T> {
    _value: T;
    _subscribers: Array<Subscriber>;
    (): T;
    set(newValue: T): void;
    subscribe(callback: Subscriber): () => void;
    destroy(): void;
    valueOf(): T;
    toString(): string;
}
export declare function use<T>(initialValue: T): Signal<T>;
export declare function effect<T>(callback: Subscriber): () => void;
export declare function derived<T>(deriveFn: () => T): Signal<T>;
export {};
