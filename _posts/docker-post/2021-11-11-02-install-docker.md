---
title: "[Docker] Docker 설치 (Ubuntu 20.04)"
excerpt: "도커 설치"

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2021-11-18
---

Docker를 설치하기 위한 최소 사양이 존재합니다. (21.11.11 기준)

* Ubuntu Impish 21.10
* Ubuntu Hirsute 21.04
* Ubuntu Focal 20.04 (LTS)
* Ubuntu Bionic 18.04 (LTS)

## 패키지 설치

1. Docker에 필요한 패키지들을 설치합니다.

```bash
$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

2. Docker 공식 GPG Key를 추가합니다.

```bash
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

3. stable repository를 설정합니다.

```bash
$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

> Note: The lsb_release -cs sub-command below returns the name of your Ubuntu distribution, such as xenial. Sometimes, in a distribution like Linux Mint, you might need to change $(lsb_release -cs) to your parent Ubuntu distribution. For example, if you are using Linux Mint Tessa, you could use bionic. Docker does not offer any guarantees on untested and unsupported Ubuntu distributions.

위와 같은 설명이 있지만 딱히 필요한게 아니라면 건들지 않아도 됩니다.

## Docker-Engine 설치

1. 최신 버전의 Docker-Engine을 설치합니다.

```bash
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

2. 특정 버전을 설치하려는 경우 아래의 명령어를 통해 가능합니다.

* 먼저 사용 가능한 버전을 확인합니다. 
  
```bash
$ apt-cache madison docker-ce

docker-ce | 5:20.10.10~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
docker-ce | 5:20.10.9~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
docker-ce | 5:20.10.8~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
docker-ce | 5:20.10.7~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
docker-ce | 5:20.10.6~3-0~ubuntu-focal | https://download.docker.com/linux/ubuntu focal/stable amd64 Packages
...
```

* 원하는 버전을 설치합니다.   
`<VERSION_STRING>` 위치에 해당 버전을 입력합니다. (ex. `5:20.10.8~3-0~ubuntu-focal`)

```bash
$ sudo apt-get install docker-ce=<VERSION_STRING> docker-ce-cli=<VERSION_STRING> containerd.io
```

* 설치된 버전을 확인합니다.

```bash
$ docker -v
```

> 참고 : [https://docs.docker.com/engine/install/linux-postinstall/](https://docs.docker.com/engine/install/linux-postinstall/)