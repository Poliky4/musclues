if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,c)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}}))).then((e=>{const r=c(...e);return s.default||(s.default=r),s}))})))}}define("./sw.js",["./workbox-4681948c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"192x192.d8dcb2dc.png",revision:"7ff840281e60ddb0eb79ec60d8dcb2dc"},{url:"512x512.a4fe2a51.png",revision:"3d4035cdf37094fe6ea60dcca4fe2a51"},{url:"index.3fe800cb.css",revision:"b43234b4f6e64b9d92c94ed3c0db6152"},{url:"index.cc5e1f32.js",revision:"2b8e5303ccd69ef72a78e2e40e771be1"},{url:"index.html",revision:"31cfa78098f38ed1d215456e6540c63c"},{url:"manifest.webmanifest",revision:"76e358da7f4b8b89db437e08f321a05d"}],{})}));
//# sourceMappingURL=sw.js.map
