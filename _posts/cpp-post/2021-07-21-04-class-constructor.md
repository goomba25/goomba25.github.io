---
title: "[C++] 클래스 생성자 (class constructor)"
excerpt: "클래스의 생성자에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-21
---

클래스의 멤버를 `private`로 설정하여 은닉하는 것은 굉장히 유용하다.

하지만 `private`로 설정된 멤버를 초기화 할 때마다 함수를 사용하는 것은 불편하고,   
함수를 만들지 않으면 초기화 할 수 없다.

<mark style="background-color: #3e3e3e; color: orange;">생성자</mark>는 이러한 문제를 해결해준다.   
<mark style="background-color: #3e3e3e; color: orange;">생성자</mark>는 객체의 생성과 동시에 자동으로 호출되어 멤버를 초기화 해주는 특수한 멤버 함수이다.

```cpp
class Name
{
  Name(parameter);
};
```

생성자는 아래의 규칙을 가진다.

* 생성자의 이름은 클래스의 이름과 같다.
* 생성자는 반환값이 없다. (`void` 도 아니다.)
* 초기화 방법에 따라 여러 개의 생성자를 가질 수 있다. (오버로딩)

## 디폴트 생성자

매개 변수를 가지지 않거나 디폴트 매개 변수로 구성된 생성자를 `디폴트 생성자`라고 한다.

클래스는 단 하나의 디폴트 생성자를 가질 수 있고,   
생성자를 아무것도 만들지 않을 경우 컴파일러가 자동으로 만들어낸다.

```cpp
class Person
{
private:
  float weight_;
  float height_;
  
public:
  Person()
  {
    weight_ = 160.5f;
    height_ = 60.0f;
  }
};
```

디폴트 생성자로 인한 객체를 생성하면 지정된 값으로 멤버가 초기화된다.

```cpp
Person() = default;  //  디폴트 생성자 명시

Person() = delete;  //  디폴트 생성자 삭제
```

디폴트 생성자를 명시적으로 표기 해줄 수 있고, 없다고 표기 할 수 있다.   
없다고 표기할 경우 디폴트 생성자는 만들어지지 않는다.

## 매개 변수가 있는 생성자

매개 변수를 통해 멤버를 초기화해줄 수 있다.   
또한 오버로딩이 가능하여 여러가지 패턴으로 만들 수 있다.

```cpp
class Player
{
  int HP;
  int AT;

public:
  Player()  //  디폴트 생성자
  {
    HP = 100;
    AT = 10;
  }

  Player(int hp, int at = 10)
  {
    HP = hp;
    AT = at;
  }
};
```

인수를 전달하지 않고 호출하면 디폴트 생성자가 호출되고,   
인수가 전달되면 해당 생성자를 호출하여 멤버를 초기화할 수 있다.

## 생성자의 사용

생성자를 호출하는 방법은 크게 명시적, 암시적 2가지로 나눌 수 있다.

```cpp
class Person
{
public:
  Person() {}
};

int main()
{
  Person p1;  //  암시적 호출
  Person p2 = Person();  //  명시적 호출
  Person *p3 = new Person;  //  동적할당의 암시적 호출
  Person *p4 = new Person();  //  동적할당의 명시적 호출
}
```