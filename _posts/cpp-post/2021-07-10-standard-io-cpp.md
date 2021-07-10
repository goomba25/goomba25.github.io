---
title: "[C++] 표준 입출력 cin, cout"
excerpt: "C++ 의 표준 입출력 std::cin, std::cout"

categories:
  - Cpp
tags:
  - [Cpp, std, 표준 입출력]

toc: true
toc_sticky: true

last_modified_at: 2021-07-10
---

C++의 표준 입출력 std::cin과 std::cout은   
\<iostream> 라이브러리를 사용하며 std 네임스페이스에 속한다.

cin 과 cout 은 쉬프트 연산자 <<, >> 를 통해 이루어진다.   
(stream 의 뜻 '흐른다'의 의미를 생각하면 된다.)

C의 표준 입출력 scanf, printf 와는 다르게 서식을 필요로 하지 않는다.   
(스스로 타입을 인식하여 출력한다.)

___

## 표준 출력 std::cout

```cpp
#include <iostream>

int main()
{
  char ch = 'a';
  int num = 1;
  float fl = 3.14f;

  // 일반 출력
  std::cout << fl << std::endl; //  3.14

  // 연속 출력
  std::cout << 'a' << ", " << 1 << std::endl; //  a, 1
}
```

문자, 정수, 실수 등을 서식 없이 출력할 수 있고, 연속으로 출력 또한 가능하다.

std::cout 은 내부적으로 몇 가지의 메서드를 가지고 있다.

```cpp
std::cout.put('a'); //  a
std::cout.put('\n');
std::cout.write("Apple is red", 5); //  Apple
```

std::cout.put(문자) 는 문자를 출력하고,   
std::cout.write(문자열, 정수) 는 문자열의 n 번째까지 출력한다.

### 표준 출력의 std::endl

```cpp
std::cout << std::endl;
```

출력 뒤에 std::endl 를 해주면 해당 문자 또는 문자열이 출력된 후에 개행을 시켜준다. 아래와 같은 기능을 한다.

```cpp
std::cout << "\n";
```

## 표준 입력 std::cin

```cpp
#include <iostream>

int main()
{
  int a;
  double b;
  std::cin >> a >> b;
  std::cout << a << std::endl;
  std::cout << b << std::endl;
}
```

cin 또한 연속적으로 입력이 가능하다. (스페이스, 엔터로 구분한다.)

std::cin 은 내부적으로 몇 가지의 메서드를 가지고 있다.

```cpp
int num;

std::cin >> num;

if (std::cin.fail()) {
  std::cin.clear();
  std::cout << "Fail..." << std::endl;
} else {
  std::cout << "Success : " << num << std::endl;
}
```

std::fail 함수는 올바른 시도일 경우 false, 아닐 경우 true 를 반환한다.

std::clear 함수는 cin 내부의 값을 초기화하는 함수이다.

따라서 위에서 정수를 입력하면 Success 와 함께 값을 출력하고,   
다른 타입의 값을 입력하면 Fail 과 함께 입력했던 값이 초기화된다.