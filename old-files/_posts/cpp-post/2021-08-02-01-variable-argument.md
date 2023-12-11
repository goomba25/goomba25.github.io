---
title: "[C++] 가변 인자 (variable argument)"
excerpt: "가변 인자에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 가변인자]

toc : true
toc_sticky: true

last_modified_at: 2021-08-02
---

<mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>란 매개 변수의 갯수를 정하지 않을 수 있는 인자이다.

```cpp
sum(1,2,3);
sum(12,3);
sum(1,2,3,3,4,5,6,100);
```

예를 들어 `sum`이라는 함수가 있다고 가정했을 때,   
인자의 갯수를 모두 다르게 하려면 함수의 오버로딩을 통해 정의해야 했다.

하지만 <mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>를 사용하면 하나의 함수로 해결할 수 있다.

## 가변 인자

<mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>를 사용하기 위해서 먼저 C 라이브러리인 \<cstdarg>를 `include`한다.

이 `cstdarg`에는 <mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>를 다루기 위한 4 개의 매크로와   
`va_list`라는 <mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>를 가리키는 포인터 자료형(타입)이 존재한다.   
(`va_list`는 `char*`로 정의된 자료형이다.)

* va_start : `va_list`를 특정 위치로 이동시킨다.
* va_arg : `va_list`가 가리키는 위치의 데이터를 반환하고 자료형만큼 주소를 이동한다.
* va_end : `va_list`를 NULL로 초기화한다.
* va_copy : `va_list`를 복사한다.

## 가변 인자의 사용

```cpp
#include <cstdarg>

int sum(int count, ...)
{
  va_list list;

  va_start(list, count);
  int result(0), arg(0);

  for (int i = 0; i < count; i ++)
  {
    arg = va_arg(list, int);
    result += arg;
  }
  va_end(list);
  return result;
}

int main()
{
  int result = sum(4, 10, 20, 30, 40);
  std::cout << result << std::endl;  //  100
}
```

먼저 `va_list`자료형의 변수 `list`를 선언했다.

그 다음 `va_start`함수를 사용하는데,   
`va_start`함수에는 `list`와 매개 변수의 갯수인 `count`를 함께 전달했다.
> 이는 `list`가 `count` 바로 뒤에 있는 정수 10을 가리키게 만든다.

그 다음 반복문을 사용하는데,   
`list`가 가리키는 변수를 담을 `arg`라는 변수를 선언했다.   
> `var_arg`함수를 사용하여 `arg`에 담긴 값을 `result`에 더하고    
`list`가 자신의 자료형만큼 주소를 뒤로 이동하도록 만든다.
> * 배열을 떠올리자.   
배열은 자신의 자료형만큼 주소를 뒤로 이동하면 다음 원소의 주소가 된다.

`list`가 <mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>의 끝을 가리키면 상관없는 값을 가리키지 않도록    
`va_end`함수를 통해 NULL로 초기화한다.

알 수 있듯, <mark style="background-color: #3e3e3e; color: orange;">가변 인자</mark>를 사용할 때는 그 인자의 갯수를 함께 넘겨줘야 한다.   
위에서 만든 `sum`함수는 첫번째 인수를 갯수로 받고 있다.