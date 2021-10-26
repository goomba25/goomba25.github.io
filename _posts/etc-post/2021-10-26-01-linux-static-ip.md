---
title: "[Ubuntu] 고정 IP 설정하기"
excerpt: "고정 IP를 사용하는 방법"

categories:
  - Etc
tags:
  - [Ubuntu, Linux, Network]

last_modified_at: 2021-10-26
---

가끔 여러 조건들로 인해 고정 IP가 필요한 순간들이 있다.

간단하게 IP를 고정하는 방법을 적어본다.

Ubuntu 16.04를 기준으로 방법이 조금 다르다.

### 공통

먼저 자신의 IP를 `ifconfig` 명령어를 통해 확인해보자.

```
lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          ...
          
enp0s3    Link encap:Ethernet  HWaddr 08:00:27:02:0d:21  
          inet addr:192.168.0.xx  Bcast:192.168.0.255  Mask:255.255.255.0
          ...
```

현재 변경하고자 하는 네트워크는 `enp0s3`이라고 하자.

___

### Ubuntu 16.04 이하

Ubuntu 16.04 이하 버전의 경우   
`/etc/network`의 `interfaces` 파일을 수정하는 것으로 설정할 수 있다.

처음 이 파일을 열면 아래와 같이 적혀있다.

```
# interfaces(5) file used by ifup(8) and ifdown(8)
auto lo
iface lo inet loopback
```

이 밑에 아래와 같은 형식의 내용을 추가한다.

```
auto enp0s3
iface enp0s3 inet static
address xxx.xxx.xxx.xxx
netmask xxx.xxx.xxx.xxx
gateway xxx.xxx.xxx.xxx
dns-nameservers xxx.xxx.xxx.xxx
```

address : 원하는 IP (#내부)  // 여기선 203
netmask : 255.255.255.0 (#서브넷)
gateway : 192.168.0.1 (#Gateway)

dns-nameservers는 보통 통신사의 DNS를 사용한다.

```
SK	210.220.163.82 219.250.16.130
KT	168.126.63.1 168.126.63.2
LG	164.124.107.9 203.248.242.2
Google	8.8.8.8 8.8.4.4
```

재부팅 후 IP를 확인하면 변경된 것을 확인할 수 있다.

```
enp0s3    Link encap:Ethernet  HWaddr c4:00:ad:7f:0e:e3  
          inet addr:192.168.0.203  Bcast:192.168.0.255  Mask:255.255.255.0
          ...
```

### Ubunut 18.04 이상

18.04 버전부터는 `NetPlan`이라는 설정으로 바뀐다.

`/etc/netplan` 디렉터리 안에 파일이 들어있다.   
아마 이름은 `01-network-manager-all.yaml`일 것이다.

처음에는 아래와 같은 내용이 적혀있다.

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
```

해당 내용을 수정하면 되는데,
이 때 반드시 들여쓰기 간격 등을 주의하자.

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: NetworkManager
  ethernets:
    enp0s3:
      dhcp6: no
      addresses: [192.168.0.203/24]
      gateway4: xxx.xxx.xx.xxx
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

address : 원하는 IP (#내부)  // 여기선 203
netmask : 255.255.255.0 (#서브넷)
gateway : 192.168.0.1 (#Gateway)

이후 아래의 명령어를 입력해준다.

```bash
sudo netplan apply
```

IP를 확인하면 변경된 것을 확인할 수 있다.