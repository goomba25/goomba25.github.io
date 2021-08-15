---
title: "[Qt] Resource System"
excerpt: "첨부파일을 유용하게 손쉽게 사용할 수 있는 resource system에 대해 알아보자 (qrc)"

categories:
  - Qt
tags:
  - [Qt, Cpp]

toc: true
toc_sticky: true

last_modified_at: 2021-08-15
---

`resource system`은 Qt에서 제공하는 여러 참조 파일을 효율적으로 관리할 수 있게 해주는 시스템이다.

기본적으로 qtcreater에서 resource 파일을 생성할 수 있고,   
`.qrc`라는 파일로 생성된다.

## 사용 방법

![image](/images/qt-image/resource_display.png)

`Add Prefix`를 통해 리소스 폴더의 이름을 지정해주고,   
`Add Files`를 통해 참조할 파일들을 선택하여 하위에 지정해줄 수 있다.

## resource build
기존에 Qt에서 제공하는 `.pro`를 사용하여 빌드하는 경우,   

```pro
RESOURCE  = resource_file_name.qrc
```

위와 같이 `.qrc`파일을 명시해야 한다.

하지만 `.pro`가 아닌 경우,    
본인 같은 경우 `CMakeLists.txt`를 사용하기 때문에   
`rcc`를 수동으로 호출해줘야 한다.

```cmake
# 예를 들어
set(CMAKE_AUTORCC ON)
...
add_executable(
  ...
  resouce_file_name.qrc
)
```