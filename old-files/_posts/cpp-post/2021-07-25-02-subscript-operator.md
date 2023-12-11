---
title: "[C++] 첨자 연산자의 오버로딩"
excerpt: "첨자 연산자 []의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩]

last_modified_at: 2021-07-25
---

첨자는 `[]`를 의미한다.

첨자의 경우 특별하게 비-상수형 함수와 상수형 함수를 모두 정의해야 한다.

```cpp
class Vector
{
  float x,y,z;
public:
  Vector(float x, float y, float z)
      : x(x), y(y), z(z)
  {}
};
```

이 클래스의 객체에 배열처럼 멤버에 접근하려고 한다.

첨자 연산자를 오버로딩 해보자.

## 첨자 연산자 오버로딩 (비-상수형)

```cpp
class Vector
{
  float operator[](int index)
  {
    if (index < 1) return x;
    else if (index == 1) return y;
    else return z;
  }
};
```

Vector 클래스의 멤버에만 접근하도록 인덱스의 범위를 제한했다.

하지만 위의 오버로딩은 값에 접근은 가능하지만, 변경은 할 수 없다.

따라서 레퍼런스형으로 반환하게 만들어야 한다.

```cpp
class Vector
{
  float &operator[](int index)
  {
    if (index < 1) return x;
    else if (index == 1) return y;
    else return z;
  }
};
```

## 첨자 연산자 오버로딩 (상수형)

상수 객체는 값에 접근은 가능하지만 변경은 불가능하기 때문에   
비-상수형 객체와 다르게 접근만 가능하도록 정의해야 한다.

```cpp
class Vector
{
  float operator[](int index) const
  {
    if (index < 1) return x;
    else if (index == 1) return y;
    else return z;
  }
};
```

___

한가지 팁은 큰 데이터의 객체를 함수로 주고 받아야 하는 경우,   
상수 레퍼런스형으로 반환하게 만들면 복사가 일어나지 않고   
좀 더 가볍게 반환이 가능하다.   
(`const`값을 반환하는 함수이기 때문에 레퍼런스가 가능하다.)

```cpp
class Vector
{
  const float& operator[](int index) const
  {
    if (index < 1) return x;
    else if (index == 1) return y;
    else return z;
  }
};
```

## 다른 클래스의 첨자 연산자 오버로딩

이번엔 C 스타일 문자열을 멤버로 갖는 클래스로 알아보자.   
(관련 메서드를 사용하기 위해 \<cstring> 헤더를 include 했다.)

```cpp
#include <cstring>

class String
{
  char *str_;
public:
  String(const char *str)
      : str_(new char[strlen(str) + 1])
  {
    strcpy(str_, str);
  }
};
```

첨자 연산자의 오버로딩을 아래와 같이 정의했다.

```cpp
class String
{
  // 생략
  char &operator[](int index)
  {
    return str_[index];
  }

  char operator[](int index) const
  {
    return str_[index];
  }
  
  friend std::ostream &operator<<(std::ostream &, const String &);
};

std::ostream &operator<<(std::ostream &os, const String &str)
{
  os << str.str_;
  return os;
}
```

객체의 멤버 출력은 C++ 스타일의 문자열처럼 출력도 가능하게  
출력 연산자를 오버로딩했다.

```cpp
int main()
{
  String s("abcd");
  std::cout << s[0] << std::endl;  //  a
  
  s[1] = 'a';
  std::cout << s[1] << std::endl;  //  a
  
  std::cout << s << std::endl;  //  aacd
}
```