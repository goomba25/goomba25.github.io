---
title: "[Qt] QML Types - AnimatedImage"
excerpt: "QML의 Type Object"

categories:
  - QML
tags:
  - [Qt, QML]

toc: true
toc_sticky: true

last_modified_at: 2021-09-27
---

`Image`를 상속하는 `AnimatedImage`는 이미지를 로드하여 표시하기 위한 Type으로   
움직이는 이미지를 표시하는 기능으로 사용한다. (`.gif`, ...)

프레임에 관련된 `frameCount`, `currentFrame`와 같은 프로퍼티와   
재생 또는 일시정지 프로퍼티가 존재한다.

### 예제 코드

```qml
import QtQuick 2.15
import QtQuick.Window 2.15

Window {
    width: animation.width
    height: animation.height + 10
    visible: true
    title: qsTr("Hello World")

    AnimatedImage {
        id : animation
        source: "qrc:/ani2.gif"
    }

    Rectangle {
        property int frames: animation.frameCount
        width: 4
        height: 8
        x: (animation.width - width) * animation.currentFrame / frames
        y: animation.height + 1
        color: "red"
    }
}
```

![image](/images/qml-image/AnimatedImage_result1.png)
![image](/images/qml-image/AnimatedImage_result2.png)
___


`source`를 통해 이미지를 불러오는 것은 `Image`와 동일하다.

> [참조 - Image QML Type](https://doc.qt.io/qt-5/qml-qtquick-animatedimage.html)