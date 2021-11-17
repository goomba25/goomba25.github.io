---
title: "[Docker] Docker란?"
excerpt: "도커에 대한 간단한 고찰"

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2021-11-11
---

> Docker(도커)는 컨테이너 기반의 오픈소스 가상화 플렛폼입니다.

## 컨테이너

여기서 말하는 컨테이너란 가상화 기술 중의 하나로,   
대표적으로는 LXC(Linux Containers)가 있습니다.

### Virtual vs Container

일반적인 가상화 플랫폼의 경우   
가상화를 위한 Hypervisor라는 논리적 플랫폼을 이용하여   
Host OS의 위에 여러 Guest OS를 설치/구동하는 방식입니다.   
(`virtual machine`, `virtual box`, ...)   
따라서 각각의 Guest OS가 기본적으로 필요한 리소스를 나누어 가져가기 때문에   
조금 손해를 보게 됩니다.

* 때문에 완벽히 분리된 OS 공간을 필요로 한다면   
이러한 가상화 플랫폼을 사용할 수 있습니다.

하지만 컨테이너의 경우 하나의 프로세스로,   
Guest OS를 설치하는 것이 아닌 Host OS의 커널을 공유하고   
필요한 환경만을 구축합니다.   
(따라서 컨테이너는 해당 Host OS의 시스템과 호환되어야 합니다.)   
또한 컨테이너는 하나의 프로세스이므로 필요한 만큼만 리소스를 사용하기 때문에   
손실이 상대적으로 적다고 볼 수 있습니다.

* 전체적인 OS를 구동하는 것이 아닌, 필요한 환경만을 구축할 수 있는 방법입니다.
* 따라서 일반적인 가상화 플랫폼에 비해 가볍고 빠르며, 효율적입니다.
* 만일 분리된 공간 또는 다른 OS가 필요하지 않다면 좋은 선택일 수 있습니다.

## Docker

Docker는 이러한 컨테이너 기술을 사용하는 플랫폼 중 하나입니다.

컨테이너를 사용하여 특정 인프라를 구축할 필요 없이   
특정 환경 구축, 또는 어플리케이션 배포/확장 할 수 있습니다.

현재 다양한 OS와 플랫폼에서 동작할 수 있습니다.

* Linux
* Window 10 (Hyper-v)
* Mac
* Cloud (Azure, AWS, ...)

### Docker Image

Docker는 Image라는 개념을 사용하는데,   
컨테이너 실행에 필요한 파일과 설정 등을 포함하는 파일입니다.   
(컨테이너를 Image가 실행된 상태라고 볼 수 있습니다.)

#### Layer 구조

Image는 Layer 구조를 가집니다.

![layer](/images/docker-image/image-layer-structure.png)

Image를 통해 컨테이너를 생성하게 되면   
위와 같은 기존 Layer 구조 위에 `컨테이너 레이어`를 생성합니다.

![layer2](/images/docker-image/image-layer-structure2.png)

사용자가 컨테이너 내에서 읽고 쓰는 모든 작업은 이 `컨테이너 레이어`에 기록되며,   
해당 컨테이너를 종료(삭제)하면 `컨테이너 레이어`는 소멸하게 됩니다.

  * 즉, 해당 Image는 변하지 않습니다. (Immutable)

Image를 사용함의 장점은 아래와 같습니다.
* Image의 용량은 가상머신에 비해 상대적으로 적은 용량을 가진다.
* Image는 상태 값을 가지지 않고 변하지 않는다.
* 하나의 Image로 여러 컨테이너를 독립적으로 생성할 수 있다.

### Dockerfile

Dockerfile은 Image의 생성 과정을 기록한 Image를 만들기 위한 파일입니다.

![image](/images/docker-image/dockerfile.png)

설치 해야하는 패키지, 소스, 명령어, 환경 변수 및 설정 등을 기록하는데,   
Image의 Layer 구조를 따라 순서대로 작성되기 때문에   
생성 될 Image의 기능을 쉽게 파악할 수 있습니다.

* 코드 형태로 되어 버전 관리도 용이합니다.

```dockerfile
FROM    ubuntu:20.04

ARG     USERNAME=Goomba
ARG     PASSWORD=0000

USER    root

RUN     apt-get update
...
```

