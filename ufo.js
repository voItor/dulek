var starttime = 3000; // czas po jakim gra si? w??cza w milisekundach
var ufocontrol = true; // czy ma si? pojawi? przycisk w??cz/wy??cz gr?? true(tak) lub false(nie)
var nImpactos = 100; // maksymalna ilo?? punkt?w ognia
var nOvnis = 3; // ilo?? ufo
var Xpos = 0;
var Ypos = 0;
var STOPACCEL = 10;
var TAMOVNI = 20;
var REBOTE = 0.65;
var isNetscape = false;
var impactoActual = 0;
var ovnis = new Array();
var disparos = new Array();
var impactos = new Array();
var impactos2 = new Array();
var activos = true;
var fondoMovil = false;
var backgroundOffset = 0;
init();
function changeUFOs(element) {
activos = element.checked;
}
function init() {
var text;
var i = 0;
text  = "<div id=imp20 style='POSITION: absolute;'>";
text += "<img src='g.pnh' WIDTH=21 height=24 align=bottom></div>";
for (i = 0; i < nImpactos; i++) {
text += "<div id=imp1" + i + " style='POSITION: absolute;'>";
text += "<img src='g.png' WIDTH=43 height=41 align=bottom></div>";
}
for (i = 0; i < nOvnis; i++) {
text += "<div id=dis" + i + " style='POSITION: absolute;'>";
text += "<img src='n.png' WIDTH=20 height=20 align=bottom></div>";
}
for (i = 0; i < nOvnis; i++) {
text += "<div id=ovn" + i + " style='POSITION: absolute;'>";
text += "<img src='sz.png' WIDTH=60 height=59 align=bottom></div>";
}
text += "\n";
document.write(text);
for (i = 0; i < 1; i++) {
impactos2[i] = new impacto2(i);
impactos2[i].obj.left = -25;
impactos2[i].obj.top = -25;
}
for (i = 0; i < nImpactos; i++) {
impactos[i] = new impacto1(i);
impactos[i].obj.left = -50;
impactos[i].obj.top = -50;
}
for (i = 0; i < nOvnis; i++) {
disparos[i] = new disparo(i);
disparos[i].obj.left = -5;
disparos[i].obj.top = -5;
}
for (i = 0; i < nOvnis; i++) {
ovnis[i] = new ovni(i);
ovnis[i].obj.left = -29;
ovnis[i].obj.top = -24;
}
if (ufocontrol) {
document.write('<form>');
document.write('<input type=checkbox onClick="changeUFOs(this)" CHECKED>');
document.write('W??cz/wy??cz gr? UFO');
document.write('</form>');
}
if (isNetscape) {
startanimate();
}
else {
setTimeout("startanimate()", starttime);
   }
}
function impacto1(i) {
this.X = -20;
this.Y = -20;
if (isNetscape) {
this.obj = eval("document.imp1" + i);
}
else {
this.obj = eval("imp1" + i + ".style");
   }
}
function impacto2(i) {
if (isNetscape) {
this.obj = eval("document.imp2" + i);
}
else {
this.obj = eval("imp2" + i + ".style");
   }
}
function disparo(i) {
this.X = -5;
this.Y = -5;
this.dx = 0;
this.dy = 0;
this.estado = 0;
if (isNetscape) {       
this.obj = eval("document.dis" + i);
}
else {
this.obj = eval("dis" + i + ".style");
   }
}
function ovni(i) {
this.X = -30;
this.Y = -30;
this.dx = 0;
this.dy = 0;
if (isNetscape) {       
this.obj = eval("document.ovn" + i);
}
else {
this.obj = eval("ovn" + i + ".style");
   }
}
function startanimate() {
setInterval("animate()", 32);
}
function MoveHandlerN(e) {
Xpos = e.pageX;
Ypos = e.pageY;   
return true;
}
function MoveHandlerIE() {
Xpos = window.event.x + document.body.scrollLeft;
Ypos = window.event.y + document.body.scrollTop;          
}
if (isNetscape) {
document.captureEvents(Event.MOUSEMOVE);
document.onMouseMove = MoveHandlerN;
}
else {
document.onmousemove = MoveHandlerIE;
}
function animate() {
var deltaX, deltaY, height, width;
if (activos) {
for (i = 0;i < nOvnis;i++) {
if (Xpos > ovnis[i].X) ovnis[i].dx += (i+1)/5;
else ovnis[i].dx -= (i+1)/5;
if (ovnis[i].dx > STOPACCEL) ovnis[i].dx = STOPACCEL;
if (-ovnis[i].dx > STOPACCEL) ovnis[i].dx = -STOPACCEL;
if (Ypos > ovnis[i].Y) ovnis[i].dy += (i+1)/5;
else ovnis[i].dy -= (i+1)/5;
if (ovnis[i].dy > STOPACCEL) ovnis[i].dy = STOPACCEL;
if (-ovnis[i].dy > STOPACCEL) ovnis[i].dy = -STOPACCEL;
ovnis[i].X += ovnis[i].dx;
ovnis[i].Y += ovnis[i].dy;
deltaX = Xpos - ovnis[i].X - 10;
deltaY = Ypos - ovnis[i].Y - 10;
if ((disparos[i].estado == 0) && ((Math.abs(deltaX) + (Math.abs(deltaY))) < 100)) {
disparos[i].dx = deltaX/10;
disparos[i].dy = deltaY/10;
disparos[i].estado++;
}
if ((disparos[i].estado > 0) && (disparos[i].estado < 12)) {
disparos[i].X += disparos[i].dx;
disparos[i].Y += disparos[i].dy;
disparos[i].estado++;
}
else {
if (disparos[i].estado != 0) {
impactoActual++;
if (impactoActual >= nImpactos) {
impactoActual = 1;
}
impactos2[0].obj.left = impactos[impactoActual].X + 5;
impactos2[0].obj.top = impactos[impactoActual].Y + 13;
impactos[impactoActual].X = disparos[i].X - 10;
impactos[impactoActual].Y = disparos[i].Y - 14;
impactos[impactoActual].obj.left = impactos[impactoActual].X;
impactos[impactoActual].obj.top = impactos[impactoActual].Y;
}
disparos[i].X = ovnis[i].X+10;
disparos[i].Y = ovnis[i].Y+10;
disparos[i].estado = 0;
}
if (isNetscape) {
height = window.innerHeight + document.scrollTop;
width = window.innerWidth + document.scrollLeft;
}
else {
height = document.body.clientHeight + document.body.scrollTop;
width = document.body.clientWidth + document.body.scrollLeft;
}
if (ovnis[i].Y >=  height - TAMOVNI - 1) {
if (ovnis[i].dy > 0) {
ovnis[i].dy = REBOTE * -ovnis[i].dy;
}
ovnis[i].Y = height - TAMOVNI - 1;
}
if (ovnis[i].X >= width - TAMOVNI) {
if (ovnis[i].dx > 0) {
ovnis[i].dx = REBOTE * -ovnis[i].dx;
}
ovnis[i].X = width - TAMOVNI - 1;
}
if (ovnis[i].X < 0) {
if (ovnis[i].dx < 0) {
ovnis[i].dx = REBOTE * -ovnis[i].dx;
}
ovnis[i].X = 0;
}
if (ovnis[i].Y < 0) {
if (ovnis[i].dy < 0) {
ovnis[i].dy = REBOTE * -ovnis[i].dy;
}
ovnis[i].Y = 0;
}
ovnis[i].obj.left = ovnis[i].X;
ovnis[i].obj.top =  ovnis[i].Y;
disparos[i].obj.left = disparos[i].X;
disparos[i].obj.top =  disparos[i].Y;
   }
}
else {
if (impactoActual != nImpactos+1)
{  //while the UFO's are off
for (i = 0;i < nOvnis;i++) {
ovnis[i].obj.left = -50;
ovnis[i].obj.top =  -50;
disparos[i].obj.left = -10;
disparos[i].obj.top =  -10;
}
for (i = 1;i < nImpactos;i++) {
impactos[i].obj.left = -20;
impactos[i].obj.top =  -20;
}
impactos2[0].obj.left = -20;
impactos2[0].obj.top =  -20;
impactoActual = nImpactos+1;
      }
   }
}
