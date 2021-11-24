---
title: "[Docker] 간단한 Ubuntu 컨테이너 다루기"
excerpt: ""

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2021-11-24
---

Docker를 설치했다면 기본적인 명령어를 통해 간단하게 컨테이너를 다룰 수 있습니다.

Ubuntu 20.04를 설치/운용하며 맛만 봅니다.

## Ubuntu 이미지 내려받기

먼저 Ubuntu20.04 이미지를 `pull` 명령어를 사용하여 가져옵니다.   

```bash
$ docker pull ubuntu:20.04
```

이때 가져온 이미지는 자동으로 "Docker Hub"에서 가져오는 것으로 되어있습니다.   
필요하다면 이미지 명 앞에 URL을 표기할 수 있습니다.

또한 특정 버전을 가져오고 싶다면, 위와 같이 버전명을 표기할 수 있습니다.   
(표기하지 않으면 현재 최신 버전을 가져옵니다. `:latest`)

## image 확인하기

```bash
$ docker images
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
ubuntu       20.04     ba6acccedd29   5 weeks ago   72.8MB
```

`pull`을 이미지를 제대로 가져왔는지 확인합니다.

해당 이미지의 `ID`와 최근 생성 날짜, 사이즈를 보여줍니다.

## container 실행하기

이미지를 통해 컨테이너를 생성해봅시다.

```bash
$ docker run ubuntu:20.04
```

분명 Docker를 실행하는 명령이지만 아무런 것도 볼 수 없습니다.

이유는 옵션을 주지 않았기 때문인데, `-it` 옵션을 함께 입력해봅니다.   
그러면 해당 컨테이너의 터미널이 열리는 것을 볼 수 있습니다.

```bash
$ docker run -it ubuntu:20.04
root@6e419a15faf7:/#
```

만약 해당 터미널을 종료하면 컨테이너도 함께 종료됩니다.

## container 확인하기

```bash
$ docker ps

CONTAINER ID   IMAGE          COMMAND   CREATED              STATUS              PORTS     NAMES
6e419a15faf7   ubuntu:20.04   "bash"    About a minute ago   Up About a minute             mystifying_gagarin
```

방금 실행중인 컨테이너가 있는지 확인할 수 있습니다.
컨테이너 종료 후 `docker ps`를 하면 컨테이너가 뜨지 않습니다.

주의할 점은 컨테이너를 종료한다고 컨테이너가 사라지지는 않습니다.   
`-a`옵션을 함께 입력하면 종료되어 멈춰있는 컨테이너가 보입니다.

```bash
$ docker ps -a
CONTAINER ID   IMAGE          COMMAND   CREATED         STATUS                     PORTS     NAMES
6e419a15faf7   ubuntu:20.04   "bash"    3 minutes ago   Exited (0) 2 seconds ago             mystifying_gagarin
fc8fc299e1fa   ubuntu:20.04   "bash"    8 minutes ago   Exited (0) 4 minutes ago             mystifying_yalow
```

위의 순서대로 실행했다면 2개의 컨테이너가 종료된 것을 볼 수 있습니다.   
볼 수 있듯, 컨테이너는 종료와 소멸은 다른 개념입니다.   
(물론 종료와 함께 소멸하도록 옵션을 줄 수 있습니다.)

## 실행 중인 container 접근하기

처음에는 하나의 터미널을 통해 컨테이너에 접근하게 됩니다.   
다른 터미널을 열고 컨테이너의 터미널을 여는 방법이 존재합니다.

```bash
$ docker exec -it ubuntu:20.04
```

해당 명령어를 통해 동작하는 컨테이너에 또 다른 터미널을 열 수 있습니다.

## container 삭제하기

위에서 종료되어 있는 컨테이너들은 결국 메모리를 차지하고 있습니다.   
따라서 불필요하다면 삭제해주는 것이 좋습니다.

```bash
$ docker rm mystifying_gagarin
mystifying_gagarin

$ docker ps -a
CONTAINER ID   IMAGE          COMMAND   CREATED          STATUS                      PORTS     NAMES
fc8fc299e1fa   ubuntu:20.04   "bash"    14 minutes ago   Exited (0) 11 minutes ago             mystifying_yalow
```

해당 컨테이너의 이름을 통해 삭제합니다.

## image 삭제하기

같은 이야기지만 이미지 또한 불필요하다면 삭제할 수 있습니다.

```bash
$ docker rmi ubuntu:20.04 
Untagged: ubuntu:20.04
Untagged: ubuntu@sha256:626ffe58f6e7566e00254b638eb7e0f3b11d4da9675088f4781a50ae288f3322
Deleted: sha256:ba6acccedd2923aee4c2acc6a23780b14ed4b8a5fa4e14e252a23b846df9b6c1
Deleted: sha256:9f54eef412758095c8079ac465d494a2872e02e90bf1fb5f12a1641c0d1bb78b
```

이때 실행중인(삭제되지 않고 존재하는) 컨테이너가 있는 경우 삭제할 수 없습니다.

```bash
$ docker images
REPOSITORY   TAG       IMAGE ID   CREATED   SIZE
```

해당 이미지가 삭제됩니다.

이러한 방법들로 간단하게 Docker를 사용할 수 있다는 것 정도만 알고 넘어가면 좋을 것 같습니다.