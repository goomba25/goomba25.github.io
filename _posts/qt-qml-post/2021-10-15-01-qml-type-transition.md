---
title: "[Qt] QML Types - Transition"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-15
---

`Transition`은 `State`가 변경될 때   
적용시킬 애니메이션에 대해 정의하는 Type이다.

* `State`만 사용할 수는 있지만, `Transition`만 쓰지는 않는 듯 하다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    width       : 300
    height      : 400
    visible     : true

    Rectangle {
        anchors.fill: parent

        Rectangle {
            id          : onElement
            x           : 100
            y           : 50
            width       : 100
            height      : 100
        }

        Rectangle {
            id          : offElement
            x           : 100
            y           : 250
            width       : 100
            height      : 100
        }

        state: "on"

        MouseArea {
            anchors.fill: parent
            onClicked: parent.state == "on" ? parent.state = "off" : parent.state = "on"
        }

        states: [
            State {
                name: "on"
                PropertyChanges {
                    target  : onElement
                    color   : "red"
                }

                PropertyChanges {
                    target  : offElement
                    color   : "blue"
                }
            },

            State {
                name: "off"
                PropertyChanges {
                    target  : onElement
                    color   : "blue"
                }

                PropertyChanges {
                    target  : offElement
                    color   : "red"
                }
            }

        ]

        transitions: [
            Transition {
                from    : "on"
                to      : "off"
                PropertyAnimation {
                    target: onElement
                    properties: "color"
                    duration: 1500
                }

                PropertyAnimation {
                    target: offElement
                    properties: "color"
                    duration: 1500
                }
            },

            Transition {
                from    : "off"
                to      : "on"
                PropertyAnimation {
                    target: offElement
                    properties: "color"
                    duration: 1500
                }

                PropertyAnimation {
                    target: onElement
                    properties: "color"
                    duration: 1500
                }
            }
        ]
    }
}
```

* 화면을 클릭하면 두 `Rectangle`의 `color`가 변경되는데,   
천천히 변경되도록 애니메이션 효과를 적용했다.

![image](/images/qml-image/Transition_result.gif)

___

> [참조 - Transition QML Type](https://doc.qt.io/Qt-5/qml-qtquick-transition.html)
