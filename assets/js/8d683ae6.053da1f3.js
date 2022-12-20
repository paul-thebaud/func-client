"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[664],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(9496);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},l=Object.keys(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=c(n),m=a,v=d["".concat(s,".").concat(m)]||d[m]||p[m]||l;return n?r.createElement(v,o(o({ref:t},u),{},{components:n})):r.createElement(v,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,o=new Array(l);o[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var c=2;c<l;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},208:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(9496),a=n(5924);const l="tabItem_IPoj";function o(e){let{children:t,hidden:n,className:o}=e;return r.createElement("div",{role:"tabpanel",className:(0,a.Z)(l,o),hidden:n},t)}},4210:(e,t,n)=>{n.d(t,{Z:()=>m});var r=n(4250),a=n(9496),l=n(5924),o=n(4375),i=n(4436),s=n(7883),c=n(4930);const u="tabList_xr86",p="tabItem_r4_W";function d(e){var t;const{lazy:n,block:o,defaultValue:d,values:m,groupId:v,className:f}=e,b=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=m??b.map((e=>{let{props:{value:t,label:n,attributes:r}}=e;return{value:t,label:n,attributes:r}})),y=(0,i.l)(h,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const k=null===d?d:d??(null==(t=b.find((e=>e.props.default)))?void 0:t.props.value)??b[0].props.value;if(null!==k&&!h.some((e=>e.value===k)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${k}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:g,setTabGroupChoices:x}=(0,s.U)(),[E,w]=(0,a.useState)(k),N=[],{blockElementScrollPositionUntilNextRender:O}=(0,c.o5)();if(null!=v){const e=g[v];null!=e&&e!==E&&h.some((t=>t.value===e))&&w(e)}const T=e=>{const t=e.currentTarget,n=N.indexOf(t),r=h[n].value;r!==E&&(O(t),w(r),null!=v&&x(v,String(r)))},Z=e=>{var t;let n=null;switch(e.key){case"Enter":T(e);break;case"ArrowRight":{const t=N.indexOf(e.currentTarget)+1;n=N[t]??N[0];break}case"ArrowLeft":{const t=N.indexOf(e.currentTarget)-1;n=N[t]??N[N.length-1];break}}null==(t=n)||t.focus()};return a.createElement("div",{className:(0,l.Z)("tabs-container",u)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":o},f)},h.map((e=>{let{value:t,label:n,attributes:o}=e;return a.createElement("li",(0,r.Z)({role:"tab",tabIndex:E===t?0:-1,"aria-selected":E===t,key:t,ref:e=>N.push(e),onKeyDown:Z,onClick:T},o,{className:(0,l.Z)("tabs__item",p,null==o?void 0:o.className,{"tabs__item--active":E===t})}),n??t)}))),n?(0,a.cloneElement)(b.filter((e=>e.props.value===E))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==E})))))}function m(e){const t=(0,o.Z)();return a.createElement(d,(0,r.Z)({key:String(t)},e))}},5834:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(9496);function a(e){let{children:t,color:n}=e;return r.createElement("span",{className:`chip ${n&&`chip--${n}`}`},t)}},7063:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(9496),a=n(5834);function l(e){let{children:t,version:n,only:l,requires:o,provides:i}=e;return r.createElement("div",{style:{marginBottom:"12px"}},n&&r.createElement(a.Z,null,n),l&&r.createElement(a.Z,{color:"primary"},"only: ",l),o&&r.createElement(a.Z,{color:"danger"},"requires: ",o),i&&r.createElement(a.Z,{color:"success"},"provides: ",i),t)}},3770:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>s,default:()=>m,frontMatter:()=>i,metadata:()=>c,toc:()=>p});var r=n(4250),a=(n(9496),n(9613)),l=(n(208),n(4210),n(5834)),o=n(7063);const i={sidebar_position:4,description:"Available actions runners."},s="Actions runners",c={unversionedId:"api/actions-runners",id:"api/actions-runners",title:"Actions runners",description:"Available actions runners.",source:"@site/docs/api/actions-runners.mdx",sourceDirName:"api",slug:"/api/actions-runners",permalink:"/func-client/docs/api/actions-runners",draft:!1,editUrl:"https://github.com/paul-thebaud/func-client/tree/main/website/docs/api/actions-runners.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,description:"Available actions runners."},sidebar:"tutorialSidebar",previous:{title:"Actions enhancers",permalink:"/func-client/docs/api/actions-enhancers"},next:{title:"Types",permalink:"/func-client/docs/api/types"}},u={},p=[{value:"Note",id:"note",level:2},{value:"List",id:"list",level:2},{value:"<code>none</code>",id:"none",level:3},{value:"Example",id:"example",level:4},{value:"Returns",id:"returns",level:4},{value:"<code>all</code>",id:"all",level:3},{value:"Example",id:"example-1",level:4},{value:"Returns",id:"returns-1",level:4}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"actions-runners"},"Actions runners"),(0,a.kt)("h2",{id:"note"},"Note"),(0,a.kt)("p",null,"Many actions runners are available. Each may:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)(l.Z,{mdxType:"Chip"},"depend")," on a minimal package version"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)(l.Z,{color:"primary",mdxType:"Chip"},"only")," be available in a given use case (JSON:API, etc.)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)(l.Z,{color:"success",mdxType:"Chip"},"provide")," a given context to next enhancers or runners"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)(l.Z,{color:"danger",mdxType:"Chip"},"require")," a given context from previous enhancers or runners")),(0,a.kt)("p",null,"Examples of this guide will omit imports of your action factories or models to\nprovide shorter examples."),(0,a.kt)("h2",{id:"list"},"List"),(0,a.kt)("h3",{id:"none"},(0,a.kt)("inlineCode",{parentName:"h3"},"none")),(0,a.kt)(o.Z,{requires:"Adapter",mdxType:"FunctionInfo"}),(0,a.kt)("p",null,"Run the action and ignore the content of the result.\nAdapter errors are not caught and so may be thrown."),(0,a.kt)("h4",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { none } from 'func-client/core';\n\nawait action().run(none());\n")),(0,a.kt)("h4",{id:"returns"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"{Promise<void>}")),(0,a.kt)("h3",{id:"all"},(0,a.kt)("inlineCode",{parentName:"h3"},"all")),(0,a.kt)(o.Z,{requires:"Adapter, Deserializer, Model",mdxType:"FunctionInfo"}),(0,a.kt)("p",null,"Run the action and deserialize an array of model's instance."),(0,a.kt)("h4",{id:"example-1"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},"import { all } from 'func-client/core';\n\nconst posts = await action().run(all());\n")),(0,a.kt)("h4",{id:"returns-1"},"Returns"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"{Promise<I[]>}")," where ",(0,a.kt)("inlineCode",{parentName:"p"},"I")," is an instance of the targeted model."))}m.isMDXComponent=!0}}]);