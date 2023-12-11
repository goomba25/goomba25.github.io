---
title: "[Qt] QMessageBox"
excerpt: "메세지박스에 대해 알아보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-13
---

`QDialog`를 상속 받아 만들어진 위젯 클래스로   
내부적으로 `enum`으로 정의된 `ButtonRole`과 `StandardButton` 등으로   
여러가지 혼합형 다이얼로그를 생성할 수 있다.

[https://doc.qt.io/qt-5/qmessagebox.html](https://doc.qt.io/qt-5/qmessagebox.html)

메세지박스의 종류는 아래와 같이 존재한다.   
(각 종류마다 아이콘도 달라진다.)
* about
* aboutQt
* StandardButton critical
* StandardButton ​information
* StandardButton question
* StandardButton warning

​\<QMessageBox>에 정의되어 있다.

## QMessageBox
> mainwindow.h 생략

* mainwindow.cpp

```cpp
#include "mainwindow.h"

#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    label_ = new QLabel("", this);
    label_->setAlignment(Qt::AlignCenter);
    label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    button_[0] = new QPushButton("Click1", this);
    button_[0]->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    button_[1] = new QPushButton("Click2", this);
    button_[1]->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout;
    full_layout_->addWidget(label_,0,0,1,2);
    full_layout_->addWidget(button_[0],1,0,1,1);
    full_layout_->addWidget(button_[1],1,1,1,1);
    full_layout_->setRowStretch(0,2);
    full_layout_->setRowStretch(1,1);
    full_layout_->setSpacing(10);

    center_ = new QWidget(this);
    center_->setLayout(full_layout_);

    setCentralWidget(center_);

    connect(button_[0], &QPushButton::clicked, this, &MainWindow::ButtonSlot1);
    connect(button_[1], &QPushButton::clicked, this, &MainWindow::ButtonSlot2);
}

void MainWindow::ButtonSlot1()
{
    QMessageBox::information(this, "Title",
                             "Information msgbox");
}

void MainWindow::ButtonSlot2()
{
    QMessageBox::StandardButton result;

    result = QMessageBox::question(this, "Title",
                                   "Question msgbox",
                                   QMessageBox::Ok | QMessageBox::Cancel,
                                   QMessageBox::Ok);

    if (result == QMessageBox::Ok) {
        label_->setText("OK");
    } else {
        label_->setText("Cancel");
    }
}
```

![image1](/images/qt-image/msgbox.png)

![image2](/images/qt-image/information_box.png)
![image3](/images/qt-image/question_box.png)
* 해당 메인 위젯에서 왼쪽 버튼을 누르면 한 개의 버튼을 가진 메세지 박스를,   
오른쪽 버튼을 누르면 두 개의 버튼을 가진 메세지 박스를 생성한다.
* 두번째 메세지 박스의 두 버튼을 누르면 메인 위젯의 라벨에 텍스트를 삽입한다.

## 유용한 기능

#### setStandardButtons(QMessageBox::StandardButtons buttons)

메세지 박스의 표준 버튼을 설정한다.

#### setDefaultButton(QMessageBox::StandardButton button)

기본(`Default`) 버튼을 설정한다.
(엔터를 누를 때 동작한다.)

#### setText(const QString &)

메세지 박스의 내용을 설정한다.

