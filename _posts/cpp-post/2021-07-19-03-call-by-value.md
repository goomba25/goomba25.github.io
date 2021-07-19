---
title: "[C++] 값에 의한 전달 (Value)"
excerpt: "인수 전달의 세 가지 중 값에 의한 전달에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true

last_modified_at: 2021-07-19
---

```cpp
void swap(int a, int b)
{
  int temp = a;
  a = b;
  b = temp;
}

int main()
{
  int x(10), y(20);
  
  swap(x, y);
  
  std::cout << x << std::endl;  // 10
  std::cout << y << std::endl;  // 20
}
```

`swap` 함수를 구현하여 두 정수를 교환했지만 변경되지 않았다.   
그 이유는 <mark style="background-color: #3e3e3e; color: orange;">값에 의한 전달</mark>이기 때문이다.

위의 코드에서 값이 아닌 주솟값을 출력하도록 해보자.

```cpp
void swap(int a, int b)
{
  std::cout << &a << std::endl;  //  0x7ffe6c905c9c
  std::cout << &b << std::endl;  //  0x7ffe6c905c98
}

int main()
{
  int x(10), y(20);
  std::cout << &x << std::endl;  //  0x7ffe6c905cb0
  std::cout << &y << std::endl;  //  0x7ffe6c905cb4
  
  swap(x, y);
  
  std::cout << &x << std::endl;  //  0x7ffe6c905cb0
  std::cout << &y << std::endl;  //  0x7ffe6c905cb4
}
```

`main`에서 선언된 변수의 주소와 `swap`함수 내의 변수의 주소가 다르다.

값으로 전달된 함수의 인수는 사실 복사된 값이다. 따라서 주솟값이 다른 것이다.   
인수의 복사본이 함수로 전달되었기 때문에 원래의 인수는 변하지 않는다.   
(값을 반환하여 해결도 가능하다.)

___

값의 전달은 아무리 값을 변경하려고 해도 변경되지 않는다는 보장성이 따른다.   
즉, 어떤 동작을 수행만 하고 본래의 값을 그대로 유지하고 싶을 때 사용할 수 있다.

단점으로는 전달하려는 값의 크기가 클 경우, 복사하는 비용이 크다는 점이 있다.