---
title: "[XML] 레이아웃 - FrameLayout"
excerpt: "FrameLayout"

classes: wide

categories:
  - XML
tags:
  - [Android, XML]

last_modified_at: 2022-09-19
---

## FrameLayout

<mark style="background-color: #3e3e3e; color: orange;">FrameLayout</mark>은 말 그대로 '액자'라는 의미를 가진 레이아웃입니다.   
자식으로 추가된 뷰들이 차곡차곡 쌓이는 형태로 보여줄 수 있습니다.

* 추가적으로 RelativeLayout도 동일하게 쌓이는 형태로 보여줄 수 있습니다.
* 아주 작은 차이지만 FrameLayout을 사용하는 것이 좀 더 빠르다고 합니다.

```xml
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="30dp">

    <TextView
        android:id="@+id/center"
        android:background="#F44336"
        android:layout_width="250dp"
        android:layout_height="250dp"/>

    <TextView
        android:background="#8BC34A"
        android:layout_width="200dp"
        android:layout_height="200dp"/>

    <TextView
        android:background="#03A9F4"
        android:layout_width="150dp"
        android:layout_height="150dp"/>

    <TextView
        android:background="#FFEB3B"
        android:layout_width="100dp"
        android:layout_height="100dp"/>

    <TextView
        android:background="#673AB7"
        android:layout_width="50dp"
        android:layout_height="50dp"/>
</FrameLayout>
```

![image](/images/xml-image/framelayout.png)
