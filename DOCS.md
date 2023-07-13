# Documentation

> NOTE: signal is not yet at version 1. As such, no changelogs will be added and you should assume that each new commit will bring breaking changes or full rewrites.

## Usage

Import the two main functions `use` and `effect` to begin making reactive primitives.

```ts
import { use, effect } from "@coderkearns/signal"

// Create a signal with `use`
// You can use a type parameter or just let typescript infer it from your initial value
const name = use("World")

const nameElement = document.querySelector("span#name")

effect(() => {
	// Calling a signal as a function calls the getter.
	// You can do this anywhere, but if you do it in an `effect()`
	// or `derived()` then it will automatically track changes for you
	nameElement.textContent = name()
})

effect(() => {
	// Conversion via anything that calls `.toString()` or `.valueOf()` will automatically use the getter
    console.log(`Hello, ${name}!`)
})
```

## Examples

```ts
import { use, derived, effect } from "@coderkearns/signal"

const firstName = use("John")
const lastName = use("Doe")

// A `derived()` is like a combination of an effect and a signal: it can be
// manually set, but it will auto-set whenever a signal it depends on changes
const fullName = derived(() => `${firstName} ${lastName}`)

const nameElement = document.querySelector("span#name")
effect(() => {
	nameElement.textContent = fullName()
})
```

## API
