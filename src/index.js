const methodMap = (method, descriptors) => ({
  connect: (...args) => {
    let disconnect;
    let descriptorsDisconnect;
    if (descriptors.connect) {
      descriptorsDisconnect = descriptors.connect(...args);
    }
    disconnect = method(...args);
    return () => {
      if (disconnect) {
        disconnect();
      }
      if (descriptorsDisconnect) {
        descriptorsDisconnect();
      }
    };
  },
  get: (host, lastValue) => {
    return method(
      host,
      descriptors.get ? descriptors.get(host, lastValue) : lastValue
    );
  },
  set: (host, value, lastValue) => {
    return method(
      host,
      descriptors.set ? descriptors.set(host, value, lastValue) : value,
      lastValue
    );
  },
});

const translate = (descriptor) => {
  if (typeof descriptor === "function") {
    return { get: descriptor };
  } else {
    return descriptor;
  }
};

const composeDescriptors = (...descriptors) =>
  descriptors.reduceRight(
    (descriptors, descriptor) => ({
      ...descriptors,
      ...Object.entries(translate(descriptor))
        .filter(([, method]) => method != null)
        .reduce(
          (methods, [methodType, method]) => ({
            ...methods,
            [methodType]:
              methodMap(method, descriptors)[methodType] ||
              ((...args) => {
                if (descriptors[methodType]) {
                  descriptors[methodType](...args);
                }
                return method(...args);
              }),
          }),
          {}
        ),
    }),
    {}
  );

exports.compose = (...descriptors) => composeDescriptors(...descriptors);

exports.composeWithValue = (value, ...descriptors) => ({
  value,
  ...composeDescriptors(...descriptors),
});
