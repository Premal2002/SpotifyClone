// latest update time and date = 31 July : 21:10

console.log("Welcome to spotify");

//initialize the variables
let songIndex = 0;
let totalSongs = 17;//o indexed
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let playGif = document.getElementById('playGif');
let masterSongName = document.getElementById('masterSongName');
songItems =Array.from(document.getElementsByClassName('songItem'));

let curSongID = -1;


let songs = [
    {songName : "Doraemon", filePath : "songs/1.mp3", coverPath : "covers/1.jpg",timeStamp : "1:44"},
    {songName : "Shinchan", filePath : "songs/2.mp3", coverPath : "covers/2.jpg",timeStamp : ""},
    {songName : "Ben-10", filePath : "songs/3.mp3", coverPath : "covers/3.jpg",timeStamp : ""},
    {songName : "Phineas and Ferb", filePath : "songs/4.mp3", coverPath : "covers/4.jpg",timeStamp : ""},
    {songName : "Chhota Bheem", filePath : "songs/5.mp3", coverPath : "covers/5.jpg",timeStamp : ""},
    {songName : "Oggy and Cockroaches", filePath : "songs/6.mp3", coverPath : "covers/6.jpg",timeStamp : ""},
    {songName : "Kick Buttowski", filePath : "songs/7.mp3", coverPath : "covers/7.jpg",timeStamp : ""},
    {songName : "Ultimate Spider-Man", filePath : "songs/8.mp3", coverPath : "covers/8.jpg",timeStamp : ""},
    {songName : "Roll No 21", filePath : "songs/9.mp3", coverPath : "covers/9.jpg",timeStamp : ""},
    {songName : "Motu Patlu", filePath : "songs/10.mp3", coverPath : "covers/10.jpg",timeStamp : ""},
    {songName : "Pokémon", filePath : "songs/11.mp3", coverPath : "covers/11.jpg",timeStamp : ""},
    {songName : "Kiteretsu Daihyakka", filePath : "songs/12.mp3", coverPath : "covers/12.jpg",timeStamp : ""},
    {songName : "The Return of Hanuman", filePath : "songs/13.mp3", coverPath : "covers/13.jpg",timeStamp : ""},
    {songName : "Ninja Hatori", filePath : "songs/14.mp3", coverPath : "covers/14.jpg",timeStamp : ""},
    {songName : "Little Krishna", filePath : "songs/15.mp3", coverPath : "covers/15.jpg",timeStamp : ""},
    {songName : "Ghatothkach", filePath : "songs/16.mp3", coverPath : "covers/16.jpg",timeStamp : ""},
    {songName : "Adventure of Hanuman", filePath : "songs/17.mp3", coverPath : "covers/17.jpg",timeStamp : ""},
    {songName : "Jake and Pirates", filePath : "songs/18.mp3", coverPath : "covers/18.jpg",timeStamp : ""},
]

songItems.forEach((element,i)=>{
    // console.log(element);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})


//audioElement play
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        //making small playbutton aside each song name play
        makeAllPlay();
        document.getElementById(songIndex).classList.remove('fa-play-circle');
        document.getElementById(songIndex).classList.add('fa-pause-circle');

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playGif.style.opacity = 1;
    }else{
        audioElement.pause();
        makeAllPlay();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playGif.style.opacity = 0;
    }
})

//Listen to the events
audioElement.addEventListener('timeupdate',()=>{
    // console.log("time update");
    //upadate seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change',()=>{
    //seek audio
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlay = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        // console.log("makeallplay");
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex = parseInt(e.target.id);
        // console.log(e.target.classList)
        // console.log(e.target.classList.contains('fa-circle-play'));
        if(e.target.classList.contains('fa-circle-play')){
            makeAllPlay();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            if(songIndex != curSongID){
                audioElement.src = `songs/${songIndex+1}.mp3`;
                masterSongName.innerText = songs[songIndex].songName;
                audioElement.currentTime = 0;
            }
            audioElement.play();
            playGif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            curSongID = songIndex;
        }else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            playGif.style.opacity = 0;
        }

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex > totalSongs-1){
        songIndex = 0;
    }else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

         //making small playbutton aside each song name play
         makeAllPlay();
         document.getElementById(songIndex).classList.remove('fa-play-circle');
         document.getElementById(songIndex).classList.add('fa-pause-circle');

        playGif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex == 0){
        songIndex = 6;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();

         //making small playbutton aside each song name play
         makeAllPlay();
         document.getElementById(songIndex).classList.remove('fa-play-circle');
         document.getElementById(songIndex).classList.add('fa-pause-circle');

        playGif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
});