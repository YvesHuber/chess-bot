const { count } = require("console");
const { Collection } = require("discord.js");

Discord = require("discord.js");
config = require("../config.json");
client = new Discord.Client();
tmi = require('tmi.js');
fs = require('fs')
https = require('https');
readline = require('readline');
prefix = "!";
//Figures
const wk = "<:kingw:841224208972513320>";
const bk = "<:kingb:841224209086152704>";
const wq = "<:queenw:841224234457628712>";
const bq = "<:queenb:841224234420142080>";
const wr = "<:rookw:841224234315284491>";
const br = "<:rookb:841224234444652574>";
const wb = "<:bishopw:841224183492509696>";
const bb = "<:bishopb:841223730272403456>";
const wn = "<:kinghtw:841224209069375509>";
const bn = "<:knightb:841224208587292713>";
const wp = "<:pawnw:841224234508484608>";
const bp = "<:pawnb:841224234289725470>";
const w = ":white_large_square:";
const b = "<:black:841686770893455390>";
//Fields 
let field = [
    [wr, wn, wb, wk, wq, wb, wn, wr],
    [wp, wp, wp, wp, wp, wp, wp, wp],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [bp, bp, bp, bp, bp, bp, bp, bp],
    [br, bn, bb, bq, bk, bb, bn, br] //TODO: REVERSE
];

const wab = [
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w],
    [w, b, w, b, w, b, w, b],
    [b, w, b, w, b, w, b, w]
]

const blackPawns = [
    bn, bp, br, bb, bq, bk
]

const whitePawns = [
    wp, wr, wn, wb, wq, wk
]

//makes field
function getFormatedField() {
    let formatedfield = "";

    field.forEach(value => {
        formatedfield += "\n";
        value.forEach(element => {
            formatedfield += element;
        })
    });
    return formatedfield;
}
client.on("message", function (message) {

    client.user.setActivity("with GF Dad", {
        type: "STREAMING",
        url: "https://github.com/YvesHuber/chess-bot"
    });
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "") {
        fs.readFile('help/help.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            const help = data.split("\n")
            message.channel.send(help)
        });
    }


    else if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }


    else if (command === 'chess') {

        const challenger = message.author
        const duelist = message.mentions.members.first()



        round(field, challenger, duelist)
        function round(field, challenger, duelist) {
            message.channel.send(getFormatedField())

            try {
                client.on('message', message => {
                    if (message.author.bot) return;
                    if (message.content != "") {
                        if (message.author.id == challenger.id)
                            turn = message.content.split(" ")

                        function fieldchooser(row, number) {
                            let currentPos = new Object();
                            index = 0
                            //dabaddby
                            switch (row) {
                                case 'a':
                                    // field[y][0]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 0;
                                    return currentPos;
                                case 'b':
                                    // field[y][1]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 1;
                                    return currentPos;
                                case 'c':
                                    // field[y][2]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 2;
                                    return currentPos;
                                case 'd':
                                    // field[y][3]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 3;
                                    return currentPos;
                                case 'e':
                                    // field[y][4]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 4;
                                    return currentPos;
                                case 'f':
                                    //field[y][5]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 5;
                                    return currentPos;
                                case 'g':
                                    // field[y][6]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 6;
                                    return currentPos;
                                case 'h':
                                    // field[y][7]
                                    currentPos[0] = number - 1;
                                    currentPos[1] = 7;
                                    return currentPos;
                            }
                        }
                        try {
                            currentrow = turn[0].slice(0, 1)
                            currentnum = turn[0].slice(1, 2)
                            futuretrow = turn[1].slice(0, 1)

                            console.log("DA POLICE" + turn[0])
                            futurenum = turn[1].slice(1, 2)
                        }
                        catch (err) {
                            message.channel.send("Please only enter in this format <b1 b2>")
                            return
                        }
                        let hasMoved = false;
                        console.log("futureRow" + futuretrow + "futurenum" + futurenum);
                        currentfield = fieldchooser(currentrow, currentnum);
                        futurefield = fieldchooser(futuretrow, futurenum);
                        let y = currentfield[0]; // should actually be y 
                        let x = currentfield[1]; // should actually be x
                        //Future
                        let fy = futurefield[0];// should actually be fy 
                        let fx = futurefield[1];// should actually be fx
                        console.log("current Index", currentfield, "future Index", futurefield)
                        if (field[y][x] == w || field[y][x] == b) {
                            message.channel.send("No Valid Move")
                            return
                        }

                        //FUNCTIONS FOR PAWN 
                        const figure = field[y][x]
                        switch (field[y][x]) {
                            case wp:
                                console.log("Pawnw selected");
                                //pawn(field, message,x,y,fx,fy);
                                whitepawn(field, message, x, y, fx, fy);
                                message.channel.send(getFormatedField());
                                break
                            case bp:
                                console.log("Pawn selected")
                                blackpawn(field, message, x, y, fx, fy);
                                message.channel.send(getFormatedField())
                                break; //coomer detected
                            case bb:
                                console.log("bishop selected")
                                bishop(field, message, x, y, fx, fy);
                                message.channel.send(getFormatedField())
                                break; //coomer detected

                            case wb:
                                console.log("bishop selected")
                                bishop(field, message, x, y, fx, fy);
                                message.channel.send(getFormatedField())
                                break; //coomer detected

                            case bn: // I AM RETARDED @everyone
                                console.log("KNIGHT SELECTED");
                                knight(field, message, x, y, fx, fy);
                                console.log("went through function");
                                message.channel.send(getFormatedField());
                                break;
                            case wn: // I AM RETARDED @everyone
                                console.log("KNIGHT SELECTED");
                                knight(field, message, x, y, fx, fy);
                                console.log("went through function");
                                message.channel.send(getFormatedField())
                                break;
                        }
                    }
                });
            } catch (err) {
                message.channel.send("Please only enter in this format <b1 b2>")
            }
        }
    }
})

//TODO: Fix canibalism among us (sus) same coloured pawns (a7 eats a6 black )
//Pawns are heawy knees weak arms are heavy there vomit on my sweater already moms spagheti

// WHITE PAWN: if currentpos  y+1 x+1 OR y+ x-1 != w or b -> you can eat
// BLACK PAWN: if currentpos y-1 x+1 OR y-1 x-1 != w or b -> you can eat
// TODO: knight: can move in L or in cappital Gamm^lsq (Γ)
// + 10/6 - 10/6   + 15/17 -15/17
// dishop: can move in diagonal() + 9/7 - 9/7
// rook: can move in cross() +8,16,24,32,40,48,56,64  +1,2,3,4,5,6,7,8 -1,2,3,4,5,6,7,8 -8,16,24,32,40,48,56,64
function replace(field, x, y, fx, fy) {


}

function whitepawn(field, message, x, y, fx, fy) {
    console.log(field[fx])
    console.log("Current Field" + field[y][x]);
    let moved = false;
    if (y != 1) {
        moved = true
    }
    if (moved == true) {
        //   
        if (fy - y == 1) {

            //replace(field);
            if (fx - x > 0 || fx - x < 0) {
                if (field[y + 1][x + 1] != w || field[y + 1][x - 1] != w || field[y + 1][x + 1] != b || field[y + 1][x - 1] != b) {
                    let moving = fx - x
                    canibalism(field, message, x, y, fx, fy, moving);
                }
            }

            else if (field[fy][fx] == w || field[fy][fx] == b) {
                field[fy][fx] = field[y][x];
                field[y][x] = wab[y][x];
            }
            // do the or thingy so that the user cant type -x or 0
            console.log("Success");
        } else {
            message.channel.send("Not a Valid Move")
        }
    } else {
        if (fy - y == 2 || fy - y == 1) {
            //replace(field);
            console.log("Future field" + field[fy][fx])
            if (field[y + 1][x + 1] != w || field[y + 1][x - 1] != w || field[y + 1][x + 1] != b || field[y + 1][x - 1] != b) {
                let moving = fx - x;
                field[fy][x + moving] = field[y][x];
                field[y][x] = wab[y][x];
            }
            else if (field[fy][fx] == w || field[fy][fx] == b) {
                //stöp stöp
                field[fy][fx] = field[y][x];
                field[y][x] = wab[y][x];
                console.log('Success')
            } else {
                message.channel.send("Not a Valid Move")
            }
            // do the or thingy so that the user cant type -x or 0
        }
        else {
            message.channel.send("Non Non madame, c'est ne pas possible")
        }
    }
}
function blackpawn(field, message, x, y, fx, fy) {
    console.log("Current Field" + field[y][x]);
    let moved = false;
    if (y != 6) {
        moved = true
    }
    if (moved == true) {
        //   
        if (y - fy == 1) {

            //replace(field);
            if (fx - x > 0 || fx - x < 0) {
                if (field[y - 1][x + 1] != w || field[y - 1][x - 1] != w || field[y - 1][x + 1] != b || field[y - 1][x - 1] != b) {
                    let moving = fx - x
                    canibalism(field, message, x, y, fx, fy, moving);
                }
            }

            else if (field[fy][fx] == w || field[fy][fx] == b) {
            canibalism(field,message, x,y,fx,fy,0)
            }
            // do the or thingy so that the user cant type -x or 0
            console.log("Success");
        } else {
            message.channel.send("Not a Valid Move")
        }
    } else {
        if (y - fy == 2 || y - fy == 1) {
            //replace(field);
            console.log("Future field" + field[fy][fx])
            if (field[y - 1][x + 1] != w || field[y - 1][x - 1] != w || field[y - 1][x + 1] != b || field[y - 1][x - 1] != b) {
                let moving = fx - x;
                canibalism(field,message, x,y,fx,fy,moving);
            }
            else if (field[fy][fx] == w || field[fy][fx] == b) {
                //stöp stöp
                canibalism(field,message,x,y,fx,fy, 0)
                console.log('Success')
            } else {
                message.channel.send("Not a Valid Move")
            }
            // do the or thingy so that the user cant type -x or 0
        }
        else {
            message.channel.send("Non Non madame, ca'est ne pas possible")
        }
    }
}

function bishop(field, message, x, y, fx, fy) {
    let counts
    if (fy < y) {
        counts = y - fy
        for (let i = 0; i < counts; i++) {
            if (field[y + 1][x + 1] != w || field[y + 1][x - 1] != w || field[y + 1][x + 1] != b || field[y + 1][x - 1] != b) {
                let moving = fx - x;
                canibalism(field, message, x, y, fx, fy);
            }
        }
    }
    else if (fy > y) {
        counts = fy - y
        for (let i = 0; i < counts; i++) {
            if (fx - x > 0 || fx - x < 0) {
                if (field[y - 1][x + 1] != w || field[y - 1][x - 1] != w || field[y - 1][x + 1] != b || field[y - 1][x - 1] != b) {
                    let moving = fx - x
                    canibalism(field, message, x, y, fx, fy, moving);
                }
            }
        }
    }
}

function rook(field, message, x, y, fx, fy) {
    let vertical = false
    let horizontal = false
    let repetitions = 0
    if (field[y][x] == wr || field[y][x] == br) {
        if (fx - x >= 1 || fy - y >= 1 || fx - x <= -1 || fy - y <= -1) {
            if (x == fx) {
                vertical = true;
                repetitions = fy - y
            }
            else if (y == fy) {
                horizontal = true
                repetitions = fx - x
            }
            console.log(repetitions)
            if (horizontal) {
                console.log('hello')
            }
            /*
            for(let i = 0; DETECTED == false; i++) {
                if(field[x][y+i] != w || field[x][y+i] != b) {
                    detected = true; 
                }
            }

            for(let i = 0; DETECTED == false; i++) {
                if(field[x+i][y] != w || field[x+i][y] != b) {
                    detected = true; 
                }
            }

            for(let i = 0; DETECTED == false; i--) {
                if(field[x][y+i] != w || field[x][y+i] != b) {
                    detected = true; 
                }
            }

            for(let i = 0; DETECTED == false; i--) {
                if(field[x+i][y] != w || field[x+i][y] != b) {
                    detected = true; 
                }
            }
            */
        }
    }
}

function queen(field, message, x, y, fx, fy) {

}


function knight(field, message, x, y, fx, fy) {

    if (fx - x == 2 || x - fx == 2) {
        //fx = y 
        if (fy - y == 1 || y - fy == 1) {
            console.log("LINE 312 lol");
            canibalism(field, message, x, y, fx, fy, 0)
        } else {
            message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
        }
    } else if (fy - y == 2 || y - fy == 2) {
        if (fx - x == 1 || x - fx == 1) {
            console.log("LINE 321");
            canibalism(field, message, x, y, fx, fy, 0)
        } else {
            console.log('')
            // KNIGHT GOES 2 front or back then one left or right idiot @alex
            message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
        }
    }
    if (fx + x == 2 || x + fx == 2) {
        //fx = y 
        if (fy - y == 1 || y - fy == 1) {
            console.log("LINE 312 lol");
            canibalism(field, message, x, y, fx, fy, 0)
        } else {
            message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
        }
    } else if (fy + y == 2 || y + fy == 2) {
        if (fx - x == 1 || x - fx == 1) {
            console.log("LINE 321");
            canibalism(field, message, x, y, fx, fy, 0)
        } else {
            console.log('')
            // KNIGHT GOES 2 front or back then one left or right idiot @alex
            message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
        }
    }
}

function canibalism(field, message, x, y, fx, fy, moving) {
    let white = false;
    let black = false;
    let detected = false;


    for (let element of blackPawns) {
        console.log("asfasdfasdfasdasdasd");
        console.log(element, "-elemnt and ", field[y][x])
        if (field[y][x] == element) {
            black = true;
            console.log("it is the black")
            for (let thing of blackPawns) {
                console.log(thing + " COMPARET TO FIELD: " + field[fy][fx]);
                console.log("IS IT DETECTED" + detected);
                if (field[fy][fx] == thing) {
                    message.channel.send("NO CANIBALISM ALLOWED HERE (black pawns)");
                    detected = true;
                    break;
                }
            }
        }
    }


    if (black == false) {
        white = true;
        console.log("second");
    }

    if (white == true) {
        for (let element of whitePawns) {
            if (field[fy][fx] == element) {
                message.channel.send("NO CANIBALISM ALLOWED HERE");
                detected = true;
                break;
            }
        }
        console.log("THIS IS DETECTED: ", detected);

    }
    if (detected == false) {
        //console.log("worked white");
        //field[fy][fx] = field[y][x]
        if (moving == 0) {
            message.channel.send("POGGERS");
            field[fy][fx] = field[y][x]; //TODO: FIX  THE MOVING SHITE AMOUGS
            field[y][x] = wab[y][x];
        } else {
            field[fy][x + moving] = field[y][x]; //TODO: FIX  THE MOVING SHITE AMOUGS
            field[y][x] = wab[y][x];
        }
        //field[y][x] = wab[y][x]
        //message.channel.send("VANISHED");
        //*message.channel.send(getFormatedField());
    }
}



client.login(config.BOT_TOKEN)