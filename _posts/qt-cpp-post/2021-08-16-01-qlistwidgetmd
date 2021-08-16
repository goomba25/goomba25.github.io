---
title: "[Qt] QListWidget"
excerpt: "목록을 표시할 수 있는 위젯에 대해 알아보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-16
---

아이콘 또는 텍스트 등을 표시할 수 있는 리스트 형태의 위젯 클래스이다.

\<QAbstractItemView>를 상속 받은 \<QListView>를 상속 받으며   
\<QListWidget> 에 정의되어 있다.

## QListWidget

텍스트 리스트를 가지는 메인 위젯이며(mainwindow)   
리스트의 아이템을 추가, 수정, 삭제하는 기능을 가지는 버튼을 가진다.

추가, 수정 기능의 경우 Dialog를 생성하여 처리한다. (subwindow)

* mainwindow.h

```cpp
#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QGridLayout>
#include <QPushButton>
#include <QListWidget>

class MainWindow : public QMainWindow
{
    Q_OBJECT
public:
    explicit MainWindow(QWidget *parent = nullptr);

private:
    QWidget *central_widget_;
    QGridLayout *full_layout_;
    QListWidget *list_widget_;
    QPushButton *add_btn_,
    *remove_btn_, *rename_btn_;
    QListWidgetItem *item_;

private slots:
    void AddSlot();
    void RenameSlot();
    void RemoveSlot();
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
    list_widget_ = new QListWidget(this);
    list_widget_->setSelectionMode(QListWidget::SingleSelection);
    list_widget_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    add_btn_ = new QPushButton("Add", this);
    add_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    remove_btn_ = new QPushButton("Remove", this);
    remove_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    rename_btn_ = new QPushButton("Rename", this);
    rename_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout;
    full_layout_->addWidget(list_widget_, 0,0,1,3);
    full_layout_->addWidget(add_btn_,1,0,1,1);
    full_layout_->addWidget(rename_btn_,1,1,1,1);
    full_layout_->addWidget(remove_btn_,1,2,1,1);
    full_layout_->setSpacing(10);
    full_layout_->setRowStretch(0,2);
    full_layout_->setRowStretch(1,1);

    central_widget_ = new QWidget(this);
    central_widget_->setLayout(full_layout_);
    this->setCentralWidget(central_widget_);

    connect(add_btn_, &QPushButton::clicked, this, &MainWindow::AddSlot);
    connect(rename_btn_, &QPushButton::clicked, this, &MainWindow::RenameSlot);
    connect(remove_btn_, &QPushButton::clicked, this, &MainWindow::RemoveSlot);
}

void MainWindow::AddSlot()
{
    SubWindow sub(this);
    sub.exec();

    if (!sub.item_text_.isNull()) {
        item_ = new QListWidgetItem(sub.item_text_, list_widget_);
        item_->setTextAlignment(Qt::AlignCenter);
        list_widget_->sortItems(Qt::AscendingOrder);
    }
}

void MainWindow::RenameSlot()
{
    if (!list_widget_->currentItem()) {
        return;
    } else {
        SubWindow sub(this, list_widget_->currentItem()->text());
        sub.exec();

        if (!sub.item_text_.isNull()) {
            list_widget_->currentItem()->setText(sub.item_text_);
            list_widget_->sortItems(Qt::AscendingOrder);
        }
    }
}

void MainWindow::RemoveSlot()
{
    if (!list_widget_->currentItem()) {
        return;
    } else {
        list_widget_->takeItem(list_widget_->currentRow());
    }
}
```

* subwindow.h

```cpp
#ifndef SUBWINDOW_H
#define SUBWINDOW_H

#include <QDialog>
#include <QGridLayout>
#include <QLineEdit>
#include <QPushButton>

class SubWindow : public QDialog
{
    Q_OBJECT
public:
    explicit SubWindow(QWidget *parent = nullptr, QString item_text = NULL);
    QString item_text_;

private:
    QGridLayout *full_layout_;
    QLineEdit *line_edit_;
    QPushButton *ok_btn_, *cancel_btn_;

private slots:
    void OkButtonSlot();
    void CancelButtonSlot();
};

#endif // SUBWINDOW_H
```

* subwindow.cpp

```cpp
#include "subwindow.h"

#include <QMessageBox>

SubWindow::SubWindow(QWidget *parent, QString item_text)
    : QDialog(parent)
{
    setModal(true);

    line_edit_ = new QLineEdit(this);
    line_edit_->setAlignment(Qt::AlignCenter);
    line_edit_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    if (item_text != NULL) {
        line_edit_->setText(item_text);
    }

    ok_btn_ = new QPushButton("Ok", this);
    ok_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    cancel_btn_ = new QPushButton("Cancel", this);
    cancel_btn_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout(this);
    full_layout_->addWidget(line_edit_, 0,0,1,2);
    full_layout_->addWidget(ok_btn_, 1,0,1,1);
    full_layout_->addWidget(cancel_btn_,1,1,1,1);

    this->setLayout(full_layout_);

    connect(ok_btn_, &QPushButton::clicked, this, &SubWindow::OkButtonSlot);
    connect(cancel_btn_, &QPushButton::clicked, this, &SubWindow::CancelButtonSlot);
}

void SubWindow::OkButtonSlot()
{
    if (line_edit_->text().isEmpty()) {
        QMessageBox::information(this, "Title", "Please enter item's name");
    } else {
        item_text_ = line_edit_->text();
        this->close();
    }
}

void SubWindow::CancelButtonSlot()
{
    this->close();
}
```

![image1](/images/qt-image/qlistwidget_1.png)

![image2](/images/qt-image/qlistwidget_2.png)
![image3](/images/qt-image/qlistwidget_3.png)

## 유용한 기능

#### addItem(const QString &label)

아이템을 리스트 위젯에 추가한다.   
`addItem(QListWidgetItem *item)`,   
`addItems(const QStringList &labels)` 가 추가적으로 존재한다.

`QListWidgetItem`의 생성자에   
`QListWidgetItem(const QString &text, QListWidget *parent=nullptr, int type=Type)`   
이 존재하는데, `QListWidget`을 명시할 경우 자동으로 리스트에 추가되어   
`addItem`을 할 필요가 없다.

#### insertItem(int row, QListWidgetItem *item)

리스트 위젯의 해당 row에 아이템을 삽입한다.   
`insertItem(int row, const QString &label)`,   
`insertItems(int row, const QStringList &labels)`가 추가적으로 존재한다.

#### count()

해당 리스트 위젯의 아이템 갯수를 반환한다.   
아이템이 없을 경우 0을 반환한다.

#### currentItem()

현재 클릭된 아이템을 `QListWidgetItem*` 형태로 반환한다.

#### currentRow()

현재 클릭된 아이템의 행을 반환한다.

#### item(int row)

row의 아이템을 `QListWidgetItem*` 형태로 반환한다.

#### sortItems(Qt::SortOrder order=Qt::AscendingOrder)

지정된 순서로 위젯의 아이템을 정렬한다.

#### takeItem(int row)

row의 아이템을 리스트에서 제거하면서   
`QListWidgetItem*` 형태로 반환한다.

아이템이 없을 경우 `nullptr`을 반환한다.

#### setSelectionMode(QAbstractItemView::SelectionMode mode)

선택 모드를 설정하는 기능을 가지는 `QAbstactItemView` 클래스의 메서드이다.

여러 행을 선택하거나 하나의 행만 선택할 수 있도록 설정할 수 있다.