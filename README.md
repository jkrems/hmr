# API for HMR in Modules

### `accept`

Accepting changes to dependencies:

```mjs
import hmr from '@hmr/api';

import dep from './dep.mjs';

// TODO: How could a system tell if all users of dep.mjs are able to process an
// update to the file? Maybe the rule can only be "if at least one parent can
// accept an update, it will prevent full reload".
hmr(import.meta).accept(['./dep.mjs']);
```

### `acceptSelf`

Accepting changes to the current module:

```mjs
import hmr from '@hmr/api';

export let x = 20;

let def = 'foo';
export { def as default };

hmr(import.meta).acceptSelf({
  onChange(ns) {
    // Update from new namespace. Needs custom code because no code outside of
    // the file could do it.
    x = ns.x;
    def = ns.default;
  },
});
```
