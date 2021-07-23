---
title: "[C++] 재귀 함수"
excerpt: "자신을 호출하는 재귀 함수에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-23
---

재귀란 "원래의 자리로 되돌아가거나 되돌아옴"을 뜻하는 단어로   
재귀 함수는 함수가 자신을 호출하는 것을 가리킨다.

```cpp
void count(int num)
{
  std::cout << num << std::endl;
  count(num - 1);
}

int main()
{
  count(3);
}
```

위와 같은 `count`함수는 자기 자신을 연속적으로 호출하는 재귀 함수이다.

때문에 재귀 함수는 언제 함수를 종료할 것인지 반드시 명시해야 한다.

```cpp
void count(int num)
{
  if (num < 0)
    return;

  std::cout << num << std::endl;
  count(num - 1);
}

int main()
{
  count(3);
  std::cout << "종료" << std::endl;
}


// 3
// 2
// 1
// 0
// 종료
```

___

알아야 할 것은 호출된 함수가 종료되면 호출된 곳으로 되돌아 간다는 점이다.

```cpp
void count(int num)
{
  if (num < 0)
    return;
  
  std::cout << num << std::endl;
  count(num - 1);
  
  std::cout << num << std::endl;
}

int main()
{
  count(3);
  std::cout << "종료" << std::endl;
}


// 3
// 2
// 1
// 0
// 0
// 1
// 2
// 3
// 종료
```

`count(3)`에서 `count(2)`를 호출하고,   
`count(2)`에서 `count(1)`을 호출하고,   
`count(1)`에서 `count(0)`을 호출한다.

인수 `num`이 0이 되면 재귀 호출이 종료되어 호출된 지점으로   
되돌아가며 `count(3)` 지점까지 되돌아가고 함수가 종료된다.

## 재귀 함수 예시

재귀 함수는 점화식 등에서 유용하게 쓰일 수 있다.

* 재귀 함수 팩토리얼

```cpp
#include <iostream>

int factorial(int num)
{
  if (num == 1) {
    std::cout << num << " = ";
    return 1;
  }

  std::cout << num << " * ";
  return num * factorial(num-1);
}

int main()
{
  int input, result;
  std::cout << "팩토리얼 구하기" << std::endl;
  std::cout << "구할 팩토리얼 n : ";
  std::cin >> input;
  std::cout << input << "의 팩토리얼 : ";

  result = factorial(input);
  std::cout << result << std::endl;
}


// 팩토리얼 구하기
// 구할 팩토리얼 n : 4
// 4의 팩토리얼 : 4 * 3 * 2 * 1 = 24
```

* 재귀 함수 피보나치 수열

```cpp
#include <iostream>

int Fibonacci(int num)
{
  if (num <= 1) {
    return 1;
  }

  return Fibonacci(num-1) + Fibonacci(num-2);
}

int main()
{
  int input, result;
  std::cout << "피보나치 수열 구하기" << std::endl;
  std::cout << "구할 피보나치 수열 n번째 : ";
  std::cin >> input;

  result = Fibonacci(input);
  std::cout << result << std::endl;
}


// 피보나치 수열 구하기
// 구할 피보나치 수열 n번째 : 5
// 8
```