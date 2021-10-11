---
title: "[Qt] QML Types - MouseArea"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-11
---

`MouseArea`는 마우스 이벤트를 제공하는 Type이다.

생성한 아이템의 내부에 `MouseArea`를 생성하여 사용한다.

* `click`, `press`, `release` 등의 여러 이벤트를 제공한다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Layouts 1.2

Window {
    id      : root
    width   : 500
    height  : 300
    visible : true
    title   : "Mouse Event"
    color   : "lightgray"

    RowLayout {
        anchors.fill        : parent
        anchors.topMargin   : 10
        anchors.bottomMargin: 10
        anchors.leftMargin  : 10
        anchors.rightMargin : 10
        spacing             : 20

        Rectangle {
            id                  : rect1
            Layout.fillWidth    : true
            Layout.fillHeight   : true
            color               : "red"

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    rect2.color = "purple"
                }
            }
        }

        Rectangle {
            id                  : rect2
            Layout.fillWidth    : true
            Layout.fillHeight   : true
            color               : "blue"

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    rect1.color = "green"
                }
            }
        }
    }
}
```

![image](/images/qml-image/MouseArea_result.png)

___

> [참조 - MouseArea QML Type](https://doc.qt.io/qt-5/qml-qtquick-mousearea.html)   
