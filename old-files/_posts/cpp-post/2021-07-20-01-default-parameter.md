---
title: "[C++] 디폴트 매개 변수"
excerpt: ""

categories:
  - Cpp
tags:
  - [Cpp]

last_modified_at: 2021-07-20
---

디폴트 매개 변수는 함수가 인수를 전달받지 않아도 동작하도록   
기본값을 정해주는 역할을 한다.

```cpp
void func(int num = 10)
{
  std::cout << num << std::endl;
}

int main()
{
  func(); //  10
}
```

`func`함수는 인수를 전달받지 않았지만 기본값 10을 출력한다.   
이러한 `num` 을 디폴트 매개 변수라고 한다.

디폴트 매개 변수는 전달받는 인수가 없는 경우에만 사용되는 것으로   
인수를 전달받으면 기본값 대신 인수를 가지고 동작한다.

여러 개의 디폴트 매개 변수를 선언하는 것도 가능하다.

```cpp
void func(int a = 4, int b = 3)
{
  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```

이때 주의할 점은 다수의 디폴트 매개 변수를 선언할 때,   
가장 오른쪽부터 지정되어야한다.

예를 들어 아래와 같이 선언할 수 없다.

```cpp
void func2(int a, int b = 3, int c) {}  //  불가능
```

즉, 디폴트 매개 변수로 선언된 변수의 오른쪽 변수들은 모두 디폴트 매개 변수로 선언해야 한다는 것이다.

```cpp
void func2(int a, int c, int b = 3) {}  //  가능
```

또한 포인터의 경우 기본값을 `nullptr`로 초기화할 수 있다.