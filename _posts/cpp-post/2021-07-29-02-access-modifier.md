---
title: "[C++] 클래스의 상속 접근 지정자"
excerpt: "상속 접근 지정자에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-29
---

클래스 상속에는 크게 두 가지의 관계가 존재한다.

* is-a 관계
* has-a 관계

## is-a

"~는 ~이다" 라는 관계이다.

예를 들어 "학생은 사람이다" 라고 말할 수 있다.   
즉, 부모 클래스는 사람이고 자식 클래스는 학생이다.

![img](/images/cpp-image/is-a.png)

상속될수록 구체적이고 특수화되며, 부모 클래스로 올라갈수록 일반화된다.

대표적으로 `public`상속이 이에 해당한다.

## has-a

"~는 ~를 가진다" 라는 관계이다.

에를 들어 "학생은 책을 가진다" 라고 말할 수 있다.

![img](/images/cpp-image/has-a.png)

대표적으로 `private`상속이 이에 해당한다.

## private 상속

`private`상속은 `has-a`관계의 대표적인 예시이다.

`private`로 상속하게 되면 부모 클래스의 `private`를 제외한   
모든 멤버 및 멤버 함수들이 `private`로 상속된다.   
(접근 지정자를 적지 않고 상속해도 `private`상속이 된다.)

```cpp
class Gun
{
public:
  void trigger()
  {
    std::cout << "쏜다." << std::endl;
  }
};

class Gunner : private Gun
{
public:
  void UseGun()
  {
    trigger();
  }
};

int main()
{
  Gunner gunner;
  gunner.UseGun();
  // gunner.trigger(); //  접근 불가
}
```

`is-a`관계였다면 `Gunner`클래스는 `Gun`클래스이다.   
하지만 `Gunner`클래스는 `Gun`클래스를 가지는 `has-a`관계이다.

`private`상속은 이와 같이 외부에서 접근이 불가능하다.