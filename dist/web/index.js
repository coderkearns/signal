"use strict";var Signal=(()=>{var o=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var s=Object.getOwnPropertyNames;var l=Object.prototype.hasOwnProperty;var a=(t,n)=>{for(var r in n)o(t,r,{get:n[r],enumerable:!0})},g=(t,n,r,e)=>{if(n&&typeof n=="object"||typeof n=="function")for(let u of s(n))!l.call(t,u)&&u!==r&&o(t,u,{get:()=>n[u],enumerable:!(e=f(n,u))||e.enumerable});return t};var p=t=>g(o({},"__esModule",{value:!0}),t);var h={};a(h,{effect:()=>d,s:()=>b,use:()=>i});var c=null;function i(t){var n=[],r={get:function(){return c!==null&&!c.includes(r.subscribe)&&c.push(r.subscribe),t},get $(){return r.get()},set:function(e){t=e,n.forEach(function(u){return u()})},subscribe:function(e){return n.push(e),function(){n.splice(n.indexOf(e),1)}},destroy:function(){},valueOf:function(){return r.get()},toString:function(){return"".concat(r.get())}};return r}function b(t){return t.get()}function d(t){c=[];var n=i(t()),r=function(){return n.set(t())},e=c.map(function(u){return u(r)});return n.destroy=function(){e.forEach(function(u){return u()})},c=null,n}return p(h);})();
//# sourceMappingURL=index.js.map
