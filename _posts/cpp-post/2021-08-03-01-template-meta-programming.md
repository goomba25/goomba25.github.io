---
title: "[C++] 템플릿 메타 프로그래밍(TMP)"
excerpt: "템플릿 메타 프로그래밍에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Template]

last_modified_at: 2021-08-03
---

템플릿은 클래스나 함수를 만들기 위한 하나의 '틀'이다.   
이처럼 컴파일 타임에 만들어진 코드를 사용하여 프로그래밍하는 것을   
<mark style="background-color: #3e3e3e; color: orange;">메타 프로그래밍</mark>이라고 한다.

이러한 <mark style="background-color: #3e3e3e; color: orange;">메타 프로그래밍</mark>은 `컴파일 타임`에 연산을 끝내기 때문에,   
보다 빠르게 동작하며 여러 오류를 잡아낼 수 있다.

하지만 그만큼 컴파일 시간이 길어지고, `컴파일 타임`에 연산하기 때문에   
디버깅이 불가능하며, 템플릿 오류 시 엄청난 길이의 오류를 보게 된다.

## 템플릿 메타 프로그래밍 (Template Meta Programming)

팩토리얼을 재귀 함수를 사용하여 아래와 같이 구현할 수 있다.

```cpp
int factorial(int value)
{
  if (value == 1)
    return value;
  return value * (factorial(value - 1));
}
```

이것을 템플릿을 활용한 <mark style="background-color: #3e3e3e; color: orange;">메타 프로그래밍</mark>으로 아래와 같이 구현할 수 있다.

```cpp
template<int N>
struct factorial
{
  static const int value = N * factorial<N - 1>::value;
};

template<>
struct factorial<1>
{
  static const int value = 1;
};


int main()
{
  std::cout << factorial<5>::value << std::endl;  //  120
}
```

> `static const`타입의 변수를 사용하는 이유는   
`static`타입 멤버의 클래스 객체 사이에서 공유되는 특성과   
`const`타입 값의 변하지 않는 특성을 합한 것으로,   
템플릿을 사용하더라도 객체처럼 타입을 생성할 수 있기 때문이다.

___

또한 메타 프로그래밍은 `컴파일 타임`에 연산하기 때문에 변수로 선언할 수 없다.   
하지만 상수로는 가능하다.

```cpp
template<int N>
struct factorial
{
  static const int value = N * factorial<N - 1>::value;
};

template<>
struct factorial<1>
{
  static const int value = 1;
};


int main()
{
  const int a = 5;
  std::cout << factorial<a>::value << std::endl;  //  120
}
```

중요한 것은 실질적으로 값을 가지는 객체는 없다는 것이다.   
> 여기서는 std::cout 을 통해 `factorial<5>`의 자료형(타입)을 출력했을 뿐이다.

즉, 메모리에 존재하지 않는다. 그저 해당 값을 가리키는 자료형(타입)에 불과하다.   
하지만 컴파일러는 이를 값으로 치환하여 출력한다.

> 연산은 `컴파일 타임`에 이미 진행되며, `런타임`에 결과를 보여줄 뿐이다.

___

피보나치 수열도 구현해보자.

일반적으로 구현하면 아래와 같이 구현할 수 있다.

```cpp
int fibonacci(int value)
{
  if (value <= 1)
    return value;

  return fibonacci(value - 1) + fibonacci(value - 2);
}

int main()
{
  int result = fibonacci(3);
  std::cout << result << std::endl;  //  2
}
```

이것을 TMP를 사용하여 구현하면 아래와 같다.

```cpp
template<int N>
struct fibonacci
{
  static const int value = fibonacci<N - 1>::value + fibonacci<N - 2>::value;
};

template<>
struct fibonacci<0>
{
  static const int value = 0;
};

template<>
struct fibonacci<1>
{
  static const int value = 1;
};

int main()
{
  std::cout << fibonacci<0>::value << std::endl;  //  0
  std::cout << fibonacci<1>::value << std::endl;  //  1
  std::cout << fibonacci<2>::value << std::endl;  //  1
  std::cout << fibonacci<3>::value << std::endl;  //  2
  std::cout << fibonacci<4>::value << std::endl;  //  3
  std::cout << fibonacci<5>::value << std::endl;  //  5
  std::cout << fibonacci<6>::value << std::endl;  //  8
  std::cout << fibonacci<7>::value << std::endl;  //  13
  std::cout << fibonacci<8>::value << std::endl;  //  21
}
```

피보나치 수열은 앞의 0과 1의 값이 정의되어야 하므로   
템플릿 특수화를 통해 해당 파라미터의 템플릿을 정의했다.