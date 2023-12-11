---
title: "[XML] XML을 Java 또는 Kotlin에서 사용하기"
excerpt: ""
classes: wide

categories:
  - XML
tags:
  - [Android, XML]

last_modified_at: 2022-10-17
---

기본적으로 빈 화면이 아닌 안드로이드 프로젝트를 생성하면 자동으로 `MainActivity`라는 이름의 java 혹은 kotlin 파일과   
`activity_main.xml` 파일이 함께 만들어집니다.

일반적으로 xml에 기본적인 레이아웃을 구성(정적)하고, 소스 코드에서 제어(동적)하는 방식으로 사용합니다.

### setContentView

java/kotlin 모두 `setContentView`라는 메서드에 `activity_main.xml`레이아웃을 지정하여   
해당 레이아웃과 Activity를 연결해줍니다.

* Java

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
```

* Kotlin

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
}
```

### findViewById

연결된 레이아웃의 뷰를 코드 상에서 제어하기 위해 객체로 가져와야 합니다.

Java/Kotlin에서는 동일하게 `findViewById`를 통해서 레이아웃의 뷰를 불러올 수 있습니다.   
이는 id가 부여된 상황에서 가능한 방법이므로 xml 내에 뷰를 생성하고 id를 부여했습니다.

* xml 파일의 ImageView

```xml
<ImageView
    android:id="@+id/image_view"
    ...
    />
```

* java의 경우

```java
ImageView imageView = findViewById(R.id.image_view);
imageView.setImageDrawable(...);
```

* kotlin의 경우

```kotlin
val imageView : ImageView = findViewById(R.id.image_view)
imageView.setImageDrawable(...)
```

이러한 방법으로 뷰를 제어할 수 있게 됩니다.

xml을 통해 기본적인 틀을 만들고, activity 또는 fragment 내에서 해당 레이아웃에 생기를 불어 넣어준다고 볼 수 있습니다.

하지만 현재 Android에서는 binding을 사용하는 추세이며, 생성 시 binding이 사용된 모습을 확인 할 수 있습니다.