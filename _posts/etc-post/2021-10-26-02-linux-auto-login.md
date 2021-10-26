---
title: "[Ubuntu] Ubuntu 16.04 자동 로그인"
excerpt: ""

categories:
  - Etc
tags:
  - [Ubuntu, Linux]

last_modified_at: 2021-10-26
---

Ubuntu 16.04 PC를 계정에 비밀번호 없이 자동로그인 되도록 만들 수 있다.   
물론 GUI 를 통해 system setting 에서 변경이 가능하다.

이번에는 config 파일을 통해 설정해준다.

`/etc/lightdm`폴더에  `lightdm.conf`파일을 생성한다.

그리고 다음 내용을 작성한다.

```
[SeatDefault]
autologin-user=계정이름

//  또는

[Seat:*]
autologin-user=계정이름
```

재부팅하면 로그인화면 없이 계정으로 로그인되는 것을 볼 수 있다.

ps.

여담으로 부팅 시 root 권한으로 자동로그인 되도록 하려면   
계정 이름을 root 로 변경해주면 된다.

___

아직 사용해보지는 않았지만 필요한 일이 있을 수도 있으므로 적어놓는다.

`CLI` 를 사용하는 Linux에서 자동로그인은 조금 다르다고 한다.

먼저 로그인 해준 뒤에 아래의 명령어를 입력한다.

```
sudo systemctl edit getty@tty1.service
```

빈 에디터 창이 뜨게 되는데,   
이 창에 아래와 같은 내용을 입력 후에   
`Ctrl + x`를 눌러 저장하기를 선택 후 `y` 를 눌러 완성해준다.

```
[Service]
ExecStart=
ExecStart=-/sbin/agetty --noissue --autologin myusername %I $TERM
Type=idle
```

이 과정이 끝나고 재부팅하면 자동로그인이 된다고 한다.