# hybrids-compose

## compose hybrids.js component property definitions

### Example

```javascript 1.8
import compose from "hybrids-compose";

const Component = {
  prop: compose(descriptorFactoryOne(), descriptorFactoryTwo() /*...*/),
};
```

### Rules

- definitions compose right to left
- get handlers compose by passing previous handler result into **lastValue**
- set handlers compose by passing previous handler result into **value**
- connect handlers compose by calling them in order, and their disconnects callbacks in reverse order
- observe handlers compose by calling them in order
