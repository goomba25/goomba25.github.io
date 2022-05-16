---
title: "[Flutter] 상태관리 - MultiProvider"
excerpt: "여러 Provider를 사용하는 방법"
classes: wide
toc: true
toc_sticky: true
categories:
  - Flutter
tags:
  - [Flutter]
last_modified_at: 2022-05-16
---

# MultiProvider

기존의 Provider는 하나밖에 사용할 수 없습니다.   
그렇다고 하나의 Provider 내에 여러 상태값을 가지고 운용을 하는것은 난잡해지기 쉽고, 관리가 어려울 수 있습니다.

이때 사용할 수 있는 것이 <mark style="background-color: #2e2e2e; color: orange;">MultiProvider</mark>입니다.   
<mark style="background-color: #2e2e2e; color: orange;">MultiProvider</mark>를 사용함으로 여러 Provider를 생성하고 관리할 수 있습니다.

예를 들어 2 개의 Provider를 생성했다고 가정합니다.

* Provider1
* Provider2

사용 방법은 간단합니다.

```dart
MultiProvider(
	providers: [
		ChangeNotifierProvider(create: (context) => Provider1()),
		ChangeNotifierProvider(create: (context) => Provider2()),
	],
	child: MaterialApp(
		home: Home(),
	),
)
```

* <mark style="background-color: #2e2e2e; color: orange;">MultiProvider</mark>의 providers 프로퍼티에 사용할 `Provider`를 작성합니다.

* `Provider`를 여러개 등록하는 <mark style="background-color: #2e2e2e; color: orange;">MultiProvider</mark>를 사용한다는 것 외에는 모두 기존의 `Provider` 사용과 동일합니다.