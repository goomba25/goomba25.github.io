---
title: "[C++] C 스타일 문자열"
excerpt: "C 스타일의 문자열 char[]"

categories:
  - Cpp
tags:
  - [Cpp, 문자열]

toc: true
toc_sticky: true

last_modified_at: 2021-07-14
---

문자열은 말 그대로 '문자의 배열'이다.   
문자열은 일반적인 배열과는 다르게 맨 마지막에 null문자를 가진다.

null 문자는 문자열의 끝을 나타내며, ASCII 코드로 `\0`이다.

```cpp
char array[] = "string";

std::cout << sizeof(array) << std::endl;  //  7
```

6개의 문자를 가지는 배열처럼 보이지만 실제로는 7개의 문자를 가진다.   
자동으로 null 문자가 추가되는 것이다.

따라서 문자열의 특정 인덱스에 null 문자를 삽입할 경우   
문자열이 해당 인덱스에서 종료되는 것을 볼 수 있다.

```cpp
char array[] = "string";
array[2] = '\0';
std::cout << array << std::endl;  //  st
```

또한 위에서 볼 수 있듯, 일반적인 배열과 달리 반복문으로 순회하지 않고 출력할 수 있다.

___

만약 문자열을 생성한 뒤에 문자열의 사이즈보다 큰 문자열로 덮어 쓰거나   
null 문자의 인덱스에 다른 값을 삽입하면 랜덤하게 null 문자를 만날때까지 문자가 삽입된다.

```cpp
char str[] = "abc";
str[4] = 'd';

std::cout << str << std::endl;  //  abcde�0�T�[�
```

___

## 문자열 입력

`std::cin` 을 통해 입력해 줄 수 있다.   
하지만 입력받을 문자열의 크기를 가늠할 수 없는데,   
무작정 사이즈를 크게 만들어 놓는 것은 비효율적이다.

이때 `std::cin.getline` 함수를 사용할 수 있다.

```cpp
char name[255];
std::cout << "Input : ";
std::cin.getline(name, 255);
std::cout << name << std::endl;
```

`getline`함수는 최대 254개(null 문자 제외)의 문자를 입력 받을 수 있으며,   
그 이상 입력되는 문자는 버린다. (오버플로우 X)

또한 `std::cin` 은 공백 이전까지의 문자를 입력받는데에 반해   
`getline`을 사용하면 공백 또한 입력 받을 수 있다.

___

## \<cstring> 라이브러리 함수

C++에서 C 스타일의 문자열에 관련된 함수를 사용할 수 있다.   
\<cstring> 라이브러리를 사용하면 된다.

* strcmp
* strcpy
* strcat

#### strcmp(A, B)

두 문자열을 비교한다.   
사전적 우선순위를 평가하여 같을 경우 0 을 반환한다.   
(A가 더 앞에 있는 경우 -1을, 뒤에 있을 경우 1을 반환한다.)

```cpp
char str1[] = "hello";
char str2[] = "hello";

std::cout << strcmp(str1, str2) << std::endl; //  0
```

#### strcpy(A,B)

B의 문자열을 A에 복사한다. 이때 A가 B보다 배열의 크기가 작을 경우 잘못된 내용이 삽입된다.

```cpp
char str1[100];
char str2[] = "hello";

strcpy(str1, str2);

std::cout << str1 << std::endl; //  hello
```

#### strcat(A,B)

B의 내용을 A의 뒤에 삽입한다.

```cpp
char str1[] = "abc";
char str2[] = "def";

strcat(str1, str2);

std::cout << str1 << std::endl; //  abcdef
```