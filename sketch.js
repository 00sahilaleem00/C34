var ball;
var database;
var reference, referenceValue, referencePosition;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    database = firebase.database();
    reference = database.ref("body/position");
}

function draw(){
    background("white");

    referenceValue = reference.on("value",addPosition);

    if(referencePosition !== undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    drawSprites();
}

function changePosition(x,y){
    reference.set({
        "x": referencePosition.x + x,
        "y": referencePosition.y +y
    })
}

function addPosition(data) {
    referencePosition = data.val();
    ball.x = referencePosition.x;
    ball.y = referencePosition.y;
}
