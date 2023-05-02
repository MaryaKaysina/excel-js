import { storage, storageName } from '@core/utils';

// eslint-disable-next-line no-unused-vars
export class LocalStorageClient {
  constructor(name) {
    this.name = storageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return Promise.resolve(storage(this.name));
  }
}
