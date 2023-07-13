export type Subscriber = () => void
type SubscribeFn = (callback: () => void) => () => void

let _root: Signal<unknown>[] | null = null

interface Signal<T> {
    _value: T
    _subscribers: Array<Subscriber>
    
    (): T
    set(newValue: T): void
    subscribe(callback: Subscriber): () => void
    destroy(): void
    valueOf(): T
    toString(): string
}

const signalProto: Signal<unknown> = {
    set(this: Signal<unknown>, newValue: unknown) {
        this._value = newValue
        this._subscribers.forEach(callback => callback())
    },
    subscribe(this: Signal<unknown>, callback: Subscriber) {
        this._subscribers.push(callback)
        return () => {
            this._subscribers.splice(this._subscribers.indexOf(callback), 1)
        }
    },
    destroy(this: Signal<unknown>) { },
    valueOf(this: Signal<unknown>) {
        return this()
    },
    toString(this: Signal<unknown>) {
        return `${this()}`
    }
} as Signal<unknown>

export function use<T>(initialValue: T): Signal<T> {
    const signal = function(this: Signal<T>) {
        if (_root !== null) _root.push(this)
        return this._value
    }
    
    Object.assign(signal, signalProto, {
        _value:  initialValue,
        _subscribers: []  
    })
    
    return signal as Signal<T>
}

function withRoot<T>(fn: () => T): { signals: Array<Signal<unknown>>, ret: T } {
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