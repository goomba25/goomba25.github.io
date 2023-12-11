---
title: "[C++] this 포인터"
excerpt: "객체 자기 자신을 가리키는 포인터, this"

categories:
  - Cpp
tags:
  - [Cpp, Class, 포인터]

toc: true
toc_sticky: true

last_modified_at: 2021-07-22
---

`this`포인터는 생략이 가능한 포인터로,   
객체의 주소(자기 자신)를 가리키는 포인터이다.

```cpp
class Player
{
  int hp;
  int at;
public:
  Player(int hp, int at)
  {
    hp = hp;
    at = at;
  }
};
```

위의 클래스는 멤버의 이름과 매개 변수의 이름이 동일하다.   
컴파일러는 동일한 이름의 이 두 변수를 구분하지 못할 수도 있다. (개발자 또한)

이때 사용할 수 있는 것이 `this`포인터 이다.

```cpp
class Player
{
  int hp;
  int at;
public:
  Player(int hp, int at)
  {
    this->hp = hp;
    this->at = at;
  }
};
```


> `->`는 멤버 지정 연산자(`.`)의 포인터 버전이다.

자기 자신을 가리키는 포인터이기 때문에 컴파일러에게 명시함으로써 구분하도록 돕고,   
두 변수의 충돌을 피할 수 있다. (이름이 다른 변수일지라도 `this`가 생략되어 있을 뿐 명시해줄 수 있다.)

## 연쇄 호출

`this`포인터를 사용하여 자기 자신을 반환할 수 있다.

이 방법을 통해 함수를 연쇄적으로 사용하는 것이 가능하다.

* player.h

```cpp
class Player
{
  int hp_;
  int at_;
public:
  Player(int hp, int at) : hp_(hp), at_(at) {}
  void print();
  Player& setHp(int hp);
  Player& setAt(int at);
};
```

* player.cpp

```cpp
#include "player.h"
#include <iostream>

void Player::print()
{
  std::cout << "HP : " << hp_ << " ,";
  std::cout << "AT : " << at_ << std::endl;
}

Player& Player::setHp(int hp)
{
  hp_ = hp;
  return *this;
}

Player& Player::setAt(int at)
{
  at_ = at;
  return *this;
}
```

클래스는 `사용자 정의 자료형`이기 때문에 반환 자료형으로 사용할 수 있다.

해당 클래스의 `setHp`와 `setAt` 멤버 함수는 자기 자신을 반환한다.   
(`this`포인터를 역참조(`*`)하여 객체 자신을 반환한다.)

이러한 멤버 함수를 연쇄적으로 사용하면 좀 더 편리하고 보기 좋게 작성할 수 있다.

* main.cpp

```cpp
#include <iostream>

#include "player.h"

int main()
{
  Player p(200, 20);
  p.print();

  p.setHp(20).setAt(5);
  p.print();
}

// HP : 200 ,AT : 20
// HP : 20 ,AT : 5
```