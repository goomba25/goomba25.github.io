---
title: "[C++] 널 포인터 (Null pointer)"
excerpt: "널 포인터에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 포인터]

toc: true
toc_sticky: true

last_modified_at: 2021-07-17
---

초기화 되지 않은 포인터는 쓰레기 주솟값을 가진다.   
이러한 포인터에 아무것도 가리키지 않도록 초기화할 수는 없을까?

## 널 포인터

포인터가 아무것도 가리키지 않는 것을 표현할 때 사용하는 널 포인터가 존재한다.   

이는 기존에는 0 또는 NULL 을 통해 표기했지만.   
이제는 C++11 부터 도입된 `nullptr`를 사용하여 표기한다.

`nullptr`은 `std::nullptr_t` 자료형의 새로운 상수이다.   
`bool` 자료형의 값이 true 와 false 두 가지의 값을 가지는 것처럼   
`std::nullptr_t` 자료형은 한 가지의 값을 가진다.

## NULL ≠ nullptr

NULL 과 nullptr 는 엄연히 다른 것이다.

NULL 은 사실 아래와 같이 매크로로 정의된 0일 뿐이다.

```cpp
#define NULL 0
```

따라서 아래의 경우처럼 함수의 매개변수에 NULL을 전달하면 0으로 식별한다.   

```cpp
void function(int n)
{
  std::cout << n << std::endl;
}

int main()
{
  function(NULL); //  0
}
```

컴파일러가 전달받은 `NULL`이 0을 의미하는지 널포인터를 의미하는지 확인이 불가능하다.

따라서 이제는 `NULL`이 아닌 `nullptr`을 사용하는 것을 지향한다.