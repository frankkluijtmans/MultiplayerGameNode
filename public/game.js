!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/public",r(r.s=0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,i,a,s,o,u,c=r(1),f=r(2),h=r(3),l=r(4),d=r(5),p=r(6),g=io(),m={},y={},_={time:120,started:!1},v="";g.on("connect",function(){v=g.io.engine.id}),new p5(function(e){e.setup=function(){n=new c.default(e,35,570,60,60),i=new f.default(e),a=new h.default(e),s=new l.default(e),o=new d.default(e),u=new p.default(e),e.createCanvas(800,600),e.noLoop(),g.emit("user_connected",{x:n.x,y:n.y,width:n.width,height:n.height,score:0,ready:n.ready,nickname:prompt("Choose a nickname")}),g.on("update_client",function(t){m.players=t.players,y=t.enemy,_=t.session,e.redraw()}),g.on("player_disconnected",function(e){n.ready=!1,o.trigger(e.name)}),g.on("end_game",function(e){n.ready=!1}),g.on("start_countdown",function(e){u.trigger()})},e.draw=function(){e.clear(),e.background(s.getCurrentFrame()),i.update(),a.update(),o.render(),u.render(),void 0!==m.players&&void 0!==m.players[v]&&(n.update(),e.noStroke(),function(e){var t=0;e.fill("#000000"),Object.keys(m.players).forEach(function(r){var n=m.players[r],a=0===t?"pink":"orange",s=_.started?n.score:function(e){if(e)return"ready";return"not ready..."}(n.ready);e.image(i.getCurrentFrame(a),n.x-n.width/2,n.y-n.height/2,n.width,n.height),e.textFont("Gaegu"),e.textAlign(LEFT),e.textSize(21),e.text(n.nickname,n.x-40,n.y-40),e.textSize(32),e.text(n.nickname+": "+s,15,35+30*Object.keys(m.players).indexOf(r)),t++})}(e),_.started?u.visible||function(e){e.image(a.getCurrentFrame(),y.x-y.width/2,y.y-y.height/2,y.width,y.height)}(e):function(e,t){var r="I'm ready";e.fill("#ff9900"),t&&(r="All set",e.fill("#00dd49"));e.rect(300,260,200,80,20),e.textFont("Gaegu"),e.textAlign(CENTER),e.textSize(32),e.fill("#ffffff"),e.text(r,400,308)}(e,n.ready),e.fill("#000000"),e.text(_.time,740,35),g.emit("update_server",{x:n.x,y:n.y,width:n.width,height:n.height,score:m.players[v].score,ready:n.ready,nickname:m.players[v].nickname}))},e.keyPressed=function(){keyCode===UP_ARROW&&(n.gravity=15,n.state="jumping")},window.addEventListener("click",function(e){var t=e.clientX>window.innerWidth/2-100&&e.clientX<window.innerWidth/2+100,r=e.clientY>window.innerHeight/2-40&&e.clientY<window.innerHeight/2+40;t&&r&&(n.ready=!0)})})},function(e,t,r){"use strict";var n=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t,r,n,i,a){var s=e.call(this)||this;return s.x=r,s.y=n,s.width=i,s.height=a,s.velocity=5,s.gravity=15,s.state="",s.ready=!1,s.sketch=t,s}return n(t,e),t.prototype.update=function(){if("jumping"===this.state&&this.jump(),this.sketch.keyIsDown(LEFT_ARROW)){if(this.x<=this.width/2)return void(this.x=this.width/2);this.x-=5}if(this.sketch.keyIsDown(RIGHT_ARROW)){if(this.x>=800-this.width/2)return void(this.x=800-this.width/2);this.x+=5}},t.prototype.jump=function(){this.y=this.y-this.gravity,this.gravity--,this.y>=570&&(this.state="",this.gravity=0,this.y=570)},t}(p5);t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.currentFrame=0,this.pink=[e.loadImage("assets/hero1_1.png"),e.loadImage("assets/hero1_1.png"),e.loadImage("assets/hero1_1.png"),e.loadImage("assets/hero1_2.png"),e.loadImage("assets/hero1_2.png"),e.loadImage("assets/hero1_2.png"),e.loadImage("assets/hero1_3.png"),e.loadImage("assets/hero1_3.png"),e.loadImage("assets/hero1_3.png")],this.orange=[e.loadImage("assets/hero2_3.png"),e.loadImage("assets/hero2_3.png"),e.loadImage("assets/hero2_3.png"),e.loadImage("assets/hero2_1.png"),e.loadImage("assets/hero2_1.png"),e.loadImage("assets/hero2_1.png"),e.loadImage("assets/hero2_2.png"),e.loadImage("assets/hero2_2.png"),e.loadImage("assets/hero2_2.png")]}return e.prototype.update=function(){8===this.currentFrame?this.currentFrame=0:this.currentFrame++},e.prototype.getCurrentFrame=function(e){return this[e][this.currentFrame]},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.currentFrame=0,this.frames=[e.loadImage("assets/enemy.png"),e.loadImage("assets/enemy.png"),e.loadImage("assets/enemy.png"),e.loadImage("assets/enemy_1.png"),e.loadImage("assets/enemy_1.png"),e.loadImage("assets/enemy_1.png"),e.loadImage("assets/enemy_2.png"),e.loadImage("assets/enemy_2.png"),e.loadImage("assets/enemy_2.png")]}return e.prototype.update=function(){8===this.currentFrame?this.currentFrame=0:this.currentFrame++},e.prototype.getCurrentFrame=function(){return this.frames[this.currentFrame]},e}();t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e){this.currentFrame=0,this.frames=[e.loadImage("assets/background.png")]}return e.prototype.update=function(){this.currentFrame=0},e.prototype.getCurrentFrame=function(){return this.frames[this.currentFrame]},e}();t.default=n},function(e,t,r){"use strict";var n=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t){var r=e.call(this)||this;return r.user="",r.visible=!1,r.frame=0,r.frameLength=1e3,r.frames=[],r.sketch=t,r}return n(t,e),t.prototype.trigger=function(e){var t=this;this.user=e,this.frames=[this.user+" left the game",this.user+" left the game"],this.visible=!0;var r=setInterval(function(){t.frame<t.frames.length-1?t.frame++:(t.visible=!1,t.frame=0,clearInterval(r))},this.frameLength)},t.prototype.render=function(){this.visible&&(this.sketch.fill("#ff5151"),this.sketch.rect(270,0,260,40,0,0,20),this.sketch.textFont("Gaegu"),this.sketch.textAlign(CENTER),this.sketch.textSize(18),this.sketch.fill("#ffffff"),this.sketch.text(this.frames[this.frame],400,23))},t}(p5);t.default=i},function(e,t,r){"use strict";var n=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])};return function(t,r){function n(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}();Object.defineProperty(t,"__esModule",{value:!0});var i=function(e){function t(t){var r=e.call(this)||this;return r.visible=!1,r.frame=0,r.frameLength=1e3,r.frames=["3","2","1","GO!"],r.sketch=t,r}return n(t,e),t.prototype.trigger=function(e){var t=this;this.visible=!0;var r=setInterval(function(){t.frame<t.frames.length-1?t.frame++:(t.visible=!1,t.frame=0,clearInterval(r))},this.frameLength)},t.prototype.render=function(){this.visible&&(this.sketch.textFont("Gaegu"),this.sketch.textAlign(CENTER),this.sketch.textSize(68),this.sketch.fill("#000000"),this.sketch.text(this.frames[this.frame],400,300))},t}(p5);t.default=i}]);