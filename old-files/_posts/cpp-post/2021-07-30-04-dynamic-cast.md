---
title: "[C++] 형 변환 - dynamic_cast"
excerpt: "dynamic_cast 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, cast]

toc : true
toc_sticky: true

last_modified_at: 2021-07-30
---

<mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>는 부모 클래스의 포인터 또는 레퍼런스를   
자식 클래스의 포인터 또는 레퍼런스로 다운캐스팅(`downcasting`)하는 형 변환이다.   
(업캐스팅은 암시적으로 변환이 가능하지만 다은캐스팅은 명시적으로만 가능하다.)

또한 `static_cast`와는 달리 기본 자료형을 변환할 수 없다.

<mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>는 형 변환의 성공/실패 유무에 따라 다음과 같이 반환한다.

* 성공 : 자식 클래스로 다운캐스팅
* 실패(포인터) : nullptr 반환
* 실패(레퍼런스) : bad_cast (exception 처리 필요)

## dynamic_cast의 성공

자식 클래스를 부모 클래스로 가리킬 수 있었다.

부모 클래스로 가리키는 자식 클래스의 멤버를 호출하려면   
부모 클래스를 자식 클래스로 다운캐스팅 해야 한다.

```cpp
class Parent
{
public:
  virtual ~Parent() {}
};

class Child : public Parent
{
public:
  void func()
  {
    std::cout << "func" << std::endl;
  }
};

void foo(Parent *p)
{
  Child *child = dynamic_cast<Child*>(p);
  child->func();
}

int main()
{
  Parent *p = new Child();
  foo(p);  //  func
  delete p;
}
```

<mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>를 통해 `Parent`클래스를 `Child`클래스로 다운캐스팅 해주고,   
멤버 함수인 `func`를 호출했다.

## 실패 (포인터의 경우)

부모 객체를 가리키는 부모 클래스의 포인터를 다운캐스팅하면 어떻게 될까?

```cpp
int main()
{
  Parent *p = new Parent;
  foo(p);
  delete p;
}
```

이는 `undefined behavior`, 될지 안될지 알 수 없다.

이 경우 포인터의 <mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>가 실패하면 `nullptr`을 반환하는 점을 이용하여   
다음과 같이 처리가 가능하다.

```cpp
void foo(Parent *p)
{
  Child *child = dynamic_cast<Child*>(p);
  if (child == nullptr) {
    std::cout << "error" << std::endl;
  } else {
    child->func();
  }
}

int main()
{
  Parent *p = new Parent;
  foo(p);  //  error
  delete p;
}
```

## 실패 (레퍼런스의 경우)

레퍼런스의 <mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>가 실패하면 `std::bad_cast`를 발생시킨다.

이는 나중에 작성할 예외 처리 방법인 `try-catch`를 사용한다.

```cpp
void foo(Parent &p)
{
  try
  {
    Child &child = dynamic_cast<Child&>(p);
    child.func();
  }
  catch(std::bad_cast)
  {
    std::cout << "bad cast" << std::endl;
  }
}

int main()
{
  Parent parent;
  Parent &p = parent;
  foo(p);  //  bad cast
}
```

## 주의사항

<mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>는 변환하고자 하는 대상(클래스)의 내부에   
가상 함수가 없는 경우에는 사용할 수가 없다.

위에서 시험한 코드는 부모 클래스가 가상 소멸자를 가지고 있어서 가능했지만   
가상 함수가 존재하지 않을 경우 오류를 발생시킨다.   
(물론 대부분 부모 클래스에 가상 소멸자를 정의하기 때문에 거의 발생하지 않을 것이다.)

<mark style="background-color: #3e3e3e; color: orange;">dynamic_cast</mark>는 안전한 형 변환 방법이지만,   
런타임에 검사를 진행하므로 런타임 비용이 조금 높다는 단점을 가진다.