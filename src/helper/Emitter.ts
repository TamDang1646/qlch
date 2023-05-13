import _ from 'lodash';

class Emitter {
  events: Map<string, any> ;
  constructor() {
    this.events = new Map<string, any>();
  }

  emit(event: string, ...args : any[]) {
    if (this.events.get(event) != null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      this.events.get(event).forEach((fn: Function) => fn(...args));
    } else {
      // console.log('[Tuan Bui] emit handle not found for', event);
    }
    return this;
  }

  on(event: string, fn: Function) {
    if (this.events.get(event) != null) {
      this.events.get(event).push(fn);
    } else {
      this.events.set(event, [fn]);
    }
    return this;
  }

  off(event: string, fn: Function) {
    if (event && _.isFunction(fn)) {
      const listeners = this.events.get(event);
      const index = listeners.findIndex((_fn: Function) => _fn === fn);
      listeners.splice(index, 1);
    } else {
      this.events.set( event, []);
    }
    return this;
  }
  removeAllListeners() {
    this.events.clear();
  }
}

export default Emitter;
