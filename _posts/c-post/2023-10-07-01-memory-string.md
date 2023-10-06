---
title: "[C/C++] memset, memcpy, memmove"
excerpt: ""

categories:
  - C
tags:
  - [C, Cpp]
toc: true
toc_sticky: true

last_modified_at: 2023-10-07
---

memset, memcpy, memmove는 모두 메모리 사용에 관여하는 함수입니다.   
공통적으로 `string.h`, `memory.h` 헤더에 포함됩니다.

# memset

메모리의 값을 특정 값으로 설정하고 초기화 할 수 있는 함수입니다.

```c
void* memset(void* ptr, int value, size_t num)
```

* `void* ptr` : 메모리의 시작 주소, 포인터 주소
* `int value` : 초기화 값, **int** 타입이지만 내부적으로 **unsigned char**로 변환되어 저장
* `size_t num` : 변환하려는 데이터 길이 (바이트 단위)

반환 값은 성공 시 ptr을 반환하고, 실패 시 NULL을 반환합니다.

* 예시 1
  ```c
  char arr[] = 'string';
  (void)memset(arr, 'a', 3);

  // aaaing
  ```

* 예시 2
  ```c
  struct SAMPLE {...}
  SAMPLE sample;

  (void)memset(&sample, 'c', sizeof(SAMPLE));
  ```

## memcpy

메모리의 값을 다른 메모리에 복사하는 함수입니다.

```c
void* memcpy(void* dest, const void* source, size_t num)
```

- `void* dest` : 복사 될 메모리의 위치를 가리키는 포인터
- `const void* source` : 복사할 메모리의 위치를 가리키는 포인터
- `size_t num` : 복사할 데이터의 길이(바이트 단위)

반환 성공 시 dest를 반환합니다.

주의할 점은 `char*`타입의 문자열 복사 시 `\0`(널 문자)를 유의하여 +1 길이만큼 크기를 정해야 합니다.

* 예시
  ```c
  const char* src = "string"; // 7
  char dest[] = "abcdefghijk"; // 12
  memcpy(dest, src, sizeof(char) * 6);

  // stringghijk
  ```

## memmove

메모리를 이동하는 함수입니다. 

사실 메모리를 복사하는 `memcpy`와 비슷하게 동작합니다.   
다만 `memmove`는 메모리를 다른 버퍼에 복사한 뒤 이동할 위치에 버퍼의 내용을 붙여넣는 방식으로,   
`memcpy`에 비해 안정성이 더 좋다고 합니다.

```c
void* memmove(void* dest, const void* source, size_t num)
```

- `void* dest` : 이동(복사)하는 메모리의 위치를 가리키는 포인터
- `const void* source` : 복사할 메모리의 위치를 가리키는 포인터
- `size_t num` : 복사할 데이터의 길이(바이트 단위)

반환 값은 성공 시 dest를 반환합니다.

* 예시
  ```c
  char src[] = "string";
  char dest[] = "abcdefghijk";
  memmove(dest + 3, src, sizeof(char) * 6 + 1);
  
  // abcstring
  ```