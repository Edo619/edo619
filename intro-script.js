var socials = document.getElementById("socialsDiv");
var leftClips = document.getElementsByClassName("LeftClip");
var rightClips = document.getElementsByClassName("RightClip");
var bottomIntroText = document.getElementsByClassName("BottomIntroText");

function breakIntro(){
    
    socials.style.transform = "translateX(-150px)";
    for (var i = 0; i < leftClips.length; i++) {
        leftClips[i].style.transform = "translateX(-10000px)";
        rightClips[i].style.transform = "translateX(10000px)";
    }
    for (var i = 0; i < bottomIntroText.length; i++) {
        bottomIntroText[i].style.transform = "translateY(5000px)";
    }
    removeIntroElements();
}
function removeIntroElements() {
    setTimeout(function(){
        socials.style.display = "none";
        for (var i = 0; i < leftClips.length; i++) {
            leftClips[i].style.display = "none";
            rightClips[i].style.display = "none";
        }
        for (var i = 0; i < bottomIntroText.length; i++) {
            bottomIntroText[i].style.display = "none";
        }
    }
    , 1000);
}