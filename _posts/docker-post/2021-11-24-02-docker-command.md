---
title: "[Docker] 기본 명령어"
excerpt: ""

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2021-11-24
---

간단하게 자주 사용하는 명령어 위주로 작성했습니다.

## 이미지

<details markdown="1">
<summary>이미지 목록 확인하기 [images] </summary>

```bash
$ docker images [option] [repository[:tag]]
```

</details>

<details markdown="1">
<summary>이미지 가져오기 [pull] </summary>

```bash
$ docker pull [option] name[:tag|@digest]
```

</details>

<details markdown="1">
<summary>이미지 삭제하기 [rmi] </summary>

```bash
$ docker rmi [option] image [image...]
```

</details>

## 컨테이너

<details markdown="1">
<summary>컨테이너 목록 확인하기 [ps] </summary>

```bash
$ docker ps [option]
```

* `-a`, `--all`: 모든 컨테이너 목록을 확인합니다. (종료 상태 컨테이너 포함)

</details>

<details markdown="1">
<summary>컨테이너 실행하기 [run] </summary>

```bash
$ docker run [option] container
```

* `-i`, `--interactive` : 사용자 입력 상태로 구성
* `-t`, `--tty` : 가상 tty 환경 에뮬레이션을 사용하도록 구성
* `-d`, `--detach` : 백그라운드에서 동작하도록 구성
* `-h`, `--hostname` : 해당 컨테이너의 hostname을 부여
* `-v`, `--volume` : 저장소 마운트 기능(host의 저장소와 docker의 저장소를 연결)

* `—name` : 컨테이너의 이름을 부여

</details>

<details markdown="1">
<summary>컨테이너 접근하기 [attach] </summary>

```bash
$ docker attach container
```

* 다른 터미널을 통해 같은 컨테이너로 `attach`할 경우   
동일한 내용의 복사된 화면이 출력된다. (미러링?)

</details>

<details markdown="1">
<summary>컨테이너 실행하기 [exec] </summary>

```bash
$ docker exec [option] container command [arg...]
```

* `-i` : 사용자 입력 상태 구성
* `-t` : tty 환경 구성

</details>

<details markdown="1">
<summary>컨테이너 시작하기 [start] </summary>

```bash
$ docker start [option] container [container...]
```

* `start`는 이미 만들어진, 종료된 컨테이너를 시작할 수 있다.

</details>

<details markdown="1">
<summary>컨테이너 종료하기 [stop] </summary>

```bash
$ docker stop [option] container [container...]
```

</details>

<details markdown="1">
<summary>컨테이너 삭제하기 [rm] </summary>

```bash
$ docker rm [option] container [container...]
```

</details>

<details markdown="1">
<summary>컨테이너 로그 확인하기 [logs] </summary>

```bash
$ docker logs [option] container
```

* `-t`, `--timestamps` : time 정보를 함께 출력

</details>
