---
title: "[XML] 레이아웃 - LinearLayout"
excerpt: "기본적인 레이아웃인 LinearLayout을 알아보자"

classes: wide

categories:
  - XML
tags:
  - [Android, XML]

last_modified_at: 2022-09-18
---

## LinearLayout

<mark style="background-color: #3e3e3e; color: orange;">LinearLayout</mark>은 자식으로 가지는 뷰를 수평(horizontal) 또는 수직(vertical)로 정렬하는 레이아웃입니다.

일반적으로 위에서 아래, 오른쪽에서 왼쪽으로 설정됩니다.

```xml
<LinearLayout
    ...
    orientaion="vertical">

    <View
        android:layout_gravity="center"
        ... />

    <View
        ... />

    <View
        ... />

</LinearLayout>
```

### 레이아웃 (부모 컴포넌트)

* orientaion : 레이아웃에서 자식 뷰의 정렬을 결정합니다. (수직 또는 수평)
* gravity : 레이아웃의 전체 내부 정렬을 결정합니다.
* weightSum : 전체 비율의 총합을 결정합니다. (내부 뷰의 layout_weight와 연관 있습니다.)

### 자식 뷰 (자식 컴포넌트)

* layout_gravity : 자식 뷰에서 레이아웃에서의 정렬을 결정합니다. 
* gravity : 뷰 자체의 정렬을 결정합니다.
* layout_weight : 뷰가 차지하는 비율을 결정합니다.   
  수직이라면 height를 0dp로, 수평이라면 width를 0dp로 해줍니다. (비율이기 때문)

### 예시

```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center"
    android:weightSum="10">

    <TextView
        android:layout_width="100dp"
        android:layout_height="0dp"
        android:layout_weight="2"
        android:background="#FFEB3B"
        android:text="HELLO"
        android:textSize="24dp"
        android:gravity="bottom"/>

    <TextView
        android:layout_width="100dp"
        android:layout_height="0dp"
        android:layout_weight="3"
        android:background="#F44336"
        android:text="HELLO"
        android:textSize="24dp"
        android:gravity="right |center_vertical"/>

    <TextView
        android:layout_width="100dp"
        android:layout_height="0dp"
        android:layout_weight="1"
        android:background="#4CAF50"
        android:text="HELLO"
        android:textSize="24dp"
        android:gravity="center"/>

</LinearLayout>
```

![image](/images/xml-image/linearlayout.png)

> 간단하게 사용하기 좋지만 개인적으로 ConstraintLayout이 있어서 자주 사용하지는 않는 편입니다.