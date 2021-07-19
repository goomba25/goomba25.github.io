---
title: "[C++] 참조형 변수 (Reference)"
excerpt: "포인터와 다른 참조형 변수에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 참조]

toc: true

last_modified_at: 2021-07-19
---

포인터가 `*`기호를 사용하여 선언하듯, 참조형 변수는 `&`기호를 사용하여 선언한다.

```cpp
int num = 5;
int *ptr = &num;
int &ref = num;
```

포인터와 달리 참조형 변수는 변수를 그대로 할당하여 선언한다.
따라서 참조형 변수는 객체의 <mark style="background-color: #3e3e3e; color: orange;">별명</mark>이라고 볼 수 있다.

특징적으로 참조형 변수는 선언과 동시에 초기화해야 하며, null값을 저장할 수 없다.   
또한 초기화 후에 다른 값을 할당할 수 없다.

## 참조형 변수의 사용

참조형 변수는 사용할 때에도 그대로 사용한다.

```cpp
int num = 10;
int *ptr = &num;
int &ref = num;

std::cout << num << std::endl;  //  10
std::cout << *ptr << std::endl;  //  10
std::cout << ref << std::endl;  //  10

ref = 5;

std::cout << num << std::endl;  //  5
std::cout << ref << std::endl;  //  5
```

참조형 변수는 포인터와 달리 사용하기 편리한 장점이 있다.