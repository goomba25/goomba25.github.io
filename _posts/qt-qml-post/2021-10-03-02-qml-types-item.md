---
title: "[Qt] QML Types - Item"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-03
---

`Item`은 사용자 정의 아이템 Type으로 시각적으로, 보여지는 모양은 없지만   
x, y, anchors 등의 프로퍼티가 존재한다.

* 보여지는 모양이 없다는 특징을 활용하여   
여러 아이템을 그룹화할 수도 있다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    width   : 500
    height  : 250
    visible : true
    title   : "Item Sample"
    color   : "gray"

    Item {
        id      : item1
        x       : 50
        y       : 50
        width   : 200
        height  : 200

        Rectangle {
            id      : rect1
            width   : 100
            height  : 100
            color   : "yellow"
        }

        Rectangle {
            id      : rect2
            x       : 50
            y       : 50
            width   : 100
            height  : 100
            color   : "red"
        }
    }

    Item {
        id      : item2
        x       : 300
        y       : 50
        width   : 200
        height  : 200

        Rectangle {
            id      : rect3
            width   : 100
            height  : 100
            color   : "blue"
        }

        Rectangle {
            id      : rect4
            x       : 50
            y       : 50
            width   : 100
            height  : 100
            color   : "red"
        }
    }
}
```

![image](/images/qml-image/Item_result.png)

* `Item1`과 `Item2`는 시각적으로 보여지는 모양이 없을 뿐   
크기와 위치 등의 프로퍼티를 가진다.

___

> [참조 - Item QML Type](https://doc.qt.io/qt-5/qml-qtquick-item.html)