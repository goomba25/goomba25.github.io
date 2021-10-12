---
title: "[Qt] QML Types - Animation"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-12
---

`Animation`은 사용자가 지정한 아이템의 프로퍼티를 변경할 때,   
애니메이션 효과를 줄 수 있는 Type이다.

> * 여러가지 애니메이션 타입이 존재한다.
>
> |Animation|설명|
> |:--:|:--|
> |NumberAnimation|real 값의 변경에 대한 애니메이션|
> |RotationAnimation|회전 애니메이션|
> |PauseAnimation|애니메이션의 일시정지|
> |PathAnimation|경로 변경 애니메이션|
> |...|...|

### 예제 코드

 * 기본적으로 사용할 수 있는 `NumberAnimation`의 예제

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    id      : root
    width   : 500
    height  : 300
    visible : true
    title   : "Mouse Event"
    color   : "lightgray"

    Rectangle {
        id      : rect1
        width   : 100
        height  : 100
        color   : "red"

        NumberAnimation on x {
            from        : 0
            to          : 400
            duration    : 2000
        }
    }
}
```

* 0에서 400까지 `x`를 2초동안 이동하는 애니메이션 예제

![image](/images/qml-image/NumberAnimation_result1.png)
![image](/images/qml-image/NumberAnimation_result2.png)

___

> [참조 - Animation QML Type](https://doc.qt.io/qt-5/qml-qtquick-animation.html)
