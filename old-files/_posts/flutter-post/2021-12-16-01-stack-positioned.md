---
title: "[Flutter] 레이아웃(8) - Stack, Positioned"
excerpt: "Stack와 Positioned를 사용해보자"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter]

toc: true
toc_sticky: true

last_modified_at: 2021-12-16
---

## Stack

<mark style="background-color: #2e2e2e; color: orange;">Stack</mark>은 여러 위젯을 쌓을 수 있게 만들 수 있습니다.

`children`프로퍼티를 사용하여 여러 위젯을 자식 위젯으로 추가하면 작성한 순서대로 배치됩니다.

```dart
Stack(
  alignment: Alignment.center,
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.amber,
    ),
    Container(
      width: 150,
      height: 150,
      color: Colors.red,
    ),
    Container(
      width: 100,
      height: 100,
      color: Colors.cyan,
    ),
    Container(
      width: 50,
      height: 50,
      color: Colors.purple,
    ),
  ],
)
```

![stack-center](/images/flutter-image/stack-basic.png)

* alignment 프로퍼티를 topRight로 하면 아래와 같이 변경됩니다.

    ![stack-topRight](/images/flutter-image/stack-basic2.png)

## Positioned

<mark style="background-color: #2e2e2e; color: orange;">Positioned</mark>는 Stack의 자식 위젯의 위치를 지정해주는 위젯입니다.

left, top, right, bottom 의 위치 영역 프로퍼티가 존재하며,   
width, height와 같은 크기 프로퍼티도 가지고 있습니다.

```dart
Stack(
  alignment: Alignment.center,
  children: [
    Container(
      width: 200,
      height: 200,
      color: Colors.amber,
    ),
    Positioned(
      top: 0,
      left: 0,
      width: 50,
      height: 50,
      child: Container(
        color: Colors.red,
      ),
    ),
    Positioned(
      top: 0,
      right: 0,
      width: 50,
      height: 50,
      child: Container(
        color: Colors.cyan,
      ),
    ),
    Positioned(
      bottom: 0,
      left: 0,
      width: 50,
      height: 50,
      child: Container(
        color: Colors.purple,
      ),
    ),
    Positioned(
      bottom: 0,
      right: 0,
      width: 50,
      height: 50,
      child: Container(
        color: Colors.lime,
      ),
    ),
  ],
)
```

![stack-positioned](/images/flutter-image/stack-positioned.png)


[참조 - Stack](https://api.flutter.dev/flutter/widgets/Stack-class.html)   
[참조 - Positioned](https://api.flutter.dev/flutter/widgets/Positioned-class.html)