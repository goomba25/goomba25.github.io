---
title: "[C++] 선언과 정의의 분리 / 전방 선언"
excerpt: "클래스를 헤더와 소스파일로 분리하는 방법과 전방 선언에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-22
---

기존에 클래스 내부에서 멤버 함수의 선언과 정의를 모두 해주었다.   
이렇게 내부에 구현하는 것을 정의를 포함한 선언이라고 한다.

하지만 이렇게 클래스를 작성하면 내용이 보다 복잡해지고,   
가독성이 떨어지며 관리 및 작업이 어려워질 수 있다.

## 선언과 정의의 파일 분리

이전 클래스의 내부에서 멤버 함수의 프로토타입을 선언하고,   
외부에서 멤버 함수를 정의했다.

이러한 방법을 통해 클래스를 헤더와 `.cpp`파일로 분리할 수 있다.

일반적으로 클래스의 선언은 헤더(`.h`)에 작성하며,   
정의 부분은 `.cpp`파일에 작성한다. 또한 이 두 파일의 이름은 같게 만든다.

헤더에 정의를 포함한 선언을 할 경우 암시적으로 `inline`과 비슷하게 동작한다고 한다.

또한 C++은 정의를 한 번만 하는 것을 지향한다.   
(다른 곳에 다시 정의하지 말자.)

* player.h

```cpp
class Player
{
  int hp_;
  int at_;
public:
  Player(int hp, int at) : hp_(hp), at_(at) {}  //  멤버 함수 내부 정의
  void print();  //  멤버 함수의 프로토타입
};
```

* player.cpp

```cpp
#include "player.h"

#include <iostream>

void Player::print()  //  멤버 함수의 외부 정의
{
  std::cout << "HP : " << hp_ << std::endl;
  std::cout << "AT : " << at_ << std::endl;
}
```

## 분리된 클래스의 사용

이렇게 선언과 정의가 분리된 클래스를 사용하기 위해서는 해당 헤더파일만 `include` 하면 된다.

* main.cpp

```cpp
#include <iostream>
#include "player.h"  //  헤더 포함

int main()
{
  Player p(200, 20);
  p.print();
}


// HP : 200
// AT : 20
```

이렇게 분리시키는 것은 캡슐화(은닉)의 한 방법이다.

표준 라이브러리(`iostream`, `string`, ...) 및 타사의 라이브러리는   
미리 컴파일된 파일과 헤더만 제공하여 코드를 못 보도록 되어있다.

세부 내용까지 알 필요 없이, 공개된 멤버와 멤버 함수만을 이해하고 사용하면 되기 때문에   
좀 더 직관적이게 된다.

## 전방 선언 (Forward Declaration)

헤더에서 다른 헤더를 포함하면 사실 포함한 헤더의 내용을 복붙하는 것과 같다.   
때문에 "<mark style="background-color: #3e3e3e; color: orange;">의존 관계</mark>"를 형성하게 된다.

예를 들어

* A.h
```cpp
#include <B.h>
class A
{};
```

* B.h 
```cpp
#include <A.h>
class B
{};
```

이러한 경우 에러가 발생한다.   
(의존 관계가 서로에게 생기면 에러가 발생한다.)

이러한 경우 의존 관계를 형성하지 않게 하려면 `전방 선언`을 활용하면 된다.

* A.h

```cpp
class B;

class A
{};
```

`전방 선언`은 컴파일러에게 해당 클래스가 어딘가에 존재한다고 미리 알려주는 것이다.

또한 `.cpp`파일에서 참조하고자 하는 헤더를 `include` 해주면   
컴파일 시간도 줄어들고 여러 가지의 이점이 있다고 한다.