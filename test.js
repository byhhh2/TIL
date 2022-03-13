class Bundle {
  #data = [];

  constructor(model, manager) {
    this.model = model;
    this.manager = manager;
  }

  get data() {
    return this.#data;
  }

  bundleUp() {
    const item = this.model.createModel();

    item.generateData();
    this.#data.push(item);
  }

  doSometing() {
    this.manager.doSometing();
  }
}

class Model {
  #data;

  createModel() {
    return new Model();
  }

  set data(data) {
    this.#data = data;
  }

  get data() {
    return this.#data;
  }

  generateData() {}
}

class LottoModel extends Model {
  #data;

  generateData() {
    this.#data = Math.floor(Math.random() * (45 + 1 - 1)) + 1;
  }
}

class LottoManager {
  doSometing() {}
}

const lottoBundle = new Bundle(new LottoModel(), new LottoManager());

lottoBundle.bundleUp();
lottoBundle.bundleUp();

console.log(lottoBundle.data);
