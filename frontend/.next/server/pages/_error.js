"use strict";(()=>{var e={};e.id=731,e.ids=[731],e.modules={671:(e,t)=>{Object.defineProperty(t,"M",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},4129:(e,t,r)=>{r.a(e,async(e,o)=>{try{r.r(t),r.d(t,{config:()=>h,default:()=>c,getServerSideProps:()=>g,getStaticPaths:()=>f,getStaticProps:()=>p,reportWebVitals:()=>P,routeModule:()=>S,unstable_getServerProps:()=>m,unstable_getServerSideProps:()=>_,unstable_getStaticParams:()=>y,unstable_getStaticPaths:()=>x,unstable_getStaticProps:()=>b});var n=r(3865),i=r(9455),a=r(671),s=r(6530),l=r(3200),u=r(3532),d=e([l]);l=(d.then?(await d)():d)[0];let c=(0,a.M)(u,"default"),p=(0,a.M)(u,"getStaticProps"),f=(0,a.M)(u,"getStaticPaths"),g=(0,a.M)(u,"getServerSideProps"),h=(0,a.M)(u,"config"),P=(0,a.M)(u,"reportWebVitals"),b=(0,a.M)(u,"unstable_getStaticProps"),x=(0,a.M)(u,"unstable_getStaticPaths"),y=(0,a.M)(u,"unstable_getStaticParams"),m=(0,a.M)(u,"unstable_getServerProps"),_=(0,a.M)(u,"unstable_getServerSideProps"),S=new n.PagesRouteModule({definition:{kind:i.A.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:l.default,Document:s.default},userland:u});o()}catch(e){o(e)}})},3532:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let o=r(9929),n=r(8732),i=o._(r(2015)),a=o._(r(4426)),s={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function l(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let u={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||s[e]||"An unexpected error has occurred";return(0,n.jsxs)("div",{style:u.error,children:[(0,n.jsx)(a.default,{children:(0,n.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,n.jsxs)("div",{style:u.desc,children:[(0,n.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,n.jsx)("h1",{className:"next-error-h1",style:u.h1,children:e}):null,(0,n.jsx)("div",{style:u.wrap,children:(0,n.jsxs)("h2",{style:u.h2,children:[this.props.title||e?r:(0,n.jsx)(n.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=l,d.origGetInitialProps=l,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9455:(e,t)=>{var r;Object.defineProperty(t,"A",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE"}(r||(r={}))},9241:(e,t,r)=>{e.exports=r(3865).vendored.contexts.HeadManagerContext},361:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},2015:e=>{e.exports=require("react")},8732:e=>{e.exports=require("react/jsx-runtime")},3873:e=>{e.exports=require("path")},9198:e=>{e.exports=import("@reduxjs/toolkit")},1428:e=>{e.exports=import("axios")},4062:e=>{e.exports=import("react-redux")},4588:(e,t)=>{function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,o=new WeakMap;return(r=function(e){return e?o:t})(e)}t._=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var o=r(t);if(o&&o.has(e))return o.get(e);var n={__proto__:null},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if("default"!==a&&Object.prototype.hasOwnProperty.call(e,a)){var s=i?Object.getOwnPropertyDescriptor(e,a):null;s&&(s.get||s.set)?Object.defineProperty(n,a,s):n[a]=e[a]}return n.default=e,o&&o.set(e,n),n}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[883,338],()=>r(4129));module.exports=o})();