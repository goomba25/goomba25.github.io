---
title: "[C++] 비교 연산자의 오버로딩"
excerpt: "비교 연산자의 오버로딩을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp, 연산자, 오버로딩]

toc: true
toc_sticky: true

last_modified_at: 2021-07-24
---

비교 연산자는 `==`, `!=`, `<`, `>`, `<=`, `>=` 가 있다.

C++ 문자열은 자체적으로 비교가 가능하기 때문에,   
C 문자열의 비교 연산을 오버로딩 해보자.


## 비교 연산자 오버로딩 (클래스 함수)

```cpp
class String
{
  char *str_;
public:
  String(const char *str)
    : str_(new char [std::strlen(str) + 1])
  {
    strcpy(str_, str);
  }

  void print()
  {
    std::cout << str_ << std::endl;
  }
};
```

C 스타일의 문자열을 가지는 간단한 String 클래스이다.   
(/<cstring> 헤더를 include하여 관련 메서드를 사용했다.)

___

비교 연산의 경우, 참과 거짓을 반환하기 때문에 반환자료형을 `bool`로 해주었다.

```cpp
bool operator==(const String &s) const
{
  return strcmp(this->str_, s.str_) == 0;
}

bool operator!=(const String &s) const
{
  return strcmp(this->str_, s.str_) != 0;
}

bool operator<(const String &s) const
{
  return strcmp(this->str_, s.str_) < 0;
}

bool operator>(const String &s) const
{
  return strcmp(this->str_, s.str_) > 0;
}

bool operator<=(const String &s) const
{
  return !(strcmp(this->str_, s.str_) > 0);
}

bool operator>=(const String &s) const
{
  return !(strcmp(this->str_, s.str_) < 0);
}
```

해당 연산을 확인하여 보면,

```cpp
int main()
{
  String str1("a")
  String str2("b")
  
  std::cout.setf(std::ios_base::boolalpha);
  std::cout << (str1 < str2) << std::endl;
}

//  true
```

## 비교 연산자 오버로딩 (전역 함수)

클래스의 객체가 아닌 리터럴과의 비교를 위해 전역 함수로 오버로딩했다.

```cpp
class String
{
  char *str_;
  
  friend bool operator==(const char *, const String &);
};

bool operator==(const char *ch, const String &s)
{
  return strcmp(ch, s.str_) == 0;
}

int main()
{
  String str1("a");

  std::cout.setf(std::ios_base::boolalpha);
  std::cout << ("a" == str1) << std::endl;
}

//  true
```

`friend`키워드를 통해 외부의 전역 함수에서 `private` 멤버의 접근이 가능하다.