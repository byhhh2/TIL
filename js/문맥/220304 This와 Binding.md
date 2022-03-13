# This와 Binding 😛

## 들어가기 전..

### `this`란?

- 현재 실행되는 `실행 컨텍스트`를 가르킨다.
- 자바스크립트에서의 `this`는 **함수를 호출하는 방법**에 의해 결정된다.

<br />

### 실행 컨텍스트 (Execution Context)란?

- _실행 가능한 코드가 실행되기 위해 필요한 환경_

  - 실행 가능한 코드
    - 전역 코드 : 전역 영역에 존재하는 코드
    - `eval` 코드
    - 함수 코드 : 함수 내에 존재하는 코드

- 자바스크립트 엔진에 의해 실행됨

<br />

### 자바스크립트 엔진이란?

> 자바스크립트 코드를 실행하는 인터프리터 - [JS 엔진](https://ko.wikipedia.org/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8_%EC%97%94%EC%A7%84)

<br />

### window 객체란?

- 브라우저 요소, 자바스크립트 엔진, 모든 변수를 가지고 있는 객체

<br />
<br />

## 들어가기 직전..🧐

```js
...

function first() {
  ...

  function second() {
    ...
  }

  second();
}

first();
```

위 코드를 실행하면 어떻게 될까?

> _실행 컨텍스트는 스택구조로 생성, 소멸되는데 실행 중인 컨텍스트에서 이 컨텍스트와 관련없는 코드(예를 들어 다른 함수)가 실행되면 새로운 컨텍스트가 생성된다._ - [실행 컨텍스트](https://poiemaweb.com/js-execution-context)

<br />

- 실행 컨텍스트 스택

|              |             |              |             |              |
| ------------ | ----------- | ------------ | ----------- | ------------ |
|              |             | second EC \* |             |              |
|              | first EC \* | first EC     | first EC \* |              |
| global EC \* | global EC   | global EC    | global EC   | global EC \* |

1. 전역코드로 `컨트롤`이 진입하면서 global EC가 생성되고 실행 컨텍스트 스택에 쌓인다. (global EC는 브라우저가 닫힐 때까지 유지)
2. 함수가 호출되면 해당 함수의 EC가 생성되고, 직전 실행 컨텍스트 위에 쌓인다.
3. 함수의 실행이 종료되면 해당 함수의 EC가 소멸되고, `컨트롤`을 직전 코드 컨텍스트에게 반환한다.

<br />
<br />

## `this`는 어떻게 변경될까?

> `this`는 **함수를 호출하는 방법**에 의해 결정된다.

| 함수를 호출하는 방법    | this                    |
| ----------------------- | ----------------------- |
| 일반 함수 호출시        | 전역 객체 (window 객체) |
| 메서드 호출시           | 메서드를 호출한 객체    |
| 생성자 함수 호출시      | 생성자로 만들어낸 객체  |
| `call`, `apply`, `bind` | 인자로 전달된 객체      |

<br />

### 기본

<img width="500" alt="스크린샷 2022-03-04 오전 12 59 42" src="https://user-images.githubusercontent.com/52737532/156602372-3d7bf99c-1e96-45cc-abd8-82022e728a0b.png">

- 기본적으로 `this`는 **전역 객체**를 가르킨다. (브라우저에서 전역 객체는 `window` 객체)

<br />

### 내부 함수 호출시

```js
function executeFunction() {
  function printThis() {
    console.log(this);
  }

  printThis();
}

executeFunction(); // window 객체
```

- 일반 함수 내부에서 `this`를 출력하는 함수를 호출하면 `this`는 window 객체를 가르킨다.

<br />

### 일반 함수 호출시 = 단순 호출

```js
function printThis() {
  console.log(this);
}

printThis(); // window 객체
```

- 일반 함수를 크게 보면 전역 객체 (window 객체)의 메서드로 볼 수 있다. window 객체의 메서드이므로 `this`가 window 객체를 가르킨다고 보면 된다.

<br />

### 객체의 메서드 내부

```js
const obj = {
  printThis() {
    console.log(this); // obj 객체
  },
};

obj.printThis();
```

- 객체의 메서드 내부에서 `this`를 출력하는 함수를 호출하면 `this`는 obj 객체를 가르킨다.

<br />

### 일반 함수 방식 VS 메서드 방식

```js
const obj = {
  printThis() {
    console.log(this);
  },
};

let printThis = obj.printThis;

printThis(); // window 객체 - 일반 함수 방식
obj.printThis(); // obj 객체 - 메서드 방식
```

<br />

### 생성자 함수 내부

```js
var globalValue = 'globalValue';

function printThis() {
  this.objectValue = 'objectValue';

  console.log(this.globalValue, this.objectValue);
}

printThis(); // globalValue objectValue [this = window 객체]
var obj = new printThis(); // undefined "objectValue" [this = obj 객체]
```

- `new`키워드를 통해 생성자 함수를 실행하면, `this`가 생성자를 통해 생성되는 객체를 가르킨다.
  - 객체 안에 `glovalValue`가 존재하지 않으므로 `undefined`가 출력된다.
- `printThis`를 생성자 함수가 아닌 일반 함수로 실행하면 `this`는 window 객체를 가르킨다.
  - window 객체 안에는 모든 변수가 존재하므로 `globalValue`, `objectValue` 둘다 정상적으로 출력된다.

<br />

### Event Listener 호출시 `this`를 출력하면?

```js
$('#button').addEventListener('click', function () {
  console.log(this); // button 객체
});
```

- 객체의 메서드 내부에서 실행하는 것과 같다.

<br />
<br />

## ..그래서 바인딩🔗이 뭔데

### 바인딩이란?

- `this`가 특정 객체에 연결되는 것이다.
- `call`, `apply`, `bind`함수로 `this`를 변경할 수 있다.

<br />

#### EX | `bind`

- `bind()`의 인자로 전달된 객체를 새로 생성되는 함수안에서의 `this`가 가르키도록 함.
- 새로운 함수를 생성하는 방식

```js
function originalFunction(a, b) {
  console.log(this.objValue); // objValue
  // bind()를 통해 this가 obj를 가르키게 됨

  console.log(a, b); // 1, 2
}

const obj = {
  objValue: 'objValue',
};

const boundedFunction = originalFunction.bind(obj);
// bind()를 통해 boundedFunction안의 this가 obj를 가르키게 됨

boundedFunction(1, 2); // a와 b전달
```

<br />
<br />

## 화살표함수는 this가 정적으로 결정된다고?!

화살표함수는 `call`, `apply`, `bind`함수로 `this`를 변경할 수 없다. 왜냐면 정적으로 `this`가 가르키는 객체가 결정되기 때문!

- 화살표 함수 내부의 `this`는 언제나 **상위 스코프의 객체**를 가르킨다.
  - 이를 `Lexical this` (`문맥적 this`)라고 한다.

<br />

### 그런데 화살표 함수를 사용하면 안되는 경우가 있다.

- 메서드를 정의하는 것 (this가 window 객체를 가르킴)
- addEventListener의 콜백함수 (this가 window 객체를 가르킴)

<br />
<br />
<br />

## 참고

- [자바스크립트 this 바인딩이란](https://velog.io/@danmin20/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this-%EB%B0%94%EC%9D%B8%EB%94%A9%EC%9D%B4%EB%9E%80)
- [this - MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/this)
- [실행 컨텍스트](https://poiemaweb.com/js-execution-context)
- [window 객체](https://www.zerocho.com/category/JavaScript/post/573b321aa54b5e8427432946)
- [this와 바인딩](https://iamsjy17.github.io/javascript/2019/06/07/js33_15_this.html)
- [자바스크립트 this의 개념과 바인딩 설명](https://oneroomtable.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-this%EB%9E%80-%EB%8C%80%EC%B2%B4-%EB%AC%B4%EC%97%87%EC%9D%BC%EA%B9%8C)
