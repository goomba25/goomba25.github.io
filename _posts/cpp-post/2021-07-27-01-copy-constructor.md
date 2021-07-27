---
title: "[C++] 대입 연산자의 오버로딩"
excerpt: "대입 연산자의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩]

last_modified_at: 2021-07-25
---

객체를 복사하는 방법은 두 가지가 있다.

* 얕은 복사
* 깊은 복사

## 얕은 복사

얕은 복사란 값만 복사하는 것을 일컫는다.

대입 연산자 `=`을 사용하여 복사하는 것은 얕은 복사에 해당된다.

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
  void print()
  {
    std::cout << "HP : " << hp_ << ", ";
    std::cout << "AT : " << at_ << ", ";
    std::cout << "Name : " << name_ << std::endl;
  }
};
```

위와 같은 클래스의 객체를 얕은 복사를 통해 복사해보자.

```cpp
int main()
{
  Player p1(200, 10, "John");
  Player p2 = p1;  //  얕은 복사
  
  p1.print();  //  HP : 200, AT : 10, Name : John
  p2.print();  //  HP : 200, AT : 10, Name : John
}
```

객체의 멤버들이 똑같이 복사되었다.

하지만 아래와 같이 클래스에서 소멸자를 생성하여 동적 해제를 진행해보자.

```cpp
class Player
{
  //  생략
  ~Player()
  {
    delete[] name_;
  }
};

int main()
{
  Player p1(200, 10, "John");
  Player p2 = p1;
}
```

객체의 메모리를 해제하는 과정에서 문제가 발생했다.

`p1`의 `name_`과 `p1`의 `name_`은 같은 주소를 가진다. 즉, 얕은 복사이다.   
따라서 처음 `delete`를 할 때, 두 객체의 멤버가 모두 해제되는 실수가 생긴 것이다.

이로써 알 수 있듯 얕은 복사는 쉽고 간편한 대신,   
포인터 등의 복사 시 같은 주소를 참조하게 되어   
동적 할당의 부분에서 문제를 발생시킨다.

## 깊은 복사

주소가 가리키는 값, 메모리의 값을 복사하는 형태
새 주소를 할당 후에 참조하기 때문에 문제가 없다.

이 문제를 해결하기 위해 <mark style="background-color: #3e3e3e; color: orange;">복사 생성자</mark>라는 생성자를 만들 수 있다.   
이 또한 생성자로 클래스의 식별자(이름)와 이름이 같다.

위 클래스의 <mark style="background-color: #3e3e3e; color: orange;">복사 생성자</mark>를 만들면 아래와 같다.

```cpp
class Player
{
  //  생략
  Player(const Player &p)
      : hp_(p.hp_), at_(p.at_), name_(new char[strlen(p.name_) + 1])
  {
    strcpy(name_, p.name_);
  }
};
```

볼 수 있듯, <mark style="background-color: #3e3e3e; color: orange;">복사 생성자</mark>는 동적 할당되는 부분을 새롭게 할당하여 값만을 복사한다.   
따라서 소멸자가 호출되어도 각각의 객체가 메모리를 해제한다.

또한 대입 연산자 `=`를 사용하면 암시적으로 복사 생성자를 호출하게 된다.   
(복사 생성자가 정의된 경우에만 해당한다.)

```cpp
int main()
{
  Player p1(200, 10, "John");
  Player p2(p1);
  Player p3 = Player(p1);
}
```

___

복사 생성자는 다음과 같은 상황에 주로 사용된다.

* 객체가 함수에 인수로 전달될 때
* 함수가 객체를 반환할 때
* 새로운 객체를 복사 생성할 때