---
title: "[Android] Fragment 생명주기"
excerpt: "Fragment의 생명주기를 알아보자"
classes: wide
toc: true
toc_sticky: true

categories:
  - Java
tags:
  - [Android, Java]

last_modified_at: 2022-09-22
---

Fragment를 사용하면서 생명 주기에 따라 사용하게 됩니다.   
저 같은 경우는 AOSP에서 개발하는데, `onActivityCreated`가 deprecated 되어 간단하게 작성해봅니다.

## 기존의 Fragment 생명주기

![image](/images/java-image/fragment_lifecycle_1.png)

기존의 Fragment는 `onCreate` 이후에 `onCreateView`가 호출되고 `onActivityCreated`가 호출되는 형식으로 사용되었습니다.

## 현재 Fragment 생명주기

![image](/images/java-image/fragment_lifecycle_2.png)

`onActivityCreated`가 사라지고 `onViewCreated`, `onViewStateRestored`, `onSaveInstanceState`가 새롭게 등장합니다.

## onActivityCreated 대책

`onActivityCreated`를 대응하는 로직은 `onViewCreated`라고 할 수 있습니다.

![image](/images/java-image/fragment_onActivityCreated.png)

* Fragment의 View와 관련된 로직을 `onViewCreated`에서 처리하라고 하네요.