---
title: "[C++] 포인터 그리고 const"
excerpt: "포인터와 상수의 결합에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 포인터, const]

toc: true

last_modified_at: 2021-07-17
---

일반적인 포인터는 비-상수(non-const) 포인터이다.   
일반적인 포인터로 변수를 가리키게 되면 포인터를 역참조(`*`)하여   
문제없이 변수의 값을 변경할 수 있다.

```cpp
const int num = 10;
int *ptr = &num;  //  컴파일 에러
```

하지만 상수를 가리키면 문제가 생긴다.

상수의 값은 변경할 수 없는데, 포인터로 변경할 수 있어서는 안되기 때문이다.   
따라서 일반적인 포인터로는 상수를 가리킬 수 없다.

## 상수를 가리키는 포인터

```cpp
const int num1 = 10;
int num2 = 20;

const int *ptr = &num1;
std::cout << *ptr << std::endl; //  10

ptr = &num2;
std::cout << *ptr << std::endl; //  20
```

`포인터`의 자료형의 앞에 `const` 키워드를 붙여주면   
변수와 상수를 모두 가리킬 수 있는 포인터가 된다.

일반 포인터처럼 다른 변수의 주소를 할당할 수 있지만   
포인터를 통해 값을 변경할 수 없다.   
이를 통해 함수가 전달된 변수를 변경하지 못하도록 매개변수로 사용할 수 있다.

## 상수 포인터

```cpp
int num = 10;
int* const ptr = &num;
```

변수 이름의 앞에 `const`키워드를 붙이게 되면 상수 포인터가 된다.

이는 상수처럼 선언과 동시에 초기화해야 하며,   
포인터를 통해 값을 변경할 수도 있다.

```cpp
int num1 = 10;
int num2 = 20;
int* const ptr = &num1;

std::cout << *ptr1 << std::endl;  //  10

*ptr1 = 40;
std::cout << num1 << std::endl;  // 40

// ptr = &num2;  //  에러
```

이 `상수 포인터`의 특징은 한번 주소를 할당하면 변경할 수 없다는 점이다.   
(재할당이 불가능하다.)

## 상수를 가리키는 상수 포인터

위의 두 형식을 혼합한 포인터이다.

```cpp
int num1 = 10;
const int num2 = 20;

const int* const ptr1 = &num1;
const int* const ptr2 = &num2;

std::cout << *ptr1 << std::endl;  //  10
std::cout << *ptr2 << std::endl;  //  20
```

이 포인터 형식은 변수와 상수를 모두 가리킬 수 있지만   
포인터를 통해 값을 변경할 수 없으며 재할당 할 수도 없다.