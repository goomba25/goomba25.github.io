---
title: "[C++] 가상 함수와 오버라이딩"
excerpt: "가상 함수와 오버라이딩에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-28
---

클래스의 상속이 이루어지는 과정은   
부모 클래스의 생성자를 호출하고, 자식 클래스의 생성자를 호출한다.

생성자와 소멸자로 확인하여 볼 수 있다.

```cpp
class Parent
{
public:
  Parent()
  {
    std::cout << "부모 클래스 생성자" << std::endl;
  }
  ~Parent()
  {
    std::cout << "부모 클래스 소멸자" << std::endl;
  }
};

class Child: public Parent
{
public:
  Child()
  {
    std::cout << "자식 클래스 생성자" << std::endl;
  }
  ~Child()
  {
    std::cout << "자식 클래스 소멸자" << std::endl;
  }
};

int main()
{
  Child child;
}

// 부모 클래스 생성자
// 자식 클래스 생성자
// 자식 클래스 소멸자
// 부모 클래스 소멸자
```

반대로 소멸할 때는 자식 클래스의 소멸자가 호출된 뒤에 부모 클래스의 소멸자가 호출된다.

## 클래스 상속의 특성

클래스의 상속에는 특별한 것이 있는데,   
자식 클래스의 객체를 부모 클래스로 가리킬 수 있고, 선언할 수도 있다.   
(반대로 부모클래스는 자식클래스 자료형으로 선언이 불가능하다.)

```cpp
Parent p = Child();  //  가능
Child ch = Parent();  //  불가능

Parent *p = new Child();  //  가능

Child ch;
Parent &p = ch;  //  가능
```

위와 같이 포인터와 레퍼런스 형태로 자식 클래스의 객체를 가리킬 수도 있는데,   
이때 문제가 발생한다.

```cpp
class Parent
{
public:
  void func()
  {
    std::cout << "parent" << std::endl;
  }
};

class Child: public Parent
{
public:
  void func()
  {
    std::cout << "child" << std::endl;
  }
};

int main()
{
  Child ch;  
  Parent *p1 = &ch;
  Parent &p2 = ch;

  p1->func();  //  parent
  p2.func();  //  parent
}
```

부모 클래스로 자식 클래스를 가리켜 자식 클래스의 멤버 함수를 호출했음에도   
부모 클래스의 멤버 함수가 호출되었다.

```cpp
void foo(Parent &p)
{
  p.func();
}

int main()
{
  Child ch;
  foo(ch);  //  parent
}
```

또는 부모클래스 형태를 인자로 받는 함수를 만들어 호출해도   
부모 클래스의 함수가 호출된다.

이유는 컴파일러가 포인터의 자료형을 기준으로 함수를 호출하기 때문이다.

이러한 문제를 해결하기 위해 `virtual` 키워드를 제공한다.

## 가상 함수 (virtaul)

멤버 함수는 상속할 경우 처음 정의된 함수 그대로 상속된다.

가상 함수는 이러한 부모 클래스에 이미 정의된 함수를   
자식 클래스에서 재정의할 수 있는 멤버 함수이다.

이렇게 이미 정의된 함수를 재정의 하는 것을 <mark style="background-color: #3e3e3e; color: orange;">오버라이딩</mark>이라고 한다.

```cpp
class Parent
{
public:
  virtual void func()
  {
    std::cout << "parent" << std::endl;
  }
};

class Child: public Parent
{
public:
  void func()
  {
    std::cout << "child" << std::endl;
  }
};

int main()
{
  Child ch;  
  Parent *p1 = &ch;
  Parent &p2 = ch;

  p1->func();  //  child
  p2.func();  //  child
}
```

이번에는 자식 클래스의 멤버 함수가 정상적으로 호출된다.

`virtual` 키워드를 붙여 생성된 가상 함수는 자식 클래스에서 재정의가 가능하며,   
자식 클래스의 객체로 가상 함수를 호출하면 재정의된 함수가 호출된다.

___

한 가지 특징으로 가상 함수는 상속되어도 가상함수라는 것이다.   
다만 `virtual` 키워드가 생략된다.   
때문에 `virtual` 키워드를 명시해 주는 것이 좋다.

가상 함수는 몇가지 규칙을 가진다.

* 클래스의 public 범위에 선언한다.

* 정적(static) 으로 선언이 불가능하며,   
friend 로 다른 클래스의 친구도 될 수 없다.

* 실행 시간의 다형성을 얻기 위해 포인터와   
레퍼런스로만 접근이 가능하다.

* 프로토타입은 부모·자식 클래스 모두 동일해야 한다.

* 가상 소멸자를 만들 수 있지만, 가상 생성자는 만들 수 없다.

* 오버로딩된 함수는 일부만 가상 함수로 만들 경우,   
가상 함수가 아닌 오버로딩 함수를 호출하지 못한다.

## 가상 소멸자

부모 클래스의 포인터 또는 레퍼런스형으로 자식 클래스의 객체를 생성하면   
소멸자도 부모 클래스의 소멸자만 호출한다.

```cpp
class Parent
{
public:
  virtual ~Parent()
  {
    std::cout << "부모 클래스 소멸자" << std::endl;
  }
};

class Child: public Parent
{
public:
  ~Child()
  {
    std::cout << "자식 클래스 소멸자" << std::endl;
  }
};

int main()
{
  Parent *target = new Child();
  delete target;
}


//  부모 클래스 소멸자
```

따라서 소멸자도 `virtual` 키워드를 붙여주는 것이 필요하다.

### override

가상 함수 그리고 오버라이딩된 함수임을 쉽게 알아볼 수 있도록   
함수의 프로토타입 뒤에 `override`키워드를 붙여줄 수 있다.

```cpp
class Parent
{
public:
  virtual func()
  {}
};

class Child: public Parent
{
public:
  virtual func() override
  {}
};
```
