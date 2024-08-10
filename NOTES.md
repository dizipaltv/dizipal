# Sonraki Sürümlerde Yapılacak Olanların Notları

## 1.1.0 Ayarlar Seçeneği
* Yükleniyor... penceresi eklenecek ve bu pencere gözükürken arka planda ana pencere hazır olacak.
* Kullanıcının Dizipal adresini el ile değiştirmesine olanak sağlanacak
* Kullanıcının Dizipal'in en güncel adresini Tek tuşla bulacağı bir buton eklenecek "eşle"

## 1.2.0 Dosyaları Sıkıştırmak
* electron-updater doğru çalışmıyor bu hatayı düzelteceğim.
* Ana dizinimdeki Minifier.js yardımıyla dev klasöründe yer alan tüm dosyalarıı ve klasörleri önce src adında bir klasöre taşıyacağım.
* Src klasörünü js minifier, css minifier, image minifier yardımlarıyla sıkıştıracağım.
* Scripts altına yarn minifier adında bir komut daha yerleştireceğim ve bu komut, package, start ve publish komutlarıyla birlikte çalışacak.

## 1.3.0 Log kayıtları tutmak ve Ayarlar Seçeneği Güncellemek
* Güncel adresi açılışta otomatik olarak kontrol etme özelliği eklenecek.
* Reklam engelleyiciyi kapatıp açma özelliği eklenecek.
* [winston](https://www.npmjs.com/package/winston) paketini kullanarak bir log kaydı tutulacak.