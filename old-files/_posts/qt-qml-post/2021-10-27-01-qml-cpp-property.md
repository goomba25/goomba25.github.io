---
title: "[Qt] QML과 C++ (Q_PROPERTY)"
excerpt: "Q_PROPERTY에 대해 알아보자"

categories:
  - QML
tags:
  - [Qt, QML, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-10-28
---

## Q_PROPERTY

`Q_PROPERTY`는
QML에서 C++ 클래스에 정의된 특정 변수에 접근하는 방법이다.

### C++에서의 설정

QML에서 해당 변수에 바로 접근하는 것이 아닌,   
추가적으로 구현된 함수를 호출하여 접근하게 된다.

가장 기본적인 구조는 아래와 같다.

```cpp
Q_PROPERTY(type name READ name WRITE setname NOTIFY nameChanged)
```

`type`과 `name`은 각각 사용할 변수의 자료형과 이름이다.   
그리고 나머지 뒤의 내용은 아래의 표와 같다.

|키워드|함수|설명|
|-|-|-|
|READ|name|변수의 값을 읽는다.|
|WRITE|setname|변수의 값을 쓴다.|
|NOTIFY|nameChanged|변수의 값이 변경되면 발생하는 시그널.|
|...|||

이외에도 여러 키워드들이 있으며,   
각각 생략이 가능하다.

해당 변수를 가진 클래스의 내용은 아래와 같이 작성할 수 있다.

```cpp
class Message : public QObject
{
    Q_OBJECT
    Q_PROPERTY(QString myString READ myString WRITE setMyString NOTIFY myStringChanged)

public:
    Message();
    void setMyString(const QString &);
    QString myString() const;

signals:
    void myStringChanged();

private:
    QString m_myString;
};
```

```cpp
void setMyString(const QString &str)
{
    m_myString = str;
    emit myStringChanged();
}

QString myString() const
{
    return m_myString;
}
```


* 이제 QML에서는 `myString` 프로퍼티에 대한 접근을 요구할 때마다   
각각의 함수들이 호출된다.

* 이 때 알아두어야 할 것은,   
QML에서는 `myString`으로만 호출한다는 것이다.   
(즉, `myString`으로 값을 읽으려고 하면 `myString`이 호출되고   
`myString`에 값을 쓰려고 하면 `setMyString`이 호출되며   
`myString` 값이 변경될 때마다 `myStringChanged` 시그널이 발생한다.)
___

이제 QML에서 이 클래스로 접근하기 위한 설정을 해야 한다.

`main.cpp`에 보면 `QQmlApplicationEngine`에   
`main.qml`의 URL을 로드하는 부분이 있다.

반드시 로드하기 이전에 아래와 같은 내용을 추가해주자.

```cpp
#include <QQmlContext>

#include "message.h"

int main(int argc, char *argv[]) {
    //...
    Message msg;
        engine.rootContext()->setContextProperty("qmlmsg", &msg);
    //...
}
```

이는 반드시 추가해야하는 내용으로,   
해당 클래스 객체를 특정 이름으로 접근할 수 있도록 만들어준다.

### QML에서의 설정

QML에서는 굉장히 간단하다.

`main.cpp`에서 설정해준 이름으로 해당 객체로 접근할 수 있다.

또한 작성해둔 프로퍼티에 자유롭게 접근이 가능하다.

```qml
Window {
    id      : root
    width   : 420
    height  : 300
    visible : true
    title   : "QML & C++"

    ColumnLayout {
        anchors.fill: parent

        Rectangle {
            id                  : rect
            Layout.fillWidth    : true
            height              : root.height / 2
            color               : "blue"

            Text {
                id                  : myText1
                anchors.centerIn    : parent
                text                : qmlmsg.myString
                font.pixelSize      : 22
            }
        }

        Rectangle {
            Layout.fillWidth    : true
            height              : root.height / 2
            color               : "green"

            Text {
                id                  : myText2
                anchors.centerIn    : parent
                text                : qmlmsg.myString
                font.pixelSize      : 22

                Component.onCompleted: {
                    myText2.text = qmlmsg.myString
                }
            }

            MouseArea {
                anchors.fill: parent
                onClicked: {
                    qmlmsg.myString = "click"
                    myText2.text = qmlmsg.myString
                    rect.color = "red"
                }
            }
        }
    }
}
```

![image1](/images/qml-image/q_property_result.gif)

* `myString`이라는 이름 하나로 읽고 쓰는 함수가 호출된다.


### NOTIFY

여기서 궁금증이 생긴다.

`NOTIFY`는 시그널이라고 했는데,   
대체 왜 쓰는걸까?

이는 QML에서 데이터를 바인딩 할 때   
불필요한 바인딩을 피할 수 있도록 만드는 기능을 한다.

쉽게 말하자면 이 시그널이 발생하지 않으면   
해당 변수에 접근하는 다른 QML 아이템에서 새로고침이 안된다.   

* 즉, 값이 변경이 되었는지 알 수 없다.

따라서 해당 클래스의 WRITE 에서 `emit`되는 부분이 없다면   
결과는 아래와 같다.

![image2](/images/qml-image/q_property_error_result.gif)

* 위의 Rectangle에서 텍스트가 변경되지 않는 것을 볼 수 있다.

