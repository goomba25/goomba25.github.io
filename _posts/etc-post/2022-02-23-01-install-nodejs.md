---
title: "[Ubuntu] Node.js 설치"
excerpt: "심볼릭 링크 생성 방법"

classes: wide

categories:
  - Etc
tags:
  - [Ubuntu, Nodejs]

last_modified_at: 2022-02-23
---

Ubuntu에서 node.js를 설치하는 방법입니다.

1. Node.js페이지에서 LTS 버전 파일을 다운로드합니다.
2. 다운로드된 파일(`*.tar.xz`)을 `/usr/local/lib/`위치로 이동시킵니다.
3. 이동시킨 파일의 압축을 풀어줍니다.
  ```bash
  $ sudo xz -d node-vxx.xx.x-linux-x64.tar.xz
  $ sudo tar xvf node-vxx.xx.x-linux-x64.tar
  ```
4. nodejs를 어떤 경로에서도 사용할 수 있도록 심볼릭 링크로 설정해줍니다.
  ```bash
  $ ln -s /usr/local/lib/node-vxx.xx.x-linux-x64/bin/* /usr/local/bin/
  ```
5. nodejs가 제대로 설치되어있는지 확인합니다.
  ```bash
  $ node -v
  $ npm -v
  ```
