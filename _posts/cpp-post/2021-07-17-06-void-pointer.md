---
title: "[C++] void 포인터 (generic pointer)"
excerpt: "널 포인터에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 포인터]

toc: true

last_modified_at: 2021-07-17
---

`void`는 자료형(타입)이 없다는 것을 표현하는 키워드이다.

특정 자료형의 데이터는 같은 자료형의 포인터로만 가리킬 수 있는데,   
`void`포인터를 사용하면 모든 자료형의 데이터를 가리킬 수 있다.

```cpp
void *ptr;
```

하지만 `void`포인터도 만능은 아니다.

`void`포인터로 가리키는 데이터의 자료형을 알 수 없기 때문에   
역참조(`*`)하여 값에 접근할 수 없다.

그러므로 역참조(`*`)를 하기 이전에 `void`포인터의 형변환을 해야 한다.

```cpp
int num(10);
void *ptr = &num;

// std::cout << *ptr << std::endl;  //  에러
std::cout << (int*)ptr << std::endl;  //  int 로 형 변환
```

또한 `void`포인터는 연산이 불가능하며, 형 변환이 없이는 참조가 불가능하다.