---
title: "[Qt] QML Types - List Model/View"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

toc: true
toc_sticky: true

last_modified_at: 2021-10-20
---

C++ Qt에서 리스트는 `QListWidget`이라는 클래스를 사용하여   
위젯을 만들 수 있다.

QML에서 리스트는 개념적으로 3 가지로 나눌 수 있다.

![Architecture](/images/qml-image/Model-View-Architecture.png)

이 3 가지에 대해 간단하게 적어본다.


## ListModel

`ListModel`은 데이터를 담아내는 컨테이너라고 볼 수 있다.

* 이 `ListModel`은 `ListElement`를 통해 데이터를 담을 수 있는데,   
`ListElement`는 하나의 집합이라고 볼 수 있다.

### 예시

```qml
ListModel {
        id          : fruitModel
        ListElement { name : "apple"; color : "red" }
        ListElement { name : "graph"; color : "purple" }
        ListElement { name : "melon"; color : "green" }
    }
```

* `ListElement` 요소 각각의 이름에 대응하는 값을 갖도록 입력하는데,   
C++의 `Map`처럼 {key:value}라고 생각하면 된다.

## Delegate

`Delegate`는 `View`에 `Model`의 데이터를 표현하는   
형태(스타일)이라고 볼 수 있다.

* `Model`에 정의된 `Element`들을 어떠한 형태로 구현할 지   
미리 형태를 만들어 놓는 것이다.

### 예시

```qml
Component {
    id          : fruitDelegate

    Rectangle {
        radius      : 10
        color       : lcolor
        width       : 100
        height      : 300

        Text {
            text                : name
            anchors.fill        : parent
            verticalAlignment   : Text.AlignVCenter
            horizontalAlignment : Text.AlignHCenter
            font.pixelSize      : 24
        }
    }
}
```

* 다른 파일로 `Delegate`를 분리시킨다면,   
`Component`를 사용하지 않아도 된다.

## ListView

`View`는 이러한 `Model`의 데이터를 보여주는 시각적 아이템이다.   

### 예시

```qml
ListView {
    id              : fruitView
    anchors.fill    : parent
    orientation     : ListView.Horizontal
    spacing         : 30
    model           : fruitModel
    delegate        : fruitDelegate
}
```

* 최종적으로 보게 될 `View`이다.   
`orientation`, `spacing` 등의 프로퍼티를 사용할 수 있다.

### 전체 소스

```qml
import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    width       : 400
    height      : 400
    visible     : true

    ListModel {
        id          : fruitModel
        ListElement { name : "apple"; lcolor : "red"; size : "big" }
        ListElement { name : "graph"; lcolor : "purple"; size : "small" }
        ListElement { name : "melon"; lcolor : "green"; size : "big" }
    }

    Component {
        id          : fruitDelegate

        Rectangle {
            radius      : 10
            color       : lcolor
            width       : 100
            height      : 300

            Text {
                text                : name
                anchors.fill        : parent
                verticalAlignment   : Text.AlignVCenter
                horizontalAlignment : Text.AlignHCenter
                font.pixelSize      : 24
            }
        }
    }

    ListView {
        id              : fruitView
        anchors.fill    : parent
        orientation     : ListView.Horizontal
        spacing         : 30
        model           : fruitModel
        delegate        : fruitDelegate
    }
}
```

![image](/images/qml-image/ListView_result.png)

___

> [참조 - ListModel QML Type](https://doc.qt.io/qt-5/qml-qtqml-models-listmodel.html)
> [참조 - ListElement QML Type](https://doc.qt.io/qt-5/qml-qtqml-models-listelement.html)
> [참조 - ListView QML Type](https://doc.qt.io/qt-5/qml-qtquick-listview.html)