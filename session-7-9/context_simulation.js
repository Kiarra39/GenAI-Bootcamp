const fs = require("fs");

// chat array
let chat = [];
const maxSize = 10;

// chat add func
function addChat(input) {
    if (chat.length >= maxSize) {
        chat.shift(); 
    }
	let n=input.length;
    for(let i=0;i<n;i++){
		chat.push(input[i]);
	}
}

//help for user
console.log("type in chat.type exit to stop the program. type 'ctrl-d' to sent input");


//prompt for user
while (true) {
    let input = fs.readFileSync(0, "utf-8").trim().split('\n');

	if(input[0]=="exit"){
		break;
	}
    addChat(input);
    console.log(chat);
}



