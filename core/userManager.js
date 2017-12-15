var fs = require("fs");

class UserManager{

    constructor(){

        //read data
        this.data = JSON.parse(fs.readFileSync("./data/users.json"));

    }

    checkUserExists(data){//msg.chat
        for(let user of this.data){
            if(user.username == data.username && user.id == data.id){
                return true;
            }
        }
        return false;
    }
    
    addUser(data){  //msg.chat

        this.data.push(data);

        this._saveDatas();

    }

    _saveDatas(){

        fs.writeFileSync("./data/users.json",JSON.stringify(this.data));

    }

}

module.exports = UserManager;