---
title: "[Qt] QProgressBar (진행 표시줄)"
excerpt: "QProgressBar에 대해 알아보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-19
---

`QProgressBar`는 어떤 진행 상황에 대한 진행도를 표시하는데 사용할 수 있는 클래스이다.

파일을 업로드하거나 다운로드할 때 보여지는 진행 표시 바가 이 위젯 클래스로 만들 수 있다.

기본적으로 0에서 99의 범위를 가지며, 따로 설정이 가능하다.

## QProgressBar

0.5초마다 진행 표시 바를 10% 진행시키는 예시

* subwindow.h

```cpp
#ifndef SUBWINDOW_H
#define SUBWINDOW_H

#include <QDialog>
#include <QGridLayout>
#include <QPushButton>
#include <QProgressBar>
#include <QTimer>

class SubWindow : public QDialog
{
    Q_OBJECT
public:
    explicit SubWindow(QWidget *parent = nullptr);
    ~SubWindow();

private:
    QGridLayout *full_layout_;
    QPushButton *cancel_btn_;
    QProgressBar *progress_bar_;
    QTimer *timer_;

private slots:
    void CancelButtonSlot();
    void TimerSlot();
};

#endif // SUBWINDOW_H
```

* subwindow.cpp

```cpp
#include "subwindow.h"

#include <QMessageBox>
#include <QDebug>

SubWindow::SubWindow(QWidget *parent)
    : QDialog(parent)
{
    setModal(true);

    progress_bar_ = new QProgressBar(this);
    progress_bar_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    cancel_btn_ = new QPushButton("canel", this);
    cancel_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout(this);
    full_layout_->addWidget(progress_bar_, 0,0,1,3);
    full_layout_->addWidget(cancel_btn_, 1,1,1,1);
    full_layout_->setSpacing(10);
    full_layout_->setColumnStretch(0,1);
    full_layout_->setColumnStretch(1,1);
    full_layout_->setColumnStretch(2,1);

    timer_ = new QTimer(this);

    connect(cancel_btn_, &QPushButton::clicked, this, &SubWindow::CancelButtonSlot);
    connect(timer_, &QTimer::timeout, this, &SubWindow::TimerSlot);

    timer_->start(500);
    this->setResult(QDialog::Accepted);
}

void SubWindow::CancelButtonSlot()
{
    qDebug() << "cancel";
    this->reject();
    this->close();
}

void SubWindow::TimerSlot()
{
    progress_bar_->setValue(progress_bar_->value()+10);
    if (progress_bar_->value() >= 99) {
        this->accept();
        this->close();
    }
}
```

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include <QLabel>
#include <QProgressBar>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

private:
    QWidget *central_widget_;
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
#include "subwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    label_ = new QLabel(this);
    label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
    label_->setText("Please Click");
    label_->setAlignment(Qt::AlignCenter);

    button_ = new QPushButton("Click", this);
    button_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout;
    full_layout_->addWidget(label_,0,0,1,1);
    full_layout_->addWidget(button_, 0,1,1,1);

    central_widget_ = new QWidget(this);
    central_widget_->setLayout(full_layout_);
    this->setCentralWidget(central_widget_);

    connect(button_, &QPushButton::clicked, this, &MainWindow::ButtonSlot);
}

void MainWindow::ButtonSlot()
{
    int result = SubWindow(this).exec();

    if (QDialog::Accepted == result) {
        label_->setText("Successed");
    } else {
        label_->setText("Failed");
    }
}
```

![image1](/images/qt-image/progressbar_main.png)

![image1](/images/qt-image/progressbar_progress.png)

![image1](/images/qt-image/progressbar_result.png)

## 유용한 기능

#### setTextVisible(bool visible)

기본적으로 `true`상태이며,   
해당 위젯의 진행도를 나타내는 텍스트의 시각효과 여부를 설정한다.

#### setFormat(const QString &format)

* `%p` : 백분율
* `%v` : 값
* `%m` : 단계

해당 위젯의 진행도 텍스트의 형식을 설정한다.   
기본적값은 `%p%`이다.

#### setRange(int minimum, int maximum)

해당 위젯의 범위를 재설정한다.

기본값은 0-100으로 설정되어있다.

#### setValue(int value)

해당 위젯의 진행 값을 설정한다.

#### value()

해당 위젯의 진행 값을 `int`형으로 반환한다.

#### valueChanged(int value)

해당 위젯의 진행도 텍스트가 변경될 때 발생하는 `signal`이다.