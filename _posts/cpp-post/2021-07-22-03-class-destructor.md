---
title: "[C++] 클래스 소멸자"
excerpt: "객체 소멸 시 호출되는 소멸자에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-22
---

생성자는 클래스의 객체를 생성하는 특수한 멤버 함수이다.   
반대로 소멸자는 객체가 소멸될 때 자동으로 실행되는 특수한 멤버 함수이다.

소멸자는 반환되지 않은 메모리를 명시적으로 반환하기 위해 사용할 수 있고,    
`메모리 누수`와 같은 문제를 해결할 수 있다.

소멸자는 아래의 특징을 가진다.

* 생성자와 같이 클래스 이름으로 선언하며 앞에 `~`기호를 붙인다.
* 매개 변수를 갖지 않는다.
* 소멸자는 생성자와 동일하게 반환값이 없다. (`void` 도 아니다.)
* 소멸자는 클래스에 하나만 존재한다. (오버로딩이 불가능하다.)
* 명시적으로 소멸자를 호출하지 않는다. (할 수 있지만 지양한다.)

## 소멸자의 사용

소멸자는 호출하지 않아도 객체가 소멸하면 자동으로 호출되는 멤버 함수이다.

따라서 소멸자 내부에 객체 안의 동적 할당과 같은 부분들을 해제하는 구문을 적어주면   
소멸자가 호출되어 자동으로 메모리를 해제할 수 있다.

```cpp
#include <iostream>

class Player
{
  std::string name_;

public:
  Player(std::string name)
    : name_(name)
  {
    std::cout << name_ << " 생성" << std::endl;
  }

  ~Player()
  {
    std::cout << name_ << " 소멸" << std::endl;
  }
};

int main()
{
  Player p1("Player 1");
  Player p2("Player 2");
}

//  Player 1 생성
//  Player 2 생성
//  Player 2 소멸
//  Player 1 소멸
```