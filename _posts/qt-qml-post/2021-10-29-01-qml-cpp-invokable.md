---
title: "[Qt] QML과 C++ (Q_INVOKABLE)"
excerpt: "Q_INVOKABLE에 대해 알아보자"

categories:
  - QML
tags:
  - [Qt, QML, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-10-29
---

## Q_INVOKABLE

`Q_INVOKABLE`은
QML에서 C++ 클래스에 정의된 함수를 직접 호출하는 방법이다.

### C++에서의 설정

먼저 `Q_PROPERTY`와 동일하게 사용하고자 하는 클래스를   
`main.cpp`에 `setContextProperty`해줘야 한다.

```cpp
SampleClass sample;
engine.rootContext()->setContextProperty("sample", &sample)
```

___

`Q_INVOKABLE`의 기본적인 모습은 아래와 같다.

```cpp
Q_INVOKABLE Type Function(parameters);
```

`Q_PROPERTY`에 비해 생각보다 간단하다.   
기본적인 멤버 함수에 `Q_INVOKABLE` 키워드만 붙여주면 된다.

* 당연한 얘기겠지만 `Q_INVOKABLE` 함수는 `public`이여야 한다.

#### 예시

```cpp
class Message : public QObject
{
    Q_OBJECT

public:
    Message();

    Q_INVOKABLE bool postMessage(const QString &);
};
```

```cpp
bool Message::postMessage(const QString &msg)
{
    qDebug() << "[C++] Call Message : " << msg;
    return true;
}
```

### QML에서의 설정

QML에서도 `Q_PROPERTY`와 같이   
설정된 이름으로 객체에 접근하여 함수를 호출한다.

#### 예시

```qml
Window {
    id      : root
    width   : 420
    height  : 200
    visible : true
    color   : "gray"
    title   : "QML & C++"

    RowLayout {
        anchors.fill: parent

        Rectangle {
            Layout.fillWidth    : true
            Layout.leftMargin   : 20
            height              : 80
            color               : "white"

            TextEdit {
                id                  : edit
                anchors.fill        : parent
                font.pixelSize      : 30
                font.weight         : Font.DemiBold
                verticalAlignment   : TextEdit.AlignVCenter
                color               : "black"
            }
        }

        Rectangle {
            Layout.rightMargin  : 20
            width               : 100
            height              : 80
            border.width        : 4
            border.color        : "black"
            radius              : 10

            Text {
                anchors.centerIn    : parent
                text                : "Send"
                font.pixelSize      : 22
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    var result = qmlmsg.postMessage(edit.text)
                }
            }
        }
    }
}
```

* qml 

![image](/images/qml-image/q_invokable_result1.png)

* 콘솔 메세지

![image](/images/qml-image/q_invokable_result2.png)