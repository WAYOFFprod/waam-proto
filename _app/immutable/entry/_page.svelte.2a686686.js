import{S as U,i as W,s as X,k as p,a as j,q as M,l as f,m as g,h as c,c as q,r as N,n as s,b as z,G as l,J as P,H as C,K as G,o as H,w as J,y as K,z as Y,A as F,g as Q,d as R,B as Z}from"../chunks/index.3f0776ba.js";import{j as v}from"../chunks/singletons.8db5238e.js";import{a as y}from"../chunks/anime.es.de4e5aa0.js";v.disable_scroll_handling;const ee=v.goto;v.invalidate;v.invalidateAll;v.preload_data;v.preload_code;v.before_navigate;v.after_navigate;function te(r){let e,o,a,n,i,h,x,w,t,d,_,$,I,b,V,E,D,T;return{c(){e=p("div"),o=p("div"),a=j(),n=p("div"),i=p("button"),h=p("div"),w=j(),t=p("div"),d=p("div"),_=p("p"),$=M("Ceci est un prototype et ne représente donc pas le produit fini"),I=j(),b=p("button"),V=M("Ok"),this.h()},l(m){e=f(m,"DIV",{id:!0,class:!0});var u=g(e);o=f(u,"DIV",{id:!0,class:!0}),g(o).forEach(c),a=q(u),n=f(u,"DIV",{class:!0});var k=g(n);i=f(k,"BUTTON",{id:!0,class:!0});var B=g(i);h=f(B,"DIV",{class:!0}),g(h).forEach(c),B.forEach(c),w=q(k),t=f(k,"DIV",{id:!0,class:!0});var O=g(t);d=f(O,"DIV",{class:!0});var S=g(d);_=f(S,"P",{class:!0});var A=g(_);$=N(A,"Ceci est un prototype et ne représente donc pas le produit fini"),A.forEach(c),S.forEach(c),I=q(O),b=f(O,"BUTTON",{class:!0});var L=g(b);V=N(L,"Ok"),L.forEach(c),O.forEach(c),k.forEach(c),u.forEach(c),this.h()},h(){s(o,"id","background-image"),s(o,"class","absolute top-0 right-0 bottom-0 left-0 bg-cover svelte-1b0iuaf"),s(h,"class","h-full w-full logo-image bg-cover svelte-1b0iuaf"),s(i,"id","logo"),s(i,"class",x="rounded-3xl aspect-square w-60 overflow-hidden drop-shadow-3xl-center "+(r[0]==0?"block":"hidden")),s(_,"class","text-center mb-0"),s(d,"class","p-8 bg-nature/50 rounded-3xl text-xl text-white"),s(b,"class","rounded-full bg-nature text-white text-2xl px-8 py-4"),s(t,"id","notice"),s(t,"class",E="flex flex-col justify-around p-16 sm:p-8 gap-8 h-96 max-w-md drop-shadow-3xl-center "+(r[0]==1?"block":"hidden")+" svelte-1b0iuaf"),s(n,"class","relative min-h-screen flex flex-col justify-center items-center"),s(e,"id","loading-page"),s(e,"class","relative overflow-hidden svelte-1b0iuaf")},m(m,u){z(m,e,u),l(e,o),l(e,a),l(e,n),l(n,i),l(i,h),r[4](i),l(n,w),l(n,t),l(t,d),l(d,_),l(_,$),l(t,I),l(t,b),l(b,V),D||(T=[P(i,"click",r[2]),P(b,"click",r[3])],D=!0)},p(m,[u]){u&1&&x!==(x="rounded-3xl aspect-square w-60 overflow-hidden drop-shadow-3xl-center "+(m[0]==0?"block":"hidden"))&&s(i,"class",x),u&1&&E!==(E="flex flex-col justify-around p-16 sm:p-8 gap-8 h-96 max-w-md drop-shadow-3xl-center "+(m[0]==1?"block":"hidden")+" svelte-1b0iuaf")&&s(t,"class",E)},i:C,o:C,d(m){m&&c(e),r[4](null),D=!1,G(T)}}}function ae(r,e,o){let a=0,n;const i=()=>{let t=0;y({targets:"#logo",scaleX:t,scaleY:t,opacity:t,duration:400,easing:"easeOutExpo",complete(d){o(0,a=1),h()}})},h=()=>{console.log("got here"),y({targets:"#notice",scale:[0,1],easing:"easeOutExpo",duration:400})},x=()=>{const t=_=>{console.log("tl complete"),ee("/map")};var d=y.timeline({easing:"easeOutExpo",duration:1500,complete:t});d.add({targets:"#notice",opacity:0,easing:"easeOutExpo",duration:400}).add({targets:"#background-image",opacity:0,easing:"easeOutExpo"},0)};H(()=>{y({targets:"#loading-page",opacity:1,duration:1e3}),y({targets:"#background-image",translateX:20,duration:1e4,loop:!0,direction:"alternate",easing:"easeInOutSine"})});function w(t){J[t?"unshift":"push"](()=>{n=t,o(1,n)})}return[a,n,i,x,w]}class se extends U{constructor(e){super(),W(this,e,ae,te,X,{})}}function oe(r){let e,o;return e=new se({}),{c(){K(e.$$.fragment)},l(a){Y(e.$$.fragment,a)},m(a,n){F(e,a,n),o=!0},p:C,i(a){o||(Q(e.$$.fragment,a),o=!0)},o(a){R(e.$$.fragment,a),o=!1},d(a){Z(e,a)}}}class re extends U{constructor(e){super(),W(this,e,null,oe,X,{})}}export{re as default};