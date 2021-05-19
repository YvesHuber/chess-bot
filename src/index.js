const { TextBasedChannel } = require("discord.js");
const { mainModule } = require("process");

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
    [br, bn, bb, bk, bq, bb, bn, br] //TODO: REVERSE
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
i = 0;

//makes field
function getFormatedField() {
    let formatedfield = "  ";

    field.forEach(value => {
        
        if(i == 0) {
            formatedfield +="\n " ;
        } else {
            formatedfield +=  "   " + i + "\n " ;
        }
        i++;
        
        value.forEach(element => {
            formatedfield += element;
        })
    });
    return formatedfield + "   " + i + "\n   a    b    c    d    e    f    g    h";
}
client.on("message", function (message) {

    client.user.setActivity("with Dimi THE god", {
        type: "STREAMING",
        url: "https://github.com/YvesHuber/chess-bot"
    });
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "") {
        fs.readFile('../help/help.txt', 'utf8', function (err, data) {
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
    else if (command === "steiner") {
        message.channel.send("Hallo Diego");
    }


    else if (command === 'chess') {

        const challenger = message.author
        let duelist = message.mentions.members.first()

        try {
            console.log(duelist.id)
        } catch (err) {
            message.channel.send("No member was mentiond")
            return
        }
        i = 0;
        message.channel.send(getFormatedField())
        round(field, challenger, duelist)


        function round(field, challenger, duelist) {
            let turncount = 0

            try {
                try {
                    client.on('message', message => {
                        if (message.author.bot) return;
                        if (message.content != "") {
                            if (checkMate(field, "w") == true || checkMate(field, "b") == true) {
                                return
                            }
                            if (message.author.id == challenger.id && turncount == 0) {

                                turncount = 1
                                let turnchall = message.content.split(" ")
                                turn(turnchall, "w")
                                message.channel.send("Turn over")
                                return;
                            }
                            else if (message.author.id === duelist.id && turncount == 1) {

                                turncount = 0
                                let turnduel = message.content.split(" ")
                                turn(turnduel, "b")
                                message.channel.send("Turn over")
                                return;
                            }
                            else if (message.author.id != challenger.id && message.author.id != duelist.id) {
                                message.channel.send("You are not playing")
                            }
                            
                            if (checkMate(field, "w") == true || checkMate(field, "b") == true) {
                                return
                            }
                            else {
                                round(field, challenger, duelist)
                            }
                            return
                        }
                        return
                    
                    })
                } catch (error) {

                }
                return


            } catch (err) {
                message.channel.send("Please only enter in this format <b1 b2>")
            }
            return
        }

        function fieldchooser(row, number) {
            let currentPos = new Object();
            index = 0
            //forms the array to x and y values
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


        function turn(turn, color) {

            try {
                currentrow = turn[0].slice(0, 1)
                currentnum = turn[0].slice(1, 2)
                futuretrow = turn[1].slice(0, 1)

                console.log("your enteries" + turn[0])
                futurenum = turn[1].slice(1, 2)
            }
            catch (err) {
                message.channel.send("Please only enter in this format <b1 b2>")
                return
            }
            currentfield = fieldchooser(currentrow, currentnum);
            futurefield = fieldchooser(futuretrow, futurenum);
            //Current Field
            let y = currentfield[0]; // should actually be y 
            let x = currentfield[1]; // should actually be x
            //Future Field
            let fy = futurefield[0];// should actually be fy 
            let fx = futurefield[1];// should actually be fx
            console.log("current Index", currentfield, "future Index", futurefield)
            if (field[y][x] == w || field[y][x] == b) {
                message.channel.send("No Valid Move")
                return
            }

            if (color == "w") {
                i = 0;
                switch (field[y][x]) {
                    case wp:
                        console.log("Pawn selected");
                        //pawn(field, message,x,y,fx,fy);
                        whitepawn(field, message, x, y, fx, fy);
                        message.channel.send(getFormatedField());
                        break
                    case wb:
                        console.log("bishop selected")
                        bishop(field, message, x, y, fx, fy);
                        message.channel.send(getFormatedField())
                        break; //coomer detected

                    case wn: // I AM I AM COOM
                        console.log("knight selected")
                        knight(field, message, x, y, fx, fy);
                        message.channel.send(getFormatedField())
                        break; //coomer detected
                    case wr:
                        console.log("White Rook");
                        rook(field, message, x, y, fx, fy);
                        message.channel.send(getFormatedField())
                        break;
                    case wk:
                        console.log("White King")
                        king(field, message, x, y, fx, fy)
                        message.channel.send(getFormatedField())
                        break;//aka breadlink;
                    case wq:
                        console.log("White Queen")
                        queen(field, message, x, y, fx, fy)
                        message.channel.send(getFormatedField())
                        break;
                    default:
                        message.channel.send("Wrong Field Selected")
                        break;
                }

            }
            else if (color == "b") {
                i = 0;
                switch (field[y][x]) {
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
                    case bn: // I AM RETARDED @everyone
                        console.log("KNIGHT SELECTED");
                        knight(field, message, x, y, fx, fy);
                        message.channel.send(getFormatedField());
                        break;
                    case bq:
                        console.log("Black Queen")
                        queen(field, message, x, y, fx, fy)
                        message.channel.send(getFormatedField())
                        break;
                    case bk:
                        console.log("Black King")
                        king(field, message, x, y, fx, fy)
                        message.channel.send(getFormatedField())
                        break;
                    default:
                        message.channel.send("Wrong Field Selected")
                        break;
                }
            }
        }
        console.log("Made the Move");
    }

    function king(field, message, x, y, fx, fy) {
        if (fx + 1 == x || fx == x || fx - 1 == x) {
            if (fy + 1 == y || fy == y || fy - 1 == y) {
                canibalism(field, message, x, y, fx, fy, 0)
            }
        }
    }

    function whitepawn(field, message, x, y, fx, fy) {
        console.log("Current Field" + field[y][x]);
        let moved = false;
        if (y != 1) {
            moved = true
        }
        if (fx - x != 0) {
            if (field[y + 1][x + 1] != w && field[y + 1][x + 1] != b || field[y + 1][x - 1] != w && field[y + 1][x - 1] != b) {
                canibalism(field, message, x, y, fx, fy, 0)
            }
            if (moved == true) {
                //   
                if (fy - y == 1) {
                } if (field[fy][fx] == w || field[fy][fx] == b) {
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
                if (field[fy][fx] == w || field[fy][fx] == b) {
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
                message.channel.send("Illegal Move")
            }
        }
    }
    function blackpawn(field, message, x, y, fx, fy) {
        console.log("Current Field" + field[y][x]);
        let moved = false;
        if (y != 6) {
            moved = true
        }
        if (fx - x != 0) {
            if (field[y - 1][x + 1] != w && field[y - 1][x + 1] != b || field[y - 1][x - 1] != w  && field[y - 1][x - 1] != b) {
                canibalism(field, message, x, y, fx, fy, 0)
            }
            if (moved == true) {
                //   
                if (y - fy == 1) {
                } if (field[fy][fx] == w || field[fy][fx] == b) {
                    field[fy][fx] = field[y][x];
                    field[y][x] = wab[y][x];
                }
            } else {
                message.channel.send("Not a Valid Move")
            }
        } else {
            if (y - fy == 2 || y - fy == 1) {
                console.log("Future field" + field[fy][fx])
                if (field[fy][fx] == w || field[fy][fx] == b) {
                    field[fy][fx] = field[y][x];
                    field[y][x] = wab[y][x];
                    console.log('Success')
                } else {
                    message.channel.send("Not a Valid Move ")
                }
                // do the or thingy so that the user cant type -x or 0
            }
            else {
                message.channel.send("Illegal")
            }
        }
    }

    function bishop(field, message, x, y, fx, fy) {
        if (fx - x < 0 && fy - y < 0) {
            console.log("You are Left Up")
            //Links Up
            let posx = -1
            let posy = -1

            for (i = 1; i < x - fx; i++) {
                console.log(field[y - i][x + i])
                if (field[y - i][x - i] == w || field[y - i][x - i] == b) {
                    posx--
                    posy--
                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x < 0 && fy - y > 0) {
            console.log("You are Left Down")
            //Links Down
            let posx = -1
            let posy = 1

            for (i = 1; i < x - fx; i++) {
                if (field[y + i][x - i] == w || field[y + i][x - i] == b) {
                    posx--
                    posy++

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x > 0 && fy - y > 0) {
            console.log("You are Right Down")
            //Rechts Unten
            let posx = 1
            let posy = 1

            for (i = 1; i < fx - x; i++) {
                if (field[y + i][x + i] == w || field[y + i][x + i] == b) {
                    posx++
                    posy++

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x > 0 && fy - y < 0) {
            console.log("You are Right Up")
            //Rechts Oben
            let posx = 1
            let posy = -1

            for (i = 1; i < fx - x; i++) {
                if (field[y - i][x + i] == w || field[y - i][x + i] == b) {
                    posx++
                    posy--

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
    }

    function rook(field, message, x, y, fx, fy) {
        if (fx - x >= 1 || fy - y >= 1 || fx - x <= -1 || fy - y <= -1) {
            if (fx - x > 0) {
                let posx = 1

                for (i = 1; i < fx - x; i++) {
                    if (field[y][x + i] == w || field[y][x + i] == b) {
                        posx++
                    }
                }
                canibalism(field, message, x, y, parseInt(x + posx), y, 0)
            } else if (fx - x < 0) {
                let posx = -1
                for (i = 1; i < x - fx; i++) {
                    if (field[y][x - i] == w || field[y][x - i] == b) {
                        posx--
                    }
                }

                canibalism(field, message, x, y, parseInt(x + posx), y, 0)
            } else if (fy - y > 0) {
                let posy = 1
                for (i = 1; i < fy - y; i++) {
                    if (field[y + i][x] == w || field[y + i][x] == b) {
                        posy++
                    }
                }
                canibalism(field, message, x, y, x, parseInt(y + posy), 0)
            } else if (fy - y < 0) {
                let posy = -1
                for (i = 1; i < y - fy; i++) {
                    if (field[y - i][x] == w || field[y - i][x] == b) {
                        posy--
                    }
                }
                canibalism(field, message, x, y, x, parseInt(y + posy), 0)
            }
        }
    }

    function queen(field, message, x, y, fx, fy) {
        //check Rotation
        if (fx - x < 0 && fy - y < 0) {
            console.log("You are Left Up")
            //Links Up
            let posx = -1
            let posy = -1

            for (i = 1; i < x - fx; i++) {
                console.log(field[y - i][x + i])
                if (field[y - i][x - i] == w || field[y - i][x - i] == b) {
                    posx--
                    posy--

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x < 0 && fy - y > 0) {
            console.log("You are Left Down")
            //Links Down
            let posx = -1
            let posy = 1

            for (i = 1; i < x - fx; i++) {
                if (field[y + i][x - i] == w || field[y + i][x - i] == b) {
                    posx--
                    posy++

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x > 0 && fy - y > 0) {
            console.log("You are Right Down")
            //Rechts Unten
            let posx = 1
            let posy = 1

            for (i = 1; i < fx - x; i++) {
                if (field[y + i][x + i] == w || field[y + i][x + i] == b) {
                    posx++
                    posy++

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        else if (fx - x > 0 && fy - y < 0) {
            console.log("You are Right Up")
            //Rechts Oben
            let posx = 1
            let posy = -1

            for (i = 1; i < fx - x; i++) {
                if (field[y - i][x + i] == w || field[y - i][x + i] == b) {
                    posx++
                    posy--

                } else {
                    return
                }

            }
            canibalism(field, message, x, y, parseInt(x + posx), parseInt(y + posy), 0)
        }
        if (fx - x >= 1 || fy - y >= 1 || fx - x <= -1 || fy - y <= -1) {
            if (fx - x > 0) {
                let posx = 1

                for (i = 1; i < fx - x; i++) {
                    if (field[y][x + i] == w || field[y][x + i] == b) {
                        posx++
                    }
                }
                canibalism(field, message, x, y, parseInt(x + posx), y, 0)
            } else if (fx - x < 0) {
                let posx = -1
                for (i = 1; i < x - fx; i++) {
                    if (field[y][x - i] == w || field[y][x - i] == b) {
                        posx--
                    }
                }

                canibalism(field, message, x, y, parseInt(x + posx), y, 0)
            } else if (fy - y > 0) {
                let posy = 1
                for (i = 1; i < fy - y; i++) {
                    if (field[y + i][x] == w || field[y + i][x] == b) {
                        posy++
                    }
                }
                canibalism(field, message, x, y, x, parseInt(y + posy), 0)
            } else if (fy - y < 0) {
                let posy = -1
                for (i = 1; i < y - fy; i++) {
                    if (field[y - i][x] == w || field[y - i][x] == b) {
                        posy--
                    }
                }
                canibalism(field, message, x, y, x, parseInt(y + posy), 0)
            }
        }

    }

    function knight(field, message, x, y, fx, fy) {

        if (fx - x == 2 || x - fx == 2) {
            //fx = y 
            if (fy - y == 1 || y - fy == 1) {
                console.log('did canni 1')
                canibalism(field, message, x, y, fx, fy, 0)
            } else {
                message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
            }
        } else if (fy - y == 2 || y - fy == 2) {
            if (fx - x == 1 || x - fx == 1) {
                console.log('did canni 2')
                canibalism(field, message, x, y, fx, fy, 0)
            } else {
                // KNIGHT GOES 2 front or back then one left or right idiot @alex
                message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
            }
        }
        if (fx + x == 2 || x + fx == 2) {
            //fx = y 
            if (fy - y == 1 || y - fy == 1) {
                console.log('did canni 3')
                canibalism(field, message, x, y, fx, fy, 0)
            } else {
                message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
            }
        } else if (fy + y == 2 || y + fy == 2) {
            if (fx - x == 1 || x - fx == 1) {
                console.log('did canni 4')
                canibalism(field, message, x, y, fx, fy, 0)
            } else {
                // KNIGHT GOES 2 front or back then one left or right idiot @alex
                message.channel.send('SCUMBAG GO DO RIGHT TURN L IDIOT')
            }
        }
    }

    function canibalism(field, message, x, y, fx, fy, moving) {
        console.log('cannibalism started')
        let white = false;
        let black = false;
        let detected = false;


        for (let element of blackPawns) {
            console.log(element, "-elemnt and ", field[y][x])
            if (field[y][x] == element) {
                black = true;
                console.log("it is the black")
                for (let thing of blackPawns) {
                    console.log(thing + " COMPARET TO FIELD: " + field[fy][fx]);
                    console.log("IS IT DETECTED" + detected);
                    if (field[fy][fx] == thing) {
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

                    detected = true;
                    break;
                }
            }
            console.log("THIS IS DETECTED: ", detected);
        }
        if (detected == false) {
            console.log("worked white");


            field[fy][fx] = field[y][x]; //TODO: FIX  THE MOVING SHITE AMOUGS
            field[y][x] = wab[y][x];

        }
    }
    function checkMate(field, color) {
        if (color == "w") {
            let count = 0
            for (let singlerow of field) {
                for (let singlefield of singlerow) {
                    console.log("white singlefield: " + singlefield);
                    count++
                    if (singlefield == wk) {
                        return false;
                    }
                    else if (count == 64) {
                        message.channel.send("Black side won!");
                        return true
                    }
                    //return false;
                }
            }
        } else {
            let count = 0
            for (let singlerow of field) {
                for (let singlefield of singlerow) {
                    count++
                    if (singlefield == bk) {
                        return false;
                    } else if (count == 64) {
                        message.channel.send("White side won!");
                        return true
                    }

                    //return false;
                }
            }
        }
    }

})
client.login(config.BOT_TOKEN)