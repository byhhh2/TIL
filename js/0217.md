# Mutuable과 Immutable 🧐

<br />

## 의문 ❓

코드를 작성하다가

```js
carNameArr[i] = carNameArr[i].trim();
```

이와 같은 코드를 짰다. lint에서 이러면 안된다고 경고를 줬지만,,,, ~~경고를 지웠다.~~  
그 후 리뷰어님께 배열을 직접 조작하는 것은 오류 발생이 쉽고 추적하기 어렵다는 말을 들었다. 이게 무슨 소릴까?

<br />
<br />

## 검색 검색 🔍

리뷰어님의 조언에 따라 Mutuable과 Immutable에 대하여 검색해보았다.

<br />
<br />

## 들어가기전.. 지식 📕

1. 변수에 값을 할당한다는 것은 값의 메모리 주소를 가르키게(참조하게)하는 것이다.

```js
let name = 'movie'; // [1]
name = '무비'; // [2]
```

- [1] `'movie'`라는 string 타입의 값이 메모리에 생성되고, `name`은 `'movie'`를 가르키게 된다.
- [2] `'무비'`라는 string 타입의 값이 메모리에 **새로 생성**되고, `name`은 `'movie'`가 아닌 `'무비'`를 가르키게 된다. (참조가 바뀜)

<br />

2. 자바스크립트에는 mutable type과 immutable type이 존재한다.

```
- immutable type (primitive type)
  - Boolean
  - String
  - Number

- mutable
  - Object
  - Array
```

- 1번에서 `'movie'`라는 값이 `'무비'`라는 값으로 바뀌지 않는 것처럼 string 타입은 immutable 타입이다. 값이 변경되는 것이 아니라 아예 새로 만들어버린다.
- string과 다르게 object 타입은 mutable 타입이다.

```js
let movie = {
  name: '무비',
  age: 25,
}; // [1]

let fake_movie = movie; // [2]

movie.name = '뭅이'; // [3]
```

- [1] `movie` 객체의 `name` 프로퍼티 값은 `'무비'`이다.
- [2] `fake_movie`라는 변수를 만들어 `movie` 객체의 주소를 똑같이 가르키게 해준다.
- [3] `movie`의 `name`을 `'뭅이'`로 변경한다.

```js
console.log(movie); // {name: '뭅이', age: 25}
console.log(fake_movie); // {name: '뭅이', age: 25}
console.log(movie === fake_movie); // true
```

- `movie`의 `name`을 변경하였지만, `fake_movie`의 `name`도 변경이 되었다. 이는 `movie`와 `fake_movie`가 같은 값의 주소를 가르키고 있음을 알려준다.

<br />
<br />

## ...그래서?

- 자바스크립트에서는 원시 타입을 제외하고 모두 immutable type이다. 즉 배열도 mutable type이다.

```js
let cinema = ['movie1'];
let fake_cinema = cinema;

cinema.push('movie2');

console.log(cinema); // ['movie1', 'movie2']
console.log(fake_cinema); // ['movie1', 'movie2']
console.log(cinema === fake_cinema); // true
```

- 위의 object 예시와 동일하게 `cinema` 배열에 요소를 추가했음에도 불구하고, `fake_cinema`도 변경이 되었다. 여기서 배열이 mutable함을 알 수 가 있다.!

<br />
<br />

## ...그으래서?

근데 왜 배열을 직접 조작하면 안될까? ~~그렇게 만들었자나!!!~~

> Immutability(변경불가성)는 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미한다. -- 1️⃣

이유는 변수의 변화를 쉽게 파악할 수가 없기 떄문이다. 내가 `movie`의 `name`을 `'무비'`에서 `'뭅이'`로 바꿨다고 항상 기억하고 있을 수는 없을테니 말이다. 이는 오류를 유발하기 쉽다. ~~(난 아직 무비인데 사실 뭅이였다.)~~
이를 피하기 위해 .. Array의 내장함수들을 살펴보면 immutable method들이 존재한다.

```js
// ex) filter

let retured_array = array.filter(element => element.name === 'movie');
// filter함수는 immutable method로 *새로운 배열*을 반환한다!
```

<br />
<br />

## 두번째 의문 ❓ .. 이거 `const` 얘기 아냐?

나는 이것이 `const`와 비슷하다는 생각을 했다. 왜냐면 `const`도 불변의 아이콘이기 때문이다. 이 친구도 immutable 어쩌고 ~ 가 아닐까? 생각했다. 과거 어느날 `const`로 선언한 변수임에도 불구하고 변경이 되는 경험을 해본 것 같다. ~~그때는 딱히 알고 싶지 않아서 넘어갔다.~~

```js
const movie = {
  name: '무비',
  age: 25,
};

movie.name = '뭅이';

console.log(movie); // {name: '뭅이', age: 25}
```

놀랍게도 !! 변경이 된다 !! ~~넌 안된다고 했자나!!!!!!!!~~

`const`는 값이 변경 불가능하다는 것이 아니다. 이 친구는 자기가 가르키는 **참조를 변경 불가능**한 것이다. 그런데? 앞에서 object는 값이 변경 가능하다고 했다. 즉 `const`로 선언된 object는 mutable 하기때문에 `const`로 선언했음에도 불구하고 값이 변경이 되는 것이다.!! (주소를 재할당 해주는 것이 아니기 때문에)

<br />
<br />

알면 알수록 재밌다..!!

<br />
<br />

## 참고

- [1️⃣ 자바스크립트에서 불변성이란](https://sustainable-dev.tistory.com/156)
- [2️⃣ 객체와 변경불가성(Immutability)](https://poiemaweb.com/js-immutability)
