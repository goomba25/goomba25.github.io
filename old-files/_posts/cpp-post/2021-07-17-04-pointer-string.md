---
title: "[C++] 포인터를 사용한 문자열, 기호 상수"
excerpt: "기호 상수에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 포인터, 문자열, const]

last_modified_at: 2021-07-17
---

기본적으로 char 배열을 통해 아래와 같이 문자열을 만들 수 있었다.

```cpp
char str[] = "string";
```

이와 비슷하게 `const`키워드를 통해 상수를 가리키는 포인터로 문자열을 생성할 수 있다.

```cpp
const char *str = "string";
```

이렇게 생성한 포인터 문자열을 <mark style="background-color: #4e4e4e; color: orange;">기호 상수</mark>라고 하며, 값을 변경할 수 없는 읽기 전용이 된다.

이 <mark style="background-color: #4e4e4e; color: orange;">기호 상수</mark>는 C 스타일의 문자열과 똑같이 \<cstring> 의 함수를 사용할 수 있다.

## 포인터 문자열 출력

```cpp
const char *ptr = "hello";

std::cout << ptr << std::endl;  //  hello
```

<mark style="background-color: #4e4e4e; color: orange;">기호 상수</mark>는 출력할 때 C 스타일의 문자열처럼 반복문을 통해 출력할 필요가 없다.

`char *` 또는 `const char *` 형태의 객체를 `std::cout` 으로 출력하면   
문자열이라고 가정하고 포인터의 값이 아닌 지시된 문자열을 출력한다.