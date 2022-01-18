import{ spriteBank, tileMap, tileGenerator, txtMsgs, mobRealign } from "./graphics.js"
import { initializeAudio } from "./audio.js"

// GAME STATES //

let gameState = 0;
let storyState = 0;
let prevPos;
let currPos = 358; 
let nextPos;

// MOVEMENT, INPUT CONTROL, SPRITE PHYSICS //

const updateSprite = (currentIndex, newIndex, URL) => {    
    nextPos = (currentIndex + newIndex)
    if (tileMap[nextPos] != 9) {
        playerMove(newIndex, URL)
    }       
    if (nextPos == 76 || nextPos == 368) {
        portalJumper(nextPos)} 
    storyUpdater(nextPos);
}

const controlPanel = () => {
    document.addEventListener('keydown', e => {
        if (e.key == 'ArrowDown' || e.key == 's' || e.key == 'S') {
            updateSprite(currPos, 20, 0)
        } else if (e.key == 'ArrowUp' || e.key == 'w' || e.key == 'W') {
            updateSprite(currPos, -20, 1)
        } else if (e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A') {
            updateSprite(currPos, -1, 2)
        } else if (e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D') {
            updateSprite(currPos, 1, 3)
        } else if (e.key == 'Enter') {
            if (gameState == 0) {
                gameState = 1;
                txtMsgs.innerHTML = "MR. SKELETON IS LOST!"
                tileGenerator();
                initializeAudio();
            } 
        }
    })
}


const playerMove = (nextMove, spriteNum) => {
    prevPos = currPos;
    tileMap[prevPos] = 0;
    currPos += nextMove;
    tileMap[currPos] = 1;
    var divStyle = document.getElementById(prevPos);
    divStyle.style.backgroundImage = "none";
    divStyle = document.getElementById(currPos)
    divStyle.style.backgroundImage = spriteBank[spriteNum];
}

const portalJumper = (nextStep) => {
    if (nextStep == 368) {
        var endIndex = 368;
        var spriteIndex = 0;
        prevPos = currPos;
        currPos += -272;
        txtMsgs.innerHTML = "BONE TELEPORTER!"
    }
    else if (nextStep == 76) {
        var endIndex = 76;
        var spriteIndex = 3;
        prevPos = currPos;
        currPos += 293;
        txtMsgs.innerHTML = "QUANTUUUUM JUUUUMP!"
}
    tileMap[prevPos] = 0;
    tileMap[currPos] = 1;
    var divStyle = document.getElementById(prevPos)
    divStyle.style.backgroundImage = "none";
    divStyle = document.getElementById(currPos)
    divStyle.style.backgroundImage = spriteBank[spriteIndex]
    divStyle = document.getElementById(endIndex)
    divStyle.style.backgroundSize = "100%"
    divStyle.style.backgroundImage = spriteBank[9];
    divStyle.style.transform = ("rotate(270deg)")
}

// LOSING THE GAME //

const hookerDeath = () => {
    alert('GAME OVER! You were killed by the hooker.')
    var divStyle = document.getElementById(74)
    divStyle.style.backgroundSize = "100%"
    divStyle.style.backgroundImage = spriteBank[6];
    location.reload();
}

const prisonLockdown = (toBePos) => {
    for (let i = 274; i <= 276; i++) {
        tileMap[i] = 9;
        var divStyle = document.getElementById(i)
        divStyle.style.backgroundImage = spriteBank[5];
    }
    txtMsgs.innerHTML = "OH NO! WHY'S THE ROOM LOCKED?";
    if (toBePos == 274 || toBePos == 275 || toBePos  == 276) {
        alert("GAME OVER! Your ignoble actions got you imprisoned.")
        location.reload();
    }
}

// WINNING THE GAME //

const gameEnder = () => {
    var el = document.getElementById('grid');
    el.remove();
    txtMsgs.innerHTML = "CONGRATULATIONS! YOU ESCAPED AND FINISHED THE GAME! YOU'RE ONE HELL OF A SKELETON! PRESS 'ENTER' TO RELOAD THE PAGE";
    document.addEventListener('keydown', e => {
        if (e.key == 'Enter') {
            location.reload();
        }
        })
}

// STORY PROMPTS AND TEXTS //

const storyUpdater = (takePos) => {

                            // love letter //

if (nextPos == 116 && storyState == 0) {
storyState++;
txtMsgs.innerHTML = "YOU PICKED UP A LOVE LETTER"}

                            // hooker //

if (nextPos == 74 && storyState < 2) {
hookerDeath();}
if (nextPos == 94 && storyState < 2) {
txtMsgs.innerHTML = "WHO'S THIS FINE-LOOKING BABE?"}
if (nextPos == 94 && storyState == 2) {
txtMsgs.innerHTML = "DELIVER THE LOVEBIRD'S MESSAGE? Y/N"
advanceStory(storyState);}

                            // gold room //            

if (nextPos >= 234 && nextPos <= 236) {
if (tileMap[194] != 0 && tileMap[195] != 0 && tileMap[196] != 0) {
txtMsgs.innerHTML = "IS THIS GOLD WAITING FOR YOU?!"
}
}

if (tileMap[194] == 0 || tileMap[195] == 0 || tileMap[196] == 0) {
if (storyState >= 0 && storyState < 3) {
prisonLockdown(takePos);
} 
if (storyState == 3 && tileMap[194] == 0 && tileMap[195] == 0 && tileMap[196] == 0) {
txtMsgs.innerHTML = "ALL GOLD CHESTS HAVE BEEN COLLECTED!"
}

if (storyState == 3 && tileMap[194] == 0 && tileMap[195] == 0 && tileMap[196] == 0) {
if (nextPos == 294 || nextPos == 295 || nextPos == 296) {
txtMsgs.innerHTML = ""
storyState++;
console.log(storyState)}}
} 

                            // the orc warden //      

if (nextPos == 282 && storyState == 0) {
txtMsgs.innerHTML = "WHAT MADE THE ORC CRY?"}
if (nextPos == 282 && storyState == 1) {
txtMsgs.innerHTML = "GIVE LOVE LETTER TO THE ORC? Y/N";
advanceStory(storyState)}    

                           // escaped prisoners //

if (nextPos == 223 && storyState < 4 || nextPos == 243 && storyState < 4) {
txtMsgs.innerHTML = "THESE FUGITIVES WON'T TALK"}
if (nextPos == 223 && storyState == 4 || nextPos == 243 && storyState == 4) {
txtMsgs.innerHTML = "BRIBE CULPRITS TO GO BACK TO PRISON? Y/N";
advanceStory(storyState)}        

                            // end of game //

if (nextPos == 88 && storyState == 5) { dialogue(6) }
if (storyState == 5 && nextPos == 40) { gameEnder() }
}



const dialogue = (prompt) => {
    switch (prompt) {
    case 2:
        txtMsgs.innerHTML = "ORC: SHE WANTS ME! BUT I CAN'T LEAVE BEFORE THE PRISONERS ARE BACK IN THEIR CELL"
        break;
    case 3:
        txtMsgs.innerHTML = "HOOKER: ALWAYS ON WARDEN DUTY THAT ORC! OK, GIVE THOSE CRIMINALS MY PRECIOUS PROSTITUTE GOLD"
        break;
    case 4:
        txtMsgs.innerHTML = "ALL GOLD CHESTS HAVE BEEN COLLECTED!"
        break;         
    case 5:
        txtMsgs.innerHTML = "FUGITIVES: WE'RE GOING BACK TO PRISON, BUT NOT FOR LONG! MUHAHAHAHA"
        mobRealign()
        break;    
    case 6:
        txtMsgs.innerHTML = "HOOKER: CAN'T YOU SEE WE'RE SHAGGING? PISS OFF!"
        break;    
    }
}

const advanceStory = (storyNow) => {
var prevStory = storyNow;
document.addEventListener('keydown', e => {
    if (e.key == 'Y' || e.key == 'y') {
        if (prevStory == storyNow) {
            storyNow++
            storyState++;
            console.log(storyState)
            dialogue(storyNow)}
            }
        })
    }





export { updateSprite, controlPanel, playerMove, portalJumper, hookerDeath, prisonLockdown, }
