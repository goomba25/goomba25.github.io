---
title: "[C++] 증감 연산자"
excerpt: "C++ 의 기본 증감 연산자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자]

toc: true
toc_sticky: true

last_modified_at: 2021-07-10
---

대상을 1씩 증가시키거나 감소시키는 단항 연산자이다.

증감 연산자의 위치에 따라 전위 & 후위 연산자로 나뉜다.

|증감 연산자|설명|
|:--:|:--|
|++x| x 의 값을 1 증가시킨 후에 연산을 진행한다.|
|--x| x 의 값을 1 감소시킨 후에 연산을 진행한다.|
|x++| 연산을 진행한 후에 대상의 값을 1 증가시킨다.|
|x--| 연산을 진행한 후에 대상의 값을 1 감소시킨다.|

예시 1)

```cpp
int num(1), result;

result = ++num + 2;

std::cout << num << std::endl;  //  2
std::cout << result << std::endl; //  4
```

전위 증감 연산으로 num 의 값을 1 증가시킨 후에 연산이 진행되어   
result 값이 4 가 된다.

예시 2)

```cpp
int num(1), result;

result = num++ + 2;

std::cout << num << std::endl;  //  2
std::cout << result << std::endl; //  3
```

후위 증감 연산으로 연산이 진행된 후에 num 의 값을 1 증가시켜   
result 값이 3 이 된다.