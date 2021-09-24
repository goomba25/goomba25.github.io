---
title: "[Qt] QML Types - Rectangle"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

toc: true
toc_sticky: true

last_modified_at: 2021-09-24
---

`Rectangle`은 사각형 영역의 아이템을 표시하기 위한 Type이다.

또한 이러한 아이템은 중첩으로 표시하는 것이 가능하다.

### 예제 코드

```qml
import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    id              : root
    width           : 400
    height          : 800
    visible         : true
    title           : qsTr("Hello World")

    Rectangle {
        id                  : rect1
        anchors.centerIn    : parent
        width               : 300
        height              : 150
        color               : "lightblue"

        Rectangle {
            id : rect1_1
            anchors.centerIn: parent
            width: rect1.width / 2
            height: rect1.height / 2
            color: "yellow"
        }
    }

    Rectangle {
        id          : rect2
        x           : 50
        y           : 50
        width       : 300
        height      : 150
        color       : "green"

        Rectangle {
            id                      : rect2_1
            x : parent.width / 2
            width       : 50
            height      : 50
            color       : "white"

            anchors.verticalCenter  : parent.verticalCenter
//            x           : 50
//            y           : 50
        }
    }

    Rectangle {
        id          : rect3
        x           : 50
        y           : 600
        width       : 300
        height      : 150
        color       : "black"

        Rectangle {
            id          : rect3_1
            x           : 100
            y           : 50
            width       : 150
            height      : 50
            color       : "red"
        }
    }
}
```

![image](/images/qml-image/Rectangle_result.png)

___

### *Tip.*

개인적인 팁으로,   

`Rectangle`은 `color` 프로퍼티를 사용하여 색상을 쉽게 입힐 수 있는데,   
이를 통해 그리려고 하는 GUI의 위치를 `Rectangle`로 확인하면서 그릴 수 있다.

GUI를 구현하고 나서 `Rectangle`을 보이지 않게 수정하려는 경우   
`color`를 `transparent`로 설정하거나   
`Rectangle`을 `Item`으로 변경하는 등의 방법을 사용할 수 있다.