---
title: "[Qt] QML Types - Repeater"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-09-28
---

`Repeater`란 쉽게 말하면, 반복해서 생성해주는 기능을 가지는 Type이다.

`model`을 전달하여 여러 아이템을 인스턴스화해주는데,   
이 모델에는 생성 갯수를 전달하거나 리스트를 전달할 수 있고,   
나중에 작성하게 될 `ListModel`과 함께 편리하게 사용할 수도 있다.

### 예제 코드

```qml
Window {
    width           : 400
    height          : 100
    visible         : true
    title           : qsTr("Repeater")

    Row {
        anchors.top     : parent.top

        Repeater {
            model           : 3

            Rectangle {
                width           : 100
                height          : 30
                border.width    : 2
                color           : "lightyellow"
            }
        }
    }

    Column {
        anchors.right: parent.right

        Repeater {
            model           : 3

            Rectangle {
                width           : 50
                height          : 20
                border.width    : 3
                color           : "lightblue"
            }
        }
    }
}
```

![image](/images/qml-image/Repeater_result.png)
___

* 추후 `ListModel`에 대해 작성할 때 다시 한 번 접근해보자.

> [참조 - Repeater QML Type](https://doc.qt.io/qt-5/qml-qtquick-repeater.html)