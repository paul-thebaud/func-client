"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[6920],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>c});var a=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),m=d(n),c=o,k=m["".concat(s,".").concat(c)]||m[c]||p[c]||l;return n?a.createElement(k,i(i({ref:t},u),{},{components:n})):a.createElement(k,i({ref:t},u))}));function c(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,i=new Array(l);i[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:o,i[1]=r;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},208:(e,t,n)=>{n.d(t,{Z:()=>i});var a=n(9496),o=n(5924);const l="tabItem_IPoj";function i(e){let{children:t,hidden:n,className:i}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(l,i),hidden:n},t)}},4210:(e,t,n)=>{n.d(t,{Z:()=>c});var a=n(4250),o=n(9496),l=n(5924),i=n(4375),r=n(4436),s=n(7883),d=n(4930);const u="tabList_xr86",p="tabItem_r4_W";function m(e){var t;const{lazy:n,block:i,defaultValue:m,values:c,groupId:k,className:f}=e,h=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=c??h.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),y=(0,r.l)(g,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const N=null===m?m:m??(null==(t=h.find((e=>e.props.default)))?void 0:t.props.value)??h[0].props.value;if(null!==N&&!g.some((e=>e.value===N)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${N}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:b,setTabGroupChoices:v}=(0,s.U)(),[w,C]=(0,o.useState)(N),T=[],{blockElementScrollPositionUntilNextRender:O}=(0,d.o5)();if(null!=k){const e=b[k];null!=e&&e!==w&&g.some((t=>t.value===e))&&C(e)}const x=e=>{const t=e.currentTarget,n=T.indexOf(t),a=g[n].value;a!==w&&(O(t),C(a),null!=k&&v(k,String(a)))},D=e=>{var t;let n=null;switch(e.key){case"Enter":x(e);break;case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;n=T[t]??T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;n=T[t]??T[T.length-1];break}}null==(t=n)||t.focus()};return o.createElement("div",{className:(0,l.Z)("tabs-container",u)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,l.Z)("tabs",{"tabs--block":i},f)},g.map((e=>{let{value:t,label:n,attributes:i}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:D,onClick:x},i,{className:(0,l.Z)("tabs__item",p,null==i?void 0:i.className,{"tabs__item--active":w===t})}),n??t)}))),n?(0,o.cloneElement)(h.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function c(e){const t=(0,i.Z)();return o.createElement(m,(0,a.Z)({key:String(t)},e))}},4958:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>d,default:()=>k,frontMatter:()=>s,metadata:()=>u,toc:()=>m});var a=n(4250),o=(n(9496),n(9613)),l=n(208),i=n(4210),r=n(4936);const s={sidebar_position:1,description:"Define models with attributes, relations and hooks."},d="Models",u={unversionedId:"essentials/models",id:"essentials/models",title:"Models",description:"Define models with attributes, relations and hooks.",source:"@site/docs/essentials/models.mdx",sourceDirName:"essentials",slug:"/essentials/models",permalink:"/func-client/docs/essentials/models",draft:!1,editUrl:"https://github.com/paul-thebaud/func-client/tree/main/website/docs/essentials/models.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"Define models with attributes, relations and hooks."},sidebar:"tutorialSidebar",previous:{title:"Essentials",permalink:"/func-client/docs/category/essentials"},next:{title:"Actions",permalink:"/func-client/docs/essentials/actions"}},p={},m=[{value:"Model factory",id:"model-factory",level:2},{value:"Extending a model class",id:"extending-a-model-class",level:3},{value:"Using models classes",id:"using-models-classes",level:3},{value:"Definition",id:"definition",level:2},{value:"Attributes",id:"attributes",level:3},{value:"Configuration",id:"configuration",level:4},{value:"Transform",id:"transform",level:4},{value:"Relations",id:"relations",level:3},{value:"Configuration",id:"configuration-1",level:4},{value:"Custom properties",id:"custom-properties",level:3},{value:"Hooks",id:"hooks",level:2}],c={toc:m};function k(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"models"},"Models"),(0,o.kt)("admonition",{title:"What you'll learn",type:"tip"},(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Defining basic models with attributes and relationships"),(0,o.kt)("li",{parentName:"ul"},"Extending your models with custom properties"),(0,o.kt)("li",{parentName:"ul"},"Registering hooks on models"))),(0,o.kt)("h2",{id:"model-factory"},"Model factory"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { makeModel } from 'func-client/core';\n\nmakeModel('type', { /* definition */ })\n")),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"makeModel")," is the default model factory function. It defines a new model using\n2 arguments:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The string ",(0,o.kt)("inlineCode",{parentName:"li"},"type")," or a configuration object."),(0,o.kt)("li",{parentName:"ul"},"The optional ",(0,o.kt)("inlineCode",{parentName:"li"},"definition")," of the model: an object map containing\nattributes/relations definitions and custom properties and methods.")),(0,o.kt)("p",null,"The attributes and relations definition represents the ",(0,o.kt)("inlineCode",{parentName:"p"},"schema")," of the model."),(0,o.kt)("h3",{id:"extending-a-model-class"},"Extending a model class"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"makeModel")," will return a model class which can be extended by an ES6 class."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"export default class Post extends makeModel('Post') {}\n")),(0,o.kt)("p",null,"The returned model class also provides static methods to extend the definition\nalready provided to ",(0,o.kt)("inlineCode",{parentName:"p"},"makeModel"),"."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"makeModel('Post', { /* definition */ })\n  .extends({ /* additional definition */ })\n  .extends({ /* another additional definition */ });\n")),(0,o.kt)("p",null,"This can be useful when sharing common features across models: creation\ntimestamps, client side ID generation, etc."),(0,o.kt)("p",null,"If you wish to learn more about the composition capabilities of models,\nyou should read the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/advanced/models-composition"},"advanced guide about models composition"),"."),(0,o.kt)("h3",{id:"using-models-classes"},"Using models classes"),(0,o.kt)("p",null,"Model classes can be used as any classical ES6 class. It can be instantiated,\nmanipulated, etc. Properties will be defined on each instance from the model\ndefinition."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"const post = new Post();\npost.title = 'Hello World!';\nconsole.log(post.title); // \"Hello World!\"\nconsole.log(post.isDraft); // true\nconsole.log(post.exists); // false\n")),(0,o.kt)("p",null,"Please note that most model's interaction (fetching, updating, etc.) are done\nthrough actions, so you may ",(0,o.kt)("a",{parentName:"p",href:"/docs/essentials/actions"},"read the actions guide"),"\nto learn more about those."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"FuncClient proposes you multiple utilities functions to interact with models")),(0,o.kt)(r.Z,{className:"button bg--primary-gradient",to:"/docs/essentials/models",mdxType:"Link"},"Read the models' utilities API guide"),(0,o.kt)("h2",{id:"definition"},"Definition"),(0,o.kt)("admonition",{type:"caution"},(0,o.kt)("p",{parentName:"admonition"},"You ",(0,o.kt)("strong",{parentName:"p"},"must")," not use ",(0,o.kt)("inlineCode",{parentName:"p"},"id"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"lid"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"type")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"exists")," as key of any\nattributes/relations/properties as those keys are internally used by FuncClient\nor may be used by dependencies (e.g. JSON:API adapter).")),(0,o.kt)("h3",{id:"attributes"},"Attributes"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"attr")," is an attribute definition factory function to use when you wish to\ndefine your model's attributes. It may take 0 to 2 arguments, depending on\nwhat you want to do."),(0,o.kt)(i.Z,{groupId:"language",defaultValue:"ts",values:[{label:"TypeScript",value:"ts"},{label:"JavaScript",value:"js"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { attr, toDate } from 'func-client/core';\n\nattr<string>(); // Without config.\nattr(toDate()); // With a transformer.\nattr({ default: '', transformer: toDate() }); // With config.\nattr(toDate(), { readOnly: true }); // With a transformer and config.\nattr({ default: () => [] }); // With a factory default (required for objects props).\n"))),(0,o.kt)(l.Z,{value:"js",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { attr, toDate } from 'func-client/core';\n\nattr(); // Without config.\nattr(toDate()); // With a transformer.\nattr({ default: '', transformer: toDate() }); // With config.\nattr(toDate(), { readOnly: true }); // With a transformer and config.\nattr({ default: () => [] }); // With a factory default (required for objects props).\n")))),(0,o.kt)("p",null,"Note that FuncClient consider your attributes as non-nullable values by default.\nWhen one of your model contains nullable attributes, you may want to pass a type\nto the factory (e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"attr<string | null>()"),") or set a default attribute value\n(e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"attr({ default: '' })"),")."),(0,o.kt)("h4",{id:"configuration"},"Configuration"),(0,o.kt)("p",null,"You may customize your attribute with the following config:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Key"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Defaults"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"transformer")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"Transform<T>")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The transformer for the prop's value when interacting with your backend.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"default")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"T")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The default value for the prop when initializing a model instance.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"readOnly")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"boolean")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"false")),(0,o.kt)("td",{parentName:"tr",align:null},"The value won't be serialized when sending the data to your data source.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"alias")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The key to (de)serialize the prop's value from/in when interacting with your backend.")))),(0,o.kt)("h4",{id:"transform"},"Transform"),(0,o.kt)("p",null,"You can use a transform to convert an attribute value when (de)serializing\nfrom/to your data source. There are two types or transformer within FuncClient:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"FunctionTransform"),": a function to call to transform the value whether\nwe are serializing or deserializing it."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"ObjectTransform"),": an object with two methods: ",(0,o.kt)("inlineCode",{parentName:"li"},"serialize")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"deserialize"),".")),(0,o.kt)("p",null,"FuncClient propose you 4 transformers out of the box:\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/func-client/modules/core#todate"},(0,o.kt)("inlineCode",{parentName:"a"},"toDate")),",\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/func-client/modules/core#tonumber"},(0,o.kt)("inlineCode",{parentName:"a"},"toNumber")),",\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/func-client/modules/core#toboolean"},(0,o.kt)("inlineCode",{parentName:"a"},"toBoolean"))," and\n",(0,o.kt)("a",{parentName:"p",href:"/docs/api/func-client/modules/core#tostring"},(0,o.kt)("inlineCode",{parentName:"a"},"toString")),"."),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"You may need other transformers in your implementation, for example when you\nare using a library to manage dates (momentjs, dayjs, etc.). You may read the\n",(0,o.kt)("a",{parentName:"p",href:"/docs/advanced/custom-transformers"},(0,o.kt)("strong",{parentName:"a"},"advanced guide on transformers")),"\nto learn more about those.")),(0,o.kt)("h3",{id:"relations"},"Relations"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"hasMany")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"hasOne")," are relation definition factory function to use when\nyou wish to define your model's relations. As suggested by their names,\n",(0,o.kt)("inlineCode",{parentName:"p"},"hasMany")," represents a relation to a list of model and ",(0,o.kt)("inlineCode",{parentName:"p"},"hasOne")," represents a\nrelation to a single model.\nIt may take 0 to 1 argument, depending on what you want to do."),(0,o.kt)(i.Z,{groupId:"language",defaultValue:"ts",values:[{label:"TypeScript",value:"ts"},{label:"JavaScript",value:"js"}],mdxType:"Tabs"},(0,o.kt)(l.Z,{value:"ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"import { hasOne, hasMany } from 'func-client/core';\nimport type User from './user';\nimport type Comment from './comment';\n\nhasOne<User>(); // Without config.\nhasOne<User>({ readOnly: true }); // With config.\nhasOne<User>({ type: 'users' }); // With explicit type.\n\nhasMany<Comment>(); // Without config.\nhasMany<Comment>({ readOnly: true }); // With config.\nhasMany<Comment>({ type: 'comments' }); // With explicit type.\n"))),(0,o.kt)(l.Z,{value:"js",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"import { hasOne, hasMany } from 'func-client/core';\n\nhasOne(); // Without config.\nhasOne({ readOnly: true }); // With config.\nhasOne({ type: 'users' }); // With explicit type.\n\nhasMany(); // Without config.\nhasMany({ readOnly: true }); // With config.\nhasMany({ type: 'comments' }); // With explicit type.\n")))),(0,o.kt)("p",null,"Note that FuncClient consider your relations as non-nullable values by default.\nWhen one of your model contains nullable relations, you may want to pass a type\nto the factory (e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"hasOne<User | null>()"),") or set a default relation value\n(e.g. ",(0,o.kt)("inlineCode",{parentName:"p"},"hasOne({ default: null as User | null })"),")."),(0,o.kt)("p",null,"Also consider that non-loaded relations will have a value of ",(0,o.kt)("inlineCode",{parentName:"p"},"undefined"),"."),(0,o.kt)("admonition",{type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"When using TypeScript, you should define the type of the relation to get a\nfully strongly typed model. We suggest you to use ",(0,o.kt)("inlineCode",{parentName:"p"},"import type")," to avoid\ncreating circular dependencies when having circular model relations.")),(0,o.kt)("h4",{id:"configuration-1"},"Configuration"),(0,o.kt)("p",null,"You may customize your relation with the following config:"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Key"),(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Defaults"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"default")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"T")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The default value for the prop when initializing a model instance.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"readOnly")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"boolean")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"false")),(0,o.kt)("td",{parentName:"tr",align:null},"The value won't be serialized when sending the data to your data source.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"alias")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The key to (de)serialize the prop's value from/in when interacting with your backend.")),(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"type")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"string")),(0,o.kt)("td",{parentName:"tr",align:null},(0,o.kt)("inlineCode",{parentName:"td"},"undefined")),(0,o.kt)("td",{parentName:"tr",align:null},"The explicit type of related model. Might be used by the deserializer to known which model to instantiate.")))),(0,o.kt)("h3",{id:"custom-properties"},"Custom properties"),(0,o.kt)("p",null,"In addition to attributes and relations, you may want to implement additional\nproperties to your model. It will be useful when you need computed values\n(getters) or specific instance methods."),(0,o.kt)("p",null,"This can be done using the definition or an extending class:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"// Directly in the definition.\nexport default makeModel('users', {\n  firstName: attr(),\n  lastName: attr(),\n  get fullName() {\n    return `${this.firstName} ${this.lastName}`\n  }\n});\n\n// Inside an extending class.\nexport default class User extends makeModel('users', {\n  firstName: attr(),\n  lastName: attr(),\n}) {\n  get fullName() {\n    return `${this.firstName} ${this.lastName}`\n  }\n}\n")),(0,o.kt)("h2",{id:"hooks"},"Hooks"),(0,o.kt)("p",null,"You may hook on multiple events which occurs on model instance using the hook\nregistration functions:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onRetrieved"),": instance was deserialized from a backend response."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onCreating"),": action to create instance will run soon."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onCreated"),": action to create instance was ran successfully."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onUpdating"),": action to update instance will run soon."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onUpdated"),": action to update instance was ran successfully."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onSaving"),": action to save (create or update) instance will run soon (always ran after ",(0,o.kt)("inlineCode",{parentName:"li"},"onCreating")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"onUpdating"),")."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onSaved"),": action to save (create or update) instance was ran successfully (always ran after ",(0,o.kt)("inlineCode",{parentName:"li"},"onCreated")," and ",(0,o.kt)("inlineCode",{parentName:"li"},"onUpdated"),")."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onDestroying"),": action to destroy instance will run soon."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"onDestroyed"),": action to destroy instance was ran successfully.")),(0,o.kt)("p",null,"To register a hook callback, you must pass a model class and a callback\nfunction to the registration function. It will return a function which\nyou may call to unregister the hook. All model hook callback will have\nthe concerned model instance as the only provided argument."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { onSaving } from 'func-client/core';\n\nconst unregisterThisHook = onSaving(User, async (user) => {\n  // TODO Do something (a)sync with user instance before saving.\n});\n")),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"Hooks callback may be async and will be ran sequentially\n(one by one, not parallelized).")),(0,o.kt)("p",null,"You can disable hook execution on a given model by using the ",(0,o.kt)("inlineCode",{parentName:"p"},"withoutHooks"),"\nfunction."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { withoutHooks } from 'func-client/core';\n\nconst resultOfCallback = await withoutHooks(User, async () => {\n  // TODO Do something (a)sync and return it.\n});\n")))}k.isMDXComponent=!0}}]);