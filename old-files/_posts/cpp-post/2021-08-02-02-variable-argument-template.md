---
title: "[C++] 가변 인자 템플릿"
excerpt: "템플릿을 활용한 가변 인자를 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 가변인자, Template]

toc : true
toc_sticky: true

last_modified_at: 2021-08-02
---

템플릿을 활용하여 가변 인자를 사용할 수 있다.   
여기서 사용할 가변 인자는 \<cstdarg>를 사용하지 않는다.

<mark style="background-color: #3e3e3e; color: orange;">가변 인자 템플릿</mark>은 해당 자료형의 갯수를 정하지 않는다.

```cpp
template<typename... T>
```

이때 임의의 `T`자료형을 관례적으로 `Types`, `Args`로 많이 사용한다.

중요한 것은 템플릿의 자료형을 `...`의 뒤에 적어준다.

## 가변 인자 템플릿의 사용

```cpp
void func(T... num) {}
```

가변 인자 템플릿을 사용할 때에는 `...`을 임의의 자료형 뒤에 적어준다.   
이 `...`으로 오는 것을 템플릿 <mark style="background-color: #3e3e3e; color: #94EC81;">파라미터 팩</mark>이라고 부른다.

<mark style="background-color: #3e3e3e; color: #94EC81;">파라미터 팩</mark>은 0 개 이상의 템플릿 인자를 나타낸다.

```cpp
int sum(int value)
{
  return value;
}

template<typename... Arg>
int sum(int value, Arg... args)
{
  return value + sum(args...);
}

int main()
{
  std::cout << sum(10,20,30) << std::endl;  //  60
}
```

* 전달된 인자를 모두 더하는 `sum`함수를 재귀 함수로 만들었다.

재귀 함수에서 주의할 점은 재귀의 종료인데,   
내부에서 종료할 방법이 없다.   

<mark style="background-color: #3e3e3e; color: #94EC81;">파라미터 팩</mark> `arg`가 0 개 이상의 인자를 전달 받기 때문이다.

따라서 함수의 오버로딩을 통해 인자가 하나일 때   
오버로딩된 함수를 호출하게 하여 재귀함수를 종료하도록 했다.   
(파라미터 팩이 없는 함수의 우선순위가 더 높다.)

> 주의할 것은 <mark style="background-color: #3e3e3e; color: #94EC81;">파라미터 팩</mark>이 없는 함수가 위에 있어야 한다는 것이다.   
그 이유는 컴파일러가 위에서 아래로 코드를 읽기 때문이다.   
(사용자 정의 함수의 프로토 타입을 `main`함수 위에 적어주던 것과 같다.)

## 템플릿 활용 가변 인자 템플릿

위에서 정의한 `sum`함수는 `int`형 값에만 동작하는데,   
이번에는 템플릿을 활용하여 범위를 넓혀보자.

```cpp
template<typename T>
T sum(T value)
{
  return value;
}

template<typename T, typename... Arg>
T sum(T value, Arg... args)
{
  return value + sum(args...);
}

int main()
{
  std::cout << sum<float>(10, 30.1f, 10) << std::endl;  //  50.1
  std::cout << sum(10, 30.1f, 10) << std::endl;  //  50
}
```

* `float`형 값도 더하는 것을 볼 수 있다.

> 하지만 재귀 함수를 사용했기 때문에 인수가 여러 형태일 경우,   
템플릿 파라미터를 정해주지 않으면 맨 앞 인수의 자료형을 따라 자료형이 결정된다.

### 평균 구하기

```cpp
template<typename T>
T sum()
{
  return 0;
}

template<typename T,typename... Args>
T sum(T value, Args... args)
{
  return value + sum<T>(args...);
}

template<typename... Args>
double avg(Args... args)
{
  return static_cast<double>(sum(args...)) / sizeof...(args);
}

int main()
{
  double result = avg(5, 10, 15, 20, 25);

  std::cout << result << std::endl;
}
```

* 이번에는 오버로딩된 함수를 아무 인자도 없을 때 호출하도록 만들었다.

> 평균을 구하는 `avg`함수에서 `sum`함수를 호출한다.   
이때 `sum`함수를 재귀할 때 반드시 템플릿 파라미터를 함께 적어줘야한다.   
그렇지 않으면 컴파일러가 대상의 타입을 인식하지 못한다.   
(추론한 것을 다시 추론해야하는 문제가 발생한다.)