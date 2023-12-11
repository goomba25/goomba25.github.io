---
title: "[Qt] QML Types - Animation (2)"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-12
---

`Animation`을 사용함에 있어서 특정 상황에 발생시키거나   
여러 `Animation`을 그룹화하는 방법들이 존재한다.

* `Behavior` : 특정 값이 변화하면 애니메이션을 발생시킨다.
* `SequentialAnimation` : 여러 애니메이션을 순차적으로 실행한다.
* `ParrellelAnimation` : 여러 애니메이션을 동시에 실행한다.

* 이외에도 다양한 애니메이션을 제공한다.

### 예제 코드

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    id      : root
    width   : 300
    height  : 200
    visible : true
    title   : "Animation (2)"
    color   : "lightgray"

    Rectangle {
        id      : rect1
        width   : 100
        height  : 100
        color   : "red"

        MouseArea {
            anchors.fill: parent
            onClicked: {
                rect1.color = "green"
            }
        }

        Behavior on color {
            SequentialAnimation {
                NumberAnimation {
                    target      : rect1
                    property    : "x"
                    to          : 100
                    duration    : 500
                }

                NumberAnimation {
                    target      : rect1
                    property    : "y"
                    to          : 50
                    duration    : 500
                }


                PauseAnimation {
                    duration: 200
                }

                ParallelAnimation {
                    NumberAnimation {
                        target      : rect1
                        property    : "width"
                        to          : 200
                        duration    : 500
                    }

                    NumberAnimation {
                        target      : rect1
                        property    : "x"
                        to          : 50
                        duration    : 500
                    }

                    NumberAnimation {
                        target      : rect1
                        property    : "height"
                        to          : 150
                        duration    : 500
                    }

                    NumberAnimation {
                        target      : rect1
                        property    : "y"
                        to          : 25
                        duration    : 500
                    }
                }
            }
        }
    }
}
```

![image](/images/qml-image/Animation2.gif)

___

> [참조 - Animation QML Type](https://doc.qt.io/qt-5/qml-qtquick-animation.html)
