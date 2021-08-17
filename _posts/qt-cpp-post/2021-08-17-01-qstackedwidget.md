---
title: "[Qt] QStackedWidget"
excerpt: "widget을 stack처럼 저장하는 QStackedWidget 클래스를 사용해보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-17
---

`QStackedWidget`은 여러 위젯을 `stack`처럼 가지는 클래스이다.

index를 변경하여 위젯을 바꾸어 표시할 수 있어 여러모로 유용한 위젯이다.

`QStackedWidget`위젯의 경우,   
추가된 위젯이 삭제되지 않고 다른 index에 존재하게 되며   
메모리를 계속 차지하고 있는 형태가 된다.

\<QFrame>을 상속 받으며, \<QStackedWidget>에 정의되어 있다.

## QStackedWidget

> 삽입되는 위젯 클래스는 생략한다.   
`Child1`, `Child2`, `Child3`

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QStackedWidget>
#include <QPushButton>

#include "child1.h"
#include "child2.h"
#include "child3.h"

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

private:
    QStackedWidget *stacked_widget_;
    Child1 *child1;
    Child2 *child2;
    Child3 *child3;

private slots:
    void ChangeStackIndexSlot(int num);
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    child1 = new Child1(this);
    child2 = new Child2(this);
    child3 = new Child3(this);

    stacked_widget_ = new QStackedWidget(this);
    stacked_widget_->insertWidget(0,child1);
    stacked_widget_->insertWidget(1,child2);
    stacked_widget_->insertWidget(2,child3);

    stacked_widget_->setCurrentIndex(0);
    this->setCentralWidget(stacked_widget_);

    connect(child1, &Child1::ChangeSignal, this, &MainWindow::ChangeStackIndexSlot);
    connect(child2, &Child2::ChangeSignal, this, &MainWindow::ChangeStackIndexSlot);
    connect(child3, &Child3::ChangeSignal, this, &MainWindow::ChangeStackIndexSlot);
}

void MainWindow::ChangeStackIndexSlot(int num)
{
    stacked_widget_->setCurrentIndex(num);
}
```

![image1](/images/qt-image/stackedwidget_1.png)
![image1](/images/qt-image/stackedwidget_2.png)
![image1](/images/qt-image/stackedwidget_3.png)

## 유용한 기능

#### setCurrentIndex(int index)

현재 `QStackedWidget`의 `index`를 설정한다.

#### addWidget(QWidget *w)

위젯을 추가한다. (차례대로)

#### insertWidget(int index, QWidget *w)

`addWidget`은 차례대로 `index` 0부터 채우지만,   
`insertWidget`은 위젯을 지정 `index`에 추가한다.

#### count

추가된 위젯의 갯수를 반환한다.

#### currentIndex

현재 `QStackedWidget`의 `index`를 반환한다.