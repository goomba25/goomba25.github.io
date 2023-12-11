---
title: "[Qt] Signals & Slots"
excerpt: "signal과 slot을 사용하여 위젯을 사용해보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-11
---

`signal`과 `slot`은 객체(위젯)간의 통신에 쓰이는 신호이다.   
(Qt 위젯의 가장 중요한 부분이기도 하다.)

예를 들어 버튼을 눌렀을 때, 위젯을 종료한다던가   
버튼을 눌렀을 때, 라벨에 텍스트를 표시하는 등의 작업을 수행하도록 도와준다.

![image](/images/qt-image/abstract-connections.png)

(https://doc.qt.io/qt-5/signalsandslots.html)

위젯의 특정 `signal`을 보내면 다른 `slot` 또는 `signal`에서 신호를 받아 처리할 수 있고   
`signal`과 `slot`은 [1 대 1], [多 대 1], [1 대 多], [多 대 多]로 연결이 가능하다. (제한 없음)

## signal 생성

`signal`은 크게 두 가지로 볼 수 있다.
* 기본 제공 signal
* 사용자 정의 signal

### 기본 제공 signal

각 위젯(버튼, 라벨, ...)마다 기본적으로 제공되는 `signal`들이 존재한다.   
(이는 공식 사이트에서 확인할 수 있다.)

예를 들어 QPushButton 위젯에는 QAbstractButton 클래스에서 상속 받은   
`clicked(bool checked = false)`라는 `signal`이 존재한다.

### 사용자 정의 signal

예를 들어 위젯 클래스를 새롭게 생성하여 `signal`을 만들 수 있다.

모든 클래스가 가능한 것은 아니고,   
`QOBJECT`를 포함하는 클래스의 통신만 가능하다.

```cpp
#include <QObject>

class Counter : public QObject
{
    Q_OBJECT

public:
    Counter() {}

signals:
    void valueChanged(int newValue);
};
```

`signal`은 보기와 같이 함수의 형태로 생성한다.   
또한 함수를 구현하지 않아도 된다.

## slot 생성

`slot`도 크게 두 가지로 볼 수 있다.
* 기본 제공 slot
* 사용자 정의 slot

### 기본 제공 slot

각 위젯(버튼, 라벨, ...)마다 기본적으로 제공되는 `slot`들이 존재한다.   
(이는 공식 사이트에서 확인할 수 있다.)

예를 들어 QPushButton 위젯에는 QAbstractButton 클래스에서 상속 받은   
`setChecked(bool)`라는 `slot`이 존재한다.

### 사용자 정의 slot

예를 들어 위젯 클래스를 새롭게 생성하여 `slot`을 만들 수 있다.

모든 클래스가 가능한 것은 아니고,   
`QOBJECT`를 포함하는 클래스의 통신만 가능하다.

```cpp
#include <QObject>

class Counter : public QObject
{
    Q_OBJECT

public:
    Counter() {}
public slots:
    void setValue(int value);
};
```

`slot`은 함수의 형태로 생성하며,   
`signal`과 달리 반드시 구현해야 한다.   
(구현하지 않을 경우 빌드 에러를 발생시킨다.)

구현은 일반적인 함수의 구현과 동일하다.

## signal-slot 연결

`signal`과 `slot`은 `connect`라는 메서드를 사용하여 연결된다.

### 기본적인 예제

버튼을 클릭하면 라벨의 텍스트를 변경하는 예제를 작성해보자.

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include <QLabel>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

private:
    QWidget *center_;
    QGridLayout *full_layout_;
    QPushButton *button_;
    QLabel *label_;

private slots:
    void ButtonSlot();
};

#endif // MAINWINDOW_H

```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    label_ = new QLabel(this);
    label_->setAlignment(Qt::AlignCenter);
    label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    button_ = new QPushButton("Click", this);
    button_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout;
    full_layout_->addWidget(label_, 0,0,1,1);
    full_layout_->addWidget(button_,1,0,1,1);
    full_layout_->setRowStretch(0,2);
    full_layout_->setRowStretch(1,1);

    center_ = new QWidget(this);
    center_->setLayout(full_layout_);

    setCentralWidget(center_);

//    connect(button_, SIGNAL(clicked()), this, SLOT(ButtonSlot()));
    connect(button_, &QPushButton::clicked, this, MainWindow::ButtonSlot);
}

void MainWindow::ButtonSlot()
{
    label_->setText("Clicked");
}
```

* 버튼이 클릭되면 라벨에 문자열이 출력된다.

QT5 이전에는 SIGNAL과 SLOT 이벤트 함수를 구현해야 했다.   

> connect(sender, SIGNAL(signal_function(Type)), receiver, SLOT(slot_function(Type)));

또한 매개 변수가 존재할 경우 매개 변수의 자료형을 입력해야 했다.

하지만 QT5 부터는 좀더 유연하게 작성이 가능하다.

> connect(sender, &Sender::signal_function, receiver, &Receiver::slot_function);

좀 더 쉽게 작성이 가능하며,   
매개변수와 호출인자()를 작성할 필요가 없어졌다.

### 사용자 정의 signal의 발생

기존에 제공되는 `signal`외의 사용자가 정의한 `signal`의 경우 `emit`이라는 키워드를 통해 발생된다.

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include <QLabel>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

signals:
    void signal_sample(bool);
private:
    QWidget *center_;
    QGridLayout *full_layout_;
    QPushButton *button_;
    QLabel *label_;

private slots:
    void ButtonSlot(bool);
    void CustomSlot(bool);
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    label_ = new QLabel(this);
    label_->setAlignment(Qt::AlignCenter);
    label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    button_ = new QPushButton("Click", this);
    button_->setCheckable(true);
    button_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout;
    full_layout_->addWidget(label_, 0,0,1,1);
    full_layout_->addWidget(button_,1,0,1,1);
    full_layout_->setRowStretch(0,2);
    full_layout_->setRowStretch(1,1);

    center_ = new QWidget(this);
    center_->setLayout(full_layout_);

    setCentralWidget(center_);

    connect(button_, &QPushButton::clicked, this, &MainWindow::signal_sample);
    connect(this, &MainWindow::signal_sample, this, &MainWindow::CustomSlot);
}

void MainWindow::ButtonSlot(bool checked)
{
    if (checked) {
        emit signal_sample(true);
    } else {
        emit signal_sample(false);
    }
}

void MainWindow::CustomSlot(bool checked)
{
    if (checked) {
        label_->setText("Clicked");
        button_->setText("Clicked");
    } else {
        label_->setText("");
        button_->setText("Click");
    }
}
```

* 버튼 체크 여부에 따라 라벨과 버튼의 텍스트를 변경한다.

볼 수 있듯, `signal`과 `signal`의 연결도 가능하다.   
또한 매개 변수의 전달을 통해 여러 효과를 낼 수 있다.

### disconnect

`disconnect`는 `connect`의 반대 의미를 가지는데,   
기존에 `connect`로 연결된 통신을 끊을 수 있다.
