---
title: "[Qt] QML Types - ListModel과 Repeater"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-21
---

앞서 알아본 `ListModel`은   
`ListView`뿐만 아니라 `Repeater`에서도 사용할 수 있다.

사용하는 방법은 `ListView`를 사용하는 것과 별반 차이가 없다.

### 예시

```qml
import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Layouts 1.2

Window {
    width       : 400
    height      : 400
    visible     : true
    title       : "List"

    ListModel {
        id          : fruitModel
        ListElement { name : "apple"; lcolor : "red"; size : "big" }
        ListElement { name : "graph"; lcolor : "purple"; size : "small" }
        ListElement { name : "melon"; lcolor : "green"; size : "big" }
    }

    RowLayout {
        anchors.fill    : parent
        spacing         : 10

        Repeater {
            model: fruitModel

            Rectangle {
                width   : 100
                height  : 300
                radius  : 10
                border.width: 2
                color   : model.lcolor

                Text {
                    anchors.fill        : parent
                    horizontalAlignment : Text.AlignHCenter
                    verticalAlignment   : Text.AlignVCenter
                    text                : model.name
                    font.pixelSize      : 22
                }
            }
        }
    }
}
```

![image](/images/qml-image/Repeater_ListModel_result.png)