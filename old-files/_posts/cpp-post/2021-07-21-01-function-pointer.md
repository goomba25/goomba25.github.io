---
title: "[C++] 함수 포인터"
excerpt: "함수를 가리키는 포인터, 함수 포인터"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-21
---

변수가 주솟값을 가지듯 함수도 주솟값을 가지고 있는데,   
따라서 포인터로 함수를 가리킬 수 있다.

함수 포인터의 선언은 조금 못생겼다.

```cpp
자료형 (*함수포인터)(매개변수 자료형) = 함수이름;

자료형 (*함수포인터)(매개변수 자료형) = &함수이름;
```

함수 포인터는 가리키는 함수에 `&`를 붙이지 않아도 된다. (하지만 가능하다.)

___

예를 들어 아래와 같은 함수가 있다.

```cpp
int sum(int x, int y)
{
  return x+y;
}
```

이 함수를 가리키는 함수 포인터는 아래와 같다.

```cpp
int (*fptr)(int, int)() = sum;
```

즉, 함수 포인터는 가리킬 함수의 반환 자료형과 매개 변수의 자료형을 알아야하므로   
함수의 원형을 알고 있어야 한다.

주의할 점은 함수 포인터는 역참조 연산자 `*`와 포인터 이름을 함께 괄호로 묶어줘야한다는 것이다.

___

함수 포인터도 선언만 해놓을 수 있으며 재할당 또한 가능하다.

```cpp
int func1();
int func2();

int main()
{
  int (*fptr)();
  
  fptr = func1;  //  func1 pointer
  
  fptr = func1;  //  func2 pointer
}
```

## 함수 포인터의 사용

함수 포인터는 호출하는 방법이 두 가지인데,

첫째는 명시적으로 역참조하는 것이고,   
둘째는 암시적으로 역참조되는 것이다.

1. 명시적 역참조

```cpp
int sum(int x, int y)
{
  return x+y;
}

int main()
{
  int (*fptr)(int, int) = sum;
  std::cout << (*fptr)(1,2); << std::endl;  //  3
}
```

2. 암시적 역참조

두번째 방법은 현대의 컴파일러는 암시적 추론을 통해 함수포인터를 알아서 역참조 되기 때문에   
역참조를 따로 해줄 필요가 없다는 것이다.

```cpp
std::cout << fptr(1, 2) << std::endl; //  3
```

## 사용 예제

```cpp
#include <iostream>

struct Unit
{
  int hp_;
  void (*dieCallBack)();
};

void Damaged(Unit &u)
{
  u.hp_ -= 100;

  if (u.hp_ <= 0) {
    std::cout << "Died" << std::endl;
    if (u.dieCallBack) {
      u.dieCallBack();
    }
  }
}

void Gameover()
{
  std::cout << "Game Over" << std::endl;
}

int main()
{
  auto (*fptr)() = Gameover;

  Unit monster = {200, nullptr};
  Unit player = {200, fptr};

  Damaged(monster);
  Damaged(monster);  //  monster 객체 Died 출력

  Damaged(player);
  Damaged(player);  //  player 객체 Died 출력 및 fptr의 함수 호출
}
```

`Unit` 이라는 구조체에 함수포인터를 멤버 함수로 갖게 했다.

`Damaged` 함수에서 인수인 `Unit` 의 멤버 변수 hp_가 0 이하가 되면 Died 라는 문자열을 출력하고,   
함수 포인터가 존재한다면 함수를 호출하도록 했다.

`monster` 객체는 멤버인 함수 포인터가 아무것도 가리키지 않도록 nullptr로 초기화했으며   
`player` 객체는 Gameover 함수를 가리키는 함수 포인터 `fptr` 로 초기화 해줬다.

따라서 `monster` 의 hp_ 가 `Damaged` 함수를 통해 0 이 되면 Died 가 출력되고,   
`player` 의 hp_ 가 0 이 되면 Died 문자열 출력과 함께 `fptr` 이 가리키는 Gameover 함수를   
호출하고 Game Over 를 출력한다.

## 함수 레퍼런스

변수에 포인터와 레퍼런스가 가능하듯, 함수 레퍼런스도 가능하다.

```cpp
int (&fptr)(int, int) = sum;

std::cout << fptr(1,2) << std::endl;
// std::cout << (*fptr)(1,2) << std::endl;
```

함수 레퍼런스 또한 변수의 레퍼런스처럼 초기화해야 한다.    

## std::function

`std::function`은 \<functional> 라이브러리에 정의된 함수 포인터의 확장된 개념이라고 볼 수 있다.

```cpp
std::function<반환자료형(매개변수 자료형)> 이름 = 함수이름;
```

예제를 만들어보면

```cpp
#include <functional>

void print()
{
  std::cout << "print" << std::endl;
}

int sum(int x, int y)
{
  return x+y;
}

int main()
{
  std::function<void()> func1 = print;
  func1();
  
  std::function<int(int, int)> func2;
  func2 = sum;
  
  std::cout << func2(2,3) << std::endl;
}
```

함수 포인터와 비슷한 것을 알 수 있다.   
하지만 함수 포인터는 가독성이 좋지 않고 실수할 가능성이 크기 때문에   
`std::function`이나 `typedef`, `using`을 통해 변경하는 것을 추천한다.