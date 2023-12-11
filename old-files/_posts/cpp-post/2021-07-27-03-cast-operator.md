---
title: "[C++] 형 변환 연산자의 오버로딩"
excerpt: ""

categories:
  - Cpp
tags:
  - [Cpp, Class]

toc : true
toc_sticky: true

last_modified_at: 2021-07-27
---

형 변환은 해당 변수의 자료형을 변환하는 것을 말한다.

이번에는 클래스 객체의 자료형을 변환해보자.

```cpp
class String
{
  char *chars_;
public:
  String(const char *ch)
      : chars_(new char[strlen(chars_) + 1])
  {
    strcpy(chars_, ch);
  }
};
```

이 클래스의 객체를 아래와 같이 멤버의 문자열이 비어있으면 거짓을,   
비어있지 않으면 참을 반환하도록 하려 한다.

```cpp
int main()
{
  String s0 = "";

  if (s0) {  //  에러
    std::cout << "Full" << std::endl;
  } else {
    std::cout << "Empty" << std::endl;
  }
}
```

하지만 객체를 참 거짓 상태로 반환할 수 없다.   

## 형 변환 연산자의 오버로딩 (클래스 함수)

형 변환 연산자의 경우 멤버 함수로만 구현이 가능하다.

```cpp
class String
{
  //  생략
  operator bool() const
  {
    return strlen(chars_) > 0;
  }
};

int main()
{
  String s0 = "";

  if (s0) {
    std::cout << "Full" << std::endl;
  } else {
    std::cout << "Empty" << std::endl;
  }
}


//  Empty
```

형 변환 연산자는 반환 자료형이 존재하지 않는다.

변환하고자 하는 자료형의 이름을 써주는 것으로 반환을 대체한다고 볼 수 있다.

따라서 비어있는 문자열을 가지는 `s0` 객체는 `false`를 반환하게 된다.