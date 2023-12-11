---
title: "[Qt] QObject sender"
excerpt: "slot에서 signal을 보낸 대상을 구별하는 방법"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-17
---

> 이전에 사용했던 `signal`과 `slot`은   
매개 변수를 전달하는 방법이 아니면 여러 `signal`을 하나의 `slot`에 연결하지 못했다.

* 매개 변수를 통해 구별한 경우

```cpp
void Receiver::SlotFunction(int num)
{
  if (num == 0) {
    //  code
  } else if (num == 1) {
    //  code
  } ...
}

___

connect(sender, &Sender::SignalFunction, receiver, &Receiver::SlotFunction);
```

* 하지만 이런 경우 `signal`을 새롭게 정의하여 `emit`으로 발생시켜야 했다.

```cpp
void Sender::ButtonSlot()
{
  emit SignalFunction(int);
}

___

connect(button, &QPushButton::clicked, Sender, &Sender::ButtonSlot);
```

* 이러한 과정은 굉장히 번거롭고 불편하다.

## QObject::sender()

`QObject`의 메서드인 `sender`는   
이러한 불필요한 과정을 생략해줄 수 있는 좋은 대안이다.

`sender`메서드는 `slot`에서 호출할 경우,   
`signal`을 보낸 대상을 가리키는 포인터를 반환한다.

즉, 여러 `signal`을 하나의 `slot`에 연결하여 처리하는 것이 가능해진다.

* 여러 버튼이 존재하는 경우 (btn1, btn2, ...)

```cpp
connect(btn1, &QPushButton::clicked, receiver, &Receiver::ButtonSlot);
connect(btn2, &QPushButton::clicked, receiver, &Receiver::ButtonSlot);
connect(btn3, &QPushButton::clicked, receiver, &Receiver::ButtonSlot);
...
```

* `sender`를 통해 `slot`에서 `signal`을 보낸 대상을 구별해 낼 수 있다.

```cpp
void Receiver::ButtonSlot()
{
  QObject *obj = sender();

  if (obj == btn1) {
    //  code
  } else if (obj == btn2) {
    //  code
  } ...
}
```

## 주의 사항

> Warning: This function violates the object-oriented principle of modularity. However, getting access to the sender might be useful when many signals are connected to a single slot.

> Warning: As mentioned above, the return value of this function is not valid when the slot is called via a Qt::DirectConnection from a thread different from this object's thread. Do not use this function in this type of scenario.

직역하면 `sender`는 객체 지향 원칙을 위반한다고 한다.

또한 스레드를 사용하는 경우 유효하지 않을 수 있다고 하므로,   
상황에 따라 적절히 사용하는 것이 필요해 보인다.