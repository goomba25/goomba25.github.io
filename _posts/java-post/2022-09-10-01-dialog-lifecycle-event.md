---
title: "[Android] Dialog 생성 주기 이벤트"
excerpt: "Dialog lifecycle"

classes: wide

categories:
  - Java
tags:
  - [Android, Java]

last_modified_at: 2022-09-10
---

<mark style="background-color: #2e2e2e; color: orange;">Dialog</mark> 클래스의 생성주기 이벤트 처리하는 메서드입니다.
### Dialog Cancel 이벤트 받기

```java
Dialog dialog = new Dialog();
dialog.setOnCancelListener(OnCancelListener listener);
```

### Dialog Show 이벤트 받기

```java
Dialog dialog = new Dialog();
dialog.setOnShowListener(OnShowListener listener);
```

### Dialog Dismiss 이벤트 받기

```java
Dialog dialog = new Dialog();
dialog.setOnDismissListener(OnDismissListener listener);
```

### 예시

```java
Dialog dialog = new Dialog();

dialog.setOnShowListener(new DialogInterface.OnShowListener() {
    @Override
    public void onShow(DialogInterface dialog) {
        Toast.makeText(MainActivity.this, "show listener",
                Toast.LENGTH_SHORT).show();
    }
});

dialog.setOnCancelListener(new DialogInterface.OnCancelListener() {
    @Override
    public void onCancel(DialogInterface dialog) {
        Toast.makeText(MainActivity.this, "cancel listener",
                Toast.LENGTH_SHORT).show();
    }
});

dialog.setOnDismissListener(new DialogInterface.OnDismissListener() {
    @Override
    public void onDismiss(DialogInterface dialog) {
        Toast.makeText(MainActivity.this, "dismiss listener",
                Toast.LENGTH_SHORT).show();
    }
});
```
