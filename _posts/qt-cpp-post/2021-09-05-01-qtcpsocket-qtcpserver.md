---
title: "[Qt] QTcpSocket & QTcpServer"
excerpt: "tcp통신을 사용해보자"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-09-05
---

`QTcpSocket`과 `QTcpServer`는 TCP통신을 위한 `Network`API이다.

> QTcpSocket은 QAbstractSocket을 상속하며, TCP통신의 socket역할을 한다.

> QTcpServer는 QObject를 상속하며, TCP통신의 server로써 수신을 대기할 수 있다.

* 이번에는 이 TCP통신을 사용하여 간단하게 메세지를 보내고 받는 역할의 위젯을 만들었다.   
(연결을 취소하고, client 또는 server를 종료하는 이벤트는 처리하지 않았다.)

# QTcpServer - Sever(Receiver)

* serverwidget.h

```cpp
#ifndef SERVERWIDGET_H
#define SERVERWIDGET_H

#include <QTcpServer>
#include <QTcpSocket>

#include <QMainWindow>
#include <QGridLayout>
#include <QLabel>
#include <QPlainTextEdit>
#include <QListWidget>
#include <QStatusBar>

class ServerWidget : public QMainWindow
{
    Q_OBJECT
public:
    explicit ServerWidget(QWidget *parent = Q_NULLPTR);

private:
    QTcpServer* server_;

    QWidget* center_;
    QStatusBar* statusbar_;
    QGridLayout* full_layout_;
    QLabel* title_label_;
    QPlainTextEdit* log_edit_;

    void SetUI();

private slots:
    void NewConnection();
    void ReadyRead();
};

#endif // SERVERWIDGET_H
```

* serverwidget.cpp

```cpp
#include "serverwidget.h"

ServerWidget::ServerWidget(QWidget *parent)
    : QMainWindow(parent)
{
    center_ = new QWidget(this);
    this->setCentralWidget(center_);
    statusbar_ = new QStatusBar(this);
    this->setStatusBar(statusbar_);
    SetUI();

    server_ = new QTcpServer(this);

    if (server_->listen(QHostAddress::Any, 7777)) {
        connect(server_, &QTcpServer::newConnection,
                this, &ServerWidget::NewConnection);
    } else {
        statusbar_->showMessage("Couldn't Connect..");
        exit(EXIT_FAILURE);
    }

    this->setWindowTitle("Server");
}

void ServerWidget::SetUI()
{
    title_label_ = new QLabel("Server(Receiver)", this);
    title_label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);
    title_label_->setAlignment(Qt::AlignCenter);

    log_edit_ = new QPlainTextEdit(this);
    log_edit_->setReadOnly(true);
    log_edit_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout(center_);
    full_layout_->addWidget(title_label_, 0,0,1,1);
    full_layout_->addWidget(log_edit_, 1,0,1,1);
    full_layout_->setMargin(10);
    full_layout_->setSpacing(10);
    full_layout_->setRowStretch(0,1);
    full_layout_->setRowStretch(1,3);

    center_->setLayout(full_layout_);
}

void ServerWidget::NewConnection()
{
    QTcpSocket* client = server_->nextPendingConnection();

    statusbar_->showMessage("Connected..");

    connect(client, &QTcpSocket::readyRead,
            this, &ServerWidget::ReadyRead);
}

void ServerWidget::ReadyRead()
{
    QTcpSocket *socket = reinterpret_cast<QTcpSocket*>(sender());

    QByteArray byte;
    byte = socket->readAll();

    log_edit_->appendPlainText(QString("[Recv] ") + byte);
}
```

> `listen`메서드를 통해 해당 address/port의 신호를 기다리고,   
소켓과 연결이 성공할 경우, `NewConnection` slot을 실행한다.   
(새 연결이 있는 경우, server에서 정의된 `newConnection` signal이 발생한다.)

> 또한 소켓에서 통신을 던질 경우, 던지는 sender를 형 변환하여 처리했다.

## 유용한 기능

#### listen(const QHostAddress &address = QHostAddress::Any, quint16 port = 0)

해당 addreess/port의 연결을 대기한다.

address를 입력하지 않으면 모든 네트워크에서 수신하며,   
port를 입력하지 않으면 자동으로 선택된다.

성공 시 `true`를 반환하고, 실패 시 `false`를 반환한다.

#### newConnection - signal

새 연결이 있는 경우, 자동으로 발생되는 signal이다.

#### nextPendingConnection

서버에 보류 중인 소켓을 반환한다.   
연결된 소켓이 없는 경우 `nullptr`을 반환한다.

# QTcpSocket - Client(Sender)

* clientwidget.h

```cpp
#ifndef CLIENTWIDGET_H
#define CLIENTWIDGET_H

#include <QTcpSocket>
#include <QHostAddress>

#include <QMainWindow>
#include <QGridLayout>
#include <QLabel>
#include <QPlainTextEdit>
#include <QLineEdit>
#include <QPushButton>
#include <QStatusBar>

class ClientWidget : public QMainWindow
{
    Q_OBJECT

public:
    ClientWidget(QWidget* parent = Q_NULLPTR);

private:
    QTcpSocket*	socket_;

private:
    QWidget* center_;
    QStatusBar* statusbar_;
    QLabel* title_label_;
    QGridLayout* full_layout_;
    QPlainTextEdit* log_edit_;
    QLineEdit* msg_edit_;
    QPushButton* send_button_;
    QPushButton* exit_button_;

    void SetUI();

private slots:
    void sendMessage();
};

#endif // CLIENTWIDGET_H
```

* clientwidget.cpp

```cpp
#include "clientwidget.h"

#include <QDebug>

ClientWidget::ClientWidget(QWidget *parent)
    : QMainWindow(parent)
{
    center_ = new QWidget(this);
    this->setCentralWidget(center_);
    statusbar_ = new QStatusBar(this);
    this->setStatusBar(statusbar_);
    SetUI();

    this->setWindowTitle("Client");

    socket_ = new QTcpSocket(this);
    socket_->connectToHost(QHostAddress::LocalHost, 7777);

    if (socket_->waitForConnected()) {
        statusbar_->showMessage("Connected to server..");
    }

    connect(send_button_, &QPushButton::clicked,
            this, &ClientWidget::sendMessage);
}

void ClientWidget::SetUI()
{
    title_label_ = new QLabel("Client(Sender)", this);
    title_label_->setAlignment(Qt::AlignCenter);
    title_label_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    log_edit_ = new QPlainTextEdit(this);
    log_edit_->setReadOnly(true);
    log_edit_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    msg_edit_ = new QLineEdit(this);
    msg_edit_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    send_button_ = new QPushButton("Send", this);
    send_button_->setSizePolicy(QSizePolicy::Expanding, QSizePolicy::Expanding);

    full_layout_ = new QGridLayout(center_);
    full_layout_->addWidget(title_label_, 0, 0, 1, 2);
    full_layout_->addWidget(log_edit_, 1, 0, 1, 2);
    full_layout_->addWidget(msg_edit_, 2, 0, 1, 1);
    full_layout_->addWidget(send_button_, 2, 1, 1, 1);
    full_layout_->setSpacing(10);
    full_layout_->setMargin(10);
    full_layout_->setRowStretch(0, 1);
    full_layout_->setRowStretch(1, 5);
    full_layout_->setRowStretch(2, 1);
    full_layout_->setColumnStretch(0, 3);
    full_layout_->setColumnStretch(1, 1);

    center_->setLayout(full_layout_);
}

void ClientWidget::sendMessage()
{
    if (socket_->isOpen()) {
        if (!msg_edit_->text().isEmpty()) {
            QString msg = msg_edit_->text();

            log_edit_->appendPlainText(QString("[Send] ") + msg);
            socket_->write(msg.toStdString().c_str());

            msg_edit_->clear();
        }
    }
}
```

> connectToHost를 통해 해당 address/port와 연결을 시도하며,   
전달할 메세지를 write를 통해 장치에 쓴다.ㄴ


## 유용한 기능

QTcpSocket이 아닌 QAbstractSocket을 참조하자. (상속)

#### connectToHost(const QHostAddress &address, quint16 port, QIODevice::OpenMode openMode = ReadWrite)

해당 address/port와의 연결을 시도한다.

#### waitForConnected(int msecs = 30000)

소켓이 연결되기까지 전달된 msecs만큼 기다린다.   
연결이 성공하면 `true`를 반환하지만, 실패할 경우 `false`를 반환하며   
error메서드를 통해 오류를 확인할 수 있다.

#### isOpen

QAbstractSocket에 상속된 QIODevice 클래스에 정의된 메서드로   
장치가 열려있다면 `true`, 닫혀있다면 `false`를 반환한다.

#### write

> qint64	write(const char *data, qint64 maxSize)   
> qint64	write(const char *data)   
> qint64	write(const QByteArray &byteArray)   

해당 장치에 데이터를 쓴다.

즉, 데이터를 네트워크를 통해 보내는 메서드가 된다.

#### readyRead

QIODevice의 signal로 데이터를 읽을 수 있을 때마다 발생된다.

즉, 해당 소켓에서 `write`하면, 서버에서 `readyread`를 받아   
slot을 통해 `write`된 데이터를 활용할 수 있다.

#### readAll

장치에서 보낸 데이터를 모두 읽어 Byte 배열로 반환한다. (QByteArray)

![client-image](/images/qt-image/tcpserver1.png)
![client-image](/images/qt-image/tcpclient1.png)