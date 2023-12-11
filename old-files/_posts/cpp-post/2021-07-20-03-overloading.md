---
title: "[C++] 함수의 오버로딩 (overloading)"
excerpt: "같은 이름의 여러 함수를 만드는 기능, 오버로딩"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-20
---

함수의 오버로딩이란 다른 매개 변수를 같은 이름의 함수를 만드는 기능이다.

문자와 정수를 각각 교환하는 함수를 만든다고 가정하자.

```cpp
void swap_int(int &a, int &b)
{
  int temp = a;
  a = b;
  b = temp;
}

void swap_char(char &a, char &b)
{
  char temp = a;
  a = b;
  b = temp;
}
```

한 가지 방법은 위와 같이 조금 다른 이름으로 함수를 구별할 수도 있다.

하지만 함수의 오버로딩을 사용하면 이를 더 단순한 방법으로 구현이 가능하다.

```cpp
void swap(int &a, int &b)
{
  int temp = a;
  a = b;
  b = temp;
}

void swap(char &a, char &b)
{
  char temp = a;
  a = b;
  b = temp;
}
```

이러한 함수의 오버로딩이 같은 이름으로 인해 충돌이 일어날 것처럼 보이지만   
이는 실행 시에 컴파일러가 함수를 다르게 인식한다고 한다.

ex)

```cpp
swap#int-int
swap#char-char
```

___

## 오버로딩 함수의 호출

오버로딩하는 과정에서 주의할 점이 있다.   
오버로딩된 함수를 호출하게 되면 다음과 같은 일이 일어난다.

1. 매개 변수와 자료형이 일치하는 함수를 찾는다.
2. 일치하는 함수가 없는 경우, 암시적 변환을 통해 승격 또는 표준 변환을 진행하여 일치하는 함수를 찾는다.
3. 사용자 정의 자료형으로 변환하여 일치하는 함수를 찾는다.
4. 모호하다 라고 판단하고 오류를 발생시킨다.

### 1. 매개 변수와 자료형이 일치하는 함수를 찾는다.

인수를 자료형에 맞게 정확히 전달하여 함수를 호출하는 경우, 이것에 해당한다.

### 2. 일치하는 함수가 없는 경우, 암시적 변환을 통해 승격 또는 표준 변환을 진행하여 일치하는 함수를 찾는다.

일치하는 함수가 없다면 인수를 승격시켜 일치하는 함수를 찾으려고 한다.

* char, unsigned char, short → int
* unsigned short → 크기에 따라 int, unsigned int
* float → double
* enum → int

```cpp
void print(int value)
{
  std::cout << value << std::endl;
}

int main()
{
  char ch = 'a';

  print(ch);  //  97
}
```

승격시켜도 일치하는 함수가 없다면, 표준 변환을 통해 일치하는 함수를 찾는다.

* 숫자 타입과 enum 은 다른 숫자 타입으로 변환된다. (예를 들어 float → int, int → float, ...)
* 0 은 포인터 또는 숫자 타입으로 변환된다. (예를 들어 0 → char*, 0 → short, ...)
* 포인터는 void 포인터로 변환된다.

```cpp
void print(float value)
{
  std::cout << value << std::endl;
}

int main()
{
  char ch = 'a';

  print(ch);  //  97
}
```

### 3. 사용자 정의 자료형으로 변환하여 일치하는 함수를 찾는다.

클래스 등의 자료형이 있다면, 해당 자료형으로 변환하여 일치하는 함수를 찾는다고 한다.

클래스에 대하여 공부한 뒤에 알아보도록 하겠다.


### 4. 모호하다 라고 판단하고 오류를 발생시킨다.

변환을 하고 나서도 정확히 일치하는 함수가 없거나, 두가지 이상의 함수와 일치한다면 모호하다 라고 판단하고 오류가 발생한다.

이러한 오류들을 발생시키지 않기 위해 전달하는 인수의 자료형을 명확하게 해주는 것이 좋다.