interface Signal<T> {
    get(): T;
    /** Getter */
    readonly $: T;
    set(newValue: T): void;
    subscribe(callback: () => void): () => void;
    destroy(): void;
    valueOf(): T;
    toString(): string;
}
export declare function use<T>(value: T): Signal<T>;
export declare function s<T>(signal: Signal<T>): T;
export declare function effect<T>(fn: () => T): Signal<T>;
export {};
