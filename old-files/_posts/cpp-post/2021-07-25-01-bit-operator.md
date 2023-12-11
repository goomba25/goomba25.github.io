---
title: "[C++] 비트 연산자의 오버로딩"
excerpt: "비트 연산자의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩]

last_modified_at: 2021-07-25
---

비트 연산자는 `!`, `&`, `|`, `^`, `<<`, `>>` 가 있다.

```cpp
class Vector
{
  int x_, y_, z_;

public:
  Vector (int x, int y, int z) : x_(x), y_(y), z_(z)
  {}

  void print()
  {
    std::cout << x_ << " " << y_ << " " << z_ << std::endl;
  }
}
```

위와 같은 클래스 객체의 비트 연산자를 오버로딩해보자.

```cpp
class Vector
{
  //  생략

  Vector operator~() const
  {
    return Vector(~x_, ~y_, ~z_);
  }

    Vector operator&(const Vector &v) const
  {
    return Vector(x_ & v.x_, y_ & v.y_, z_ & v.z_);
  }

  Vector operator|(const Vector &v) const
  {
    return Vector(x_ | v.x_, y_ | v.y_, z_ | v.z_);
  }

  Vector operator^(const Vector &v) const
  {
    return Vector(x_ ^ v.x_, y_ ^ v.y_, z_ ^ v.z_);
  }

  Vector operator<<(int n) const
  {
    return Vector(x_ << n, y_ << n, z_ << n);
  }

  Vector operator>>(int n) const
  {
    return Vector(x_ >> n, y_ > n, z_ >> n);
  }
};
```
* main.cpp

```cpp
int main()
{
  Vector v1(0, 0, 0);
  Vector v2(2, 4, 8);

  (~v1).print();
  (v1 & v2).print();
  (v1 | v2).print();
  (v1 ^ v2).print();
  (v2 << 1).print();
  (v2 >> 1).print();
}


//   -1 -1 -1
//   0 0 0
//   2 4 8
//   2 4 8
//   4 8 16
//   1 1 4
```

확인하여 보면 비트 연산이 잘 이루어진 것을 볼 수 있다.