"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[3155],{9613:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>m});var n=r(9496);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,s=o(e,["components","mdxType","originalType","parentName"]),u=p(r),m=i,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||a;return r?n.createElement(f,l(l({ref:t},s),{},{components:r})):n.createElement(f,l({ref:t},s))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=u;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},518:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var n=r(4250),i=(r(9496),r(9613));const a={id:"core.FuncClientError",title:"Class: FuncClientError",sidebar_label:"FuncClientError",custom_edit_url:null},l=void 0,o={unversionedId:"api/func-client/classes/core.FuncClientError",id:"api/func-client/classes/core.FuncClientError",title:"Class: FuncClientError",description:"core.FuncClientError",source:"@site/docs/api/func-client/classes/core.FuncClientError.md",sourceDirName:"api/func-client/classes",slug:"/api/func-client/classes/core.FuncClientError",permalink:"/func-client/docs/api/func-client/classes/core.FuncClientError",draft:!1,editUrl:null,tags:[],version:"current",frontMatter:{id:"core.FuncClientError",title:"Class: FuncClientError",sidebar_label:"FuncClientError",custom_edit_url:null},sidebar:"tutorialSidebar",previous:{title:"ExpectedRunFailureError",permalink:"/func-client/docs/api/func-client/classes/core.ExpectedRunFailureError"},next:{title:"MapRegistry",permalink:"/func-client/docs/api/func-client/classes/core.MapRegistry"}},c={},p=[{value:"Hierarchy",id:"hierarchy",level:2},{value:"Constructors",id:"constructors",level:2},{value:"constructor",id:"constructor",level:3},{value:"Parameters",id:"parameters",level:4},{value:"Overrides",id:"overrides",level:4},{value:"Defined in",id:"defined-in",level:4},{value:"Properties",id:"properties",level:2},{value:"cause",id:"cause",level:3},{value:"Inherited from",id:"inherited-from",level:4},{value:"Defined in",id:"defined-in-1",level:4},{value:"message",id:"message",level:3},{value:"Inherited from",id:"inherited-from-1",level:4},{value:"Defined in",id:"defined-in-2",level:4},{value:"name",id:"name",level:3},{value:"Inherited from",id:"inherited-from-2",level:4},{value:"Defined in",id:"defined-in-3",level:4},{value:"stack",id:"stack",level:3},{value:"Inherited from",id:"inherited-from-3",level:4},{value:"Defined in",id:"defined-in-4",level:4}],s={toc:p};function d(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/modules/core"},"core"),".FuncClientError"),(0,i.kt)("p",null,"Extendable error class used inside FuncClient."),(0,i.kt)("h2",{id:"hierarchy"},"Hierarchy"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"Error")),(0,i.kt)("p",{parentName:"li"},"\u21b3 ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("inlineCode",{parentName:"strong"},"FuncClientError"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/classes/core.AdapterError"},(0,i.kt)("inlineCode",{parentName:"a"},"AdapterError"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/classes/core.DeserializerError"},(0,i.kt)("inlineCode",{parentName:"a"},"DeserializerError"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/classes/core.SerializerError"},(0,i.kt)("inlineCode",{parentName:"a"},"SerializerError"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/classes/core.ExpectedRunFailureError"},(0,i.kt)("inlineCode",{parentName:"a"},"ExpectedRunFailureError"))),(0,i.kt)("p",{parentName:"li"},"\u21b3\u21b3 ",(0,i.kt)("a",{parentName:"p",href:"/func-client/docs/api/func-client/classes/http.HttpAdapterError"},(0,i.kt)("inlineCode",{parentName:"a"},"HttpAdapterError"))))),(0,i.kt)("h2",{id:"constructors"},"Constructors"),(0,i.kt)("h3",{id:"constructor"},"constructor"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"new FuncClientError"),"(",(0,i.kt)("inlineCode",{parentName:"p"},"message"),")"),(0,i.kt)("p",null,'Construct a new FuncClientError. Prefix the given message with "',"[func-client]",'".'),(0,i.kt)("h4",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:"left"},"Name"),(0,i.kt)("th",{parentName:"tr",align:"left"},"Type"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"message")),(0,i.kt)("td",{parentName:"tr",align:"left"},(0,i.kt)("inlineCode",{parentName:"td"},"string"))))),(0,i.kt)("h4",{id:"overrides"},"Overrides"),(0,i.kt)("p",null,"Error.constructor"),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/paul-thebaud/func-client/blob/f13afc7/src/core/errors/funcClientError.ts#L10"},"src/core/errors/funcClientError.ts:10")),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"cause"},"cause"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"cause"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"unknown")),(0,i.kt)("h4",{id:"inherited-from"},"Inherited from"),(0,i.kt)("p",null,"Error.cause"),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,"website/node_modules/.pnpm/",(0,i.kt)("a",{parentName:"p",href:"mailto:typescript@4.8.4"},"typescript@4.8.4"),"/node_modules/typescript/lib/lib.es2022.error.d.ts:26"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"message"},"message"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"inherited-from-1"},"Inherited from"),(0,i.kt)("p",null,"Error.message"),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,"website/node_modules/.pnpm/",(0,i.kt)("a",{parentName:"p",href:"mailto:typescript@4.8.4"},"typescript@4.8.4"),"/node_modules/typescript/lib/lib.es5.d.ts:1041"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"name"},"name"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"name"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"inherited-from-2"},"Inherited from"),(0,i.kt)("p",null,"Error.name"),(0,i.kt)("h4",{id:"defined-in-3"},"Defined in"),(0,i.kt)("p",null,"website/node_modules/.pnpm/",(0,i.kt)("a",{parentName:"p",href:"mailto:typescript@4.8.4"},"typescript@4.8.4"),"/node_modules/typescript/lib/lib.es5.d.ts:1040"),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"stack"},"stack"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"stack"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"inherited-from-3"},"Inherited from"),(0,i.kt)("p",null,"Error.stack"),(0,i.kt)("h4",{id:"defined-in-4"},"Defined in"),(0,i.kt)("p",null,"website/node_modules/.pnpm/",(0,i.kt)("a",{parentName:"p",href:"mailto:typescript@4.8.4"},"typescript@4.8.4"),"/node_modules/typescript/lib/lib.es5.d.ts:1042"))}d.isMDXComponent=!0}}]);