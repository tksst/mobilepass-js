# mobilepass-js

This is a JavaScript implementation of the MobilePASS token client.

## Usage

### install

```bash
npm install mobilepass
```

```bash
pnpm add mobilepass
```

```bash
bun add mobilepass
```

### code (ESModule)

```js
import { generateOtp } from "mobilepass";

const actcode = "XUU75-RROTT-Y5IP6-U3BMV";
const counter = 1;

const otp = await generateOtp(actcode, counter);
console.log(`OTP: ${otp}`);
```

### code (CommonJS)

```js
const { generateOtp } = require("mobilepass");

const actcode = "XUU75-RROTT-Y5IP6-U3BMV";
const counter = 1;

(async () => {
  const otp = await generateOtp(actcode, counter);

  console.log(`OTP: ${otp}`);
})();
```

### Compatibility

- Node.js 15.0.0 and later
- Any other JavaScript environment that supports WebCrypto API
