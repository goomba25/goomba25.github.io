---
title: "[XML] 레이아웃 - RelativeLayout"
excerpt: "RelativeLayout을 알아보자"

classes: wide

categories:
  - XML
tags:
  - [Android, XML]

last_modified_at: 2022-09-19
---

## RelativeLayout

<mark style="background-color: #3e3e3e; color: orange;">RelativeLayout</mark>은 "상대적"으로 뷰를 배치하는 레이아웃입니다.   
특정 기준을 잡고 뷰를 배치하는 레이아웃입니다.

### 레이아웃 기준

|Attribute|설명|
|--|--|
|layout_centerInParent|부모 레이아웃의 정중앙에 위치|
|layout_centerHorizontal|부모 레이아웃의 가로축 중앙에 위치|
|layout_centerVertical|부모 레이아웃의 세로축 중앙에 위치|
|layout_alignParentTop|부모 레이아웃의 상단에 위치|
|layout_alignParentBottom|부모 레이아웃의 하단에 위치|
|layout_alignParentRight|부모 레이아웃의 우측에 위치|
|layout_alignParentLeft|부모 레이아웃의 좌측에 위치|
|layout_alignParentStart|부모 레이아웃의 시작에 위치|
|layout_alignParentEnd|부모 레이아웃의 끝에 위치|

<details markdown="1">
<summary> 부모 레이아웃 기준 예시 </summary>

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <TextView
        android:background="#4CAF50"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_alignParentTop="true"/>

    <TextView
        android:background="#4CAF50"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_alignParentBottom="true"/>

    <TextView
        android:background="#4CAF50"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_alignParentEnd="true"
        android:layout_alignParentBottom="true"/>

    <TextView
        android:background="#4CAF50"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_alignParentLeft="true"/>

    <TextView
        android:background="#4CAF50"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_alignParentRight="true"/>

    <TextView
        android:background="#E91E63"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerInParent="true"/>

    <TextView
        android:background="#E91E63"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerHorizontal="true"/>

    <TextView
        android:background="#E91E63"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerVertical="true"/>

</RelativeLayout>
```

![image](/images/xml-image/relative_parent.png)

</details>


### 특정 뷰 기준

뷰를 기준으로 상대적으로 위치시킵니다.   

* 뷰를 기준으로 움직이려면 id가 부여되어 있어야 합니다.

|Attribute|설명|
|--|--|
|layout_above|특정 뷰의 상단 선상에 위치|
|layout_below|특정 뷰의 하단 선상에 위치|
|layout_toTopOf|특정 뷰의 상단에 위치|
|layout_toBottomOf|특정 뷰의 하단에 위치|
|layout_toRightOf|특정 뷰의 우측에 위치|
|layout_toLeftOf|특정 뷰의 좌측에 위치|
|layout_toStartOf|특정 뷰의 시작에 위치|
|layout_toEndOf|특정 뷰의 끝에 위치|

<details markdown="1">
<summary> 특정 뷰 기준 예시 </summary>

* 여기서는 레이아웃 기준과 혼합하여 사용해봤습니다.

```xml
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent" >

    <TextView
        android:id="@+id/center"
        android:background="#F44336"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerInParent="true"/>

    <TextView
        android:background="#8BC34A"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerHorizontal="true"
        android:layout_below="@+id/center"/>

    <TextView
        android:background="#03A9F4"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_toEndOf="@+id/center"
        android:layout_centerVertical="true" />

    <TextView
        android:background="#FFEB3B"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerHorizontal="true"
        android:layout_above="@+id/center"/>

    <TextView
        android:background="#673AB7"
        android:layout_width="50dp"
        android:layout_height="50dp"
        android:layout_centerVertical="true"
        android:layout_toLeftOf="@+id/center"/>

</RelativeLayout>
```

![image2](/images/xml-image/relative_view.png)

</details>

