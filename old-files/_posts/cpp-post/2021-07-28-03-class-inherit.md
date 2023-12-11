---
title: "[C++] 클래스의 상속"
excerpt: "클래스를 상속하는 방법을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-28
---

```cpp
class A
{
  //  code 1
  //  code A
};

class B
{
  //  code 1
  //  code B
};

class C
{
  //  code 1
  //  code C
};
```

위의 세 클래스는 모두 중복된 내용을 가진다.   
코드를 짜는데에 있어 중복된 코드를 사용하는 것을 지향하므로   
함수로 만들어 호출하는 방법을 사용할 수 있다.

하지만 함수를 사용하여 호출하는 것 외에도 좋은 방법을 가지고 있다.

클래스의 상속은 코드의 재활용성을 제공하여 중복된 코드를 작성할 필요가 없게 만들고,   
클래스끼리의 관계를 구성함으로 다양한 기능을 제공한다.

## 클래스 상속

하나의 클래스의 내용을 다른 클래스에서 상속을 받으면   
상속된 클래스의 내용을 그대로 사용할 수 있다.

클래스를 상속하는 방법은 간단하다.

```cpp
class 클래스 : 접근제한지정자 상속클래스
{};
```

이때 상속을 받는 클래스를 "자식 클래스(child class)"라고 부르고,   
상속하는 클래스를 "부모 클래스(parent class)"라고 부른다.

클래스의 상속을 간단하게 구현해보자.

```cpp
class Parent
{
  int num_1;
  void print1()
  {
    std::cout << num_1 << std::endl;
  }
protected:
  int num_2;
  void print2()
  {
    std::cout << num_2 << std::endl;
  }
public:
  int num_3;
  void print3()
  {
    std::cout << num_3 << std::endl;
  }
};

class Child1: public Parent
{
public:
  Child1(int n)
  {
    num_2 = n;
    num_3 = n;
  }
};

class Child2: public Parent
{
  public:
  Child2(int n)
  {
    num_2 = n;
    num_3 = n;
  }
};

int main()
{
  Child1 ch1(10);
  Child2 ch2(20);

  ch1.print3();  //  10
  ch2.print3();  //  20
}
```

`Child1`, `Child2` 클래스는 `Parent`클래스를 상속 받는다.

따라서 `Parent`의 멤버를 가지는 것을 알 수 있다.

## 상속 접근 지정자

상속 접근 지정자에 따라 자식 클래스의 상속된 내용의 접근이 달라진다.

|상속 접근 지정자|부모 클래스|자식 클래스|
|:--:|:--:|:--:|
|public|public|public|
||private|접근 불가|
||protected|protected|
|private|public|private|
||private|접근 불가|
||protected|private|
|protected|public|protected|
||private|접근 불가|
||protected|protected|

### 팁

한 가지 팁으로 `public`으로 상속받은 멤버를 `private`처럼 사용할 수 있다.

이는 `using`을 사용하는 방법이다.

```cpp
class Parent
{
public:
  int num;
};

class Child: public Parent
{
private:
  using Parent::num;
public:
  void set(int n)
  {
    num = n;
  }

  void get()
  {
    std::cout << this->num << std::endl;
  }
};

int main()
{
  Child ch;
//  ch.num = 10;  //  불가능
  ch.set(10);
  ch.get();
}
```

부모 클래스의 멤버 변수를 `using`을 통해 `private`처럼 사용한다.