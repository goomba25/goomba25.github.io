---
title: "[C++] do~while 문 (반복문)"
excerpt: "C++ 의 반복문 중 하나인 do~while 문에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 반복문]

last_modified_at: 2021-07-12
---

`do while`문은 `while`문과 거의 동일한 반복문이다.

하나의 차이점이 존재하는데,   
`while`문은 실행 전에 조건문을 평가하는데에 반해,   
`do while`문은 반드시 한 번 실행한 뒤에 조건을 평가한다.

동일한 내용의 코드로 비교해보자.

```cpp
int i(0);

while (i < 0) {
  std::cout << i << std::endl;
}
std::cout << "while 종료" << std::endl;

int j(0);

do {
  std::cout << j << std::endl;
} while (j < 0);
std::cout << "do~while 종료" << std::endl;
```

두 반복문의 내용은 같지만

`while`문은 루프를 돌기 전에 조건을 평가하여 거짓이 되므로   
내부의 코드를 실행하지 않고 `while 종료` 문자열을 출력한다.

하지만 `do while`문은 한 번 루프를 돌고 조건을 평가하기 때문에   
0 을 출력한 뒤에 `do~while 종료` 문자열을 출력한다.

이러한 차이점을 제외하곤 모두 `while`문과 동일하다.