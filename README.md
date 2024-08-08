# Açık Kaynak Kodlu Dizipal Masaüstü Uygulaması

![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/boydan-al-guzum.webp)
![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/arama-cibiki.webp)
![Dizipal Hakkinda](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/hakkinda.webp)

Merhabalar ücretsiz film izlemeyi sevenler topluluğu. Sizler için Dizipal'in masaüstü versiyonunu çıkardım. Amacım Bu uygulamayı güncel dizipal adresine göre güncel tutmak. Şu anda ilk sürümünü yayınladım ve projenin kaynak kodlarını da beraberinde yayınladım. Keyifli Seyretmeler.

> [!IMPORTANT]      
> Şu anda sadece Windows için yüklenebilir.


<br /><br />


## Nasıl İndirilir?

[Buradan](https://github.com/dizipaltv/dizipal/releases/latest) son sürüme ulaşabilirsiniz. Bu sayfaya gittiğinizde Assets başlığı altında yer alan .exe dosyasını indirip kurmanız yeterli olacaktır.

<br />

[![indir](https://cdn.jsdelivr.net/gh/dizipaltv/assets/pictures/indir.webp)](https://github.com/dizipaltv/dizipal/releases/latest)

<br />

## Geliştiriciler için yükleme talimatları:

Kaynak kodlarıyla oynamak kendinize göre değiştirmeniz için birkaç bilgi sunacağım: Kullandığım,

| Kullanılan                   | Adı      | Sürüm   |
|------------------------------| -------- | ------- |
| Programlama Dili             | Nodejs   | 20.16.0 |
| Masaüstü Uygulama Yaratıcısı | Electron | 31.3.1  |
| Paket Yöneticisi             | Yarn     | 4.4.0   |

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

<br /><br />

LICENSE : [MIT](LICENSE)