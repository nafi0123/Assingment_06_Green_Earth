## 1. Difference between `var`, `let`, and `const`

### var:
- Has function scope or global scope.
- Can be updated and re-declared within the same scope.
- Can be declared without initialization, default value is `undefined` if accessed before initialization.
- Variables declared with `var` are **hoisted**, meaning the declaration is moved to the top, but the value remains undefined until initialized.

### let:
- Has block scope (works only inside `{ }`).
- Can be updated but **cannot be re-declared** in the same scope.
- Can be declared without initialization, but accessing it before initialization throws a **ReferenceError**.
- `let` is hoisted but stays in the **Temporal Dead Zone (TDZ)** until initialized.

### const:
- Has block scope.
- Cannot be updated or re-declared.
- Must be initialized at the time of declaration, otherwise it will throw an error.
- Like `let`, `const` is hoisted but stays in the **Temporal Dead Zone (TDZ)** until initialized.

---

## 2. Difference between `map()`, `forEach()`, and `filter()`

### forEach()
- Used to iterate over an array.
- Executes a function for each element.
- Does not return a new array → it always returns `undefined`.

### map()
- Used to iterate over an array.
- Executes a function for each element.
- Returns a **new array** with modified values.
- Best when you want to transform data into a new array.

### filter()
- Used to filter out elements based on a condition.
- Returns a **new array** with only those elements that pass the condition (`true`).
- Best when you need a subset of data.

---

## 3. Arrow Functions in ES6

- Arrow functions (`=>`) are a shorter syntax for writing functions.
- Mostly used for concise code, especially in callbacks (like `map`, `forEach`).

---

## 4. Destructuring Assignment in ES6

- Destructuring allows you to **unpack values** from arrays or objects into separate variables.
- Makes code cleaner and easier to read.

Example:
```js
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name, age); 
```

---

## 5. Template Literals in ES6

- Template literals use **backticks (`` ` ``)** instead of quotes.
- They allow:
  - **String interpolation** → insert variables easily using `${ }`.
  - **Multiline strings** → no need for `\n`.

Example:
```js
const name = "Alice";
console.log(`Hello, my name is ${name}`);
```
