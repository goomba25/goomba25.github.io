---
title: "[C++] 클래스의 다중 상속"
excerpt: "다중 상속에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-29
---

## 다중 상속

```cpp
class A
{};

class B
{};

class C : public A, public B  //  다중 상속
{};
```

<mark style="background-color: #3e3e3e; color: orange;">다중 상속</mark>(multiple inheritance)이란 말 그대로 2개 이상의 클래스를 상속받는 것을 의미한다.

<mark style="background-color: #3e3e3e; color: orange;">다중 상속</mark>에서 주의할 점은 상속하는 부모 클래스들의 멤버 이름이 같을 경우이다.   
이름이 동일한 멤버가 존재한다면, 어떤 클래스의 멤버인지 구분할 수 없다는 에러가 발생한다.

```cpp
class A
{
public:
  int num = 10;
};

class B
{
public:
  int num = 20;
};

class C : public A, public B
{};

int main()
{
  C c;
  std::cout << c.num << std::endl;  //  오류 발생
}
```

이러한 경우 범위 지정 연산자(`::`)를 사용하여 해결할 수도 있다.

```cpp
class A
{
public:
  int num = 10;
};

class B
{
public:
  int num = 20;
};

class C : public A, public B
{};

int main()
{
  C c;
  std::cout << c.A::num << std::endl;  //  10
  std::cout << c.B::num << std::endl;  //  20
}
```

또는 부모 클래스의 포인터 또는 레퍼런스로 접근할 수 있다.

```cpp
class A
{
public:
  int num = 10;
};

class B
{
public:
  int num = 20;
};

class C : public A, public B
{};

int main()
{
  C c;
  A &a = c;
  std::cout << a.num << std::endl;  //  10

  B *b = new C;
  std::cout << b->num << std::endl;  //  20
}
```

## 다이아몬드 상속

<mark style="background-color: #3e3e3e; color: orange;">다중 상속</mark>에서 주의해야 할 문제이다.

```cpp
class A
{
public:
  int num_;

  A(int num) : num_(num)
  {
    std::cout << "A : " << num_ << std::endl;
  }
};

class B0 : public A
{
public:
  B0() : A(10)
  {
    std::cout << "B0" << std::endl;
  }
};

class B1 : public A
{
public:
  B1() : A(20)
  {
    std::cout << "B1" << std::endl;
  }
};

class C : public B0, public B1
{
public:
  C()
  {
    std::cout << "C" << std::endl;
  }
};

int main()
{
  C c;
}


//  A : 10
//  B0
//  A : 20
//  B1
//  C
```

이러한 다이아몬드 형태의 상속은 문제점이 명확해 보인다.

최상위 클래스 A 를 B0 와 B1 클래스가 상속받아 num 멤버를 갖는다.   
또한 B0 와 B1 을 상속받은 C 클래스도 num 멤버를 갖는다.   
멤버가 중복되는 문제가 발생하는 것이다.

또한 최상위 클래스가 두번 호출되는 것을 볼 수 있다.

## 다이아몬드 상속의 해결

다이아몬드 상속의 이러한 문제를 가상 상속으로 해결할 수 있다.

```cpp
class A
{
public:
  int num_;

  A(int num) : num_(num)
  {
    std::cout << "A : " << num_ << std::endl;
  }
};

class B0 : virtual public A
{
public:
  B0() : A(10)
  {
    std::cout << "B0" << std::endl;
  }
};

class B1 : public virtual A
{
public:
  B1() : A(20)
  {
    std::cout << "B1" << std::endl;
  }
};

class C : public B0, public B1
{
public:
  C() : A(30)
  {
    std::cout << "C" << std::endl;
  }
};

int main()
{
  C c;
}


//  A : 30
//  B0
//  B1
//  C
```

가상 상속은 상속 접근 지정자의 위치에 함께 쓰이며 순서는 상관없다.

가상 상속을 받으면 상속 시 부모 클래스의 메모리가 중복되지 않으면서 상속된다.   
따라서 최상위 클래스 `A`의 생성자가 한 번만 호출되는 것을 볼 수 있다.

중요한 것은 가상 상속 시에 `C`클래스의 위치에 있는 생성자는   
상속 받는 `A`, `B0`, `B1` 의 생성자를 모두 호출해주어야만 한다.

위에서는 `A`의 생성자만 파라미터값이 존재하므로 `A`를 위임해주었다.   
`B0`와 `B1`은 암시적으로 디폴트 생성자를 호출한다.

___

또한 가상 상속이 아닐 경우 `A`클래스의 포인터(또는 레퍼런스)로 `B0`와 `B1`을 건너뛰고   
`C`클래스를 가리킬수 없는데, 가상 상속의 경우 `A`클래스로 `C`클래스를 가리킬 수 있다.

```cpp
// 생략 A, B0, B1 클래스
int main()
{
  C c;
  
  A &a1 = c;  //  가능
  A *a2 = *c;  //  가능
}
```

또한 범위 지정 연산자(`::`)를 사용하여 각각의 상속 받은 멤버에 접근할 수도 있다.

```cpp
// 생략 A, B0, B1 클래스
int main()
{
  C c;
  
  std::cout << c.B0::num_ << std::endl;  //  10
  std::cout << c.B0::num_ << std::endl;  //  20
}
```

<mark style="background-color: #3e3e3e; color: orange;">다중 상속</mark>을 사용할 때에는 이러한 다이아몬드 상속을 주의해야하고,   
이름이 곂치는 모호한 상황을 주의해야 한다.

> `iostream` 도 다이아몬드 상속이라고 한다.