export class State extends EventTarget {
  constructor(value) {
    super();
    this.value = value;
  }

  get() {
    return this.value;
  }

  set(value) {
    this.value = value;
    this.dispatchEvent(new CustomEvent("change", { detail: value }));
  }

  subscribe(callback, options) {
    const handler = (event) => {
      callback(event.detail);
    };

    this.addEventListener("change", handler, options);
    return () => {
      this.removeEventListener("change", handler, options);
    };
  }
}

export function effect(callback, dependencies) {
  const handler = () => {
    callback();
  };

  const unsub = [];

  dependencies.forEach((dep) => {
    unsub.push(dep.subscribe(handler));
  });

  return () => {
    unsub.forEach((unsub) => unsub());
  };
}
