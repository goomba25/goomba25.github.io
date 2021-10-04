---
title: "[Qt] QML Types - Flickable"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-04
---

`Flickable`은 내부의 아이템을 움직일 수 있도록 하는 기능을 가진 Type이다.

* 아이템을 움직이는 기능을 상속받아 만들어진 Type으로   
`GridView`, `ListView`, `TableView`가 있다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    id      : root
    width   : 300
    height  : 200
    visible : true
    title   : "Flickable Sample"
    color   : "gray"

    Flickable {
        id                  : flickable
        anchors.top         : parent.top
        anchors.topMargin   : 50
        width               : 300
        height              : 200
        contentWidth        : width + 50
        contentHeight       : height + 50

        Rectangle {
            id      : rect1
            width   : 100
            height  : 100
            color   : "red"
        }

        Rectangle {
            id      : rect2
            x       : 200
            width   : 100
            height  : 100
            color   : "green"
        }
    }
}
```

![image](/images/qml-image/Flickable_result.png)

___

> [참조 - Flickable QML Type](https://doc.qt.io/qt-5/qml-qtquick-flickable.html)