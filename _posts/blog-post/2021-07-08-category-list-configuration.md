---
title: "[GitHub 블로그] 카테고리 & 태그 목록 구성하기"
excerpt: "카테고리와 태그를 클릭하면 해당 목록을 띄우게 하기"

categories:
  - Blog
tags:
  - [Blog, jekyll,Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-08
---

> minimal-mistakes 테마를 사용한다는 전제하에 작성했다.

<br/>

## 1. 포스트의 카테고리 & 태그 표시

포스트의 markdown 머리글 작성 시 categories 와 tags 를 사용하여 해당 항목을 적어준다.   

```
---
title: ""
excerpt: ""

categories:
  - Blog
tags:
  - [Blog, jekyll,Minimal-Mistakes GitHub, Git]
---
```

포스팅된 글의 마지막에 아래와 같이 설정된 것을 볼 수 있다.

![images](/images/Screenshot1.png)

하지만 카테고리와 태그를 클릭하면 404 Not Found 페이지가 뜬다.   
링크로 연결된 페이지가 아직 없기 때문이다.

<br/>

## 2. 카테고리 페이지 등록

_pages/category-archive.md 파일을 생성한다.   
_pages 폴더는 초기 생성 시에 존재하지 않으므로 직접 만든다.

그런 뒤에 아래의 내용을 적어준다.

```
---
title: "Posts by Category"
layout: categories
permalink: /categories/
author_profile: true
---
```

layout을 categories를 지정했다.   
permalink는 _config.yml의 category_archive설정의 path와 동일하다.

이렇게 하면 모든 게시글이 카테고리의 분류로 나뉘어 보여진다.

## 3. 태그 페이지 등록

_pages/tag-archive.md 파일을 생성하고 아래의 내용을 적어준다.

```
---
title: "Posts by Tag"
permalink: /tags/
layout: tags
author_profile: true
---
```

카테고리 페이지와 동일하게 모든 게시글이 태그의 분류로 나뉘어진다.