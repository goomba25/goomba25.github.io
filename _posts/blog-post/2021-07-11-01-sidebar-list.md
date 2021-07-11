---
title: "[GitHub 블로그] 사이드바에 목록 띄우기"
excerpt: "사이드바에 카테고리 목록을 원하는 이름으로 띄워보자."

categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-11
---

> Ansohxxn 님의 GitHub 블로그를 참조했습니다.   
> [https://ansohxxn.github.io/blog/category/](https://ansohxxn.github.io/blog/category/)

앞서 포스팅 시 카테고리를 다음과 같이 분류했다.

```yml
categories:
  - Blog
tags:
  - [Blog, jekyll, Minimal-Mistakes, GitHub, Git]
```

이전 포스팅에서 카테고리를 분류하는 페이지를 만든적이 있다.   
하지만 해당 페이지에서는 모든 카테고리 항목을 보여준다.   
때문에 해당 카테고리만 보여지는 페이지를 구성해보자.

## 같은 카테고리의 글을 모아두는 페이지 만들기

먼저 해당 카테고리의 글만 모이는 페이지를 만들어보자.

먼저 _pages 폴더 안에 `category-blog.md` 파일을 만들었다.   
이 마크다운 파일에 `Blog` 카테고리에 속한 글들을 보여주는 페이지에 대하여 작성할 것이다.   
(이름은 본인이 알아볼 수 있는 것으로 하면 된다.)

그리고 아래와 같이 작성했다.

```md
---
title: "GitHub 블로그 커스텀하기"
layout: archive
permalink: /categories/Blog
author_profile: true
sidebar_main: true
---

{% raw %}
{% assign posts = site.categories.Blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endraw %}
```

이 페이지의 설정은 아래와 같다.

* 이 페이지의 이름은 "GitHub 블로그 커스텀하기" 이다.
* 이 페이지의 layout 은 `archive` 이다.   
  * minimal-mistake 의 기본 제공되는 카테고리, 태그 레이아웃의 방식이 `archive` 라고 한다.

* 이 페이지의 주소(permalink)는 /categories/Blog 이다.   
  * 상대 주소이기 때문에 이 페이지 주소는 "자신의 블로그 주소/categories/Blog" 이다.

* author_profile 은 자신의 프로필을 보일지에 대한 여부이다.

* sidebar_main 은 더 아래에서 다룬다.

* 해당 마크다운의 내용은 이러하다.

```md
{% raw %}
{% assign posts = site.categories.Blog %}
{% for post in posts %} {% include archive-single.html type=page.entries_layout %} {% endfor %}
{% endraw %}
```

`_include/archive-single.html` 에서 카테고리, 태그 등을 모아두는 역할을 하는데,   
그 곳에 포함시킨다는 이야기 같다.

이 페이지의 모습은 아래와 같다.

![category-image](/images/Screenshot_category.png)


## 해당 페이지를 사이드바에 띄우기

`_include/nav_list_main` 이라는 파일을 만들어준다.   
(이 파일은 어떠한 확장자명도 가지지 않는 파일이다.)

* _include 폴더에 만든 이유는 사이드바를 담당하는 _include/sidebar.html 문서에서 이를 포함시켜 화면에 나타내기 위해서라고 한다.   
sidebar.html 에 작성해도 되지만 너무 길어지기 때문에 따로 만들었다고 한다.

```html
{% raw %}
{% assign sum = site.posts | size %}
{% endraw %}

<nav class="nav__list">
  <input id="ac-toc" name="accordion-toc" type="checkbox" />
  <label for="ac-toc">{{ site.data.ui-text[site.locale].menu_label }}</label>
  <ul class="nav__items" id="category_tag_menu">
      <!--전체 글 수-->
      <li>
            📂 <span style="font-family:'Noto Sans KR';">전체 글 수</style> <span style="font-family:'Noto Sans KR';">{{sum}}</style> <span style="font-family:'Noto Sans KR';">개</style> 
      </li>
      <li>
         <!--span 태그로 카테고리들을 크게 분류-->
        <span class="nav__sub-title">etc</span>
            <ul>
                {% for category in site.categories %}
                    <!--/categories/Blog 카테고리일 경우-->
                    {% if category[0] == "Blog" %}
                        <!--Blog 라는 이름으로 사이드 바 목록에 추가되고-->
                        <!--category[1].size 로 해당 카테고리를 가진 글의 개수 표시해준다.-->
                        <li><a href="/categories/Blog" class="">Blog ({{category[1].size}})</a></li>
                    {% endif %}
                {% endfor %}
            </ul>
      </li>
  </ul>
</nav>
```

## _include/sidebar.html 에 내용 반영하기

sidebar.html 에 nav_list_main 의 내용을 반영한다.

```html
{% raw %}
{% if page.author_profile or layout.author_profile or page.sidebar %}
  <div class="sidebar sticky">
  {% if page.author_profile or layout.author_profile %}{% include author-profile.html %}{% endif %}
  {% if page.sidebar %}
    {% for s in page.sidebar %}
      {% if s.image %}
        <img src="{{ s.image | relative_url }}"
             alt="{% if s.image_alt %}{{ s.image_alt }}{% endif %}">
      {% endif %}
      {% if s.title %}<h3>{{ s.title }}</h3>{% endif %}
      {% if s.text %}{{ s.text | markdownify }}{% endif %}
      {% if s.nav %}{% include nav_list nav=s.nav %}{% endif %}
    {% endfor %}
    {% if page.sidebar.nav %}
      {% include nav_list nav=page.sidebar.nav %}
    {% endif %}
  {% endif %}

  <!-- 추가 내용 -->
  {% if page.sidebar_main %}
    {% include nav_list_main %}
  {% endif %}
  <!-- 여기까지 -->

  </div>
{% endif %}
{% endraw %}
```

이를 통해 해당 카테고리의 글을 보여주는 페이지에서   
sidebar_main: true 를 해주면 사이드바를 활성화 시킨다.

## _config.yml 에 sidebar 추가하기

_config.yml 파일에 `sidebar_main: true` 를 추가하면   
블로그 전체 페이지에서도 사이드바가 활성화된다.

```yml
# Defaults
defaults:
  # _posts
  - scope:
    ...
    values:
      ...
      sidebar_main: true
```

## 안될 경우

메인 페이지에 사이드바가 방영이 안될 경우   
메인 페이지를 담당하는 index.html 의 머릿말에 `sidebar_main: true` 를 추가해주면 된다.