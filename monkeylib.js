var monkeySrcs = [ "1f435.svg", "1f648.svg", "1f649.svg" ];

function Monkey(canvas, pos) {
    this.pos = pos;
    this.weight = .75 * (1 + Math.random())/2;
    this.canvas = canvas;
    this.img = new Image();
    this.img.src = monkeySrcs[pos];
    this.img.className = "monkey";
    this.canvas.appendChild(this.img);
}

Monkey.prototype.maxSize = function() { 
    return this.canvas.height / MONKEY_COUNT - 10;
}

Monkey.prototype.size = function() { 
    return this.maxSize() * this.weight ;
}

Monkey.prototype.redraw = function() {
    this.img.style.top = (this.canvas.height / MONKEY_COUNT * this.pos + (this.maxSize() - this.size()) / 2) + "px";
    this.img.style.width = this.size() + "px";
    this.img.style.height = this.size() + "px";
}

function Banana(canvas) {
    this.canvas = canvas;
    this.img = new Image();
    this.img.src = "1f34c.svg";
    this.img.className = "banana";
    this.img.style.transform = "rotate("+((Math.random()-.5)*50)+"deg)";
    this.relX = Math.random();
    this.relY = Math.random();
    this.canvas.appendChild(this.img);
}

Banana.prototype.x = function() { 
    var maxMonkeyWidth = this.canvas.height / MONKEY_COUNT - 10;
    return maxMonkeyWidth + this.relX * (this.canvas.width - maxMonkeyWidth);
}

Banana.prototype.y = function() {
    return this.relY * this.canvas.height;
}

Banana.prototype.size = function() {
    return Math.min(this.canvas.height / 10, this.canvas.width / 10);
}

Banana.prototype.redraw = function() {
    this.img.style.top = this.y() + "px";
    this.img.style.left = this.x() + "px";
    this.img.style.width = this.size() + "px";
    this.img.style.height = this.size() + "px";
}
