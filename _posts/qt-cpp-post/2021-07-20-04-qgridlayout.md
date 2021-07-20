---
title: "[Qt] QGridLayout (레이아웃)"
excerpt: "레이아웃 사용하기"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true

last_modified_at: 2021-07-20
---

레이아웃을 이용하여 편리하게 위젯 또는 레이아웃,   
스페이스(SpacingItem) 등을 쉽고 빠르게 배치할 수 있다.

* QVBoxLayout (수직)
* QHBoxLayout (수평)
* QGridLayout (격자)

레이아웃은 \<QGridLayout> 에 모두 포함되며,   
각각 \<QVBoxLayout>, \<QHBoxLayout> 을 사용할 수도 있다.

## QVBoxLayout

위젯이 수직으로 나열된다.   
상황에 따라 위젯 간의 거리, 각 row의 stretch, 레이아웃의 margin 등을 조절할 수 있다.

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
    QWidget *central_widget_;
    QVBoxLayout *full_layout_;
    QPushButton *button_[2];
    QLabel *label_;

    void VBoxLayoutInit();
    void ButtonInit();
    void LabelInit();
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    ButtonInit();
    LabelInit();
    VBoxLayoutInit();

    central_widget_ = new QWidget;

    this->setCentralWidget(central_widget_);
    central_widget_->setLayout(full_layout_);
}

void MainWindow::VBoxLayoutInit() {
    full_layout_ = new QVBoxLayout;

    full_layout_->addWidget(label_);
    for (int i = 0; i < 2; i++) {
        full_layout_->addWidget(button_[i]);
    }
}

void MainWindow::ButtonInit() {
    button_[0] = new QPushButton;
    button_[0]->setText("First Button");

    button_[1] = new QPushButton;
    button_[1]->setText("Second Button");
}

void MainWindow::LabelInit() {
    label_ = new QLabel;
    label_->setText("This is Label");
    label_->setAlignment(Qt::AlignCenter);
}
```

![vboxlaout](/images/qt-image/vboxlayout.png)

## QHBoxLayout

위젯이 수평으로 나열된다.   
상황에 따라 위젯 간의 거리, 각 column의 stretch, 레이아웃의 margin 등을 조절할 수 있다.

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
    QWidget *central_widget_;
    QHBoxLayout *full_layout_;
    QPushButton *button_[2];
    QLabel *label_;

    void HBoxLayoutInit();
    void ButtonInit();
    void LabelInit();
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    ButtonInit();
    LabelInit();
    HBoxLayoutInit();

    central_widget_ = new QWidget;

    this->setCentralWidget(central_widget_);
    central_widget_->setLayout(full_layout_);
}

void MainWindow::HBoxLayoutInit() {
    full_layout_ = new QHBoxLayout;

    //  1 <- Percentage of widgets in layout
    full_layout_->addWidget(label_, 1);
    for (int i = 0; i < 2; i++) {
        full_layout_->addWidget(button_[i], 1);
    }
}

void MainWindow::ButtonInit() {
    button_[0] = new QPushButton;
    button_[0]->setText("First Button");

    button_[1] = new QPushButton;
    button_[1]->setText("Second Button");
}

void MainWindow::LabelInit() {
    label_ = new QLabel;
    label_->setText("This is Label");
    label_->setAlignment(Qt::AlignCenter);
}
```

![hboxlayout](/images/qt-image/hboxlayout.png)

## QGridLayout

격자 레이아웃으로 두 레이아웃 형태를 혼합한 것과 같다.   
row와 column을 지정하여 위젯을 위치시킬 수 있다.

상황에 따라 위젯 간의 거리, 레이아웃의 margin 등을 조절할 수 있다.

row와 column의 stretch를 조절하고, span을 조절하여 크기를 차지하는 크기를 정할 수 있다.

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
    QWidget *central_widget_;
    QGridLayout *full_layout_;
    QPushButton *button_[3];
    QLabel *label_;

    void GridLayoutInit();
    void ButtonInit();
    void LabelInit();
};

#endif // MAINWINDOW_H
```

* mainwindow.cpp

```cpp
#include "mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
{
    ButtonInit();
    LabelInit();
    GridLayoutInit();

    central_widget_ = new QWidget;

    this->setCentralWidget(central_widget_);
    central_widget_->setLayout(full_layout_);
}

void MainWindow::GridLayoutInit() {
    full_layout_ = new QGridLayout;

    full_layout_->addWidget(label_, 0, 0);
    full_layout_->addWidget(button_[0], 0, 1);
    full_layout_->addWidget(button_[1], 1, 0);
    full_layout_->addWidget(button_[2], 1, 1);
}

void MainWindow::ButtonInit() {
    button_[0] = new QPushButton;
    button_[0]->setText("First Button");

    button_[1] = new QPushButton;
    button_[1]->setText("Second Button");

    button_[2] = new QPushButton;
    button_[2]->setText("Third Button");
}

void MainWindow::LabelInit() {
    label_ = new QLabel;
    label_->setText("This is Label");
    label_->setAlignment(Qt::AlignCenter);
}
```

![gridlayout](/images/qt-image/gridlayout.png)