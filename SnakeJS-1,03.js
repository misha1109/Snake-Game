var game;
var timerRun;
var canvas;
function runGame(mode)
{
    canvas=document.getElementById("snakeCanvas")
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $('#snakeCanvas').show();
    // $('#snake').show();
    // $('#menu').hide(); 
    // create the unit size
    const box = 32;

    // load images
    const ground = new Image();
    ground.src = "images and AI/grass3.png";
    let foodImg = new Image();
    foodImg.src="images and AI/fruits/fru1.png";
    let foodImgSelect=new Array();
    for(let i=0;i<4;i++){foodImgSelect[i]=new Image();foodImgSelect[i].src="images and AI/fruits/fru"+(i+1)+".png";}
    function chooseFood()
    {
        let x=(Math.floor(Math.random()*4)+0);
        foodImg.src= foodImgSelect[x].src;
    }
    // create the snake
    var imgSnakeHead = new Image();
    var imgSnakeScale=new Image();
    imgSnakeHead.src = "images and AI/snake-head2.png";
    imgSnakeScale.src="images and AI/snake-scale2.png";

    let snake = [];

    //initial snake location
    snake[0] = 
    {
        x : 9 * box,
        y : 1 * box+81
    };

    // create initial food
    let food = 
    {
        x : (Math.floor(Math.random()*17)+0) * box,
        y : (Math.floor(Math.random()*10)+0) * box+81
    };

    let gameOver=false;
    // create the score var
    let score = 0;

    //key controls
    let d;

    document.addEventListener("keydown",direction);

    let keyPushed=false;
    function direction(event){
        let key = event.keyCode;
        let pushed=false;
        for(let i=37;i<41;i++){if(key==i){pushed=true;}}
        if(key in [37,38,39,40])    pushed=true
        if(pushed)
        {
            keyPushed=true;
            if (key == 37 && d != "RIGHT")
            {
                d = "LEFT";
            }
            else if (key == 38 && d != "DOWN")
            {
                d = "UP";
            }
            else if (key == 39 && d != "LEFT")
            {
                d = "RIGHT";
            }
            else if (key == 40 && d != "UP")
            {
                d = "DOWN";
            }
        }
    }
    // check if collision function
    function collision(head,array)
    {
        for(let i = 0; i < array.length; i++)
        {
            if(head.x == array[i].x && head.y == array[i].y)
            {
                return true;
            }
        }
        return false;
    }
    //main function draw
    function draw(){
        ctx.drawImage(ground, 0, 0);
        //drawing the snake
        for( let i = 0; i < snake.length ; i++)
        {
            if(i==0){ctx.drawImage(imgSnakeHead,snake[i].x,snake[i].y)}
            else{ctx.drawImage(imgSnakeScale,snake[i].x,snake[i].y);}
        }
        ctx.drawImage(foodImg, food.x, food.y);
        
        // old head position
        let oldHeadeX = snake[0].x;
        let oldHeadY = snake[0].y;
        
        // which direction
        if( d == "LEFT") oldHeadeX -= box;
        if( d == "UP") oldHeadY -= box;
        if( d == "RIGHT") oldHeadeX += box;
        if( d == "DOWN") oldHeadY += box;
        
        // if the snake eats the food
        if(oldHeadeX == food.x && oldHeadY == food.y)
        {
            score++;
            food = 
            {
                x : (Math.floor(Math.random()*17)+0) * box,
                y : (Math.floor(Math.random()*10)+0) * box+81
            }
            chooseFood();
        }
        else
        {
            // remove the tail
            snake.pop();
        }
        
        // add new Head
        let newHead = 
        {
            x : oldHeadeX,
            y : oldHeadY
        }
        
        drawMode(mode)
        
        //add new head
        snake.unshift(newHead);
        
        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";
        ctx.fillText(score,box,1.6*box);
        function drawMode(mode){
            if(collision(newHead,snake)){
                gameOver=true;
                clearInterval(game,timerRun);
            }
            if(mode=='regular'){
                if(oldHeadeX < -1 || oldHeadeX > 21 * box || oldHeadY < 81 || oldHeadY > 9*box+81)
                    {
                        gameOver=true;
                        clearInterval(game,timerRun);
                    }
            }
            else if(mode=='snake2'){
                if(oldHeadeX<-1){
                    newHead.x=21*box}
                else if(oldHeadeX>21*box){
                    newHead.x=-1}
                else if(oldHeadY<81){
                    newHead.y=9*box+81}
                else if(oldHeadY>9*box+81){
                    newHead.y=81}
            }
        }
    }
    let difficulty=100;
    let timeShow=10000;
    // function timerDraw()
    // {
    //     if(keyPushed)
    //     {
    //         if(difficulty==55){
    //             clearInterval(timerRun);}
    //         timeShow--;
    //         if(timeShow==0){
    //             timeShow=1000;difficulty-=15;clearInterval(game);game=setInterval(draw,difficulty)}
    //         if(timeShow%10==0){
    //             timeShow--;}
    //         ctx.fillText("Timer: ",12*box,1.6*box);
    //         ctx.fillText(parseInt(timeShow/100),17*box,1.6*box);
    //     }
    // }
    // timerRun=setInterval(timerDraw,1)
    game = setInterval(draw, 100);
}

function backButton()
{
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(game,timerRun);
    $('#snakeCanvas').hide();
    // // $('#back').hide();
    // $('#menu').show(); 
}



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDownTab() {
    document.getElementById("dropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


















