---
title: "[C++] 형 변환 - reinterpret_cast"
excerpt: "reinterpret_cast 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, cast]

last_modified_at: 2021-07-31
---

<mark style="background-color: #3e3e3e; color: orange;">reinterpret_cast</mark>는 포인터와 레퍼런스에 관한 형 변환 방법이다.

예를 들어 공용체는 한 번에 하나의 멤버만 사용할 수 있고,   
모든 멤버가 하나의 메모리를 공유한다.

이것을 <mark style="background-color: #3e3e3e; color: orange;">reinterpret_cast</mark>을 통해 확인할 수 있다.

```cpp
union Data
{
  int a;
  double b;
  char c;
};

int main()
{
  Data data;
  data.a = 10;

  int *ptr = reinterpret_cast<int*>(&data.a);

  std::cout << *ptr << std::endl;  //  10
}
```

변환하고자 하는 대상을 원하는 자료형으로 비트단위를 바꾸는 것이다.   

주로 패킷 통신에서 포인터로 데이터를 받아올 때 사용된다고 한다.   
(Low-Level의 코딩에서 쓰인다.)

해당 자료형의 비트단위를 바꾸기 때문에 각 단위의 크기가 다르면 문제가 생긴다.

<mark style="background-color: #3e3e3e; color: orange;">reinterpret_cast</mark>는 포인터 타입끼리의 변환을 해주기도 하지만,   
기본 자료형을 포인터로, 포인터를 기본 자료형으로 변환하는 것이 가능하다.   

예를 들어 `int*`에서 `char`, 다시 `char`에서 `int*`로 갈 경우,   
주솟값이 파괴되어 `nullptr`를 가리키게 된다.

`char`는 1 바이트이기 때문에 주솟값을 모두 표현하지 못한다.   
하지만 <mark style="background-color: #3e3e3e; color: orange;">reinterpret_cast</mark>는 이 파괴된 자료를 강제로 형 변환한다.

이렇듯 어느정도의 위험이 뒤따른다.