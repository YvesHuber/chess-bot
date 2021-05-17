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

    client.user.setActivity("with the one and only god Dimi", {
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

    else if (command === "cheese") {
        message.channel.send("🧀");
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
                            console.log(row)
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
                            futurenum = turn[1].slice(1, 2)
                        }
                        catch (err) {
                            message.channel.send("Please only enter in this format <b1 b2>")
                            return
                        }
                        let hasMoved = false;
                        currentfield = fieldchooser(currentrow, currentnum)
                        futurefield = fieldchooser(futuretrow, futurenum)
                        console.log("current Index", currentfield, "future Index", futurefield)
                        console.log(typeof (field[currentfield]))
                        console.log(field[currentfield[0]][currentfield[1]])
                        if (field[currentfield[0]][currentfield[1]] == w || field[currentfield[0]][currentfield[1]] == b) {
                            message.channel.send("No Valid Move")
                            return
                        }
                        /*else {
                                                    // zukunft = currentfield <pawn>
                        
                                                    field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
                                                    field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]]
                        
                                                }*/

                        //FUNCTIONS FOR PAWNS
                        switch (field[currentfield[0]][currentfield[1]]) {
                            case wp:
                                console.log("Pawn selected");
                                pawn(field, currentfield, futurefield, message);
                                message.channel.send(getFormatedField());
                                break;
                            case bn:
                                console.log("KNIGHT SELECTED");
                                knight(field, currentfield, futurefield, message);
                                console.log("went through function");

                                break;
                            //message.channel.send(getFormatedField())
                        }
                    }
                });
            } catch (err) {
                message.channel.send("Please only enter in this format <b1 b2>")
            }
        }
    }
})

//TODO: Fix canibalism among us (sus) same coloured pawns (a7 eats a6 black pawn) TODO: waht ?
function pawn(field, currentfield, futurefield, message) {
    if (field[currentfield[0]][currentfield[1]] == wp) {
        // y2white and y7black 
        if (currentfield[0] != 1) {
            hasMoved = true;
        } else {
            hasMoved = false;
        }

        if (field[currentfield[0] + 1][currentfield[1] + 1] != w || field[currentfield[0] + 1][currentfield[1] + 1] != b || field[currentfield[0] + 1][currentfield[1] - 1] != w || field[currentfield[0] + 1][currentfield[1] - 1] != b) {
            field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
            field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
        }

        if (hasMoved == true) {

            if (futurefield[0] - currentfield[0] == 1) {
                if (field[futurefield[0]][futurefield[1]] == w || field[futurefield[0]][futurefield[1]] == b) {
                    field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
                    field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
                } else {
                    message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM moved true + bw")
                }
            } else {
                message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM moved true")
            }
        } else {
            if (futurefield[0] - currentfield[0] == 2 || futurefield[0] - currentfield[0] == 1) {
                if (field[futurefield[0]][futurefield[1]] == w || field[futurefield[0]][futurefield[1]] == b) {
                    console.log("Inside 2 or 1 wp");
                    field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
                    field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
                } else {
                    message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM + bw")
                }
            } else {
                message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM /")
            }
        }

        // HERE BEGINS BLACK PAWN
    } else if (field[currentfield[0]][currentfield[1]] == bp) {
        if (currentfield[0] != 6) {
            hasMoved = true;
        } else {
            hasMoved = false;
        }

        if (field[currentfield[0] - 1][currentfield[1] + 1] != w || field[currentfield[0] - 1][currentfield[1] + 1] != b || field[currentfield[0] - 1][currentfield[1] - 1] != w || field[currentfield[0] - 1][currentfield[1] - 1] != b) {
            field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
            field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
        }


        if (hasMoved == true) {
            if (currentfield[0] - futurefield[0] == 1) {
                if (field[futurefield[0]][futurefield[1]] == w || field[futurefield[0]][futurefield[1]] == b) {
                    field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
                    field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
                } else {
                    message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM moved true bw black")
                }
            } else {
                message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM moved true black")
            }
        } else {
            if (field[futurefield[0]][futurefield[1]] == w || field[futurefield[0]][futurefield[1]] == b) {
                if (currentfield[0] - futurefield[0] == 2 || currentfield[0] - futurefield[0] == 1) {
                    console.log("Inside 2 or 1 wp");
                    field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]];
                    field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]];
                } else {
                    message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM moved true bw black")
                }
            } else {
                message.channel.send("STOP RIGHT THERE YOU CRIMMINAL SCUM /")
            }
        }
    }


}

// WHITE PAWN: if currentpos  y+1 x+1 OR y+ x-1 != w or b -> you can eat
// BLACK PAWN: if currentpos y-1 x+1 OR y-1 x-1 != w or b -> you can eat
// TODO: knight: can move in L or in cappital Gamma (Γ)
// + 10/6 - 10/6   + 15/17 -15/17
// dishop: can move in diagonal() + 9/7 - 9/7
// rook: can move in cross() +8,16,24,32,40,48,56,64  +1,2,3,4,5,6,7,8 -1,2,3,4,5,6,7,8 -8,16,24,32,40,48,56,64

function bishop(field, currentfield, futurefield, message) {

}

function rook(field, currentfield, futurefield, message) {

}
function queen(field, currentfield, futurefield, message) {

}


function knight(field, currentfield, futurefield, message) {
    if (field[currentfield[0]][currentfield[1]] == wn || field[currentfield[0]][currentfield[1]] == bn) {
        if (futurefield[0] - currentfield[0] == 2 || currentfield[0] - futurefield[0] == 2) {
            //futurefield[0] = y 
            if (futurefield[1] - currentfield[1] == 1 || currentfield[1] - futurefield[1] == 1) {
                console.log("LINE 312");
                canibalism(field, currentfield, futurefield, message);

            } else {
                message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
            }
        }
    } else if (futurefield[1] - currentfield[1] == 2 || currentfield[1] - futurefield[1] == 2) {
        if (futurefield[0] - currentfield[0] == 1 || currentfield[0] - futurefield[0] == 1) {
            console.log("LINE 321");
            canibalism(field, currentfield, futurefield, message);

        } else {
            console.log('')
            // KNIGHT GOES 2 front or back then one left or right idiot @alex
            message.channel.send('SCUMBG GO DO RIGHT TURN L IDIOT')
        }
    }
}


function canibalism(field, currentfield, futurefield, message) {
    let white = false;
    let black = false;
    let detected = false;


    for (let element of blackPawns) {
        console.log("asfasdfasdfasdasdasd");
        console.log(element, "-elemnt and ", field[currentfield[0]][currentfield[1]])
        if (field[currentfield[0]][currentfield[1]] == element) {
            black = true;
            console.log("it is the black")
            for (let thing of blackPawns) {
                console.log(thing + " COMPARET TO FIELD: " + field[futurefield[0]][futurefield[1]]);
                if (field[futurefield[0]][futurefield[1]] == thing) {
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
            if (field[futurefield[0]][futurefield[1]] == element) {
                message.channel.send("NO CANIBALISM ALLOWED HERE");
                detected = true;
                break;
            }
        }
        console.log("THIS IS DETECTED: ", detected);
        if (detected == false) {
            console.log("worked white");
            field[futurefield[0]][futurefield[1]] = field[currentfield[0]][currentfield[1]]
            message.channel.send("POGGERS");
            field[currentfield[0]][currentfield[1]] = wab[currentfield[0]][currentfield[1]]
            message.channel.send("VANISHED");
            message.channel.send(getFormatedField());
        }
    }
}



client.login(config.BOT_TOKEN);