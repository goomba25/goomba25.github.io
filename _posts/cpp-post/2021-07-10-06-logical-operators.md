---
title: "[C++] 논리 연산자"
excerpt: "C++ 의 기본 논리 연산자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자]

toc: true
toc_sticky: true

last_modified_at: 2021-07-10
---

논리식(true or false)을 판단하는 연산자이다.

|논리 연산자|설명|
|:--:|:--|
|&&|논리식이 모두 true 면 true(1) 를 반환한다.|
|\|\||논리식이 적어도 하나 이상 true 면 true(1) 를 반환한다.|
|!|논리식의 결과의 반대 결과를 반환한다.|

AND 와 OR 연산은 결합 방향이 왼쪽에서 오른쪽이며,
NOT 연산은 오른쪽에서 왼쪽이다.

쉽게 표로 정리하면 아래와 같다.

|A|B|A&&B|A\|\|B|!A|
|:--:|:--:|:--:|:--:|:--:|
|1|1|1|1|0|
|1|0|0|1|0|
|0|1|0|1|1|
|0|0|0|0|1|

예시)

```cpp
int num1(5), num2(10);
bool result1, result2;

result1 = (num1 > num2);
result2 = !(num1 < num2);

std::cout << (result1 && result2) << std::endl; //  0(false)
```

result1 의 값은 false(0)이고
result2 의 값은 true(1)의 NOT 인 false(0) 이므로
결과는 false(0)를 반환한다.