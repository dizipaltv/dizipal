const{dirs:dirs}=require("../../../dizipal.config"),{app:app}=require("electron");class App{static relaunch(){app.relaunch(),app.exit(0)}static get mainDir(){return dirs.mainDir}}module.exports=App;