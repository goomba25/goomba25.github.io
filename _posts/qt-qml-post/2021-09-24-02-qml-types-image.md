---
title: "[Qt] QML Types - Image"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

toc: true
toc_sticky: true

last_modified_at: 2021-09-24
---

`Image`는 이미지를 로드하여 표시하기 위한 Type으로   
움직이지 않는 이미지를 표시하는 기능으로 사용한다.   
(움짤...같은 경우 `AnimatedImage`등을 사용한다.)

또한 `width`와 `height` 프로퍼티를 설정하지 않으면   
이미지 크기 그대로 로드된다.

### 예제 코드

```qml
import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    width: 200
    height: 200
    visible: true

    color: "lightblue"

    Rectangle {
        anchors.centerIn: parent
        width: 150
        height: 150
        color: "white"

        Image {
            anchors.centerIn: parent
            width: parent.width - 50
            height: parent.height - 50
            source: "/image/qtlogo.png"
        }
    }
}
```

![image](/images/qml-image/Image_result.png)

___

`source` 프로퍼티를 사용하여 이미지를 로드할 수 있으며,   
기본적으로 가운데 정렬이 된다.

`fillMode` 프로퍼티가 존재하는데 기본적으로 `Stretch` 로 설정되어 있으며   
이미지의 `width`와 `height`를 지정하였기 때문에 이미지가 늘어났다.

> [참조 - Image QML Type](https://doc.qt.io/qt-5/qml-qtquick-image.html)