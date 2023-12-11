---
title: "[C++] 생성자 멤버 초기화 리스트"
excerpt: "생성자를 좀 더 유용하게 쓰기 위한 방법, 생성자 멤버 초기화 리스트"

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-21
---

```cpp
class Player
{
private:
  int hp_;
  int at_;
public:
  Player(int hp, int at)
  {
    hp_ = hp;
    at_ = at;
  }
};
```

사실 일반적인 객체의 생성에는 초기화가 아닌 생성자에서 대입 연산을 통해 멤버를 할당하는 것이다.

```cpp
int hp_;
hp_ = hp;
```

위와 같은 방법으로 메모리 공간에 변수를 선언한 뒤에,   
다시 변수의 메모리 공간에 접근하여 값을 할당한다.

이러한 문법은 가능하지만, 두 번을 메모리에 접근하기 때문에 초기화에 비해 효율적이지 않다.

또한 다음과 같은 경우 생성자로 값을 할당할 수 없다.

```cpp
class Player
{
  int hp_;
  int at_;
  const std::string name_;
public:
  Player(int hp, int at, std::string name)
  {
    hp_ = hp;
    at_ = at;
    name_ = name;  //  불가
  }
};
```

`const` 와 참조 변수같은 경우 선언과 동시에 초기화해야만 한다.   
하지만 값의 할당은 초기화가 아니기 때문에 에러가 발생한다.

이러한 문제를 해결하기 위한 방법이   
<mark style="background-color: #3e3e3e; color: orange;">생성자 멤버 초기화 리스트</mark>(Constructor member initializer list)이다.

## 생성자 멤버 초기화 리스트

초기화 리스트는 콜론(`:`)으로 생성자의 선언 뒤에 붙여준다.   
초기화하려는 멤버를 쉼표(`,`)로 구분하며 괄호 () 또는 {} 안에 값을 넣어 나열한다.

또한 초기화 기능을 수행하므로 생성자 내부에 할당을 수행하는 내용을 적지 않는다.   
(주의할 것은 초기화 리스트는 세미콜론(`;`)으로 구분하지도, 끝내지도 않는다.)

```cpp
class Player
{
  int hp_;
  int at_;
  const std::string name_;
public:
  Player(int hp, int at, std::string name)
    : hp_(hp), at_(at), name_(name)
  {}

  void print()
  {
    std::cout << "HP : " << hp_ << std::endl;
    std::cout << "AT : " << at_ << std::endl;
    std::cout << "Name : " << name_ << std::endl;
  }
};

int main()
{
  Player p1(200, 10, "John");
  p1.print();
}

// HP : 200
// AT : 10
// Name : John
```

성공적으로 `const` 멤버를 초기화하고 객체를 생성한 것을 볼 수 있다.

___

또한 <mark style="background-color: #3e3e3e; color: orange;">생성자 멤버 초기화 리스트</mark>는 멤버 초기화보다 우선시 된다.

```cpp
class Player
{
  int hp_ = 100;
  int at_ = 10;
Public:
  Player() : hp_(300), at_(20)
  {}
  
  void print()
  {
    std::cout << "HP : " << hp_ << std::endl;
    std::cout << "AT : " << at_ << std::endl;
  }
};

int main()
{
  Player p;
  p.print();
}


//  HP : 300
//  AT : 20
```

멤버 초기화보다 <mark style="background-color: #3e3e3e; color: orange;">생성자 멤버 초기화 리스트</mark>가 우선되어 초기화된 것을 볼 수 있다.


### 멤버 초기화 리스트를 사용해야 하는 경우

* const 멤버
* 레퍼런스 멤버
* 클래스 내부에 포함된 클래스 객체
* 상속된 멤버

