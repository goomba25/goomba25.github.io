---
title: "[GitHub 블로그] 카테고리와 날짜 보이게 하기"
excerpt: "_includes/archive-single.html 수정하여 카테고리와 날짜 보이게 하기"

categories:
  - Blog
tags:
  - [Blog, jekyll,Minimal-Mistakes, GitHub, Git]

toc: true
toc_sticky: true

last_modified_at: 2021-07-08
---

일반적인 블로그 처럼 GitHub 블로그도   
포스트(게시글)의 카테고리 분류와 작성일을 보이게 할 수 있다.

> minimal-mistakes 테마를 사용한다는 전제하에 작성했다.

<br/>

## /_includes/archive-single.html 수정

해당 파일을 찾아 \</h2> 태그가 끝나는 부분을 찾아보자.

{% highlight html %}
{% raw %}
    </h2>
    {% include page__meta.html type=include.type %}
    {% if post.excerpt %}<p class="archive__item-excerpt" itemprop="description">{{ post.excerpt | markdownify | strip_html | truncate: 160 }}</p>{% endif %}
  </article>
</div>
{% endraw %}
{% endhighlight %}

\</h1> 이 끝나는 곳에 아래와 같이 입력해준다.

{% highlight html %}
{% raw %}
  {% if post.categories[0] != null %}
    <p class="archive__item-excerpt"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%m/%d/%Y" }} &nbsp; <i class="far fa-folder-open"></i> {{ post.categories }}</p>
  {% else %}
    <p class="archive__item-excerpt"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%m/%d/%Y" }}
  {% endif %}
{% endraw %}
{% endhighlight %}

___

## 카테고리, 날짜 선택

카테고리 또는 날짜 중 선택하여 보여줄 수도 있다.

* 카테고리만 보여주기

{% highlight html %}
{% raw %}
{% if post.categories[0] != null %}
	<p class="archive__item-excerpt"><i class="far fa-folder-open"></i> {★{ post.categories }}</p>
{% endif %}
{% endraw %}
{% endhighlight %}

* 날짜만 보여주기

{% highlight html %}
{% raw %}
{% if post.categories[0] != null %}
	<p class="archive__item-excerpt"><i class="far fa-folder-open"></i> {★{ post.categories }}</p>
{% endif %}
{% endraw %}
{% endhighlight %}

## 태그 보이기

선택에 따라 태그를 보여줄 수도 있다.   

아래의 스크립트를 넣어주면 된다.

{% highlight html %}
{% raw %}
  {% if post.tags[0] != null %}
		<p class="archive__item-excerpt"><i class="far fa-tags"></i> {{ post.tags }} </p>
	{% endif %}
{% endraw %}
{% endhighlight%}