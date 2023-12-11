---
title: "[Android] Permission에 대하여."
excerpt: "권한 문제에 대한 리서치"

classes: wide

categories:
  - Java
tags:
  - [Android, Java]

last_modified_at: 2022-08-23
---

기능을 구현하기 위해 특정 권한을 얻어야 하는 경우가 있습니다.   
단순히 AndroidManifest에 `<uses-permission .../>`을 입력하면 알아서 권한을 얻는 줄 알았는데   
그건 단순히 권한을 추가하는 것 뿐, 권한을 따로 얻어야 하는걸 알았습니다.   

---

권한의 종류는 다양합니다.   
그 중 제가 사용하게 된 권한은 `READ_EXTERNAL_STORAGE`입니다.

이미지를 DB로부터 받아와서 처리해야 했는데, 이때 이 권한 하나때문에 삽질(?)을 많이 했네요...

### 권한 추가

해당 앱에 권한을 추가합니다.(`AndroidManifest.xml`)

`READ_EXTERNAL_STORAGE`권한은 저장소에 대한 읽기 권한을 얻을 수 있게 해줍니다.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="...">

    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    ...
```

### 권한 획득

권한을 추가했으면 이제 해당 앱 내부에서 권한을 얻도록 만들어줘야 합니다.

권한의 획득 여부를 확인하고 사용자에게 권한을 허용해 줄 수 있습니다.

* 완전 간단한 버전의 권한 획득 메서드를 구현해봤습니다.

    ```java
    // 특정 값으로 세팅
    private static final int READ_EXTERNAL_STORAGE_REQUEST = 1111;

    private void getPermission() {
        int permission = ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE);
        if (permission == PackageManager.PERMISSION_DENIED) {
            ActivityCompat.requestPermissions(
                    this,
                    new String[]{Manifest.permission.READ_EXTERNAL_STORAGE},
                    READ_EXTERNAL_STORAGE_REQUEST);
        }
        else {
            // 권한이 이미 허용된 경우의 기능
        }
    }
    ```

    * checkSelfPermission : 해당 권한의 ID를 가져옵니다.
    * requestPermissions : String 배열의 권한들을 허용하도록 요청합니다.


* 권한의 허용이 진행되고나서 아래의 메서드가 호출됩니다.   
여기서 권한의 허용이 완료 되었는지 체크하거나, 완료 되었을 때의 동작을 정의할 수도 있습니다.

    ```java
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == READ_EXTERNAL_STORAGE_REQUEST) {
            if (grantResults.length != 0 && grantResults[0] == 0) {
                // 권한 완료에 따른 기능
            }
            for (int result : grantResults) {
                if (result == PackageManager.PERMISSION_DENIED) {
                    // 권한 실패에 따른 기능
                    break;
                }
            }
        }
    }
    ```