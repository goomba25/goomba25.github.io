---
title: "[Docker] Docker 설치 (MacOS)"
excerpt: ""

categories:
  - Docker
tags:
  - [Docker]

toc: true
toc_sticky: true

last_modified_at: 2022-11-11
---

Mac에서 Docker를 설치하는 방법은 간단합니다.   
또한 간단하게 파일로 설치도 가능합니다.

### 파일 설치하기

[Install-Mac](https://docs.docker.com/desktop/install/mac-install/)

위의 사이트에서 각 Chip에 맞게 Docker파일을 다운로드 합니다.   
그 후 설명에 따라 진행하면 됩니다. (완전 간단)

### Homebrew 설치하기

Homebrew로도 간단하게 설치가 가능합니다.

여기서 방법이 두 가지로 나뉠 수 있습니다.

1. brew install

  ```bash
  $ brew install docker
  ```

  이 방법으로 Docker를 설치하면 추가적으로 `compose`, `machine`등의 추가 설치가 필요합니다.   
  또한 서버 실행 시 Host에서 접근할 경우 포트 포워딩을 해줘야 하는 불편함이 있습니다.

2. brew install --cask 

  ```bash
  $ brew install --cask docker
  ```

  이 방법으로 진행하면 `Docker Desktop on Mac`로 설치하며, `compose`, `machine`등을 함께 설치합니다.   
  또한 Host에서 접근할 때 포트포워딩에 대한 불편함이 없습니다.

  만약 cask가 없다면 설치하면 됩니다.

  ```bash
  $ brew install cask
  ```