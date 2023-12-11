---
title: "[Flutter] 레이아웃(9) - IndexedStack"
excerpt: "IndexedStack를 사용해보자"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter]

last_modified_at: 2021-12-19
---

<mark style="background-color: #2e2e2e; color: orange;">IndexedStack</mark>은 Stack 레이아웃과 동일합니다.   
하지만 `index` 프로퍼티를 가지는데, 해당 `index` 순서에 해당하는 하나의 자식 위젯만 보여줍니다.

* IndexedStack의 자식 위젯은 index가 0부터 시작합니다.

```dart
IndexedStack(
  alignment: Alignment.center,
  index: 0,
  children: [
    Container(
      width: 100,
      height: 100,
      color: Colors.red[200],
      child: const FlutterLogo(
        size: double.infinity,
      ),
    ),
    Container(
      width: 100,
      height: 100,
      color: Colors.blue[300],
      child: const FlutterLogo(
        size: double.infinity,
      ),
    ),
    Container(
      width: 100,
      height: 100,
      color: Colors.amber[400],
      child: const FlutterLogo(
        size: double.infinity,
      ),
    ),
    Container(
      width: 100,
      height: 100,
      color: Colors.green,
      child: const FlutterLogo(
        size: double.infinity,
      ),
    ),
  ],
)
```

![indexedstack](/images/flutter-image/indexedStack.png)

* 자식 위젯의 `index` 외의 것을 입력하면 안됩니다. (에러를 출력하고 아무것도 안뜹니다.)

* 보이지 않을 뿐 다른 화면도 생성되어 있습니다.

[참조 - IndexedStack](https://api.flutter.dev/flutter/widgets/IndexedStack-class.html)