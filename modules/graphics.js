// GRID, SPRITES, TILES //

const grid = document.getElementById("grid")
const txtMsgs = document.querySelector("#txtMsgs");

const spriteBank = [
    "url(img/wd_01.png)",
    "url(img/wu_01.png)",
    "url(img/wl_01.png)",
    "url(img/wr_01.png)",
    "url(img/chest.png)",
    "url(img/prison.png)",
    "url(img/hooker.png)",
    "url(img/moss_wall.png)",
    "url(img/stone_wall.jpg)",
    "url(img/portal.gif)",
    "url(img/orc.gif)",
    "url(img/mage.gif)", //12, index 11
    "url(img/envelope.png)"
]

let tileMap = [
    8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 8, 9, 9, 9, 9, 9, 9, 9, 9, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 0, 0, 9, 3, 9, 7, 9, 0, 9,
    9, 9, 9, 8, 0, 0, 9, 9, 0, 9, 0, 0, 0, 9, 0, 9, 0, 9, 0, 9,
    9, 0, 0, 9, 0, 0, 9, 0, 0, 9, 0, 0, 0, 9, 0, 0, 6, 9, 0, 9,
    9, 0, 0, 9, 0, 0, 9, 9, 9, 9, 0, 0, 0, 9, 9, 9, 9, 9, 0, 9,
    9, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 0, 0, 8, 9, 9, 0, 0, 0, 0, 0, 9, 0, 8, 9, 9, 9, 8, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 9, 8, 9, 0, 0, 0, 9, 5, 5, 5, 9, 0, 9,
    9, 0, 9, 9, 9, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0, 9, 0, 9,
    9, 0, 0, 0, 2, 9, 0, 8, 0, 8, 0, 9, 0, 9, 0, 0, 0, 9, 0, 9,
    9, 0, 0, 0, 2, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 0, 0, 9, 0, 9,
    9, 8, 9, 8, 9, 8, 0, 9, 0, 9, 0, 9, 9, 9, 0, 0, 0, 9, 0, 9,
    9, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,
    9, 4, 4, 4, 4, 4, 4, 9, 8, 9, 9, 9, 0, 9, 9, 9, 9, 9, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 8, 9, 9, 0, 9, 0, 0, 0, 0, 0, 9, 0, 9,
    9, 0, 0, 0, 0, 0, 0, 9, 9, 9, 0, 9, 9, 9, 9, 9, 0, 9, 1, 9,
    9, 0, 0, 0, 0, 0, 0, 9, 7, 0, 0, 0, 0, 0, 0, 0, 0, 9, 0, 9,
    8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8
]

const tileGenerator = () => {
    for (let i = 0; i < tileMap.length; i++) {
        grid.innerHTML += `<div id="${i}" class="tile" onClick="reply_click(this.id)"> &nbsp; </div>`
        var divStyle = document.getElementById(i)
        divStyle.style.backgroundSize = "100%"

        if (tileMap[i] == 1) {
            divStyle.style.backgroundImage = spriteBank[1];
        }    

        if (tileMap[i] == 9) {
            divStyle.style.backgroundImage = spriteBank[8];
        }    
        if (tileMap[i] == 2) {
            divStyle.style.backgroundImage = spriteBank[11];
            tileMap[i] = 9;
        }   

        if (tileMap[i] == 7) {
            divStyle.style.backgroundImage = spriteBank[9];
            divStyle.style.transform = ("rotate(270deg)")
        }

        if (tileMap[i] == 5) {
            divStyle.style.backgroundImage = spriteBank[4];
        }
    
        if (tileMap[i] == 4) {
            divStyle.style.backgroundImage = spriteBank[5];
            tileMap[i] = 9;
        }

        if (tileMap[i] == 6) {
            divStyle.style.backgroundImage = spriteBank[12];
        }
    
        if (tileMap[i] == 3) {
            divStyle.style.backgroundImage = spriteBank[6];
            tileMap[i] = 9;
        }

        if (tileMap[i] == 8) {
            divStyle.style.backgroundImage = spriteBank[7];
            tileMap[i] = 9;
        }

        if (tileMap[i] == 13) {
            divStyle.style.backgroundImage = spriteBank[10];
            tileMap[i] = 9;
        }
    }

}


const mobRealign = () => {
    tileMap[40] = 0;
    var divStyle = document.getElementById(40);
    divStyle.style.backgroundImage = "none";

    tileMap[224] = 0;
    tileMap[244] = 0;
    tileMap[74] = 0;
    tileMap[281] = 0;
    divStyle = document.getElementById(224);
    divStyle.style.backgroundImage = "none";
    divStyle = document.getElementById(244);
    divStyle.style.backgroundImage = "none";
    divStyle = document.getElementById(74);
    divStyle.style.backgroundImage = "none";
    divStyle = document.getElementById(281);
    divStyle.style.backgroundImage = "none";
    tileMap[107] = 9;
    tileMap[108] = 9;
    tileMap[343] = 9;
    tileMap[344] = 9;
    divStyle = document.getElementById(107);
    divStyle.style.backgroundImage = spriteBank[10];
    divStyle = document.getElementById(108);
    divStyle.style.backgroundImage = spriteBank[6];
    divStyle = document.getElementById(343);
    divStyle.style.backgroundImage = spriteBank[11];
    divStyle = document.getElementById(344);
    divStyle.style.backgroundImage = spriteBank[11];
}

export {spriteBank, tileMap, tileGenerator, mobRealign, txtMsgs}
