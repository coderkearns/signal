type SubscribeFn = (callback: () => void) => () => void

let _signals: SubscribeFn[] | null = null

interface Signal<T> {
    get(): T
    /** Getter */
    readonly $: T
    set(newValue: T): void
    subscribe(callback: () => void): () => void
    destroy(): void
    valueOf(): T
    toString(): string
}

export function use<T>(value: T): Signal<T> {
    const subscribers: (() => void)[] = []

    const signal = {
        get() {
            if (_signals !== null && !(_signals.includes(signal.subscribe))) {
                _signals.push(signal.subscribe)
            }
            return value
        },
	get $() {
	    return signal.get()
	},
        set(newValue: T) {
            value = newValue
            subscribers.forEach(callback => callback())
        },
        subscribe(callback: () => void) {
            subscribers.push(callback)
            return () => {
                subscribers.splice(subscribers.indexOf(callback), 1)
            }
        },
        destroy() { },
        valueOf() {
            return signal.get()
        },
        toString() {
            return `${signal.get()}`
        }
    }

    return signal
}

export function s<T>(signal: Signal<T>): T {
    return signal.get()
}

export function effect<T>(fn: () => T): Signal<T> {
    _signals = []
    const signal = use(fn())
    const recompute = () => signal.set(fn())
    const unsubscribers = _signals.map(s => s(recompute))
    signal.destroy = () => {
        unsubscribers.forEach(u => u())
    }
    _signals = null
    return signal
}
