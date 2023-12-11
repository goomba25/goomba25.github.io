---
title: "[Qt] QRadioButton"
excerpt: "라디오 버튼에 대해 알아보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-15
---

`checkbox`와는 다른 선택성을 가지는 위젯으로,   
선택 영역 내의 옵션 중 하나를 선택하기 위해 사용된다.

\<QRadioButton> 에 정의되어 있다.

## QRadioButton

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include <QRadioButton>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = 0);

private:
    QWidget *central_widget_;
    QVBoxLayout *full_layout_, *radio_layout_;
    QRadioButton *radio_button_[3];
    QPushButton *button_;

private slots:
    void button_Clicked();
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

#include <QMessageBox>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    radio_button_[0] = new QRadioButton("Bird", this);
    radio_button_[1] = new QRadioButton("Cat", this);
    radio_button_[2] = new QRadioButton("Dog");

    radio_layout_ = new QVBoxLayout;
    for (int i = 0; i < 3; i++) {
        radio_layout_->addWidget(radio_button_[i]);
    }
    radio_button_[0]->setChecked(true);

    button_ = new QPushButton("Click", this);

    full_layout_ = new QVBoxLayout;
    full_layout_->addLayout(radio_layout_);
    full_layout_->addWidget(button_);

    central_widget_ = new QWidget(this);
    central_widget_->setLayout(full_layout_);
    this->setCentralWidget(central_widget_);

    connect(button_, &QPushButton::clicked, this, &MainWindow::button_Clicked);
}

void MainWindow::button_Clicked()
{
    if (radio_button_[0]->isChecked()) {
        QMessageBox::information(this, "Title", radio_button_[0]->text());
    } else if (radio_button_[1]->isChecked()) {
        QMessageBox::information(this, "Title", radio_button_[1]->text());
    } else {
        QMessageBox::information(this, "Title", radio_button_[2]->text());
    }
}
```

* 세 가지의 radiobutton의 선택 여부에 따라 다른 메세지 박스를 띄우는 예제

![image1](/images/qt-image/radiobutton_1.png)
![image2](/images/qt-image/radiobutton_2.png)

## 유용한 기능

#### setText(const QString &)

해당 위젯의 텍스트를 입력한다.

#### text()

해당 위젯의 텍스트를 반환한다.

#### isChecked()

해당 위젯의 체크 상태를 `bool`형태로 반환한다.

#### setChecked(bool)

해당 위젯의 체크 상태를 설정한다.