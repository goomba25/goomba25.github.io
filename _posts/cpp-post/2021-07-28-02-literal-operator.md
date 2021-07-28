---
title: "[C++] 사용자 정의 리터럴 오버로딩"
excerpt: ""

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-28
---
C++에서는 특정 자료형 리터럴의 뒤에 접미사를 붙여   
형식의 안정성을 높인다. (실수 `f`, long `L` 등)

사용자 정의 리터럴은 대상이 리터럴이기 때문에 전역 함수로만 정의가 가능하다.

또한 언더바(`_`)를 붙여주어야 한다는 규칙을 가지고 있다.

```cpp
Type operator"" _접미사(매개변수) {}
```

## 사용자 정의 리터럴 오버로딩

리터럴에 전달할 수 있는 자료형은 정해져 있다.

![img](/images/cpp-image/literal_operator.png)

자세한 내용은 [사이트](https://en.cppreference.com/w/cpp/language/user_literal)를 참조하자.

### 간단한 예시

간단하게 길이를 표현하는 `_km`, `_m` 접미사를 오버로딩해보자.

`_km`는 `_m`*1000 일 것이다.

```cpp
class Length
{
  const long double value_;
  Length(long double value) : value_(value)
  {}

  friend Length operator"" _m(unsigned long long int);
  friend Length operator"" _m(long double);
  friend Length operator"" _km(unsigned long long int);
  friend Length operator"" _km(long double);
public:
  Length operator+() const
  {
    return Length(value_);
  }
  Length operator-() const
  {
    return Length(-value_);
  }
  Length operator+(const Length &len) const
  {
    return Length(value_ + len.value_);
  }
  long double m() const { return value_; }
  long double km() const { return value_*0.001L; }
};

Length operator"" _m(unsigned long long int value)
{
  return Length(value);
}

Length operator"" _m(long double value)
{
  return Length(value);
}

Length operator"" _km(unsigned long long int value)
{
  return Length(value * 1000);
}

Length operator"" _km(long double value)
{
  return Length(value * 1000);
}
```

생성자가 `private`인 이유는 외부에서 생성자의 형태로 객체를 생성할 수 없게 하기 위해서이다.

실수형과 정수형 리터럴 모두 가능하도록 두 번 정의했다.

`m`과 `km` 멤버 함수는 각각의 치수로 멤버를 출력해준다.

객체의 연산을 위해 산술 연산자를 오버로딩했다.

```cpp
int main()
{
  Length len1 = -4_m;
  Length len2 = 4_m + 1.23_km;
  Length len3 = 1_km - 10_m;

  std::cout << len1.m() << std::endl;   //  -4
  std::cout << len1.km() << std::endl;  //  -0.004

  std::cout << len2.m() << std::endl;   //  1234
  std::cout << len2.km() << std::endl;  //  1.234

  std::cout << len3.m() << std::endl;   //  990
  std::cout << len3.km() << std::endl;  //  0.99
}
```