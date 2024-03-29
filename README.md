# hybrids-compose

## compose hybrids.js component property descriptors

### Example

```javascript 1.8
import { compose, composeWithValue } from "hybrids-compose";

const Component = {
  prop: compose(
    descriptorFactoryOne(),
    descriptorFactoryTwo(),
    descriptorFactoryN()
  ),
};

// or
// someValue = undefined || null || boolean || number || string

const Component = {
  prop: composeWithValue(
    someValue,
    descriptorFactoryOne(),
    descriptorFactoryTwo(),
    descriptorFactoryN()
  ),
};
```

### Rules

- definitions compose right to left
- get handlers compose by passing previous handler result into **lastValue**
- set handlers compose by passing previous handler result into **value**
- connect handlers compose by calling them in order, and their disconnects callbacks in reverse order
- observe handlers compose by calling them in order
- supports descriptor translations
