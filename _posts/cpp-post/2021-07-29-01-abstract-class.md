---
title: "[C++] 추상 클래스와 순수 가상 함수"
excerpt: "추상 클래스, 순수 가상 함수, 인터페이스에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-29
---

<mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>란 <mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>를 한 가지 이상 가지는 클래스를 말한다.

## 순수 가상 함수

<mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>란 구현이 없는 가상 함수를 말한다.

```cpp
virtual Type function() = 0;
```

가상 함수의 형태에서 구현 없이 0을 대입하면 <mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>가 된다.

<mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>는 상속받는 클래스에서 반드시 오버라이딩(`override`)해야 한다.

## 추상 클래스

```cpp
class Person
{
public:
  void walk()
  {
    std::cout << "걷는다." << std::endl;
  }
  void sleep()
  {
    std::cout << "잔다." << std::endl;
  }
  virtual ~Person()
  {}
  virtual void Do() = 0;
};
```

위의 클래스는 <mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>를 하나 이상 가지는 <mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>이다.

<mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>는 인스턴스화가 불가능하다. 즉, 객체를 생성할 수 없다.   
대신 자식 클래스에서 인스턴스화가 가능해진다.

```cpp
class Student : public Person
{
public:
  virtual void Do() const override
  {
    std::cout << "공부한다." << std::endl;
  }
};

class Employee : public Person
{
public:
  virtual void Do() const override
  {
    std::cout << "일한다." << std::endl;
  }
};

int main()
{
  Student student;
  Employee employee;

  student.Do();
  employee.Do();
}


//  공부한다.
//  일한다.
```

신경 써야할 점은 <mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>를 상속 받은 자식 클래스에서   
<mark style="background-color: #3e3e3e; color: orange;">순수 가상 함수</mark>를 모두 오버라이딩 하지 않으면 자식 클래스도 <mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>가 된다는 것이다.

따라서 인스턴스화 할 수 없다.

___

<mark style="background-color: #3e3e3e; color: #73E9CB;">추상 클래스</mark>는 객체를 생성할 수 없지만,   
포인터 또는 레퍼런스형으로 자식 클래스의 객체를 가리킬 수 있다.

```cpp
int main()
{
  Student student;
  Employee employee;
  
  Person *p1 = &student;
  Person &p2 = employee;

  p1->Do();
  p2.Do();
}


//  공부한다.
//  일한다.
```

## 인터페이스

멤버 변수와 일반 멤버 함수, 순수 가상 함수로 이루어진 클래스를 추상 클래스 라고 한다면,   
오로지 순수 가상 함수로만 이루어진 클래스를 인터페이스 라고 한다.

하지만 C++ 에서 인터페이스라고 정의된 개념은 없고   
기능적으로 지원하는 것도 없다. 그저 흉내내어 사용하는 것이다.

관례적으로 클래스 이름 앞에 대문자 `I` 를 붙여 구분한다.   
(다른 언어, 예를 들어 JAVA 에선 인터페이스 기능과 키워드가 존재한다고 한다.)