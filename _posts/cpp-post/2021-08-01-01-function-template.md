---
title: "[C++] 함수 템플릿"
excerpt: "함수 템플릿을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, Template]

toc : true
toc_sticky: true

last_modified_at: 2021-08-01
---

<mark style="background-color: #3e3e3e; color: #94EC81;">템플릿</mark>이란 어떠한 작업을 여러 자료형으로 사용할 수 있도록 만든 틀이다.

<mark style="background-color: #3e3e3e; color: #94EC81;">템플릿</mark>의 종류는 두 가지이다.

* 함수 템플릿 (Function Template)
* 클래스 템플릿 (Class Template)

## 함수 템플릿

```cpp
void swap(int &a, int &b)
{
  int temp = a;
  a = b;
  b = temp;
}
```

* 두 변수를 교환하는 `swap`함수가 있다.   
다른 자료형의 변수를 교환하는 `swap`함수도   
함수의 오버로딩을 통해 만들 수 있다.

하지만 `swap`함수를 모든 자료형에 맞게   
오버로딩하는 일은 꽤 불편할 것이다.

이러한 상황에서 사용할 수 있는 것이 <mark style="background-color: #3e3e3e; color: orange;">함수 템플릿</mark>이다.

<mark style="background-color: #3e3e3e; color: orange;">함수 템플릿</mark>을 사용하면 같은 기능을 가진 함수를 오버로딩할 필요가 없어진다.

```cpp
template<typename T>
void swap(T &a, T &b)
{
  T temp = a;
  a = b;
  b = temp;
}
```

<mark style="background-color: #3e3e3e; color: #94EC81;">템플릿</mark>을 사용하는 방법은 간단하다.

`template`키워드와 함께 꺽쇠 안에 임의의 자료형을      
`typename` 또는 `class`와 함께 적어준다.

컴파일러는 이것을 보고 자료형을 자동 추론하고 함수에 전달한다.

___

또한 템플릿은 여러 개를 사용할 수 있다.   

```cpp
template<int N, class T>
void func(T (&num)[N])
{
  for (int i = 0; i < N; i++) {
    if (i == 3) {
      std::cout << num[i] << std::endl;
    } else {
      std::cout << num[i] << ", ";
    }
  }
}
```

> 주의할 점은 템플릿의 추론은 컴파일 타임에 일어나므로   
동적 배열에서는 사용할 수 없다.

## 함수 템플릿 사용

위에서 정의된 `swap`함수 템플릿을 사용한다.

```cpp
int main()
{
  int ix = 10;
  int iy = 20;
  std::cout << ix << ", " << iy << std::endl;
  swap(ix, iy);
  std::cout << ix << ", " << iy << std::endl;

  char cx = 'a';
  char cy = 'b';
  std::cout << cx << ", " << cy << std::endl;
  swap(cx, cy);
  std::cout << cx << ", " << cy << std::endl;
}

//  10, 20
//  20, 10
//  a, b
//  b, a
```

파라미터에 인수를 바로 전달하거나,   
임의의 자료형을 명시할 수 있다.

```cpp
swap<int>(ix, iy);
swap<char>(cx, cy);
```

___

템플릿에 임의의 자료형이 아닌, 값을 전달하는 것도 가능하다.

```cpp
template<int N>
int func()
{
  return N;
}

int main()
{
  std::cout << func<5>() << std::endl;
}

//  5
```

* 템플릿에 자료형이 아닌 값을 전달했다.

___

### 함수 템플릿과 배열의 응용

함수에 배열을 인수로 전달하려면 배열의 사이즈를 함께 전달하거나 알아야 했다.

```cpp
void func1(int (&num)[4])
{
  for (int i = 0; i < 4; i++) {
    if (i == 3) {
      std::cout << num[i] << std::endl;
    } else {
      std::cout << num[i] << ", ";
    }
  }
}

void func2(int *num)
{
  for (int i = 0; i < 4; i++) {
    if (i == 3) {
      std::cout << num[i] << std::endl;
    } else {
      std::cout << num[i] << ", ";
    }
  }
}

int main()
{
  int nums[] {1,2,3,4};

  func1(nums);  //  1, 2, 3, 4
  func2(nums);  //  1, 2, 3, 4
}
```

하지만 자료형을 자동 추론하는 템플릿의 특성을 이용하여   
배열의 사이즈를 추론하도록 할 수 있다.

```cpp
template<int N>
void func(int (&num)[N])
{
  for (int i = 0; i < N; i++) {
    if (i == 3) {
      std::cout << num[i] << std::endl;
    } else {
      std::cout << num[i] << ", ";
    }
  }
}

int main()
{
  int nums[] {1,2,3,4};

  func(nums);  //  1, 2, 3, 4
}
```

* `func`함수에 들어온 배열의 사이즈를 자동 추론한다.