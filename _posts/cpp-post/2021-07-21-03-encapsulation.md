---
title: "[C++] 캡슐화 (Encapsulation)"
excerpt: "캡슐화를 통한 코드 은닉의 방법을 알아보자"

categories:
  - Cpp
tags:
  - [Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-21
---

접근 지정자를 `private`으로 설정한 멤버 또는 멤버 함수는 외부에서 접근할 수 없다.

> 캡슐화(영어: encapsulation)는 객체 지향 프로그래밍에서 다음 2가지 측면이 있다: 객체의 속성(data fields)과 행위(메서드, methods)를 하나로 묶고, 실제 구현 내용 일부를 외부에 감추어 은닉한다.

캡슐화에 대한 위키 백과의 내용이다.

객체의 구현된 세부적인 내용을 굳이 알 필요가 없는 사용자로부터 숨겨 복잡성을 줄일 수 있다.   
또한 변경을 할 수 없게 하여 데이터를 보호하고 오용을 방지하는 역할을 한다.

대신 인터페이스를 공개하여 사용자가 최소한의 정보로 프로그램을 사용할 수 있도록 한다.

인터페이스와 구현을 적절히 분리하는 것, 이것을 <mark style="background-color: #3e3e3e; color: orange;">캡슐화</mark> 라고 한다.

___

```cpp
class Person
{
private:
  float weight_;
  float height_;

public:
  void setWeight(int w)
  {
    weight_ = w;
  }

  void setHeight(int h)
  {
    height_ = h;
  }

  void print()
  {
    std::cout << "키 : " << weight_ << std::endl;
    std::cout << "몸무게 : " << height_ << std::endl;
  }
};

int main()
{
  Person p1;
  p1.setWeight(67.8f);
  p1.setHeight(167.8f);

  p1.print();
}


// 키 : 67.8
// 몸무게 : 167.8
```

캡슐화의 단편적인 예로, 위의 Person 클래스는 멤버에 직접적으로 접근이 불가능하고,   
`setWeight` 와 `setHeight` 메서드로 값을 지정할 수 있다.

즉 함부로 멤버를 변경할 수 없다는 것이다.   
이로써 실수로라도 데이터를 변경하지 못하도록 막을 수 있다.