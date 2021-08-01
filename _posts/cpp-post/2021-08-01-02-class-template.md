---
title: "[C++] 클래스 템플릿"
excerpt: "클래스 템플릿을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Template]

toc : true
toc_sticky: true

last_modified_at: 2021-08-01
---

클래스 멤버의 자료형을 템플릿으로 선언하는 것을 <mark style="background-color: #3e3e3e; color: orange;">클래스 템플릿</mark>이라고 한다.


## 클래스 템플릿

<mark style="background-color: #3e3e3e; color: orange;">클래스 템플릿</mark>은 객체가 생성될 때 자료형을 정한다.

```cpp
template <typename T>
class Test
{
  T value_;

public:
  Test(T value) : value_(value)
  {}

  T get_value() { return value_; }
};
```

## 클래스 템플릿 사용
<mark style="background-color: #3e3e3e; color: orange;">클래스 템플릿</mark>은 객체를 생성할 때,   
템플릿 파라미터에 타입을 넣어준다.

```cpp
int main()
{
  Test<int> t1(10);
  Test<double> t2(1.23);
  Test<std::string> t3("abcd");

  std::cout << t1.get_value() << std::endl;  //  10
  std::cout << t2.get_value() << std::endl;  //  1.23
  std::cout << t3.get_value() << std::endl;  //  abcd
}
```

* 지정된 자료형의 멤버를 갖는 객체가 생성된다.

## 클래스 템플릿의 주의사항

<mark style="background-color: #3e3e3e; color: orange;">클래스 템플릿</mark>은 외부에서 정의할 때,   
템플릿을 다시 선언해야 한다는 것이다.

```cpp
template <typename T>
class Test
{
  T value_;

public:
  Test(T value) : value_(value)
  {}

  T get_value();
};

template<class Y>
Y Test<Y>::get_value()
{
  return value_;
}
```

* 템플릿은 임의의 이름이라는 것을 표현하기 위해 다른 문자를 사용했다. (`T`, `Y`)
* 클래스 템플릿도 `typename`과 `class`를 모두 사용 가능한 것을 볼 수 있다.


파라미터에 자료형을 적어주는 것처럼 외부 선언할때 클래스에도 파라미터를 적어줘야한다.