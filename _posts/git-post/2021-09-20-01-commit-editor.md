---
title: "[Git] Commit editor 변경하기"
excerpt: "Git의 에디터를 변경하여 커밋 메세지를 입력해보자"

categories:
  - Git
tags:
  - [Git, GitHub]

toc: true
toc_sticky: true

last_modified_at: 2021-09-20
---

> `git`을 터미널로 `commit`하면 `-m`을 통해 커밋 메세지를 작성할 수 있다.

터미널에서는 한 줄로 작성하는 것이 기본으로 되어있다.

따라서 이를 두 줄 이상으로 작성하고자 할 때는   
`git`의 커밋 에디터를 지정하여 편리하게 메세지를 작성할 수 있다.

* 회사나 단체에 따라 커밋 메세지를 작성하는 룰(Rules)을 가지는데,   
그에 따라 두 줄 이상의 커밋 메세지를 요구한다.

* 터미널이 아닌 특정 어플리케이션을 사용하는 것도 방법인 듯 하다.

* 본인은 `vi`를 사용해왔는데, 이번에는 기능이 더 추가된 `vim`을 사용하려고 한다.   
(그리고 더 이쁘게 표시된다.)

___


```shell
git config --global core.editor "vim"

//  or

git config --global core.editor vim
```

에디터를 지정한 후에는 `git commit` 명령어를 입력하면   
알아서 에디터가 열리게 된다.   
(`-m`을 하지 않는다.)