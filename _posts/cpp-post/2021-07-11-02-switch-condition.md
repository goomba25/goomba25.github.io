---
title: "[C++] switch 문 (조건문)"
excerpt: "C++ 의 조건문 중 하나인 switch 문에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 조건문]

last_modified_at: 2021-07-11
---

`switch` 조건문은 `if` 조건문과는 결이 다른 조건문이다.

```cpp
switch (조건)
{
  case 1:
    // code 1
    break;
  case 2:
    // code 2
    break;
  default:
    // code 3
    break;
}
```

`switch` 의 조건(`expression`)은 `if`의 조건식(`condition`)과 다르다.

조건에는 정수형의 값이 위치하며, 해당 값과 같은 `case`의 레이블을 찾아 실행한다.   
일치하는 레이블이 없을 경우 `default`의 코드를 실행한다.

주의할 점은 `break`문을 사용하지 않으면 계속해서 아래의 코드를 읽어 실행한다.   
(결국 `default`의 코드를 실행할 것이다.)

<h3>
<mark style="background-color: #2e2e2e; color: #ff0000; font-weight: bold"> 알아두자 </mark>
</h3>

`switch` 조건문은 사용할 조건이 많지 않지만 가독성이 좋고 처리속도가 빠르다.   
하지만 `if` 조건문은 조건을 하나하나 검사하므로 속도가 `switch`에 비해 느리지만,   
어디에든 사용할 수 있는 범용성을 가진다.

___

예시)

```cpp
char ch;

std::cout << "1. a\n2. b\n3. c" << std::endl;
std::cout << "Input : ";
std::cin >> ch;

switch (ch)
{
case 'A':
case 'a':
  std::cout << "Output : " << 'a' << std::endl;
  break;
case 'B':
case 'b':
  std::cout << "Output : " << 'b' << std::endl;
  break;
case 'C':
case 'c':
  std::cout << "Output : " << 'c' << std::endl;
  break;

default:
  std::cout << "Invalid Input" << std::endl;
  break;
}
```

결과

```
1. a
2. b
3. c
Input : A
Output : a
```

이는 `break`문이 없을 경우 계속해서 코드를 진행하는 특성을 이용한다.   
대소문자를 함께 처리하도록 했다.

## C++17

C++17 부터 `switch`도 조건에서 변수의 선언이 가능하다.