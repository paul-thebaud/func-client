"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[637],{9613:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>m});var a=t(9496);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=a.createContext({}),c=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=c(e.components);return a.createElement(s.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},d=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(t),m=r,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return t?a.createElement(h,i(i({ref:n},u),{},{components:t})):a.createElement(h,i({ref:n},u))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=d;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}d.displayName="MDXCreateElement"},208:(e,n,t)=>{t.d(n,{Z:()=>i});var a=t(9496),r=t(5924);const o="tabItem_IPoj";function i(e){let{children:n,hidden:t,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,r.Z)(o,i),hidden:t},n)}},4210:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(4250),r=t(9496),o=t(5924),i=t(4375),l=t(4436),s=t(7883),c=t(4930);const u="tabList_xr86",p="tabItem_r4_W";function d(e){var n;const{lazy:t,block:i,defaultValue:d,values:m,groupId:h,className:k}=e,f=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=m??f.map((e=>{let{props:{value:n,label:t,attributes:a}}=e;return{value:n,label:t,attributes:a}})),b=(0,l.l)(g,((e,n)=>e.value===n.value));if(b.length>0)throw new Error(`Docusaurus error: Duplicate values "${b.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===d?d:d??(null==(n=f.find((e=>e.props.default)))?void 0:n.props.value)??f[0].props.value;if(null!==v&&!g.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:y,setTabGroupChoices:N}=(0,s.U)(),[w,x]=(0,r.useState)(v),E=[],{blockElementScrollPositionUntilNextRender:O}=(0,c.o5)();if(null!=h){const e=y[h];null!=e&&e!==w&&g.some((n=>n.value===e))&&x(e)}const P=e=>{const n=e.currentTarget,t=E.indexOf(n),a=g[t].value;a!==w&&(O(n),x(a),null!=h&&N(h,String(a)))},j=e=>{var n;let t=null;switch(e.key){case"Enter":P(e);break;case"ArrowRight":{const n=E.indexOf(e.currentTarget)+1;t=E[n]??E[0];break}case"ArrowLeft":{const n=E.indexOf(e.currentTarget)-1;t=E[n]??E[E.length-1];break}}null==(n=t)||n.focus()};return r.createElement("div",{className:(0,o.Z)("tabs-container",u)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":i},k)},g.map((e=>{let{value:n,label:t,attributes:i}=e;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===n?0:-1,"aria-selected":w===n,key:n,ref:e=>E.push(e),onKeyDown:j,onClick:P},i,{className:(0,o.Z)("tabs__item",p,null==i?void 0:i.className,{"tabs__item--active":w===n})}),t??n)}))),t?(0,r.cloneElement)(f.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},f.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==w})))))}function m(e){const n=(0,i.Z)();return r.createElement(d,(0,a.Z)({key:String(n)},e))}},8312:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=t(4250),r=(t(9496),t(9613));t(208),t(4210);const o={sidebar_position:2,description:"Build actions, registering hooks, discover enhancers and runners."},i="Actions",l={unversionedId:"essentials/actions",id:"essentials/actions",title:"Actions",description:"Build actions, registering hooks, discover enhancers and runners.",source:"@site/docs/essentials/actions.mdx",sourceDirName:"essentials",slug:"/essentials/actions",permalink:"/func-client/docs/essentials/actions",draft:!1,editUrl:"https://github.com/paul-thebaud/func-client/tree/main/website/docs/essentials/actions.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,description:"Build actions, registering hooks, discover enhancers and runners."},sidebar:"tutorialSidebar",previous:{title:"Models",permalink:"/func-client/docs/essentials/models"},next:{title:"Advanced",permalink:"/func-client/docs/category/advanced"}},s={},c=[{value:"Instantiation",id:"instantiation",level:2},{value:"Enhancements",id:"enhancements",level:2},{value:"Available enhancers",id:"available-enhancers",level:3},{value:"Run",id:"run",level:2},{value:"Available enhancers",id:"available-enhancers-1",level:3},{value:"Hooks",id:"hooks",level:2}],u={toc:c};function p(e){let{components:n,...t}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"actions"},"Actions"),(0,r.kt)("admonition",{title:"What you'll learn",type:"tip"},(0,r.kt)("ul",{parentName:"admonition"},(0,r.kt)("li",{parentName:"ul"},"Enhancing actions"),(0,r.kt)("li",{parentName:"ul"},"Running actions"),(0,r.kt)("li",{parentName:"ul"},"Registering hooks on actions"))),(0,r.kt)("admonition",{title:"Requirements",type:"caution"},(0,r.kt)("p",{parentName:"admonition"},"Before reading this guide, you should have a working action factory. You can\nread the ",(0,r.kt)("a",{parentName:"p",href:"/docs/getting-started#your-first-actions"},(0,r.kt)("strong",{parentName:"a"},"getting started guide")),"\nto quickly create your own action factory.")),(0,r.kt)("h2",{id:"instantiation"},"Instantiation"),(0,r.kt)("p",null,"As stated in the ",(0,r.kt)("a",{parentName:"p",href:"/docs/getting-started#running-actions"},"getting started guide"),",\nactions are instantiated through your action factory."),(0,r.kt)("h2",{id:"enhancements"},"Enhancements"),(0,r.kt)("p",null,"An action instance may receive none to many enhancements, which will provide\nan appropriate context to run a request through data source."),(0,r.kt)("p",null,"Each enhancer can be applied using the ",(0,r.kt)("inlineCode",{parentName:"p"},"use")," action method."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"action()\n  // Enhance the action.\n  .use(model(Post))\n  .use(include('comments'));\n")),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Please note that context enhancer are not instantly applied to the action\ncontext, but during the action run step.")),(0,r.kt)("h3",{id:"available-enhancers"},"Available enhancers"),(0,r.kt)("p",null,"All enhancers are listed in the\n",(0,r.kt)("a",{parentName:"p",href:"/docs/api/actions-enhancers"},(0,r.kt)("strong",{parentName:"a"},"actions' available enhancers API guide")),"."),(0,r.kt)("h2",{id:"run"},"Run"),(0,r.kt)("p",null,"An action instance can be run using the ",(0,r.kt)("inlineCode",{parentName:"p"},"run")," method. The runner may use\nenhancers or runners internally."),(0,r.kt)("p",null,"When an action run, it does 3 things:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Dequeue all enhancers since the action instantiation and build context"),(0,r.kt)("li",{parentName:"ul"},"Execute the runner and each of its internal enhancers/runners (this may update the context)"),(0,r.kt)("li",{parentName:"ul"},"Return the runner's result (might be any value, including void or an error throwing)")),(0,r.kt)("p",null,"Internally, action running will also trigger ",(0,r.kt)("a",{parentName:"p",href:"#hooks"},"actions hooks"),"."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"action()\n  .use(model(Post))\n  .use(include('comments'))\n  // Run the action.\n  .run(all());\n")),(0,r.kt)("h3",{id:"available-enhancers-1"},"Available enhancers"),(0,r.kt)("p",null,"All runners are listed in the\n",(0,r.kt)("a",{parentName:"p",href:"/docs/api/actions-runners"},(0,r.kt)("strong",{parentName:"a"},"actions' available runners API guide")),"."),(0,r.kt)("h2",{id:"hooks"},"Hooks"),(0,r.kt)("p",null,"You may hook on multiple events which occurs on action instance using the hook\nregistration function:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"onPreparing"),": before context computation through enhancers dequeueing."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"onRunning"),": after context computation, before context runner execution."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"onSuccess"),": after context runner successful execution (no error thrown)."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"onError"),": after context runner failed execution (error thrown)."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"onFinally"),": after context runner successful or failed execution.")),(0,r.kt)("p",null,"To register a hook callback, you must use the registration enhancer on your\nbuilding action."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { onPreparing, onRunning, onSuccess, onError, onFinally } from 'func-client/core';\n\naction().use(onPreparing(() => /* ... */));\naction().use(onRunning(({ context }) => /* ... */));\naction().use(onSuccess(({ context, result }) => /* ... */));\naction().use(onError(({ context, error }) => /* ... */));\naction().use(onFinally(({ context }) => /* ... */));\n")),(0,r.kt)("admonition",{type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Hooks callback may be async and will be ran sequentially\n(one by one, not parallelized).")),(0,r.kt)("p",null,"You can disable hook execution on a given action instance by using the\n",(0,r.kt)("inlineCode",{parentName:"p"},"withoutHooks")," function."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"import { withoutHooks } from 'func-client/core';\n\nconst users = await withoutHooks(action(), async (a) => {\n  return await a.use(model(User)).run(all());\n});\n")),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"FuncClient will also register hooks when using some enhancers. Those will\nprovide some library features\n(",(0,r.kt)("a",{parentName:"p",href:"/docs/essentials/models#hooks"},(0,r.kt)("strong",{parentName:"a"},"models hooks")),", etc.).")))}p.isMDXComponent=!0}}]);