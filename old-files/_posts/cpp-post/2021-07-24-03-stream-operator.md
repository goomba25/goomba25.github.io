---
title: "[C++] 입출력 연산자의 오버로딩"
excerpt: "입출력 연산자의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩, std, iostream]

toc: true
toc_sticky: true

last_modified_at: 2021-07-24
---

이번에는 C++ 표준 입출력 `std::cin`과 `std::cout`을 오버로딩한다.

입출력 연산자는 표준 클래스이기 때문에 수정이 불가능하다. (`std`)   
따라서 특정 클래스가 아닌 전역 함수로만 오버로딩이 가능하다.

## 출력 연산자 오버로딩 (전역 함수)

`std::cout`은 `ostream`클래스의 객체이다.   
`ostream`클래스의 멤버 함수로 `<<`가 각 타입마다 정의되어 있다.

```cpp
ostream& operator<<(int& val);
ostream& operator<<(double& val);
ostream& operator<<(char& val);
...
```

따라서 `<<`를 오버로딩해야한다.

```cpp
class Vector
{
  int x_;
  int y_;
  int z_;

public:
  Vector(int x, int y, int z)
      : x_(x), y_(y), z_(z)
  {}

  friend std::ostream& operator<<(std::ostream &, Vector &);
};

std::ostream& operator<<(std::ostream &os, Vector &v)
{
  os << "Vector : " << v.x_ << " " << v.y_ << " " << v.z_;
  return os;
}

int main()
{
  Vector v1(1,2,3);
  std::cout << v1 << std::endl;
}

//  Vector : 1 2 3
```

`friend`키워드를 사용하여 내부의 멤버에 접근하도록 한다.   
인수로 `ostream`을 레퍼런스로 전달받는 이유는 `std::cout`이 피연산자가 되기 때문이다.

```cpp
operator<<(std::cout, v1);
//  std::cout << v1;
```

출력 연산자는 연속적으로 사용이 가능했기 때문에 오버로딩 또한 `ostream`타입으로 선언했다.

## 입력 연산자 오버로딩 (전역 함수)

입력 연산자 `std::cin`은 `istream`클래스의 객체이다.

`istream`클래스의 멤버 함수로 `>>` 연산자가 타입마다 정의되어 있다.

```cpp
istream& operator>>(int& val);
istream& operator>>(double& val);
istream& operator>>(char& val);
...
```

따라서 `>>`를 오버로딩한다.

```cpp
class Vector
{
  //  생략
  friend std::ostream& operator<<(std::ostream &, Vector &);
  friend std::istream& operator>>(std::ostream &, Vector &);
};

std::istream& operator>>(std::istream &is, Vector &v)
{
  is >> v.x_ >> v.y_ >> v.z_;
  return is;
}

int main()
{
  Vector v1(1,2,3);

  std::cin >> v1;

  std::cout << v1 << std::endl;
}

//  10 20 30
//  Vector : 10 20 30
```

이 또한 연속 호출이 가능하도록 `istream` 타입으로 선언했다.