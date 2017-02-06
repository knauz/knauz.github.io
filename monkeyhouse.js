// svg helper functions
function makePath(container, d, fill) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttribute("d", d);
    if (fill)
        path.setAttribute("fill", fill);
    container.appendChild(path);
    return path;
}

function makeContainer(container, id, fill) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", 'g');
    g.id = id;
    if (fill)
        g.setAttribute("fill", fill);
    container.appendChild(g);
    return g;
}

function Board(svg) {
    this.svg = svg
    this.tulipId = 0;
    this.treeId = 0;
    this.windowId = 0;
}

Board.prototype.createLawn = function() {
    var lawn = makeContainer(this.svg, "lawn");
    makePath(lawn, "M-20 60H50V64H-20z", "#83bf4f");
    makePath(lawn, "M50 60H84V64H50z", "#699635");
}

Board.prototype.createTulip = function(x, height, size, color1, color2) {
    height /= size;
    var tulip = makeContainer(this.svg, "tulip"+(this.tulipId++));
    tulip.style.transform = "translate("+x+"px, 60px) scale(0.2)";
    setTimeout(function() {
      tulip.style.transform = tulip.style.transform.replace(/scale\([^)]+\)/, "scale("+size+")");
    }, Math.random()*250);
    makePath(tulip, "m-.2 0H.4V-"+height+"H-.2z", "#96E3C7")
    makePath(tulip, "m-1.17 -"+(height+3.12)+"v2.34c0 .431.35.78.78.78h.78v-1.56c0-1.137-1.56-1.56-1.56-1.56", color1)
    makePath(tulip, "m1.17 -"+(height+3.12)+"v2.34c0 .431-.35.78-.78.78h-.78v-1.56c0-1.137 1.56-1.56 1.56-1.56", color2)
}

Board.prototype.createTree = function(x, height, size) {
    height /= size;
    var tree = makeContainer(this.svg, "tree"+(this.treeId++));
    tree.style.transform = "translate("+x+"px, 60px) scale("+size+")";
    var stem = makeContainer(tree, tree.id+"_stem");
    stem.style.transform = "scale(1, "+height+")";
    makePath(stem, "m-2 0h4v-26h-4z", "#d3976e");
    makePath(stem, "m2 -26h-1.487c.014.172.029.339.029.543 0 2.28-.76 2.28-.76 4.561 0 2.275.76 2.275.76 4.55 0 2.276-.76 2.276-.76 4.551 0 2.273.76 2.273.76 4.55 0 2.271-.76 2.271-.76 4.544 0 1.427.207 1.952.421 2.702h1.797v-26", "#89664c");
    makePath(tree, "m-1.07 -50c-1.903 2.728-4.237-2.17-7.247 2.043s-1.449 7.853-.522 10.603c1.844 5.465-1.851 7.235.572 11.812 2.423 4.575-1.058 6.78 3.505 9.33s2.311-2.933 6.99.317c4.681 3.25 5.336-2.247 4.825-4.186-.976-3.707 1.716-4.611 2.456-7.697 1.315-5.488-3.06-8.482-1.707-13.721 1.354-5.239-3.111-16.752-8.872-8.501", "#83bf4f");
    makePath(tree, "m7.8 -41.5c1.018-3.929-1.243-11.389-4.865-11.391.002.002 2.438 3.16-.999 7.15-3.439 3.99 2.938 5.986 0 9.729-2.939 3.742 2.71 7.348.527 10.228-2.74 3.616-7 3.083-4.466 9.978.012.029.024.052.034.08 1.032-.629 1.075-2.336 4.194-.17 4.681 3.25 5.336-2.248 4.825-4.186-.976-3.707 1.716-4.611 2.456-7.697 1.316-5.489-3.059-8.483-1.706-13.721", "#699635");
    makePath(tree, "m-3 -32c1.657 0-.653 1.344-.653 3s2.311 3 .653 3c-1.652 0-2.996-1.344-2.996-3s1.344-3 2.996-3", "#699635");
    makePath(tree, "m-2 -40c.827 0 0 .671 0 1.5s.827 1.5 0 1.5c-.828 0-1.5-.671-1.5-1.5s.672-1.5 1.5-1.5", "#699635");
    makePath(tree, "m4 -42c-.747 0 .365-.606.365-1.354s-1.112-1.354-.365-1.354c.748 0 1.354.606 1.354 1.354s-.606 1.354-1.354 1.354", "#83bf4f");
    makePath(tree, "m6 -30c-1.111 0 .633-.9.633-2.01s-1.744-2.01-.633-2.01c1.107 0 2.01.9 2.01 2.01s-.9 2.01-2.01 2.01", "#83bf4f");
    makePath(tree, "m4 -20c-.83 0 0-.671 0-1.5s-.83-1.5 0-1.5c.828 0 1.499.671 1.499 1.5s-.671 1.5-1.499 1.5", "#83bf4f");
}

Board.prototype.createWindow = function(house, x, y, width, height) {
    var win_ = makeContainer(house, "frame");
    makePath(win_, "m1 1v6h6v-6h-6", "#ffffff");
    makePath(win_, "m0 0v8h8v-8h-8m7 1v6h-6v-6h6", "#89664c");
    var win = makeContainer(win_, "window"+(this.windowId++));
    makePath(win, "m0 0h8v8h-8z", "#d6eef0");
    makePath(win, "m0 0v8h8v-8h-8M0.75 0.75h3v3h-3v-3M4.25 0.75h3v3h-3v-3M0.75 4.25h3v3h-3v-3M4.25 4.25h3v3h-3v-3", "#89664c");
    win_.style.transform = "translate("+x+"px,"+y+"px) scale("+width+","+height+")";
    win_.onclick = function(ev) {
      win.classList.toggle("open");
    };
    return win;
}

Board.prototype.createPineapple = function(x, y) {
    var pineapple_ = makeContainer(this.svg, "pineapple");
    pineapple_.style.transform = "translate("+x+"px, "+y+"px) scale(0.6)";

    var leaf_1 = makePath(pineapple_, "M4.5-2.4c1.5-2 .2-2-.7-1.3 1-1 2.3-4 .5-2.5C2.3-4.7.3-.4 0 0c.3 0 3-.3 4.5-2.4", "#aad7ad");
    leaf_1.style.transform = "translate(2.1px, 11.5px) scale(0)";
    leaf_1.style.transition = "all 1s linear 50ms";
    leaf_1.getBoundingClientRect();
    leaf_1.style.transform = "translate(2.1px, 11.5px) scale(1)";

    var stem = makePath(pineapple_, "M2.6 12.54s0-1.4-.4-1.92c-1.13-1.56-6.1-5.38-5.08-2.8 1.86 4.7 5.2-.28 4.1-2.3-.55-.95-2.48-.85-2.47-1.95 0-1.1 6.43-2.47 5.3-.5C1.98 6.67.33-.27.33-.27");
    var length = stem.getTotalLength();
    stem.style.fill = "none";
    stem.style.stroke = "#64892f";
    stem.style.strokeWidth = "1.5";
    stem.style.transition = "none";
    stem.style.strokeDasharray = length + ' ' + length;
    stem.style.strokeDashoffset = length;
    stem.getBoundingClientRect();
    stem.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
    stem.style.strokeDashoffset = '0';

    var leaf_2 = makePath(pineapple_, "M-2 2C-3 2-3 1-2.4 1-3.2 1-4 .3-3-.3-2-1-.2-.2 0 0c0 0-.6 1.8-2 2", "#aad7ad");
    leaf_2.style.transform = "translate(1.74px, 10.08px) scale(0)";
    leaf_2.style.transition = "all 1s linear 350ms";
    leaf_2.getBoundingClientRect();
    leaf_2.style.transform = "translate(1.74px, 10.08px) scale(1)";
    var leaf_3 = makePath(pineapple_, "M-2.2-.4C-3 0-2.4.8-2 .6c-.3.4-.5 1.3.4 1.2C-.6 1.8 0 0 0 0c0 0-1.4-1-2.2-.4", "#aad7ad");
    leaf_3.style.transform = "translate(-1.3px, 3.48px) scale(0)";
    leaf_3.style.transition = "all 1s linear 900ms";
    leaf_3.getBoundingClientRect();
    leaf_3.style.transform = "translate(-1.3px, 3.48px) scale(1)";
    var leaf_4 = makePath(pineapple_, "M3.5-4.6C3.5-6 1.3-4 1-3c0-.8-1-2-2 0S0-.2 0 0c.2-.3 3.4-3 3.5-4.6", "#aad7ad");
    leaf_4.style.transform = "translate(3.48px, 2.1px) scale(0)";
    leaf_4.style.transition = "all 1s linear 1200ms";
    leaf_4.getBoundingClientRect();
    leaf_4.style.transform = "translate(3.48px, 2.1px) scale(1)";

    var pineapple = makeContainer(pineapple_, "pineapple_fruit");
    pineapple.style.transform = "scale(0)";
    window.setTimeout(function() {
        pineapple.style.transform = "scale(2)";
        pineapple.style.transition = "all 2.5s ease-out";
        pineapple.style.transform = "scale(1)";
    }, 1500);
    var strunk_outer = makePath(pineapple, "M0-18.58s-.64 1.44-.87 2.9c-.54-.75-1.05-1.3-1.05-1.3s-.12 1.25.04 2.57c-.87-.45-1.64-.7-1.64-.7s.43 1.07 1.1 2.1c-1.06-.1-1.98-.03-1.98-.03s.7.77 1.63 1.45c-1.18.2-2.23.6-2.23.6s1.86 1.2 3.47 1.34c.66.06 1.16.03 1.53-.06.37.1.87.12 1.53.06C3.13-9.8 5-10.98 5-10.98s-1.05-.4-2.23-.6c.92-.68 1.63-1.45 1.63-1.45s-.92-.07-1.98.03c.67-1.03 1.1-2.1 1.1-2.1s-.77.25-1.64.7c.16-1.33.04-2.6.04-2.6s-.5.57-1.05 1.33c-.22-1.47-.87-2.9-.87-2.9z", "#64892f");
    var body = makePath(pineapple, "M4.1-4.35c0 2.83-1.84 4-4.1 4s-4.1-1.17-4.1-4 1.84-7.17 4.1-7.17 4.1 4.34 4.1 7.17", "#b46137");
    var scales = makePath(pineapple, "M-1.77-10.6c-.32 0-.84.4-.84.73 0 .32.5.7.83.7.32 0 1.07-.38 1.07-.7 0-.32-.75-.72-1.07-.72zm3.54 0c-.32 0-1.07.4-1.07.73 0 .32.75.7 1.07.7.32 0 .84-.38.84-.7 0-.32-.5-.72-.83-.72zM0-9.5c-.32 0-1.07.4-1.07.7 0 .33.75.72 1.07.72.32 0 1.07-.4 1.07-.7 0-.33-.75-.73-1.07-.73zm-2.88.13c-.3 0-.95 1.28-.66 1.28.3 0 1.18-.4 1.18-.7 0-.32-.23-.58-.52-.57zm5.76 0c-.3 0-.52.25-.52.57 0 .32.9.7 1.18.7.3 0-.36-1.28-.66-1.28zm-4.67.82c-.32 0-1.08.5-1.08.83 0 .32.76.87 1.1.87.3 0 1.03-.55 1.03-.87 0-.32-.72-.83-1.04-.83zm3.6 0c-.33 0-1.05.5-1.05.83 0 .32.72.87 1.04.87.32 0 1.08-.55 1.08-.87 0-.32-.76-.83-1.1-.83zm-5.28 1.1c-.38 0-1.26.87-.8 1.52.18.25 1.75-.4 1.75-.7 0-.33-.65-.8-.95-.8zm3.48 0c-.32 0-1.07.4-1.07.73 0 .32.75.7 1.07.7.32 0 1.07-.38 1.07-.7 0-.32-.75-.72-1.07-.72zm3.48 0c-.3 0-.95.5-.95.8 0 .32 1.57.97 1.75.72.46-.65-.42-1.5-.8-1.5zm-5.27 1c-.32 0-1.2.44-1.2.76 0 .33.88.9 1.2.9.33 0 1.07-.52 1.07-.84 0-.32-.74-.8-1.06-.8zm3.6 0c-.33 0-1.07.5-1.07.8 0 .33.74.84 1.06.84.32 0 1.2-.57 1.2-.9 0-.3-.88-.74-1.2-.74zM-3.8-5.4c-.44 0-1.1.84-.54 1.86.15.27 1.8-.7 1.8-1.02 0-.6-.95-.85-1.25-.85zm7.6 0c-.3 0-1.27.25-1.27.84 0 .32 1.66 1.3 1.8 1.02.58-1.02-.1-1.87-.54-1.87zM0-5.3c-.32 0-1.07.4-1.07.72 0 .32.75.7 1.07.7.32 0 1.07-.38 1.07-.7 0-.32-.75-.72-1.07-.72zm-1.8.93c-.32 0-1.2.53-1.2.85 0 .32.88.92 1.2.92.33 0 1.05-.58 1.05-.9 0-.32-.72-.86-1.04-.86zm3.6 0c-.33 0-1.06.55-1.06.87 0 .32.73.9 1.05.9.32 0 1.2-.6 1.2-.92 0-.32-.88-.85-1.2-.85zm-5.3 1.23c-1.17 0-.57 1.43.2 1.43.3 0 .77-.38.77-.7 0-.32-.7-.7-.98-.72zm3.5 0c-.32 0-1.07.4-1.07.72 0 .32.75.7 1.07.7.32 0 1.07-.38 1.07-.7 0-.32-.75-.72-1.07-.72zm3.5 0c-.28 0-.97.4-.97.72 0 .32.46.7.76.7.77 0 1.37-1.42.2-1.42zm-5.3.96c-.32 0-1.06.52-1.06.84 0 .6.74.92 1.07.92.33 0 1.07-.6 1.07-.92 0-.32-.74-.84-1.06-.84zm3.6 0c-.33 0-1.07.52-1.07.84 0 .32.74.92 1.06.92.32 0 1.06-.33 1.06-.92 0-.32-.74-.84-1.07-.84zM0-1.06c-.32 0-1.07.5-1.07.82 0 .32 2.14.32 2.14 0S.32-1.06 0-1.06z", "#e7a74f");
    var strunk_mid = makePath(pineapple, "M0-15.53s-.38 1.1-.52 2.24c-.54-.63-1.13-1.06-1.13-1.06s.16 1.12.52 2.12c-.7-.44-1.4-.65-1.4-.65s.36.96.88 1.77c-.75.13-1.43.48-1.43.48s1.14.9 2.12 1.02c.43.04.73 0 .96-.07.24.08.54.1.96.07.98-.12 2.12-1.02 2.12-1.02s-.68-.35-1.43-.48c.52-.8.88-1.76.88-1.76s-.7.22-1.4.66c.36-1 .52-2.13.52-2.13s-.6.44-1.13 1.08C.38-14.4 0-15.52 0-15.52z", "#84b234");
    var strunk_inner = makePath(pineapple, "M1.2-10.5c.17-.58.08-1.27.08-1.27s-.4.17-.8.44c-.2-.54-.48-1.5-.48-1.5s-.28.96-.48 1.5c-.4-.27-.8-.44-.8-.44s-.1.7.08 1.27c-.66.12-1.3.53-1.3.53s1.32.78 2.5.78 2.5-.77 2.5-.77-.64-.4-1.3-.53", "#8cc63e");
}

Board.prototype.createHouse = function() {
    var house = makeContainer(this.svg, "house");

    var front = makeContainer(house, "front", "#f9f3d9");
    makePath(front, "m5.05 22h22v38h-22z");
    makePath(front, "m27 42.08h12.951v17.917h-12.951z");
    var side = makeContainer(house, "side", "#dbb471");
    makePath(side, "m27.019 22h12v16h-12z");
    makePath(side, "m39.881 42.08h9.319v17.917h-9.319z");

    var chimney_front = makeContainer(house, "chimney_front", "#d0d0d0");
    makePath(chimney_front, "m29.03 10h2.997v8h-2.997z");
    makePath(chimney_front, "m28.03 8h4.996v2h-4.996z");
    var chimney_side = makeContainer(house, "chimney_side", "#94989b");
    makePath(chimney_side, "m32.02 10h1.998v9h-1.998z");
    makePath(chimney_side, "m33.02 8h1.999v2h-1.999z");

    var roof_front = makeContainer(house, "roof_front", "#ed4c5c");
    makePath(roof_front, "m27.03 38h-21.98l-5.05 4.08h42.54z");
    makePath(roof_front, "m21.04 8l-19.988 14h25.978z");
    var roof_side = makeContainer(house, "roof_side", "#c94747");
    makePath(roof_side, "m21.04 8l21.98 14h-15.99z");
    makePath(roof_side, "m39.02 38l14.769 4.08h-11.249l-15.51-4.08z");

    var door_ = makeContainer(house, "doorframe", "#89664c");
    door_.style.transform = "translate(13.7px, 49.1px)";
    var door = makeContainer(door_, "door");
    door_.onclick = function(ev) {
      door.classList.toggle("open");
    };
    /*makePath(door, "m2.695 2.06h6.245v10.938h-6.245z");
    makePath(door_, "m8.16 .5h1.562v1.563h-1.562z");
    makePath(door_, "m1.135 2.06h1.561v10.938h-1.561z", "#594640");
    makePath(door_, "m.355 .5h7.806v1.563h-7.806z", "#dbb471");*/
    makePath(door, "m0 0h6.245v10.938h-6.245z");
    makePath(door_, "m5.5 -1.5h1.562v1.563h-1.562z");
    makePath(door_, "m-1.5 0h1.561v10.938h-1.561z", "#594640");
    makePath(door_, "m-2.1 -1.5h7.806v1.563h-7.806z", "#dbb471");
    var door_knob = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    door_knob.setAttribute("fill", "#f9f3d9");
    door_knob.setAttribute("cx", "4.875");
    door_knob.setAttribute("cy", "4.75");
    door_knob.setAttribute("r", ".586");
    door.appendChild(door_knob);

    return house;
}
