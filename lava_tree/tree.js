var canvas = document.getElementById("myCanvas");
canvas.addEventListener("mousedown", doMouseDown, false);
var ctx = canvas.getContext("2d");
canvas.style.width ='100%';
canvas.style.height='100%';

canvas.width = canvas.getBoundingClientRect().width
canvas.height = canvas.getBoundingClientRect().height
var width = canvas.width;
var height = canvas.height;

var mouseX = 0;
var mouseY = 0;

var last_frame = Date.now()
var this_frame = Date.now()

function init() {
    last_frame = Date.now()
    this_frame = Date.now()
    window.requestAnimationFrame(draw);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
    window.requestAnimationFrame(draw);
}

function drawCircle(ctx, x, y, radius, fill, stroke, strokeWidth) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)
    if (fill) {
        ctx.fillStyle = fill
        ctx.fill()
    }
    if (stroke) {
        ctx.lineWidth = strokeWidth
        ctx.strokeStyle = stroke
        ctx.stroke()
    }
}



class Node{
    constructor(){
        this.parent = null
        this.children = []

        this.label = ""
        this.image = null

        this.selected = false

        this.intree = false
        this.x = 100
        this.y = 100
        this.wid = 20
        this.hei = 20
    }

    computewidth(){
        return this.wid
    }
    computeheight(){
        return this.hei
    }

    draw(){
        if(this.selected){
            //ctx.fillStyle = "#444444"
            drawCircle(ctx, this.x, this.y, 10, 'black', 'blue', 5)
        }else{
            //ctx.fillStyle = "#000000"
            drawCircle(ctx, this.x, this.y, 10, 'black', 'red', 5)
        }

        drawCircle(ctx, this.x, this.y, 10, 'black', 'red', 5)
    }
}

//make trees contain node, and trees. 

//x and y of tree are top left corner
class Tree{
    constructor(x, y, node){
        this.x = x
        this.y = y
        this.node = node
        this.children = [] //list of trees
        this.parent = null

        this.widthcomputed = true
        this.width = this.node.width
        this.heightcomputed = true
        this.height = this.node.height

        this.positionscomputed = false
    }

    addChild(child){
        this.child.parent = this
        this.children.push(child);
        this.widthcomputed = false;
        this.heightcomputed = false;
        if(this.parent){
            this.parent.widthcomputed = false
            this.parent.heightcomputed = false;
        }

        this.positionscomputed = false
    }

    computewidth(){
        if(this.widthcomputed){
            return this.width;
        }

        var fattestson = 0

        for(let i = 0; i < this.children.length; i++){
            if(this.children[i].computewidth() > fattestson){
                fattestson = this.children[i].computewidth()
            }
        }

        fattestson += this.node.width;

        fattestson += 20;

        this.width = fattestson
        this.widthcomputed = true;
        return this.widths
    }

    computeheight(){
        if(this.heightcomputed){
            return this.height;
        }

        var totalheight = 0

        for(let i = 0; i < this.children.length; i++){
            totalheight += this.children[i].computeheight();
            totalheight += 20;
        }
        totalheight -= 20

        if(totalheight < this.node.height){
            this.height = this.node.height;
            this.heightcomputed = true;
            return this.height
        }

        this.height = totalheight
        this.heightcomputed = true;
        return this.height
    }

    computepositions(){
        if(this.positionscomputed){
            return
        }

        this.computewidth()
        this.computeheight()
        
        this.node.x = this.x + this.node.width/2;
        this.node.y = this.y + this.height/2

        this.scan = y;
        for(let i = 0; i < this.children.length; i++){
            this.children[i].x = this.x + this.node.width + 20;
            this.children[i].y = this.scan;
            this.children[i].computepositions();
            
            this.scan += this.children[i].computeheight();
            this.scan += 20;
        }

        this.positionscomputed = true
    }
    
    draw(){

    }
}

class Root{
    constructor(vertpadding, horizpadding){
        this.vertpadding = vertpadding
        this.horizpadding = horizpadding
    }
}

var testnode = new Node()


var seconds = 0;

function draw() {
    canvas.width = canvas.getBoundingClientRect().width
    canvas.height = canvas.getBoundingClientRect().height
    width = canvas.width;
    height = canvas.height;

    last_frame = this_frame
    this_frame = Date.now()
    var sec = (this_frame - last_frame) / 1000.0
    seconds += sec;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, width, height);


    ctx.fillStyle = "#000000"
    ctx.fillRect(10 + 10*seconds, 10, 10, 10)


    testnode.draw()
    window.requestAnimationFrame(draw);
}



function doMouseDown(e){

    if(e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if(e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

init();