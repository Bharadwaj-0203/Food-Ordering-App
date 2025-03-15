(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const c=[{name:"Pizza",ingredients:["pepperoni","mushrom","mozarella"],id:0,price:14,emoji:"🍕"},{name:"Hamburger",ingredients:["beef","cheese","lettuce"],price:12,emoji:"🍔",id:1},{name:"Beer",ingredients:["grain, hops, yeast, water"],price:12,emoji:"🍺",id:2}];document.querySelector("#order-list").innerHTML=c.map(i=>{const{name:e,ingredients:n,id:s,price:t,emoji:r}=i;return`<div class="item" id=item-${s}>
      <div class="item-image">
        <p class="emoji margin-zero">${r}</p>
      </div>
      <div class="item-desc margin-zero">
        <h2 class="item-title margin-zero">${e}</h2>
        <p class="item-ingredients margin-zero">${n}</p>
        <p class="item-price margin-zero">$${t}</p>
      </div>
      <button id="${s}" class="add-item-btn pointer">+</button>
    </div>`}).join("");const o=new Map,l=document.getElementById("order-details");document.addEventListener("click",i=>{const e=Number(i.target.id);!isNaN(e)&&e>=0&&e<c.length&&(o.has(c[e].name)?(console.log("element already exists"),o.set(c[e].name,o.get(c[e].name)+c[e].price),console.log(o),d(o)):(console.log("new element"),o.set(c[e].name,c[e].price),console.log(o),d(o))),o.has(i.target.id)&&(console.log("remove "),o.delete(i.target.id),d(o)),i.target.id==="complete-order"&&document.querySelector("#payment").classList.add("payment")});function d(i){const e=document.querySelector("#order-container");i.size<1?l.classList.add("hide"):i.size===1&&l.classList.remove("hide");let n="",s=0;i.forEach((t,r)=>{n+=`
    <div class="ordered-item">
        <h2 class="ordered-item-title">${r}</h2>
        <button class="remove-btn pointer" id=${r}>remove</button>
        <p class="ordered-item-price"  >$${t}</p>
    </div>
    `,console.log(r),s+=t}),e.innerHTML=n,document.querySelector("#total-price").innerHTML=`$${s}`}document.addEventListener("click",i=>{if(i.target.id==="submit"){i.preventDefault();const e=document.querySelector("#payment");e.classList.remove("payment"),e.classList.add("hide"),document.querySelector("#order-container"),l.classList.add("hide");const n=document.querySelector("#thanks");n.innerHTML=`<p>Thanks, ${document.getElementById("name").value}! Your order is on its way!</p>`,n.classList.remove("hide"),n.classList.add("thanks-container")}});
