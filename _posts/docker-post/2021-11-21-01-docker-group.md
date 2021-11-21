---
title: "[Docker] sudo 없이 docker 사용하기"
excerpt: "사용자 계정을 추가해보자."

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2021-11-21
---

Docker 명령어를 입력하려면 기본적으로 `sudo`를 사용합니다..

매번 `sudo`를 사용하는 것은 번거로운 일인데,   
해결책으로 현재 사용자를 docker 그룹에 등록해주면   
`sudo`없이 Docker를 사용할 수 있습니다..

```bash
$ sudo usermod -aG docker ${USER}
```

* `-a (--append)` : 해당 그룹에 계정을 추가한다.
* `-G (--groups)` : 그룹을 등록한다.

즉, 'docker'라는 그룹에 ${USER}를 추가해줍니다.   
(${USER}는 본인 계정을 입력합니다.)

해당 명령 후 재 부팅을 하거나 시스템을 재가동 해주면   
Docker를 `sudo`없이 사용할 수 있습니다.

```bash
$ sudo reboot

// or

$ sudo systemctl reboot
```