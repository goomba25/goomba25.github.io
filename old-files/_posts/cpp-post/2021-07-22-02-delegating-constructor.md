---
title: "[C++] 위임 생성자"
excerpt: "생성자를 위임하는 방법에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-22
---

생성자의 오버로딩을 통해 두 가지 생성자를 만들었다.

```cpp
class Player
{
private:
  int hp_;
  int at_;
public:
  Player()
  {
    hp_ = 100;
    at_ = 10;
  }
  
  Player(int hp, int at)
  {
    hp_ = hp;
    at_ = at;
  }
};
```

중복된 내용이 있으므로 줄여보자.

___

* 잘못된 방법

```cpp
class Player
{
  int hp_;
  int at_;

public:
  Player()
  {
    Player(100, 10, name);
  }

  Player(int hp, int at)
  {
    hp_ = hp;
    at_ = at;
  }

  void print()
  {
    std::cout << "HP : " << hp_ << std::endl;
    std::cout << "AT : " << at_ << std::endl;
  }
};

int main()
{
  Player player1;
  player1.print();

  Player player2(100, 10);
  player2.print();
}

// HP : 4197760
// AT : 0
// HP : 100
// AT : 10
```

디폴트 생성자로 생성된 객체에 쓰레기 값이 들어있는 것을 볼 수 있다.

이유는 디폴트 생성자의 내부는

```cpp
Player()
{
  Player p = Player(100, 10);
}
```

이런 느낌의 제대로 된 호출이 아닐 것이다.

이때 생성자에서 다른 생성자를 호출하도록 <mark style="background-color: #3e3e3e; color: orange;">생성자의 위임</mark>이라는 기능을 제공한다.

## 생성자의 위임

```cpp
class Player
{
  int hp_;
  int at_;

public:
  Player() : Player(100, 10)
  {}

  Player(int hp, int at)
  {
    hp_ = hp;
    at_ = at;
  }

  void print()
  {
    std::cout << "HP : " << hp_ << std::endl;
    std::cout << "AT : " << at_ << std::endl;
  }
};

int main()
{
  Player player1;
  player1.print();

  Player player2(200, 20);
  player2.print();
}
```


`생성자 멤버 초기화 리스트`처럼 콜론(`:`)으로 생성자의 선언 뒤에 위임 생성자를 적어준다.

생성자의 위임 과정은 생성자를 호출한 뒤에 위임한 생성자를 호출한다.

위에서 디폴트 생성자는 오버로딩된 생성자를 위임한다.

생성자의 위임을 통해 효과적으로 중복된 코드를 줄인 것을 볼 수 있다.