---
title: "[Ubuntu] Server에서 "
excerpt: ""
classes: wide

categories:
  - Etc
tags:
  - [Window, Ubuntu]

last_modified_at: 2023-01-08
---

**Ubuntu Server**를 사용하다보니 유저를 추가하고 나서 재부팅할 때마다 Root를 직접 로그인 해줘야 하는 불편함이 있었습니다.

나중에도 사용할 일이 있을거같아서 정리해봅니다.

단순하게 아래의 경로에 있는 파일을 수정하면 됩니다.

```bash
$ vi /etc/systemd/system/getty.target.wants/getty@tty1.service
```

해당 파일에 `[Service]` 내용을 보면   
`ExecStart=-/sbin/...` 와 같이 적혀있는데, 이 내용을 아래와 같이 바꿔줍니다.

```bash
ExecStart=-/sbin/agetty --noissue --autologin username %I $TERM
...
```

여기서 username은 본인이 로그인 할 유저명입니다.

[참고](https://davi06000.tistory.com/23)