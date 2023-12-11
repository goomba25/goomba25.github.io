---
title: "[Flutter] BoxDecoration을 사용한 꾸미기"
excerpt: "BoxDecoration을 사용해보자"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter]

last_modified_at: 2022-04-05
---


<mark style="background-color: #2e2e2e; color: orange;">BoxDecoration</mark>은 테두리를 둥글게 만들거나, 여러 효과를 줄 수 있는 클래스입니다.

* Container의 `decoration`프로퍼티에 사용할 수 있는데,   
주의할 점은 Container의 `color`프로퍼티와 `decoration`프로퍼티를 동시에 사용할 수 없습니다.(중복 효과)

### BoxDecoration

```dart
Container(
  decoration: BoxDecoration(
    color: Colors.amber.withOpacity(0.6),
    border: Border.all(
      color: Colors.black.withOpacity(0.2),
      width: 15,
    ),
    borderRadius: BorderRadius.circular(20),
  ),
)
```

![image](/images/flutter-image/box_decoration_sample.png)

* border는 테두리 설정에 대한 내용이고, borderRadius는 테두리 radius 효과입니다.

[참조 - BoxDecoration](https://api.flutter.dev/flutter/painting/BoxDecoration-class.html)