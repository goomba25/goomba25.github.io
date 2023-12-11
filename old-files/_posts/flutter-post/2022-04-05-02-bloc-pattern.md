---
title: "[Flutter] Bloc 패턴 맛보기"
excerpt: "Bloc에 대해 간단하게 알아보자"
classes: wide
toc: true
toc_sticky: true
categories:
  - Flutter
tags:
  - [Flutter]
last_modified_at: 2022-04-08
---

<mark style="background-color: #2e2e2e; color: orange;">Bloc</mark>패턴이란, Business Logic Component의 약자로   
UI와 로직을 분리하기 위한 **디자인 패턴**입니다.

* 따라서 다른 언어, 프레임워크에서도 이러한 패턴을 사용할 수 있습니다.

## Bloc 형태

쉽게 위젯(UI)이 Bloc을 구독한다고 합니다.

* Bloc입장에서 위젯을 Listener(리스너)라고 합니다.

Bloc의 상태가 변하면, 구독 중인 위젯(UI)이 Bloc의 변화를 적용시키는 형태입니다.

이러한 Bloc은 Stream을 사용하여 구현이 가능합니다.

### Stream

비동기 이벤트를 처리하기 위해 사용하는 클래스입니다.

* 물이 흐르는 파이프 형태를 떠올리면 됩니다.

* 위젯과 Bloc이 Stream을 통해 이어져 있다고 보면 됩니다.

## Bloc 구조

1. StreamController를 통해 Observable 객체를 생성.
2. Sink를 통해 이벤트 수용.
3. Stream을 통해 구독된 객체에게 변화 전달.

Sink는 "입구"라는 의미로 Bloc에서 이벤트를 받는 입구 역할입니다.   
Bloc은 Sink를 통해 이벤트를 받아 이벤트에 대해 로직을 처리하고, 변경된 상태를 Stream을 통해  위젯에게 전달하는 구조입니다.

## Bloc의 종류

### Single-subscription

Stream이 한 개의 Listener만 허용합니다.   
또한 Listener가 구독을 취소하면 재 구독이 불가능합니다.

### Broadcast

Single과 다르게 여러 Listener를 허용할 수 있으며, 언제든지 Listener를 연결/해제 할 수 있습니다.

## Bloc 간단하게 구현하기

Bloc을 직접 Stream을 통해 구현하는 일은 굉장히 복잡하고 어려운 일이라고 합니다.   
따라서 아주 간단하게 구현해봤습니다.

### 카운팅 앱

카운트를 저장하고, 카운트를 수정 및 구독 가능한 앱입니다.

카운트를 다른 화면에서도 사용이 가능한지 확인 할 수 있도록 3 페이지의 앱으로 만들었습니다.

1. 카운트를 저장하기 위한 BLoc 생성

  * Bloc의 주요 클래스인 Stream을 사용합니다. (Stream은 `dart:async`에 있습니다.)

    ```dart
    import 'dart:async';

    class CountBloc {
      int _count = 0;
      final StreamController<int> _countController = StreamController<int>.broadcast();

      Stream<int> get count => _countController.stream;
      int get currentCount => _count;

      add() {
        _count++;
        _countController.sink.add(_count);
      }

      subtract() {
        if (_count > 0) {
          _count--;
          _countController.sink.add(_count);
        }
      }

      dispose() {
        _countController.close();
      }
    }

    var countBloc = CountBloc();
    ```

    * StreamController를 사용하여 observable 객체를 생성합니다.   
    (이때 broadcast로 다수의 위젯이 해당 Bloc을 구독할 수 있도록 해줍니다.)

      ```dart
      final StreamController<int> _countController = StreamController<int>.broadcast();
      ```

    * 외부에서 해당 Bloc을 구독할 수 있도록 getter를 생성합니다.

      ```dart
      Stream<int> get count => _countController.stream;
      ```

    * 구독은 해당 Bloc이 업데이트 될 때만 정보를 받기 때문에 처음 값을 반환해줍니다.

      ```dart
      int get currentCount => _count;
      ```

    * 외부에서 _count를 변경하도록 메서드를 생성합니다.   
    (`observable`객체에게 변화를 알려주지 않으면 해당 Bloc을 구독하는 위젯들이 변경되지 않습니다.)

      ```dart
      add() {
        _count++;
        _countController.sink.add(_count);
      }

      subtract() {
        if (_count > 0) {
          _count--;
          _countController.sink.add(_count);
          //  또는 _countController.add(_count);
        }
      }
      ```

    * 어디서든 해당 Bloc을 사용할 수 있도록 전역변수로 지정하고, 해당 객체의 삭제를 위한 메서드도 작성합니다.

2. 카운트 앱 생성

  * 첫번째 페이지는 구독 가능한 텍스트를 생성하고, 두번째 페이지로 전환이 가능하도록 구성했습니다.

    ```dart
    class FirstApp extends StatelessWidget {
      const FirstApp({Key? key}) : super(key: key);

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text("Counting App"),
          ),
          body: Center(
            child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                StreamBuilder<int>(
                  stream: countBloc.count,
                  initialData: countBloc.currentCount,
                  builder: (context, snapshot) {
                    return Text(
                      'Bloc Count : ${snapshot.data}',
                      textScaleFactor: 2.5,
                    );
                  },
                ),
                SizedBox(
                  width: 200,
                  height: 50,
                  child: ElevatedButton.icon(
                    icon: const Icon(Icons.add_box_outlined),
                    label: const Text(
                      "Bloc 패턴",
                      style: TextStyle(
                        fontSize: 20,
                        fontFamily: "Noto Sans",
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) {
                            return const SecondApp();
                          },
                        ),
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      }
    }
    ```

  * 두번째 페이지는 카운트를 변경하도록 구성했습니다.

    ```dart
    class SecondApp extends StatefulWidget {
      const SecondApp({Key? key}) : super(key: key);

      @override
      _SecondAppState createState() => _SecondAppState();
    }

    class _SecondAppState extends State<SecondApp> {
      @override
      Widget build(BuildContext context) {
        return Scaffold(
          appBar: AppBar(
            title: const Text("Bloc 패턴"),
          ),
          body: const CountWidget(),
          floatingActionButton: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              IconButton(
                icon: const Icon(Icons.add),
                onPressed: () {
                  countBloc.add();
                },
              ),
              IconButton(
                icon: const Icon(Icons.remove),
                onPressed: () {
                  countBloc.subtract();
                },
              )
            ],
          ),
        );
      }
    }
    ```

  * 세번째 페이지는 카운트를 표시할 페이지입니다.

    ```dart
    class CountWidget extends StatelessWidget {
      const CountWidget({Key? key}) : super(key: key);

      @override
      Widget build(BuildContext context) {
        return Center(
          child: StreamBuilder(
            stream: countBloc.count,
            initialData: countBloc.currentCount,
            builder: (context, snapshot) {
              return Text(
                snapshot.data.toString(),
                style: const TextStyle(
                  fontSize: 40,
                ),
              );
            },
          ),
        );
      }
    }
    ```

    * 여기서 `StreamBuilder`는 해당 Bloc을 구독하도록 해주는 클래스입니다.
      * `stream`을 통해 구독할 stream을 지정
      * `initialData`를 통해 표시될 초기값 지정
      * `builder`를 통해 위젯 반환   
      (`snapshot`은 Stream을 가리키고, `snapshot.data`를 통해 데이터를 불러옵니다.)

  ![count-app](/video/flutter-video/bloc_pattern_count_app.gif)

### 무한 스크롤 리스트 앱

| "더코딩파파"라는 유투버의 내용을 참조했습니다.

랜덤 텍스트로 채워지는 리스트 앱입니다.   
해당 리스트의 아이템을 클릭하면 저장되고, ♥로 표시됩니다.   
오른쪽 상단의 저장 목록으로 들어가면 클릭된 아이템들을 보여주고, 삭제할 수 있습니다. (삭제된 리스트는 ♡로 변경됩니다.)

> 랜덤 텍스트를 사용하기 위해 `english_words`라는 패키지를 사용했습니다.

1. Bloc 생성

```dart
class SavedBloc {
  final Set<WordPair> _savedList = Set<WordPair>();

  final _savedController = StreamController<Set<WordPair>>.broadcast();

  Stream<Set<WordPair>> get savedListStream => _savedController.stream;
  Set<WordPair> get currentList => _savedList;

  void savedListEvent(WordPair pair) {
    if (_savedList.contains(pair)) {
      _savedList.remove(pair);
    } else {
      _savedList.add(pair);
    }
    _savedController.sink.add(_savedList);
  }

  dispose() {
    _savedController.close();
    _savedList.clear();
  }
}

var savedBloc = SavedBloc();
```

2. 첫번째 페이지 생성

```dart
class FirstApp extends StatefulWidget {
  const FirstApp({Key? key}) : super(key: key);

  @override
  _FirstAppState createState() => _FirstAppState();
}

class _FirstAppState extends State<FirstApp> {
  final List<WordPair> _wordList = <WordPair>[];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("List Sample"),
        actions: [
          IconButton(
            icon: const Icon(Icons.list),
            onPressed: () {
              Navigator.of(context)
                  .push(
                    MaterialPageRoute(
                      builder: (context) => const SavedListApp(),
                    ),
                  )
                  .then(
                    (_) => setState(() {}),
                  );
            },
          ),
        ],
      ),
      body: _listViewer(),
    );
  }

  Widget _listViewer() {
    return StreamBuilder<Set<WordPair>>(
      stream: savedBloc.savedListStream,
      builder: (context, snapshot) {
        return ListView.builder(
          itemBuilder: (context, index) {
            if (index.isOdd) {
              return const Divider();
            }

            var realIndex = index ~/ 2;

            if (realIndex >= _wordList.length) {
              _wordList.addAll(generateWordPairs().take(10));
            }

            return _listItem(snapshot.data, _wordList[realIndex]);
          },
        );
      },
    );
  }

  Widget _listItem(Set<WordPair>? saved, WordPair pair) {
    final bool isChecked = (saved == null ? false : saved.contains(pair));

    return ListTile(
      title: Text(
        pair.asPascalCase,
        textScaleFactor: 1.5,
      ),
      trailing: Icon(
        isChecked ? Icons.favorite : Icons.favorite_border,
        color: Colors.pink,
      ),
      onTap: () {
        savedBloc.savedListEvent(pair);
      },
    );
  }
}
```

3. 저장된 리스트를 보여주는 두번째 페이지 생성

```dart
class SavedListApp extends StatefulWidget {
  const SavedListApp({Key? key}) : super(key: key);

  @override
  _SavedListAppState createState() => _SavedListAppState();
}

class _SavedListAppState extends State<SavedListApp> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Saved List"),
      ),
      body: _listViewer(),
    );
  }

  Widget _listViewer() {
    return StreamBuilder<Set<WordPair>>(
      stream: savedBloc.savedListStream,
      initialData: savedBloc.currentList,
      builder: (context, snapshot) {
        return ListView.builder(
          itemCount: snapshot.data!.length * 2,
          itemBuilder: (context, index) {
            if (index.isOdd) {
              return const Divider();
            }

            var realIndex = index ~/ 2;

            return _listItem(snapshot.data!.toList()[realIndex]);
          },
        );
      },
    );
  }

  Widget _listItem(WordPair pair) {
    return ListTile(
      title: Text(
        pair.asPascalCase,
        textScaleFactor: 1.5,
      ),
      onTap: () {
        savedBloc.savedListEvent(pair);
      },
    );
  }
}
```

![scroll-app](/video/flutter-video/bloc_pattern_scroll_app.gif)