"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[73],{9613:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>m});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),s=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,f=d["".concat(u,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(f,l(l({ref:t},c),{},{components:n})):r.createElement(f,l({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=d;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},208:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(9496),a=n(5924);const o="tabItem_IPoj";function l(e){let{children:t,hidden:n,className:l}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,l),hidden:n},t)}},4210:(e,t,n)=>{n.d(t,{Z:()=>m});var r=n(4250),a=n(9496),o=n(5924),l=n(4375),i=n(4436),u=n(7883),s=n(4930);const c="tabList_xr86",p="tabItem_r4_W";function d(e){var t;const{lazy:n,block:l,defaultValue:d,values:m,groupId:f,className:b}=e,h=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),v=m??h.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),y=(0,i.l)(v,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const g=null===d?d:d??(null==(t=h.find((e=>e.props.default)))?void 0:t.props.value)??h[0].props.value;if(null!==g&&!v.some((e=>e.value===g)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${g}" but none of its children has the corresponding value. Available values are: ${v.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:w,setTabGroupChoices:k}=(0,u.U)(),[O,N]=(0,a.useState)(g),E=[],{blockElementScrollPositionUntilNextRender:P}=(0,s.o5)();if(null!=f){const e=w[f];null!=e&&e!==O&&v.some((t=>t.value===e))&&N(e)}const x=e=>{const t=e.currentTarget,n=E.indexOf(t),r=v[n].value;r!==O&&(P(t),N(r),null!=f&&k(f,String(r)))},T=e=>{var t;let n=null;switch(e.key){case"Enter":x(e);break;case"ArrowRight":{const t=E.indexOf(e.currentTarget)+1;n=E[t]??E[0];break}case"ArrowLeft":{const t=E.indexOf(e.currentTarget)-1;n=E[t]??E[E.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,o.Z)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":l},b)},v.map((e=>{let{value:t,label:n,attributes:l}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:O===t?0:-1,"aria-selected":O===t,key:t,ref:e=>E.push(e),onKeyDown:T,onClick:x},l,{className:(0,o.Z)("tabs__item",p,null==l?void 0:l.className,{"tabs__item--active":O===t})}),n??t)}))),n?(0,a.cloneElement)(h.filter((e=>e.props.value===O))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==O})))))}function m(e){const t=(0,l.Z)();return a.createElement(d,(0,r.Z)({key:String(t)},e))}},6883:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>s});var r=n(4250),a=(n(9496),n(9613));n(208),n(4210);const o={sidebar_position:1},l="About",i={unversionedId:"about",id:"about",title:"About",description:"What is FuncClient?",source:"@site/docs/about.mdx",sourceDirName:".",slug:"/about",permalink:"/func-client/docs/about",draft:!1,editUrl:"https://github.com/paul-thebaud/func-client/tree/main/website/docs/about.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Installation",permalink:"/func-client/docs/installation"}},u={},s=[{value:"What is FuncClient?",id:"what-is-funcclient",level:2},{value:"What to do now?",id:"what-to-do-now",level:2}],c={toc:s};function p(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"about"},"About"),(0,a.kt)("h2",{id:"what-is-funcclient"},"What is FuncClient?"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"FuncClient")," is a simple functional programming oriented API client. It is\nframework-agnostic and can integrate with any Web app using JavaScript or\nTypeScript, and with any data source."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Modular, highly extensible and fully tree shakable thanks to functional\nprogramming.\n",(0,a.kt)("a",{parentName:"li",href:"/docs/faq#why-are-we-not-using-big-model-and-builder-classes"},"See the benefits")),(0,a.kt)("li",{parentName:"ul"},"Ready to use functions to integrate with any ",(0,a.kt)("a",{parentName:"li",href:"https://jsonapi.org/"},"JSON:API")),(0,a.kt)("li",{parentName:"ul"},"Strongly typed everywhere, with generics typings on models, actions, etc."),(0,a.kt)("li",{parentName:"ul"},"Dependency free (JSON:API adapter is based\non ",(0,a.kt)("a",{parentName:"li",href:"https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"},"fetch API"),")"),(0,a.kt)("li",{parentName:"ul"},"(coming soon) Fully linted, tested and documented")),(0,a.kt)("h2",{id:"what-to-do-now"},"What to do now?"),(0,a.kt)("p",null,"You may start to discover FuncClient from different point of view."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/getting-started"},"Get started")," using our simple guide about interacting\nwith a JSON:API"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"/docs/category/examples"},"Check out examples")," built with FuncClient to know\nif the API fits your needs")))}p.isMDXComponent=!0}}]);