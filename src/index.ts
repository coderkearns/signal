export type Subscriber = () => void
type SubscribeFn = (callback: () => void) => () => void

let _root: Signal<unknown>[] | null = null

class Signal<T> extends Function {
    private _value: unknown
    private _subscribers: Array<Subscriber>

    constructor(initialValue: T) {
        super("...args", "return this._call(...args)")
        const self = this.bind(this)

        this._value = initialValue
        this._subscribers = []

        return self
    }

    _call() {
        if (_root !== null) _root.push(this)
        return this._value
    }

    set(newValue: T) {
        this._value = newValue
        this._subscribers.forEach(callback => callback())
    }

    subscribe(callback: Subscriber) {
        this._subscribers.push(callback)
        return () => {
            this._subscribers.splice(this._subscribers.indexOf(callback), 1)
        }
    }

    destroy() {}

    valueOf() {
        return this()
    }

    toString(): string {
        return `${this()}`
    }
}

const signalProto: Signal<unknown> = {} as Signal<unknown>

export function use<T>(initialValue: T): Signal<T> & (() => T) {
    return new Signal<T>(initialValue) as unknown as Signal<T> & (() => T)
}

function withRoot<T>(fn: () => T): { signals: Array<Signal<unknown>>; ret: T } {
    const oldRoot = _root
    _root = []
    const ret = fn()
    const newRoot = _root
    _root = oldRoot
    return { signals: newRoot, ret }
}

export function effect<T>(callback: Subscriber): () => void {
    const { signals } = withRoot(callback)
    const unsubscribers = signals.map(signal => signal.subscribe(callback))
    return () => unsubscribers.forEach(unsubscribe => unsubscribe())
}

export function derived<T>(deriveFn: () => T): Signal<T> {
    const { signals, ret } = withRoot(deriveFn)
    const signal = use(ret)
    const callback = () => signal.set(deriveFn())
    const unsubscribers = signals.map(signal => signal.subscribe(callback))
    signal.destroy = () => unsubscribers.forEach(unsubscribe => unsubscribe())
    return signal
}
