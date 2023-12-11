---
title: "[C++] if 문 (조건문)"
excerpt: "C++ 의 조건문 중 하나인 if 문에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 조건문]

toc: true
toc_sticky: true

last_modified_at: 2021-07-11
---

C++ 에서 사용하는 가장 기본적인 조건문이다.

```cpp
if (/*조건식*/) {
  /*code*/
}
```

조건식(`condition`)을 평가하여 참인지 거짓인지에 따라 코드를 실행하거나 무시한다.

내부의 코드가 한 문장일 경우 중괄호(블럭)는 생략할 수 있다.   
이때는 들여쓰기(tab)로 구분한다.   
(암시적으로 컴파일러가 블럭으로 처리한다.)

특이한 점은 조건식에 대하여 실행 후 평가한다.
따라서 조건식이 연산 또는 함수일 경우 주의해야 한다.

## 여러 조건문

`if`에 대응하는 `else`가 존재한다.   
`else`는 가장 가까운 `if`에 대응하며 `if`의 조건식 외의 모든 것을 만족한다.   
그래서 `else`는 조건식이 없다.

예시)

```cpp
int num = 10;
if (num > 10) {
  /*code 1*/
} else {
  /*code 2*/
}
```

`if`의 조건식이 false 이기 때문에 `else`의 code 2 가 실행된다.

___

이 `if`와 `else`가 합쳐진 `else if`가 존재한다.   
`else if`는 `if`와 `else` 외에 분별해야할 조건식이 더 있을 경우 쓸 수 있다.

예시)

```cpp
int num = 10;

if (num == 0) {
  /*code 1*/
} else if (num == 5) {
  /*code 2*/
} else if (num == 10) {
  /*code 3*/
} else {
  /*code 4*/
}

```

처음 `if`의 조건식이 false 이기 때문에 다음 `else if`의 조건식을 평가한다.   
첫 번째 `else if`의 조건식도 false 이기 때문에 다음 `else if`의 조건식을 평가한다.   
두 번째 `else if`의 조건식이 true 이기 때문에 code 3 가 실행된다.

___

이처럼 연속된 if 조건문은 하나의 조건문이 만족될 경우   
나머지 조건문을 평가하지 않고 지나간다.

## null statement

세미 콜론(`;`)만 넣어줄 경우 아무것도 실행하지 않는다.

예시)

```cpp
int num = 4;

if (num == 4)
  ;
else {
  /*code*/
}
```

해당 코드는 아무일도 일어나지 않는다.

이것을 `null statement` 라고 한다.

## C++ 17

C++17 부터 조건문 내에서 변수의 선언이 가능해졌다.

예시)

```cpp
if (int num1, num2; int cnt = scanf("%d %d", &num1, &num2)) {
    std::cout << "count : " << cnt << std::endl;
}
```

선언된 변수는 연결된 if 조건문 내에서만 접근이 가능하다.