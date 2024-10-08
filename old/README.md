# Dizipal Client
[![Dizipal Downloads](https://img.shields.io/github/downloads/dizipaltv/dizipal/total.svg?style=flat&label=Aylık%20İndirme)](https://github.com/dizipaltv/dizipal/releases)

Açık kaynak kodlu dizipal masaüstü uygulaması

![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/boydan-al-guzum.webp)
![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/arama-cibiki.webp)
![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/hakkinda.webp)

Merhabalar ücretsiz film izlemeyi sevenler topluluğu. Sizler için Dizipal'in masaüstü versiyonunu çıkardım. Amacım Bu uygulamayı güncel dizipal adresine göre güncel tutmak. Şu anda ilk sürümünü yayınladım ve projenin kaynak kodlarını da beraberinde yayınladım. Keyifli Seyretmeler.

> [!IMPORTANT]      
> Sorumluluk tamamen uygulamayı kullanan kullanıcıya aittir. Herhangi bir mesuliyet kabul etmiyorum.     
> Macos, linux ve Windows için indirme kurulum dosyaları mevcuttur. 


<br /><br />


## Fazla bilgi göz çıkarmaz

- Dizipal'in güncel sitelerine her zaman erişebileceksiniz.
- Dizipal'i özelleştirilmiş adblocker ile kullanacaksınız (Tamamen dizipal'e özel)
- Herhangi bir internet taraması yapmak zorunda kalmadan, çoğu dizi ve filme Masaüstü uygulamasından ulaşabileceksiniz.
- Dizipal'in en güncel twitter adresine her zaman `Menüler>Dizipal>Hakkında` kısmından ulaşabileceksiniz.

<br /><br />


## Nasıl İndirilir?

[Buradan](https://github.com/dizipaltv/dizipal/releases/latest) son sürüme ulaşabilirsiniz. Bu sayfaya gittiğinizde Assets başlığı altında yer alan .exe dosyasını indirip kurmanız yeterli olacaktır.

<br />

[![indir](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/indir.webp)](https://github.com/dizipaltv/dizipal/releases/latest)

<br />


## Nasıl Özelleştirilir
Evet ufak özelleştirme seçenekleri de bulunmaktadır. Özelleştirme yaomak için şu adımları izleyiniz <br />

### 1. Özelleştirme Dosyasını Açmak
#### 1.1 Windows ta özelleştirme dosyasını açmak
**PowerShell**'i veya **CMD**'yi açınız ve ardından kendi editorünüz ile `C:/Users/<ismin>/AppData/Roaming/Dizipal/.dizipalrc` dosyasını açınız.
İşte Kendi ismim olan **can** ile size bir örnek;
```
notepad C:/Users/can/AppData/Roaming/Dizipal/.dizipalrc
```

#### 1.2 Macos ve Linux ta özelleştirme dosyasını açmak
terminalinizi açınız ve ardından kendi metin düzenleme editorünüz ile `~/.dizipalrc` dosyasını açınız. [nano](https://www.nano-editor.org/) ile bir örnek;
```
nano ~/.dizipalrc
```


### 2. Neler özelleştirilebilir?
#### 2.1 İşte özelleştirebileceklerinizin bir listesi ve kullanım örneği
> [!NOTE]     
> Versiyon 0.2.5 için sadece aşağıda gösterilen alanlar çalışmaktadır. Diğer seçenekler Bu sürüm itibariyle geliştirme aşamasındadır.

| Özelleştirme Adı      | Aldığı Parametreler                                          |
|-----------------------|--------------------------------------------------------------|
| currentSiteURL        | Herhangi bir site bağlantısı (örn: https://ahmetcanisik.com) |
| adBlocker             | `true` ya da `false`                                         |
| checkAdressOnStartup  | `true` ya da `false`                                         |


<br />

işte `.dizipalrc` dosyası kullanım örneği:
```json
{
  "currentSiteURL": "https://dizipal738.com",
  "adBlocker": true,
  "checkAdressOnStartup": false
}
```



## Geliştiriciler için yükleme talimatları:

Kaynak kodlarıyla oynamak kendinize göre değiştirmeniz için birkaç bilgi sunacağım: Kullandığım,

| Kullanılan                   | Adı      | Sürüm   |
|------------------------------| -------- | ------- |
| Programlama Dili             | Nodejs   | 20.17.0 |
| Masaüstü Uygulama Yaratıcısı | Electron | 32.0.1  |
| Paket Yöneticisi             | Yarn     | 1.22.22   |

<br />

## Kaynak Kodlarını Nasıl İndiririm?
> [!IMPORTANT]      
> Bilgisayarınızda [git-scm](https://git-scm.com/)'in son sürümünün bulunması gerekmektedir.      
> ve de [Nodejs](https://nodejs.org)'in lts sürümünün sürümünün bulunması gerekmektedir.          

<br />

#### Bu depoyu klonlayarak başlayın

Github depomuzu klonlamak için aşağıdaki komutu terminalinize yapıştırınız.

```bash
git clone https://github.com/dizipaltv/dizipal.git
```

Şimdi indirilen deponun olduğu dizine girmeliyiz. Aşağıdaki komutları terminalinizde çalıştırınız.

```bash
cd dizipal
```

Bir sonraki adım ise gerekli bağımlılıkları indirmek olacaktır. Bu projenin ihtiyaç duyduğu bazı paketleri
indirmemiz gerekmektedir. Aşağıdaki komutları terminalinizde çalıştırınız.

```bash
yarn install
```

> npm kullanıyorsanız bu komutu çalıştırınız
```bash
npm run install
```

<br />

#### Projeyi dünya gözüyle görme zamanı

Evet gerekli herşeyin yüklenmesi, kurulmasının ardından artık projeyi başlatabiliriz.
Aşağıdaki komutları terminalinize yapıştırınız.

```bash
yarn start
```

<br />

#### Daha fazla komuta nasıl ulaşabilirim?
Evet daha birkaç komut daha mevcut bunları [package.json](package.json) içerisinde `"scripts"` altında bulabilirsiniz.
işte versiyon 0.3.1 için kullanılan komutlar
```
`dev`       : Geliştirme sürecinde yaptığımız değişiklikleri sıkıştırma olmadan görmek için kullanılan script komutudur,
minify      : Tüm kodlarımızı sıkıştıran komutdur,
start       : Uygulamamızı başlatır,
build       : Uygulamamızı paketler,
build-linux : Uygulamamızı linux a paketler,
build-mac   : Uygulamamızı macos a paketler,
build-win   : Uygulamamızı windows a paketler
```

<br /><br />

LICENSE : [MIT](LICENSE)