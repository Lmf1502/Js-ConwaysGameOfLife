let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let Next = document.getElementById("next");
Next.addEventListener('click',nextFrame);
let Start = document.getElementById("start");
Start.addEventListener('click',startAnimation);
let Stop = document.getElementById("stop");
Stop.addEventListener('click',stopAnimation);
let Faster= document.getElementById("faster");
Faster.addEventListener('click',increaseSpeed);
let Slower = document.getElementById("slower");
Slower.addEventListener('click',decreaseSpeed);
canvas.height = Math.floor(window.innerHeight);
canvas.width = Math.floor(window.innerWidth);
let CellSize=20;
let rows = Math.floor(canvas.height/CellSize);
let columbs = Math.floor(canvas.width/CellSize);
let GRIDA=[];
let GRIDB=[];
class Cell{
    constructor(columb,row){
        this.columb=columb;
        this.row=row;
        this.alive = false;
    }
    show(){
        if(this.alive){
            ctx.strokeRect(this.columb*CellSize,this.row*CellSize,CellSize,CellSize);
            ctx.fillStyle = "#67E236";
            ctx.fillRect(this.columb*CellSize,this.row*CellSize,CellSize,CellSize);
        }else{
            ctx.strokeStyle = "white";
            ctx.strokeRect(this.columb*CellSize,this.row*CellSize,CellSize,CellSize);
            ctx.fillStyle = "Black";
            ctx.fillRect(this.columb*CellSize,this.row*CellSize,CellSize,CellSize);
            ctx.strokeStyle = "black";

        }
    }
}
function fillGird(Grid){
    for(let j = 0; j <rows; j++){
        for(let i = 0; i < columbs; i++){
            Grid.push(cell = new Cell(i,j));
        }
    }
}
function showGrid(Grid){
    for(let i = 0; i < Grid.length; i++){
        Grid[i].show();
    }
}
function random(min,max){
    let R = Math.random();
    R = Math.floor(R*((max+1)-min)+min);
    return R;
}
function randomGrid(Grid){
    for(let i = 0; i < Grid.length; i++){
        let RG = random(0,5);
        if(RG==0){
            Grid[i].alive=true;
        }
    }
}
function index(x,y){
    if(x>=0 && x<columbs && y>=0 && y<rows){
        let I = x+(y*columbs);
        return I;
    }
    return null;
}
function checkNeighbor(grid,cell){
    let neighborCount = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            let dx= cell.columb + i;
            let dy = cell.row + j;
            let inx = index(dx,dy);
            if(i === 0 && j === 0) continue;
            if(inx !== null && grid[inx].alive){
                neighborCount++;
            }
        }      
    }
    return neighborCount;
}
function turn(grid1,grid2){
    for(let i = 0; i < grid1.length; i++){
        let count = checkNeighbor(grid1,grid1[i]);
        //console.log(`(${grid1[i].columb},${grid1[i].row});#:${count}`);
        let alive = grid1[i].alive;
        //console.log(alive);
        grid2[i].alive = alive ? (count === 2 || count === 3):(count === 3);
    }
    for(let i = 0; i < grid1.length; i++){
        grid1[i].alive=grid2[i].alive;
    }
}
let lastFrameTime = 0;
let fps = 5;
let frameDuration = 1000 / fps;
let running = true;
function animate(currentTime){
    if(!running) return;
    let deltaTime = currentTime - lastFrameTime;
    if(deltaTime >= frameDuration){
        lastFrameTime = currentTime;
        turn(GRIDA,GRIDB);
        showGrid(GRIDA);
    }
    requestAnimationFrame(animate);
}
function startAnimation(){
    running = true;
    requestAnimationFrame(animate);
}
function stopAnimation(){
    running = false;
}
function increaseSpeed(){
    fps = fps+1;
    frameDuration = Math.floor(1000 / fps);
}
function decreaseSpeed(){
    fps = fps-1;
    frameDuration = Math.floor(1000 / fps);
}
function nextFrame(){
    turn(GRIDA,GRIDB);
    showGrid(GRIDA);
}
fillGird(GRIDA);
fillGird(GRIDB);
function Blinker(grid,columb,row){
    grid[index(columb,row)].alive = true;
    grid[index(columb,row+1)].alive = true;
    grid[index(columb,row+2)].alive = true;
}
function Block(grid,columb,row){
    grid[index(columb,row)].alive = true;
    grid[index(columb+1,row+1)].alive = true;
    grid[index(columb+1,row)].alive = true;
    grid[index(columb,row+1)].alive = true;
}
function Glider(grid,columb,row){
    grid[index(columb,row)].alive = true;
    grid[index(columb+1,row+1)].alive = true;
    grid[index(columb+1,row+2)].alive = true;
    grid[index(columb,row+2)].alive = true;
    grid[index(columb-1,row+2)].alive = true;
}
function Rpentomino(grid,columb,row){
    grid[index(columb,row)].alive = true;
    grid[index(columb+1,row)].alive = true;
    grid[index(columb-1,row+1)].alive = true;
    grid[index(columb,row+1)].alive = true;
    grid[index(columb,row+2)].alive = true;
}
function Toad(grid,columb,row){
    Blinker(grid,columb,row);
    Blinker(grid,columb+1,row+1);

}
randomGrid(GRIDA);
/*Toad(GRIDA,Math.floor(columbs/2)+2,Math.floor(rows/2)+2);
Blinker(GRIDA,Math.floor(columbs/2),Math.floor(rows/2));
Block(GRIDA,2,2);
Glider(GRIDA,6,4);
Glider(GRIDA,11,4);
Glider(GRIDA,16,4);
Rpentomino(GRIDA,10,10);
Rpentomino(GRIDA,columbs-10,rows-10);
Rpentomino(GRIDA,Math.floor(columbs/2)-1,Math.floor(rows/2))-1;*/
showGrid(GRIDA);