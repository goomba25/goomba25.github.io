---
title: "[C++] 멤버 초기화"
excerpt: "멤버에 기본값을 할당하는 방법"

categories:
  - Cpp
tags:
  - [Cpp, Class]

last_modified_at: 2021-07-21
---

디폴트 매개 변수처럼 C++11 부터는 클래스의 멤버에 초기값을 할당할 수 있다.

```cpp
class Player
{
  int HP = 100;
  int AT = 10;

public:
  Player() {}
  Player(int hp, int at)
  {
    HP = hp;
    AT = at;
  }

  void print()
  {
    std::cout << "HP : " << HP << std::endl;
    std::cout << "AT : " << AT << std::endl;
  }
};

int main()
{
  Player p1;  //  디폴트 생성자
  Player p2 = Player(500, 20);

  p1.print();
  p2.print();
}


// HP : 100
// AT : 10
// HP : 500
// AT : 20
```

디폴트 생성자에 의해 생성된 객체는 초기값으로 멤버가 초기화된 것을 볼 수 있다.

인수가 전달된 객체는 인수의 값으로 멤버가 초기화 된다.   
(우선 순위가 멤버 초기화보다 높다.)