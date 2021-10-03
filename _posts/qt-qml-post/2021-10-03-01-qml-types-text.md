---
title: "[Qt] QML Types - Text"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-03
---

`Text`는 텍스트를 표현해주는 Type이다.

* 기본적으로 텍스트를 표현하는 프로퍼티를 가진 아이템도 있다.

### 예제 코드

```qml
import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    width   : 400
    height  : 200
    visible : true
    title   : "Text Sample"

    Rectangle {
        id              : rect
        anchors.fill    : parent
        color           : "transparent"

        Text {
            id                  : rectText
            anchors.centerIn    : rect
            text                : "text"
            font.pixelSize      : 38
            font.family         : "Serif"
            font.weight         : Font.DemiBold
            color               : "#84E7EE"
            opacity             : 0.8
            font.capitalization : Font.MixedCase
        }
    }
}
```

![image](/images/qml-image/Text_result.png)
___

* 텍스트의 폰트에 대한 다양한 프로퍼티가 존재하므로,   
필요할 때에 참조하여 사용하자.

> [참조 - Text QML Type](https://doc.qt.io/qt-5/qml-qtquick-text.html)