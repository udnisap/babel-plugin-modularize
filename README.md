# babel-plugin-cinco



## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
```

## Installation

```sh
$ npm install babel-plugin-cinco
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["cinco"]
}
```

### Via CLI

```sh
$ babel --plugins cinco script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["cinco"]
});
```
