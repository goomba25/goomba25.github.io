---
title: "[Qt] QML Types - Layout"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

last_modified_at: 2021-10-10
---

`Layout`은 `Anchor`와는 다른 개념으로   
내부에 아이템을 배치하는 기능을 제공하는 Type이다.

* 아이템을 보다 편리하게 배치하는 기능을 제공하기 때문에   
굉장히 유용한 Type이다.

* 기존의 Qt(C++)에서의 Layout 클래스를 해봤다면 이해하기 쉽다.

* 세부적으로 `GridLayout`, `RowLayout`, `ColumnLayout`으로 나눌 수 있다.

### RowLayout

아이템을 가로(열) 방향으로 배치하는 `Layout`이다.

`layoutDirection`프로퍼티를 사용하여   
왼쪽에서 오른쪽, 오른쪽에서 왼쪽으로 배치되는 순서를 정할 수 있다.

또한 `spacing`프로퍼티를 통해 아이템의 간격을 설정할 수 있다.

### ColumnLayout

아이템을 세로(행) 방향으로 배치하는 `Layout`이다.

`layoutDirection`프로퍼티를 사용하여   
위에서 아래, 아래에서 위로 배치되는 순서를 정할 수 있다.

또한 `spacing`프로퍼티를 통해 아이템의 간격을 설정할 수 있다.

### GridLayout

행(`column`)과 열(`row`)이 존재하는 격자형태의 `Layout`이다.

`flow`프로퍼티를 사용하여 열을 기준으로 배치되는지,
행을 기준으로 배치되는지 설정할 수 있고,   
`layoutDirection`프로퍼티를 통해 방향을 지정할 수도 있다.

`rowSpacing`, `columnSpacing`이 각각 존재하여 간격을 설정할 수 있다.

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
    title   : "RowLayout"
    color   : "lightgray"

    property int    margin  : 10

    ColumnLayout {
        id              : mainLayout
        anchors.fill    : parent
        anchors.margins : margin
        spacing         : 10

        RowLayout {
            Layout.fillWidth    : true
            spacing             : 10

            Rectangle {
                id                  : rect1
                Layout.fillWidth    : true
                height              : 50
                color               : "red"
            }

            Rectangle {
                id                  : rect2
                Layout.fillWidth    : true
                height              : 50
                color               : "lightblue"
            }
        }

        GridLayout {
            Layout.fillWidth    : true
            columns             : 3
            rowSpacing          : 20
            columnSpacing       : 10

            Rectangle {
                id              : rect3
                Layout.fillWidth: true
                height          : 30
                color           : "blue"
            }
            Rectangle {
                id              : rect4
                Layout.fillWidth: true
                height          : 30
                color           : "yellow"
            }
            Rectangle {
                id              : rect5
                Layout.fillWidth: true
                height          : 30
                color           : "green"
            }
            Rectangle {
                id              : rect6
                Layout.fillWidth: true
                height          : 30
                Text {
                    anchors.centerIn: parent
                    text            : "text1"
                }
            }
            Rectangle {
                id              : rect7
                Layout.fillWidth: true
                height          : 30
                Text {
                    anchors.centerIn: parent
                    text            : "text2"
                }
            }
        }

        Rectangle {
            id                  : rect8
            Layout.fillWidth    : true
            Layout.fillHeight   : true
            color               : "orange"
        }
    }
}
```

![image](/images/qml-image/Layout_result.png)

___

> [참조 - Layout QML Type](https://doc.qt.io/qt-5.15/qml-qtquick-layouts-layout.html)   
> [참조 - RowLayout QML Type](https://doc.qt.io/qt-5.15/qml-qtquick-layouts-rowlayout.html)   
> [참조 - ColumnLayout QML Type](https://doc.qt.io/qt-5.15/qml-qtquick-layouts-columnlayout.html)   
> [참조 - GridLayout QML Type](https://doc.qt.io/qt-5.15/qml-qtquick-layouts-gridlayout.html)   