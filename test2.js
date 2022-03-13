class Bundle {
  constructor(items, manager) {
    this.items = items;
    this.manager = manager;
  }

  requestItems() {
    this.manager.printWho();
  }
}

class LottoModel {
  #numbers;

  constructor(numbers) {
    this.#numbers = numbers;
  }
}

class DartModel {
  #score;

  constructor(score) {
    this.#score = score;
  }
}

class LottoManager {
  #item = 'Lotto';

  printWho() {
    console.log(this.#item);
  }
}

class DartManager {
  #item = 'Dart';

  printWho() {
    console.log(this.#item);
  }
}

const lottoBundle = new Bundle(
  new LottoModel([1, 2, 3, 4]),
  new LottoManager()
);
const dartBundle = new Bundle(new DartModel(10), new DartManager());

lottoBundle.requestItems(); // Lotto
dartBundle.requestItems(); // Dart
