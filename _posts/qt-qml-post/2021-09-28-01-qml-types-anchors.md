---
title: "[Qt] QML Types - Anchors"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-09-28
---

> ![image](/images/qml-image/qml_anchors.png)

`Anchors`는 쉽게 말하면, 아이템 자기자신의 레이아웃을 말한다.

아이템을 배치할 때 반드시 사용 해야하는 기능이라고 볼 수 있다.   

* 이 `anchors`에 대해 익숙해 지는 것이 좋으며,   
공식 사이트에서의 예제를 따라해보거나   
부족하다면 구글에 돌아다니는 예제를 따라해보는 것이 필요할 수 있다.

### 예제 코드

```qml
import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    width: 300
    height: 300
    visible: true
    title: qsTr("Sample 1")

    Rectangle {
        id : rect1
        width: 300
        height: 300
        color: "lightblue"

        Rectangle {
            id : subrect
            width: 300
            height: 100
            color: "yellow"
        }

        Text {
            id: rect1_text
            text: qsTr("text")
            color: "Green"
            font.pixelSize: 32
            anchors.top: subrect.bottom
            anchors.horizontalCenter: parent.horizontalCenter
        }
    }
}
```

![image](/images/qml-image/Anchors_result.png)
___


> [참조 - Anchors QML Type](https://doc.qt.io/qt-5/qtquick-positioning-anchors.html)