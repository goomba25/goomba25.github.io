---
title: "[C++] 정적 멤버 & 멤버 함수"
excerpt: "static을 활용한 멤버와 멤버 함수"

categories:
  - Cpp
tags:
  - [Cpp, static, Class]

toc: true
toc_sticky: true

last_modified_at: 2021-07-23
---

정적(`static`) 할당은 정적 공간에 저장되며 메모리 할당이 처음 한 번만 이루어지고 프로그램이 종료되면 해제된다.

기존의 정적 지역 변수는 아래와 같다.

```cpp
for (int i = 0; i < 3; i++) {
  // 지역변수
  int autoVar = 0;
  autoVar ++;
  std::cout << "auto : " << autoVar << std::endl;
  
  // 정적 지역변수
  static int staticVar = 0;
  staticVar ++;
  std::cout << "static : " << staticVar << std::endl;
}


// auto : 1
// static : 1
// auto : 1
// static : 2
// auto : 1
// static : 3
```

반복문 안의 자동 지역 변수는 범위를 벗어나면 해제되지만,   
정적 지역 변수는 범위와 상관없이 지속되는 것을 볼 수 있다.

## 정적 멤버

정적 할당을 통해 클래스의 멤버를 정적(`static`) 멤버로 만들 수 있다.

이 역시 정적 공간에 저장되고 메모리 할당은 처음 한 번만 이루어지며 프로그램이 종료될 때 삭제된다.

* player.h

```cpp
class Player
{
  int hp_;
  int at_;
  static int pCount;
public:
  Player() : Player(100,10)
  {}

  Player(int hp, int at = 10) : hp_(hp), at_(at)
  {
    pCount++;
  }

  void getCount() const
  {
    std::cout << "현재 플레이어 수 : " << pCount << std::endl;
  }
};
```

* player.cpp

```cpp
int pCount = 0;
```

* main.cpp

```cpp
int main()
{
  Player p1 = Player(200, 20);
  Player p2;

  p1.getCount();  //  현재 플레이어 수 : 2
  p2.getCount();  //  현재 플레이어 수 : 2
}
```

정적 멤버 변수를 헤더에서 초기화하게 되면 다른 곳에서 헤더를 포함할 때마다 정의가 되는 것과 같다.   
때문에 헤더가 아닌  `.cpp` 같은 소스 파일에서 초기화하자.

정적 멤버 변수는 프로그램이 종료될 때까지 소멸하지 않으므로 객체가 생성될 때마다 `pCount` 는 증가한다.

디폴트 생성자는 생성자 위임을 통해 두번째 생성자를 호출하는 것과 같으므로 똑같이 `pCount` 가 증가한다.

## 정적 멤버 함수

정적 멤버 함수도 존재한다.

* player.h

```cpp
class Player
{
  int hp_;
  int at_;
  static int pCount;
public:
  Player() : Player(100,10)
  {}

  Player(int hp, int at = 10) : hp_(hp), at_(at)
  {
    pCount++;
  }
  
  static void getCount();
};
```

* player.cpp

```cpp
int pCount = 0;

void Player::getCount()
{
  std::cout << "현재 플레이어 수 : " << pCount << std::endl;
}
```

* main.cpp

```cpp
int main()
{
  Player p1 = Player(200, 20);
  Player p2;

  p1.getCount();  //  현재 플레이어 수 : 2
  Player::getCount();  //  현재 플레이어 수 : 2
}
```

정적 멤버 함수를 외부에서 정의할 경우 선언하는 프로토타입에만 `static` 키워드를 붙인다.

정적 멤버 함수의 특이점은 객체에서 사용할 수도 있지만 객체 없이도 동작한다.

객체에서 호출할 때에는 일반 멤버 함수처럼 호출할 수 있으며   
객체 없이 호출할 때에는 클래스를 범위 지정 연산자(`::`)로  호출할 수 있다.

___

정적 멤버 함수는 상수 멤버 함수와 동일하게 일반 멤버와 멤버 함수에 접근할 수 없다.

또한 `const` 키워드를 사용하는 것이 불가능하다.   
객체가 있어야 `this`, `const this`를 전달하여 함수를 호출하지만   
정적 멤버 함수는 객체가 없이도 사용이 가능하기 때문에 `this`, `const this` 를 전달하지 않기 때문이다.