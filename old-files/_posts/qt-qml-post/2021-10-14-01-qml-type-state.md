---
title: "[Qt] QML Types - State"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-14
---

`State`는 아이템의 속성을 변경하는 기능을 가진 Type으로   
사용자가 생성한 아이템을 대상으로 지정하고,   
대상의 프로퍼티의 값을 변경하는 것이 가능하다.

* 지정한 아이템의 프로퍼티 한 가지만 변경하는 것뿐만 아니라    
여러 프로퍼티를 함께 변경하는 것도 가능하다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    id      : root
    width   : 300
    height  : 200
    visible : true
    title   : "Animation"
    color   : "lightgray"

    Rectangle {
        id                  : rect1
        anchors.centerIn    : parent
        width               : 100
        height              : 100
        color               : "red"

        MouseArea {
            anchors.fill: parent
            onClicked   : rect1.state == 'On' ? (rect1.state = "Off") : (rect1.state = "On")
        }

        state: "Off"

        states: [
            State {
                name: "On"
                PropertyChanges {
                    target: rect1
                    color : "red"
                }
            },

            State {
                name: "Off"
                PropertyChanges {
                    target: rect1
                    color : "blue"
                }
            }

        ]
    }
}
```

* 삼항연산을 사용했지만 `if`문을 사용해도 된다.

![image](/images/qml-image/State_result.gif)

___

> [참조 - State QML Type](https://doc.qt.io/qt-5/qml-qtquick-state.html)
