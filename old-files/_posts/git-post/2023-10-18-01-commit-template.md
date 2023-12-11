---
title: "[Git] 편리한 Commit Template"
excerpt: ""

categories:
  - Git
tags:
  - [Git, GitHub]

last_modified_at: 2023-10-18
---

`git`을 사용하면서 프로젝트를 진행하게 되면,   
팀원들과 **Commit Rule**을 정하고 `commit` 메세지를 작성하게 됩니다.

`commit`을 할 때마다 **Commit Rule**을 기억해서 작성할 수도 있겠지만,   
조금 긴 텍스트일 경우 번거로운 일일 수 있습니다.

이 때 사용할 수 있는 기능이 `commit template`기능입니다.

### 적용 방법

1. 사용할 Commit 메세지의 Template를 텍스트 파일로 생성합니다.

  * 예시 (*git_commit_template.txt*)
    ```text
    ###############
    [Title] Title
    
    [Description]
    - Description 1
    - Description 2
    - Description 3

    ...
    ###############
    ```

2. git config 적용 및 확인

  * 생성된 template 파일을 적당한 곳에 위치 시킨 후에 적용합니다.
    ```bash
    $ git config --global commit.template ~/${PATH}/git_commit_template.txt
    $ git config --list

    ...
    commit.template=/home/${USER}/${PATH}/git_commit_template.txt
    ...
    ```

이후에는 `git commit`으로 메세지를 입력하려고 하면   
적용된 template 파일의 내용이 선입력되어 나타나게 됩니다.