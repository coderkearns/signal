# Documentation

## Usage

Import the two main functions `use` and `effect` to begin making reactive primitives.

```ts
import { use, effect } from "@coderkearns/signal"

const number1 = use(0)
const number2 = use(0)

const combinedNumbers = effect(() => number1.get() + number2.get())

effect(() => {
    console.log(`combined is now ${$combinedNumbers.get()}`)
})
```

## Examples

```ts
import { use, effect } from "@coderkearns/signal"

const firstName = use("John")
const lastName = use("Doe")

const fullName = effect(() => `${firstName.$} ${lastName.$}`)


const nameSpan = document.getElementById("name")
effect(() => {
	nameSpan.textContent = fullName.$
})
```

## API
