const{BrowserWindow:BrowserWindow,Menu:Menu,session:session}=require("electron"),{AdBlocker:AdBlocker,Config:Config}=require("../../components"),{Menus:Menus}=require("../../menus"),path=require("path");class MainScreen{static window=null;static createWindow(e){MainScreen.window=new BrowserWindow({width:1024,height:768,show:!1,webPreferences:{icon:path.join(__dirname,"..","..","images","icons","icon.png"),preload:path.join(__dirname,"..","..","preload.js")}}),Menu.setApplicationMenu(Menus.default),MainScreen.reload(e),MainScreen.window.webContents.executeJavaScript("window.addEventListener('offline', async () => {console.log('Bağlantı kesildi.');await window.electronAPI.connection(false);});"),MainScreen.window.webContents.setWindowOpenHandler((({url:e})=>e.startsWith("http")?(MainScreen.reload(e),{action:"deny"}):{action:"deny"})),MainScreen.window.on("enter-full-screen",(()=>{Menu.setApplicationMenu(null)})),MainScreen.window.on("leave-full-screen",(()=>{Menu.setApplicationMenu(Menus.default)})),MainScreen.window.on("maximize",(()=>{Menu.setApplicationMenu(Menus.default)})),MainScreen.window.on("unmaximize",(()=>{Menu.setApplicationMenu(Menus.default)}))}static show(){MainScreen.window&&MainScreen.window.show()}static destroy(){MainScreen.window&&(MainScreen.window.destroy(),MainScreen.window=null)}static reload(e=Config.getInformation.currentSiteURL,n=Config.getInformation.adBlocker){n&&(AdBlocker.blockURLs(session),AdBlocker.blockAds(MainScreen.window)),MainScreen.window.loadURL(e)}}module.exports=MainScreen;