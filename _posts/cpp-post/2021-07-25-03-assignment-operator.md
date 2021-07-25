---
title: "[C++] 대입 연산자의 오버로딩"
excerpt: "대입 연산자의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩]

last_modified_at: 2021-07-25
---

대입 연산자의 오버로딩을 해보자.

```cpp
class Player
{
  int hp_;
  int at_;

public:
  Player() {}
  Player(int hp, int at)
      : hp_(hp), at_(at)
  {}

  Player& operator=(const Player &p)
  {
    hp_ = p.hp_;
    at_ = p.at_;
    return *this;
  }

  void print()
  {
    std::cout << "HP : " << hp_ << ", ";
    std::cout << "AT : " << at_ << std::endl;
  }
};

int main()
{
  Player p1(200,20);
  Player p2;
  p2 = p1;

  p1.print();  //  HP : 200, AT : 20
  p2.print();  //  HP : 200, AT : 20
}
```

대입 연산이 성공한 것을 볼 수 있다.

위의 오버로딩에서 반환 자료형을 레퍼런스 그리고 클래스로 만든 이유는   
대입 연산자도 연속으로 표시가 가능하기 때문이다.

```cpp
int main()
{
  Player p1(200, 10);
  Player p2;
  Player p3;
  p3 = p2 = p1;

  p1.print();  //  HP : 200, AT : 10
  p2.print();  //  HP : 200, AT : 10
  p3.print();  //  HP : 200, AT : 10
}
```

___

여기서 신경써줘야 할 부분이 있다.   
동적 할당되는 멤버는 새롭게 할당해야 한다는 것이다.

```cpp
class Player
{
  int hp_;
  int at_;
  char *name_;

public:
  Player() {}

  Player(int hp, int at, const char *name)
      : hp_(hp), at_(at), name_(new char[strlen(name) + 1])
  {
    strcpy(name_, name);
  }

  Player& operator=(const Player &p)
  {
    hp_ = p.hp_;
    at_ = p.at_;
    name_ = p.name_;
    return *this;
  }
  //  생략
};

int main()
{
  Player p1(200, 20, "John");
  Player p2;
  Player p3;
  p3 = p2 = p1;
}
```

이 경우 동적 할당된 멤버는 제대로 대입이 되지 않는 경우가 생긴다.

이러한 경우 내부에서 새롭게 할당해야 한다.

```cpp
Player& operator=(const Player &p)
{
  hp_ = p.hp_;
  at_ = p.at_;

  delete[] name_;
  name_ = new char[strlen(p.name_)];
  strcmp(name_, p.name_);
  
  return *this;
}
```