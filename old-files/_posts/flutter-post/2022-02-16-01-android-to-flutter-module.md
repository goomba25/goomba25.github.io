---
title: "[Flutter] Android에 flutter 모듈 사용하기"
excerpt: "Android 프로젝트에 flutter 모듈 사용하기"

classes: wide

categories:
  - Flutter
tags:
  - [Flutter]

last_modified_at: 2022-02-16
---

## Flutter 모듈 생성

### 기본 프로젝트 생성
기본 프로젝트(안드로이드) 생성 후, 내부 디렉터리에 들어갑니다.   
기본 프로젝트의 내부는 대체로 아래와 같습니다.

```bash
app/
build.gradle
gradle/
gradle.properties
...
```

### Flutter 모듈 생성

해당 프로젝트 내부에서 flutter 모듈을 생성합니다.

```bash
$ flutter create -t module {$FLUTTER_MODULE}
```

* **-t, --template**  : 특정 타입의 프로젝트 생성 커맨드
* 내부에서 사용할 flutter 모듈 이름은 "flutter_module"입니다.

## Android - Flutter 모듈 통합하기

기본 프로젝트에 Flutter 모듈을 추가하기 위해 몇가지 코드를 추가해야 합니다. (gradle)

* 안드로이드 프로젝트의 settings.gradle

  ```gradle
  setBinding(new Binding([gradle: this]))
  evaluate(new File(
          settingsDir,
          'flutter_module/.android/include_flutter.groovy'
  ))
  ```

  * 추가적으로 repositoriesMode를 `FAIL_ON_PROJECT_REPOS`애서 `PREFER_PROJECT`로 변경해줍니다.

* 안드로이드 프로젝트 build.gradle

  ```gradle
  buildscript {
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath "com.android.tools.build:gradle:7.0.3"

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
  }

  (중략)

  allprojects {
    repositories {
        google()
        jcenter()
    }
  }
  ```

  * 맨 위와 맨 위에 추가해주세요.

* 안드로이드 프로젝트 app/build.gradle

  ```gradle
  implementation project(':flutter')
  ```

## Flutter 모듈 시작

Flutter 모듈을 시작하는 방법으로는 3 가지가 있습니다.

* Activity
* Fragment
* Flutter Engine

이 내용은 추후 하나씩 다루도록 하겠습니다.