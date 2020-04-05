# sust

Simple Universal Storage Thingy

# Install

```bash
npm i sust
```

# Usage

## Importing the module

```javascript
// ES6
import Store from "sust";
// Common.js
const Store = require("sust");
```

## Basic key-value functionality

```javascript
// Setting and getting values
Store.set("isAwesome", true);
Store.get("isAwesome"); // -> True

// Subscribing to value changes
Store.sub("isAwesome", newValue => console.log(newValue));

// Trigger changes with .pub() or .set()
Store.pub("isAwesome");
Store.set("isAwesome", false); // That's a lie though

// There are some utility functions for value manipulation
// They all trigger .sub() events
Store.set("score", 0);
Store.increment("score", 5);

Store.set("names", ["John", "James"]);
Store.push("names", "Robert"); // -> ['John', 'James', 'Robert']
// to push multiple values use ES6 destructuring
const moreNames = ["Michael", "William"];
Store.push("names", ...moreNames);
```

## Using Actions

```javascript
Store.addAction("randomNumber", maxValue =>
  Math.round(Math.random() * maxValue)
);
Store.invoke("randomNumber")(42);
```

Note: Actions are not saved in localStorage
