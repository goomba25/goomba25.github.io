---
title: "[GitHub 블로그] Jekyll 코드블럭에서 liquid 코드 그대로 출력하기"
excerpt: "liquid 코드를 코드블럭에서 그대로 출력해보자"

categories:
  - Blog
tags:
  - [Blog, jekyll, GitHub, liquid]

toc: true
toc_sticky: true

last_modified_at: 2021-07-08
---

## liquid 코드 입력

코드블럭 내에서 liquid 문법을 적으면 markdown 으로   
변환하는 과정에서 liquid 코드를 실행시켜 버린다.   
따라서 코드블럭에서 정상적으로 텍스트를 확인할 수 없다.

이때 사용 가능하게 하는 방법이 raw 메서드 이다.   
{% raw %} {% raw %} {% endraw %} 와 {% raw %} {% endraw %} {% endraw %} 로 코드블럭을 감싸면   
범위 안에 있는 liquid 코드가 실행되지 않고 텍스트로 출력된다.

```html
{%raw%}
{% if post.tags[0] != null %}
  <p class="archive__item-excerpt"><i class="far fa-tags"></i> {{ post.tags }} </p>
{% endif %}
{%endraw%}
```