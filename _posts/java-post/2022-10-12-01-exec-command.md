---
title: "[Android] 안드로이드에서의 터미널 명령 실행"
excerpt: "안드로이드앱에서 터미널 명령을 사용해보자"
classes: wide
toc: true
toc_sticky: true

categories:
  - Java
tags:
  - [Android, Java]

last_modified_at: 2022-10-12
---

앱 내부에서 간단한 adb 명령어 등을 실행하기 위한 방법을 찾다가   
아주 간단하게 구현된 방법이 있어서 작성했습니다.

## 시스템 명령어 실행

시스템 명령어를 앱 내부에서 실행하는 방법은 간단합니다.

```java
Runtime.getRuntime().exec("명령어");
```

위와 같이 앱 내부에서 여러 명령어를 실행할 수 있습니다.

## 명령어 실행 및 출력 보기

[참고 사이트](https://s-engineer.tistory.com/366)

사용된 View는 EditText, TextView를 사용했고   
**EditText**는 명령어 입력용으로, **TextView**는 출력을 표시하기 위해 사용했습니다.

```java

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

...

EditText mInput;
TextView mOutput;
Button mSendButton;
...

@Override
public void onActivityCreated(Bundle savedInstanceState) {
    super.onActivityCreated(savedInstanceState);
    ...
    mSendButton.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
            if ( mInput.hasFocus() ) {
                mInput.clearFocus();
            }
            inputCommand();
        }
    });
}

private void inputCommand() {
    StringBuffer stringBuffer = new StringBuffer();

    Process process;
    try {
        process = Runtime.getRuntime().exec(mInput.getText().toString());
        process.waitFor();

        BufferedReader reader = new BufferReader(new InputStreamReader(process.getInputStream()));
        String line = "";

        while( (line = reader.readLine()) != null ) {
            stringBuffer.append(line + "\n");
        }
    } catch ( Exception e ) {
        e.printStackTrace();
    }

    String result = stringBuffer.toString();
    mOutput.setText(result);
}
```

* 이 방법의 장점은 구현이 굉장히 쉽고 간편하다는 점입니다.
* 아쉽지만 `logcat`과 같이 계속해서 날아오는 에크를 출력하는 것을 불가능합니다. (앱이 락 걸립니다.)
