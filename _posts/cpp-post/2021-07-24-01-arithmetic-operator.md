---
title: "[C++] 산술 연산자의 오버로딩 그리고 friend"
excerpt: "산술 연산자를 오버로딩 해보고, friend 키워드에 대해 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩, friend]

last_modified_at: 2021-07-24
---

연산자의 오버로딩이란, 기존의 연산자를 새롭게 정의하여   
사용자 정의 연산자를 만드는 것이다.   
(대부분의 기본 제공되는 연산자는 전역 함수 또는 클래스의 멤버 함수로 재정의가 가능하다.)

```cpp
operator연산자(파라미터 목록);
```

## 산술 연산자 오버로딩 (클래스 함수)

산술 연산자는 `+`, `-`, `*`, `/`, `++`, `--` 정도가 존재한다.

```cpp
class Test
{
  float x_, y_, z_;
public:
  Test(int x, int y, int z) : x_(x), y_(y), z_(z)
  {}

  void print()
  {
    std::cout << x_ << " " << y_ << " " << z_ << std::endl;
  }
};
```

위와 같은 클래스를 아래와 같이 연산이 가능하도록 해보자.

```cpp
int main()
{
  Test t1(1,2,3);
  Test t2(10,20,30);
  
  Test t3 = t1 + t2;  //  불가능
  Test t4 = -t1;  //  불가능
}
```

이 클래스의 산술 연산을 멤버 함수로 재정의 해보자.   
Test 클래스의 연산이기 때문에 클래스 내부에서 선언한다.

```cpp
class Test
{
public:
  Test operator+(const Test &t)
  {
    return Test(this->x_ + t.x_, this->y_ + t.y_, this->z_ + t.z_);
  }

  Test operator-()
  {
    return Test(-(this->x_), -(this->y_), -(this->z_));
  }
};

int main()
{
  Test t1(1,2,3);
  Test t2(10,20,30);
  
  Test t3 = t1 + t2;
  Test t4 = -t1;

  t1.print();
  t2.print();
  t3.print();
  t4.print();
}


//  1 2 3
//  10 20 30
//  11 22 33
//  -1 -2 -3
```

___

하지만 완전한 오버로딩은 아니다.   
그 이유는 상수 객체를 허용하지 않는 연산자이기 때문이다.   

따라서 오버로딩된 연산자의 뒤에 `const`를 붙여 상수 객체도 사용할 수 있도록 변경해주자.

```cpp
Test operator+(const Test &t) const;
Test operator-() const;
```

___

또한 오버로딩된 산술 연산자는 멤버 함수이기 때문에 아래와 같이 멤버 함수처럼 호출할 수 있다.

```cpp
Test t3 = t1.operator+(t2);
Test t4 = t1.operator-();
```

### 다른 산술 연산자의 오버로딩 예시

위에서 만든 Test 클래스로 오버로딩했다.

```cpp
class Test
{
  //  생략
  Test operator-(const Test &t) const
  {
    return Vector(this->x_ - t.x_, this->y_ - t.y_, this->z_ - t.z_);
  }

  Test operator*(const Test &t) const
  {
    return Vector(this->x_ * t.x_, this->y_ * t.y_, this->z_ * t.z_);
  }

  Test operator/(const Test &t) const
  {
    return Vector(this->x_ / t.x_, this->y_ / t.y_, this->z_ / t.z_);
  }
  
  Test& operator++()
  {
    ++x_;
    ++y_;
    ++z_;
    return *this;
  }

  Test& operator--()
  {
    --x_;
    --y_;
    --z_;
    return *this;
  }

  Test operator++(int)
  {
    Test temp = *this;
    ++(*this);
    return temp;
  }

  Test operator--(int)
  {
    Test temp = *this;
    --(*this);
    return temp;
  }
};
```

증감 연산자의 경우 자기 자신을 반환하는 과정이 포함되므로   
상수 객체는 사용할 수 없다.

또한 전위와 후위의 이름은 동일한데, 파라미터에 `int`를 적어주어 컴파일러가 구별할 수 있도록 했다.

후위 연산자는 증감 연산을 진행하기 전에 자기 자신을 반환한다.

## 산술 연산자 오버로딩 (전역 함수)

클래스의 산술 연산자 오버로딩은 정수 또는 실수를 연산할 수 있다.

하지만 객체가 아닌 리터럴 값이 앞으로 오면 아래와 같은 호출이 되어버린다.

```cpp
Test t = 3 * t1;  //  에러
3.operator*(t1);  //  에러
```

이러한 경우에는 전역 함수로 연산자를 오버로딩한다.

```cpp
Test operator*(float value, const Test &t)
{
  return t.operator*(value);
}
```

이미 오버로딩된 `*` 연산자를 내부에서 호출했다.   
(멤버가 `private`이기 때문에 접근할 수 없다.)

## friend

그렇다면 내부의 `private` 멤버에는 접근할 수 없을까

`friend` 의 기능은 이러한 문제를 해결해준다.

```cpp
class A
{
private:
  int num;
  
public:
  friend class B;
};

class B
{
public:
  void func(A &a)
  {
    std::cout << a.num << std::endl;
  }
};
```

`friend` 로 명시한 대상은 자신의 `private` 멤버 또는 멤버 변수에 접근할 수 있도록 허용한다.

따라서 아래와 같이 사용이 가능하다.

```cpp
class Test
{
  //  생략
  
  friend Test operator*(float, const Test &);
};

Test operator*(float value, const Test &t)
{
  // return t.operator*(value);
  return Vector(value * t.x_, value * t.y_, value * t.z_);
}
```

`friend`를 사용하여 전역 함수가 Test 클래스의 `private`멤버에 접근이 가능해졌다.

### friend 주의사항

* `friend`는 단방향이다.
* `friend`로 명시하지 않으면 어떠한 경우도 friend 관계가 아니다.

때문에 서로 접근이 가능하도록 하려면 양방향으로 `friend` 를 선언해야하며,   
상속한 클래스일지라도 다시 `friend`를 선언해야 friend 관계가 된다.