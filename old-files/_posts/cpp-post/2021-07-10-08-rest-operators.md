---
title: "[C++] 기타 연산자"
excerpt: "C++ 의 기본 연산자 외에 다른 연산자들"

categories:
  - Cpp
tags:
  - [Cpp, 연산자]

toc: true
toc_sticky: true

last_modified_at: 2021-07-10
---

## 삼항 연산자

C 와 C++ 만의 연산자로 세 개의 대상을 갖는 삼항 연산자이다.

```
(조건식) ? (값1) : (값2)
```

조건식이 참이면 값1을, 거짓이면 값2를 반환한다.

예시)

```cpp
int num1(5), num2(10);
int result = (num1 > num2) ? 22 : 33;

std::cout << result << std::endl; //  33
```

조건식이 거짓이므로 result 는 33 이 된다.

## sizeof

대상의 크기를 바이트 단위로 반환한다.

```cpp
int num(5);

std::cout << sizeof(num) << "바이트" << std::endl;  //  4
std::cout << sizeof(int) << "바이트" << std::endl;  //  4
```