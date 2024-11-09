(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=e(a);fetch(a.href,s)}})();class g{constructor(t,e,i){this.X=t,this.Y=e,this.ID=i,this.IntX=0,this.IntY=0}}class f{constructor(t,e){this.Name=t,this.Points=Y(e,k),this.Points=z(this.Points),this.Points=R(this.Points,S),this.Points=N(this.Points),this.LUT=q(this.Points)}}class I{constructor(t,e,i){this.Name=t,this.Score=e,this.Time=i}}const T=2,k=32,S=new g(0,0,0),P=1024,w=64,y=P/w;class D{constructor(){this.PointClouds=new Array(T),this.PointClouds[0]=new f("|",new Array(new g(526,142,1),new g(526,204,1),new g(526,221,1))),this.PointClouds[1]=new f("-",new Array(new g(142,526,1),new g(204,526,1),new g(221,526,1))),this.Recognize=function(t){t=t.map(c=>new g(c.x,c.y,1));for(var e=Date.now(),i=new f("",t),a=-1,s=1/0,r=0;r<this.PointClouds.length;r++){var h=X(i,this.PointClouds[r],s);h<s&&(s=h,a=r)}var o=Date.now();return a==-1?new I("No match.",0,o-e):new I(this.PointClouds[a].Name,s>1?1/s:1,o-e)},this.AddGesture=function(t,e){this.PointClouds[this.PointClouds.length]=new f(t,e);for(var i=0,a=0;a<this.PointClouds.length;a++)this.PointClouds[a].Name==t&&i++;return i},this.DeleteUserGestures=function(){return this.PointClouds.length=T,T}}}function X(n,t,e){var i=n.Points.length,a=Math.floor(Math.pow(i,.5)),s=M(n.Points,t.Points,a,t.LUT);let r=M(t.Points,n.Points,a,n.LUT);for(var h=0,o=0;h<i;h+=a,o++)s[o]<e&&(e=Math.min(e,E(n.Points,t.Points,h,e))),r[o]<e&&(e=Math.min(e,E(t.Points,n.Points,h,e)));return e}function E(n,t,e,i){for(var a=n.length,s=new Array,r=0;r<a;r++)s[r]=r;var h=e,o=a,c=0;do{for(var d=-1,l=1/0,r=0;r<s.length;r++){var u=p(n[h],t[s[r]]);u<l&&(l=u,d=r)}if(s.splice(d,1),c+=o*l,c>=i)return c;o--,h=(h+1)%a}while(h!=e);return c}function M(n,t,e,i){var a=n.length,s=new Array(Math.floor(a/e)+1),r=new Array(a);s[0]=0;for(var h=0;h<a;h++){var o=Math.round(n[h].IntX/y),c=Math.round(n[h].IntY/y),d=i[o][c],l=p(n[h],t[d]);r[h]=h==0?l:r[h-1]+l,s[0]+=(a-h)*l}for(var h=e,u=1;h<a;h+=e,u++)s[u]=s[0]+h*r[a-1]-a*r[h-1];return s}function Y(n,t){for(var e=_(n)/(t-1),i=0,a=new Array(n[0]),s=1;s<n.length;s++)if(n[s].ID==n[s-1].ID){var r=x(n[s-1],n[s]);if(i+r>=e){var h=n[s-1].X+(e-i)/r*(n[s].X-n[s-1].X),o=n[s-1].Y+(e-i)/r*(n[s].Y-n[s-1].Y),c=new g(h,o,n[s].ID);a[a.length]=c,n.splice(s,0,c),i=0}else i+=r}return a.length==t-1&&(a[a.length]=new g(n[n.length-1].X,n[n.length-1].Y,n[n.length-1].ID)),a}function z(n){for(var t=1/0,e=-1/0,i=1/0,a=-1/0,s=0;s<n.length;s++)t=Math.min(t,n[s].X),i=Math.min(i,n[s].Y),e=Math.max(e,n[s].X),a=Math.max(a,n[s].Y);for(var r=Math.max(e-t,a-i),h=new Array,s=0;s<n.length;s++){var o=(n[s].X-t)/r,c=(n[s].Y-i)/r;h[h.length]=new g(o,c,n[s].ID)}return h}function R(n,t){for(var e=O(n),i=new Array,a=0;a<n.length;a++){var s=n[a].X+t.X-e.X,r=n[a].Y+t.Y-e.Y;i[i.length]=new g(s,r,n[a].ID)}return i}function O(n){for(var t=0,e=0,i=0;i<n.length;i++)t+=n[i].X,e+=n[i].Y;return t/=n.length,e/=n.length,new g(t,e,0)}function _(n){for(var t=0,e=1;e<n.length;e++)n[e].ID==n[e-1].ID&&(t+=x(n[e-1],n[e]));return t}function N(n){for(var t=0;t<n.length;t++)n[t].IntX=Math.round((n[t].X+1)/2*(P-1)),n[t].IntY=Math.round((n[t].Y+1)/2*(P-1));return n}function q(n){for(var t=new Array,e=0;e<w;e++)t[e]=new Array;for(var i=0;i<w;i++)for(var a=0;a<w;a++){for(var s=-1,r=1/0,e=0;e<n.length;e++){var h=Math.round(n[e].IntX/y),o=Math.round(n[e].IntY/y),c=(h-i)*(h-i)+(o-a)*(o-a);c<r&&(r=c,s=e)}t[i][a]=s}return t}function p(n,t){var e=t.X-n.X,i=t.Y-n.Y;return e*e+i*i}function x(n,t){var e=p(n,t);return Math.sqrt(e)}class b{constructor(){this.stack=[]}push(t){this.stack.push(t)}pop(){return this.stack.pop()}peek(){if(this.isEmpty())throw new Error("Cannot peek at an empty stack");return this.stack[this.stack.length-1]}isEmpty(){return this.stack.length===0}size(){return this.stack.length}toArray(){return[...this.stack]}}const U="/swipe_game/assets/images/characters/bat.svg",B="/swipe_game/assets/images/characters/frankenstein.svg",W="/swipe_game/assets/images/characters/ghost.svg",F="/swipe_game/assets/images/characters/one_eye.svg",G="/swipe_game/assets/images/characters/spider.svg",Q="/swipe_game/assets/images/characters/skeleton.svg",V="/swipe_game/assets/images/characters/vampire.svg",H="/swipe_game/assets/images/characters/didi.png",K="/swipe_game/assets/images/characters/boss.svg";class A{constructor(t,e,i){this.type=i,this.x=0,this.y=0,this.radius=t,this.radius=t,this.difficulty=e,this.targetTemplates=["|","-"],this.targets=new b,this.generateTargets();const a=[U,B,W,F,G,Q,V];switch(this.image=new Image,this.type){case"main":this.image.src=H;break;case"boss":this.image.src=K;break;default:this.image.src=a[Math.floor(Math.random()*a.length)]}}getRandomColor(){const t=["blue","red","green","purple","orange","pink"];return t[Math.floor(Math.random()*t.length)]}getTopTarget(){return this.targets.peek()}die(t){const e=this.x,i=this.y,a=performance.now(),s=1e3,r=this.radius;let h=0;const o=c=>{const l=(c-a)/s;if(l>=1){this.radius=0,t&&t();return}h=l*Math.PI*10,this.radius=r*(1-l);const u=50*l,C=Math.cos(h)*u,m=Math.sin(h)*u;this.move({x:e+C,y:i+m}),requestAnimationFrame(o)};requestAnimationFrame(o)}shake(){const t=performance.now(),e=500,i=5,a=this.type==="main"?this.x:null,s=this.type==="main"?this.y:null,r=h=>{const c=(h-t)/e;if(c>=1){this.type==="main"&&(this.x=a,this.y=s);return}const d=i*(1-c),l=Math.sin(c*40)*d,u=Math.cos(c*40)*d;this.type==="main"?(this.x=a+l,this.y=s+u):(this.x+=l,this.y+=u),requestAnimationFrame(r)};requestAnimationFrame(r)}damage(){this.targets.isEmpty()||this.targets.pop(),this.shake()}isDead(){return this.targets.isEmpty()}generateTargets(){for(let t=0;t<this.difficulty;t++){const e=Math.floor(Math.random()*this.targetTemplates.length);this.targets.push(this.targetTemplates[e])}}draw(t){t.drawImage(this.image,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);const e=this.targets.toArray().reverse(),i=20,a=3,s=25,r=this.x-(e.length-1)*s/2;this.y-this.radius-30,t.strokeStyle="black",t.lineWidth=a;const h=(e.length-1)*s+i,o=10;let c=r;r-i/2<o?c=o+i/2:r+h-i/2>t.canvas.width-o&&(c=t.canvas.width-o-h+i/2),t.strokeStyle="black",t.lineWidth=a,e.forEach((d,l)=>{const u=this.y-this.radius-30,m=u-i<o?this.y+this.radius+30:u,v=c+l*s;t.beginPath(),d==="|"?(t.moveTo(v,m),t.lineTo(v,m+i)):d==="-"&&(t.moveTo(v-i/2,m+i/2),t.lineTo(v+i/2,m+i/2)),t.stroke(),t.closePath()})}move({x:t,y:e}){this.x=t,this.y=e}moveTowards(t,e){const i=t.x-this.x,a=t.y-this.y,s=Math.sqrt(i*i+a*a),r=i/s,h=a/s,o=Date.now()/1e3,c=.5,d=Math.sin(o*4)*c,l=Math.cos(o*6)*c;this.x+=r*e+d,this.y+=h*e+l}hasCollidedWith(t){const e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i)<this.radius+t.radius}}class ${constructor(t,e,i,a,s,r){this.Character=e,this.Level=i,this.Stack=t,this.levels=new this.Stack,this.currentLevel=null,this.enemies=[],this.bosses=[],this.dyingEnemies=[],this.lastTime=0,this.speed=.06,this.gameLoop=this.gameLoop.bind(this),this.handleTouchResult=this.handleTouchResult.bind(this),this.window=a,this.gameScreen=s,this.touchScreen=r,this.isDrawing=!1,this.initialize.bind(this),this.maxEnemies=3,this.NO_OF_LEVELS=2}resizeCanvas(){this.gameScreen.resizeCanvas(),this.touchScreen.resizeCanvas()}gameLoop(t){const e=t-this.lastTime;if(this.lastTime=t,this.gameScreen.clearCanvas(),this.enemies.length===0)for(;this.bosses.length!==0;)this.enemies.push(this.bosses.pop());for(!this.levels.isEmpty()&&this.enemies.length===0&&(this.currentLevel=this.levels.pop());!this.currentLevel.getEnemies().isEmpty()&&this.enemies.length<this.maxEnemies;){let s=this.currentLevel.getEnemies().pop();s.move(this.gameScreen.getRandomPointAtEdge()),s.type!=="boss"&&this.enemies.push(s),s.type==="boss"&&this.bosses.push(s)}if(this.enemies.length===0&&this.bosses.length===0&&this.levels.isEmpty()){console.log("Victory"),this.mainChar.draw(this.gameScreen.getContext());return}const[i,a]=this.enemies.reduce(([s,r],h)=>h.isDead()?[s,[...r,h]]:[[...s,h],r],[[],[]]);a.forEach(s=>{s.die(()=>{this.dyingEnemies=this.dyingEnemies.filter(r=>r!==s)}),this.dyingEnemies.push(s)}),this.dyingEnemies.forEach(s=>{s.draw(this.gameScreen.getContext())}),this.enemies=i,this.enemies.forEach((s,r)=>{s.moveTowards(this.mainChar,this.speed*e),s.draw(this.gameScreen.getContext()),s.hasCollidedWith(this.mainChar)&&(s.move(this.gameScreen.getRandomPointAtEdge()),this.mainChar.damage())}),this.mainChar.draw(this.gameScreen.getContext()),requestAnimationFrame(this.gameLoop)}handleTouchResult(t){this.enemies.forEach(e=>{e.getTopTarget()===t.Name&&e.damage()})}initialize(t){this.resizeCanvas(),this.window.addEventListener("resize",this.resizeCanvas),this.touchScreen.setHandleTouchResult(this.handleTouchResult);for(let e=0;e<this.NO_OF_LEVELS;e++){const i=new this.Level(this.Character,this.Stack,this.NO_OF_LEVELS-e-1);this.levels.push(i)}this.mainChar=t,this.gameScreen.initialize(t),requestAnimationFrame(this.gameLoop)}addObject(t){this.objects.push(t)}}class J{constructor(t,e,i){this.Character=t,this.Stack=e,this.levelNumber=i,this.enemies=new this.Stack,this.enemies.push(new t(150,10,"boss"));for(let a=0;a<this.levelNumber+3;a++)this.enemies.push(new t(50,3))}getEnemies(){return this.enemies}}class L{constructor(t){this.canvas=t,this.context=this.canvas.getContext("2d")}getContext(){return this.context?this.context:this.canvas.getContext("2d")}clearCanvas(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height)}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}}class Z extends L{constructor(t){super(t)}getRandomPointAtEdge(){const t=Math.floor(Math.random()*4);let e,i;switch(t){case 0:e=Math.random()*this.canvas.width,i=0;break;case 1:e=this.canvas.width,i=Math.random()*this.canvas.height;break;case 2:e=Math.random()*this.canvas.width,i=this.canvas.height;break;case 3:e=0,i=Math.random()*this.canvas.height;break}return{x:e,y:i}}initialize(t){t.move({x:this.canvas.width/2,y:this.canvas.height/2}),t.draw(this.context)}}class j extends L{constructor(t,e){super(t),this.dollarQRecognizer=e,this.FADE_TIMEOUT=300,this.touchStart=this.touchStart.bind(this),this.touchMove=this.touchMove.bind(this),this.touchEnd=this.touchEnd.bind(this),this.getTouchPosition=this.getTouchPosition.bind(this),this.currentPoints=[],this.fadeAnimationId=null,this.fadeTimeout=null,this.handleTouchResult=()=>console.log("Callback not set"),this.initialize()}fadeAnimation(){const t=performance.now(),e=500,i=a=>{const s=a-t,h=1-Math.min(s/e,1);if(h<=0){this.clearCanvas(),this.fadeAnimationId=null;return}this.clearCanvas(),this.context.strokeStyle=`rgba(0, 0, 0, ${h})`,this.context.beginPath(),this.points.forEach((o,c)=>{c===0?this.context.moveTo(o.x,o.y):this.context.lineTo(o.x,o.y)}),this.context.stroke(),this.fadeAnimationId=requestAnimationFrame(i)};this.fadeAnimationId=requestAnimationFrame(i)}setHandleTouchResult(t){this.handleTouchResult=t}getTouchPosition(t){const e=t.touches[0],i=this.canvas.getBoundingClientRect(),a=e.clientX-i.left,s=e.clientY-i.top;return{x:a,y:s}}touchStart(t){t.preventDefault(),this.fadeAnimationId&&(cancelAnimationFrame(this.fadeAnimationId),this.fadeAnimationId=null),this.fadeTimeout&&(clearTimeout(this.fadeTimeout),this.fadeTimeout=null),this.isDrawing=!0,this.currentPoints=[],this.clearCanvas(),this.context.strokeStyle="rgba(0, 0, 0, 1)";const{x:e,y:i}=this.getTouchPosition(t);this.currentPoints.push({x:e,y:i}),this.context.moveTo(e,i),this.context.beginPath()}touchMove(t){if(t.preventDefault(),!this.isDrawing)return;const{x:e,y:i}=this.getTouchPosition(t);this.currentPoints.push({x:e,y:i}),this.context.lineTo(e,i),this.context.stroke()}touchEnd(t){if(t.preventDefault(),!this.isDrawing)return;this.isDrawing=!1,this.context.closePath(),this.points=[...this.currentPoints];const e=this.dollarQRecognizer.Recognize(this.points);e!==-1?this.handleTouchResult(e):console.log("Shape not recognized"),this.fadeTimeout=setTimeout(()=>{this.fadeAnimation()},this.FADE_TIMEOUT)}initialize(){this.canvas.addEventListener("touchstart",this.touchStart),this.canvas.addEventListener("touchmove",this.touchMove),this.canvas.addEventListener("touchend",this.touchEnd)}}const tt=document.getElementById("gameCanvas"),et=document.getElementById("touchCanvas"),st=new A(150,0,"main"),it=new D,nt=new Z(tt),at=new j(et,it),rt=new $(b,A,J,window,nt,at);rt.initialize(st);
