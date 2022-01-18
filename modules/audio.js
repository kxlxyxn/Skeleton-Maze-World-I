// AUDIO //

const myAudio = new Audio('audio/surf.mp3');

const initializeAudio = () => {
    if (typeof myAudio.loop == 'boolean'){
        myAudio.loop = true;
    } else { myAudio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();}, false);}
    myAudio.play();
}

export { myAudio, initializeAudio } 