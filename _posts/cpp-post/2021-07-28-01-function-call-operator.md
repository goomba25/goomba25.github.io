---
title: "[C++] 호출 연산자의 오버로딩, 함수 객체"
excerpt: ""

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-28
---

C++에서는 클래스 객체를 함수처럼 호출하는 호출 연산자의 오버로딩을 제공한다.   
이는 함수를 작성할 때 매개 변수를 감싸는 괄호`()`를 말한다.

호출 연산자는 클래스 함수로만 구현이 가능하다.

## 호출 연산자의 오버로딩

호출 연산자는 `operator()`를 사용하여 오버로딩한다.

```cpp
class Max
{
  public:
  int operator()(int x, int y)
  {
    if (x > y) return x;
    else return y;
  }
};

int main()
{
  Max mx;
  std::cout << mx(3, 10) << std::endl;  //  10
}
```

호출 연산자를 오버로딩하여 두 수 중 더 큰 수를 구하는 객체를 만들었다.

호출할 때에 객체를 생성하고 파라미터에 값을 넣어 사용한다.

이러한 호출 연산자의 오버로딩은 왜 쓰일까 ?   
이 방법의 장점은 "상태를 저장"할 수 있다는 것이다.

위의 객체에서 들어오는 수 중 가장 큰 수를 저장할 수 있다.

```cpp
class Max
{
  int maxValue_ = 0;
public:
  int operator()(int x)
  {
    if (x > maxValue_) return maxValue_ = x;
    else return maxValue_;
  }
};

int main()
{
  Max mx;
  std::cout << mx(2) << std::endl;  //  2
  std::cout << mx(4) << std::endl;  //  4
  std::cout << mx(67) << std::endl;  //  67
  std::cout << mx(10) << std::endl;  //  67
}
```

어떠한 값이 들어왔을 때, 가장 큰 값을 객체가 저장하고 있다.

이처럼 상태값을 저장할 수 있는 기능을 가진, 함수와 같은 기능을 하는 객체를   
<mark style="background-color: #3e3e3e; color: orange;">함수 객체</mark>라고 한다.

함수 객체는 상태를 저장할 수 없는 일반 함수보다 유연하고 빠르게 사용이 가능하다.