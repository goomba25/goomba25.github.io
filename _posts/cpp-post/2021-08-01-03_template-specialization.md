---
title: "[C++] 템플릿 특수화"
excerpt: "템플릿의 특수화에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Template]

toc : true
toc_sticky: true

last_modified_at: 2021-08-01
---

<mark style="background-color: #3e3e3e; color: orange;">템플릿 특수화</mark>란 템플릿을 사용할 때,   
특정 자료형에 대하여 특정 작업을 수행하도록 만드는 방법이다.

## 함수 템플릿 특수화

```cpp
template<typename T>
void swap(T &x, T &y)
{
  T temp = x;
  x = y;
  y = temp;
}
```

두 변수를 교환하는 함수 템플릿이 있다.   
함수 중 `float`형 변수를 교환하는 함수에만 특정 작업을 수행하고자 한다.

이때 <mark style="background-color: #3e3e3e; color: orange;">템플릿 특수화</mark>를 사용한다.

```cpp
template<typename E>
void swap(E &x, E &y)
{
  std::cout << "swap" << std::endl;
  E temp = x;
  x = y;
  y = temp;
}

template<>
void swap<float>(float &x, float &y)
{
  std::cout << "float 교환 함수" << std::endl;
  float temp = x;
  x = y;
  y = temp;
}

int main()
{
  int ia(10), ib(20);
  std::cout << ia << ", " << ib << std::endl;
  swap(ia, ib);
  std::cout << ia << ", " << ib << std::endl;
  std::cout << std::endl;

  float fa(2.4), fb(11.3);
  std::cout << fa << ", " << fb << std::endl;
  swap(fa, fb);
  std::cout << fa << ", " << fb << std::endl;
}


//  10, 20
//  swap
//  20, 10

//  2.4, 11.3
//  float 교환 함수
//  11.3, 2.4
```

<mark style="background-color: #3e3e3e; color: orange;">템플릿 특수화</mark>는 `template` 는 아무 파라미터 없이 적어주며   
기존의 템플릿에서 특정 자료형을 지정하여 파라미터에 채운다.   

특수화된 템플릿은 내부의 내용을 다르게 변경할 수 있다.

> 이처럼 특정 자료형에 대해 특정 작업을 수행할 때 템플릿 특수화를 사용할 수 있다.
> 함수 뒤에 붙는 템플릿 파라미터는 생략이 가능하다.
___


### 다수의 템플릿 특수화

```cpp
class Test
{};

template<typename E>
void swap(E &x, E &y)
{
  std::cout << "swap" << std::endl;
  E temp = x;
  x = y;
  y = temp;
}

template<>
void swap<float>(float &x, float &y)
{
  std::cout << "float 교환 함수" << std::endl;
  float temp = x;
  x = y;
  y = temp;
}

template<>
void swap(Test &x, Test &y)
{
  std::cout << "Test Class는 교환할 수 없습니다." << std::endl;
}
```

### 함수 템플릿의 오버로딩

함수 템플릿도 오버로딩이 가능하다.   
<mark style="background-color: #3e3e3e; color: orange;">템플릿 특수화</mark>와 함수 템플릿의 오버로딩은 모양이 비슷하여 헷갈릴 수 있다.

```cpp
template<typename T>
void swap(T &x, T &y)
{
  std::cout << "swap" << std::endl;
  T temp = x;
  x = y;
  y = temp;
}

template<typename T>
void swap(T *x, T *y)  //  함수 오버로딩
{
  std::cout << "float 교환 함수" << std::endl;
  T temp = *x;
  *x = *y;
  *y = temp;
}

int main()
{
  int ia(10), ib(20);
  std::cout << ia << ", " << ib << std::endl;
  swap(ia, ib);
  std::cout << ia << ", " << ib << std::endl;

  float fa(2.4), fb(11.3);
  std::cout << fa << ", " << fb << std::endl;
  swap(&fa, &fb);
  std::cout << fa << ", " << fb << std::endl;
}
```

* 함수의 모양을 유지하는 것은 동일하지만,   
이는 특수화가 아닌 오버로딩이다.

## 클래스 템플릿 특수화

클래스 템플릿의 특수화도 함수 템플릿의 특수화와 동일하다.

```cpp
template<typename T, typename E>
class Test
{
public:
  T num1_;
  E num2_;
};

template<>
class Test<int, int>
{};
```

* 특수화된 템플릿의 객체는 내부에 멤버가 존재하지 않는다.

### 특수와의 종류

특수화는 `완전 특수화`와 `부분 특수화`가 존재한다.

위의 클래스 템플릿의 특수화는 완전 특수화라고 한다.

부분 특수화는 자료형이 완전히 정해지지 않은 특수화를 말한다.   
(부분 특수화는 클래스 템플릿에만 존재한다.)


> 임의의 자료형을 2개 갖는 클래스라고 가정할 때, 부분 특수화는 아래와 같다.
> * 동일한 자료형을 받는 특수화
> * 하나만 특정 자료형으로 받는 특수화
> * 포인터를 받는 특수화

```cpp
template<typename T, typename E>
class Test
{};

template<>
class Test<int, int>  //  완전 특수화
{};

template<typename T>
class Test<T, T>  //  동일 타입 2개를 받는 부분 특수화
{};

template<typename T>
class Test<T, int>  //  하나를 특정 자료형으로 받는 부분 특수화
{};

template<typename T, typename E>
class Test<T*, E*>  //  포인터로 받는 부분 특수화
{};

...
```

* 부분 특수화의 경우, 사용에 주의해야 하며   
해석이 모호해질 경우 에러가 발생한다.

___

부분 특수화로 인해 모호해지는 상황을 확인해보자.

```cpp
template<typename T, typename E>
class Test
{
public:
  T num1_;
  E num2_;
};

template<typename T>
class Test<T, T>
{
public:
  T num3_;
};

template<typename T>
class Test<T, int>
{
public:
  int num4_;
};

int main()
{
  Test<int, int> t1;
}
```

* `t1`객체는 `Test<T,T>`와 `Test<T,int>`로   
모두 해석이 가능하기 때문에 모호성을 띄게 된다.   
따라서 에러가 발생한다.

이러한 모호성을 없애기 위해 구체적으로 클래스 템플릿을 특수화 해야 한다.

```cpp
template<typename T, typename E>
class Test
{
public:
  T num1_;
  E num2_;
};

template<typename T>
class Test<T, T>
{
public:
  T num3_;
};

template<typename T>
class Test<T, int>
{
public:
  int num4_;
};

template<>
class Test<int, int>  //  구체적인 완전 특수화
{
public:
  int num_;
};

int main()
{
  Test<int, int> t1;

  t1.num_;
}
```

* 구체적으로 특수화를 작성함으로써   
`t1`객체는 `Test<int,int>`에만 해당하게 된다.   
따라서 모호성이 사라지고 정상적으로 컴파일이 된다.

### 멤버 함수의 특수화

클래스 템플릿에서 멤버 함수를 특수화할 수 있다.

이는 함수 템플릿의 특수화와 비슷하다.

```cpp
template<typename T>
class Test
{
private:
  T value_;
public:
  void setValue(T);
  T getValue() { return value_; }
};

template<typename T>
void Test<T>::setValue(T value)
{
  value_ = value;
}

template<>
void Test<int>::setValue(int value)
{
  std::cout << "value set int" << std::endl;
  value_ = value;
}

int main()
{
  Test<char> t1;
  t1.setValue('a');
  std::cout << t1.getValue() << std::endl;
  std::cout << std::endl;

  Test<int> t2;
  t2.setValue(10);
  std::cout << t2.getValue() << std::endl;
}


//  a
//
//  value set int
//  10
```

* `int`형 인수가 전달되면 특수화된 함수가 호출된다.

___

> 템플릿 특수화를 진행할 때에는 구체적으로 작성하는 것이 좋으며,   
부분 특수화를 사용하는 것을 지양한다.