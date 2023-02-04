song_1="music.mp3";
song_1_status="";
song_2="music2.mp3";
song_2_status="";
rightWristY=0;
rightWristX=0;
leftWristY=0;
leftWristX=0;
scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
song_1=loadSound("music.mp3");
song_2=loadSound("music2.mp3")
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function draw(){
    image(video,0,0,400,400);
    song_1_status=song_1.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(song_1_status==false){
            song_1.play();
            document.getElementById("cancion").innerHTML="Harry Poter";
        }
        
    }
    song_2_status=song_2.isPlaying();
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        song_1.stop();
        if(song_2_status==false){
            song_2.play();
            document.getElementById("cancion").innerHTML="Peter pan";
        }
    }
}
function modelLoaded(){
console.log("El modelo esta cargado");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristX=results[0].pose.rightWrist.x;
        leftWristX=results[0].pose.leftWrist.x;
        ightWristY=results[0].pose.rightWrist.y;
        leftWristY=results[0].pose.leftWrist.y;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("leftWristX= "+ leftWristX + " leftWristY= " + leftWristY + " rightWristX= " + rightWristX + " rightWristY= "  + rightWristY)
    }
}