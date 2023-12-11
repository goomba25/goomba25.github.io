---
title: "[Qt] QPushbutton (버튼)"
excerpt: "버튼 사용하기"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-07-22
---

일반적인 버튼 위젯이다.

버튼은 \<QPushButton> 에 정의되어 있다.

버튼에는 여러 가지로 유용한 기능들도 함께 소개한다.

## QPushButton

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QVBoxLayout>
#include <QPushButton>
#include <QLabel>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);
private:
    QWidget *central_widget_;
    QVBoxLayout *full_layout_;
    QPushButton *button_[7];
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    button_[0] = new QPushButton("text1", this);
    button_[1] = new QPushButton(this);
    button_[1]->setText("text2");
    button_[2] = new QPushButton(this);
    button_[2]->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
    button_[3] = new QPushButton(this);
    button_[3]->setFixedSize(30,30);
    button_[4] = new QPushButton("Toggle", this);
    button_[4]->setCheckable(true);
    button_[5] = new QPushButton("Enable", this);
    button_[5]->setEnabled(false);
    button_[6] = new QPushButton("Checked", this);
    button_[6]->setCheckable(true);
    button_[6]->setChecked(true);

    full_layout_ = new QVBoxLayout;
    for (int i = 0; i < 7; i++) {
        full_layout_->addWidget(button_[i]);
    }

    central_widget_ = new QWidget(this);

    central_widget_->setLayout(full_layout_);
    this->setCentralWidget(central_widget_);
}
```

![pushbutton](/images/qt-image/pushbutton.png)


## 유용한 기능

#### setText(const QString &text)

해당 위젯의 텍스트를 입력한다.

#### setSizePolicy(QSizePolicy)

해당 위젯의 사이즈 정책을 지정한다. (ex. Expanding, Fixed, ...)

#### setFixedSize(const QSize &)

또는 setFixedSize(int w, int h) 로 사용할 수 있다.   
해당 위젯의 사이즈를 입력한 사이즈로 고정시킨다.

setFixedHeight(int h) 와 setFixedWidth(int w) 로 높이와 너비만 고정할 수도 있다.

#### setCheckable(bool)

bool 값을 true로 설정하면 해당 위젯의 토글 기능이 활성화된다.

#### setChecked(bool)

bool 값에 따라 해당 위젯의 클릭된 상태를 지정한다.   
setCheckable(true) 와 함께 사용하면 위젯을 클릭 상태로 만들 수 있다.

#### setEnable(bool)

bool 값을 false로 설정하면 버튼을 클릭할 수 없는 상태로 만든다.

반대되는 메서드로 setDisable(bool) 이 있다.

#### isChecked()

현재 버튼의 check 상태를 반환한다.   
(눌려있다면 true를 반환한다.)