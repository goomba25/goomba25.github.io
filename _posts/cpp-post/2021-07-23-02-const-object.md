---
title: "[C++] 상수 객체와 멤버 함수"
excerpt: "const를 활용한 객체와 멤버 함수에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, const, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-23
---

## 상수 객체

`const`키워드를 통해 클래스의 <mark style="background-color: #3e3e3e; color: orange;">상수 객체</mark>를 생성할 수 있다.

```cpp
class Player
{
  int hp_;
  int at_;
public:
  Player(int hp, int at = 10) : hp_(hp), at_(at)
  {}
  
  void print()
  {
    std::cout << "HP : " << hp_ << " ,";
    std::cout << "AT : " << at_ << std::endl;
  }
  
  Player& setHp(int hp)
  {
    hp_ = hp;
    return *this;
  }
};

int main()
{
  Player p1(200);
  const Player p2(200, 20);
}
```

<mark style="background-color: #3e3e3e; color: orange;">상수 객체</mark>는 멤버를 변경하는 어떠한 행위도 허용하지 않는다.

따라서 직접적인 멤버의 변경이나 변경하는 함수를 사용할 수 없다.

```cpp
p2.setHp(50);  //  컴파일 에러
```

___

아이러니하게도 변경하는 함수 뿐만 아니라   
변경하지 않는 작업을 수행하는 함수도 사용할 수 없다.

```cpp
p2.print();  //  컴파일 에러
```

이러한 이유는 멤버 함수는 호출될 때 `this`를 함께 전달 받기 때문이다.   

따라서 일반적으로 생성된 객체는 `this`로 자신을 가리킬 수 있지만,   
<mark style="background-color: #3e3e3e; color: orange;">상수 객체</mark>는 전달하지 못하기 때문에 일반적인 멤버 함수를 사용하지 못하는 것이다.

## 멤버 함수 const

이러한 문제를 해결하기 위해 멤버 함수의 뒤에 `const`키워드를 붙일 수 있다.

```cpp
function() const;
```

이는 `const this`를 전달 받을 수 있기 때문에 <mark style="background-color: #3e3e3e; color: orange;">상수 객체</mark>로 사용이 가능해진다.

이러한 멤버 함수는 아래의 특징을 가진다.

* 멤버를 변경하는 작업을 수행할 수 없다.
* 일반 멤버 함수를 호출할 수 없다.
* 일반 객체에서도 호출할 수 있다.
* 생성자는 const를 사용할 수 없다.

```cpp
class Player
{
  // 생략
  void Player::print() const
  {
    std::cout << "HP : " << hp_ << " ,";
    std::cout << "AT : " << at_ << std::endl;
  }
}

int main()
{
  Player p1(100);
  const Player p2(200, 20);
  
  p1.print();  //  일반 객체 가능
  p2.print();  //  상수 객체 가능
}


// HP : 100
// AT : 10
//
// HP : 200
// AT : 20
```

일반 객체와 <mark style="background-color: #3e3e3e; color: orange;">상수 객체</mark> 모두 사용이 가능한 것을 볼 수 있다.

___

이러한 멤버 함수는 개발자가 실수로 멤버를 변경하지 못하도록 사용할 수 있고,   
나중에 코드를 보더라도 쉽게 의도를 파악하는데 도움을 준다.

적절한 의도를 드러내면서 실수하지 않도록 미리 방지하는 습관은 매우 좋은 습관이다.