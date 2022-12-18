"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[669],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=a.createContext({}),c=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(i,".").concat(m)]||d[m]||p[m]||r;return n?a.createElement(f,s(s({ref:t},u),{},{components:n})):a.createElement(f,s({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,s=new Array(r);s[0]=d;var l={};for(var i in t)hasOwnProperty.call(t,i)&&(l[i]=t[i]);l.originalType=e,l.mdxType="string"==typeof e?e:o,s[1]=l;for(var c=2;c<r;c++)s[c]=n[c];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},208:(e,t,n)=>{n.d(t,{Z:()=>s});var a=n(9496),o=n(5924);const r="tabItem_IPoj";function s(e){let{children:t,hidden:n,className:s}=e;return a.createElement("div",{role:"tabpanel",className:(0,o.Z)(r,s),hidden:n},t)}},4210:(e,t,n)=>{n.d(t,{Z:()=>m});var a=n(4250),o=n(9496),r=n(5924),s=n(4375),l=n(4436),i=n(7883),c=n(4930);const u="tabList_xr86",p="tabItem_r4_W";function d(e){var t;const{lazy:n,block:s,defaultValue:d,values:m,groupId:f,className:g}=e,b=o.Children.map(e.children,(e=>{if((0,o.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),h=m??b.map((e=>{let{props:{value:t,label:n,attributes:a}}=e;return{value:t,label:n,attributes:a}})),y=(0,l.l)(h,((e,t)=>e.value===t.value));if(y.length>0)throw new Error(`Docusaurus error: Duplicate values "${y.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const v=null===d?d:d??(null==(t=b.find((e=>e.props.default)))?void 0:t.props.value)??b[0].props.value;if(null!==v&&!h.some((e=>e.value===v)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${v}" but none of its children has the corresponding value. Available values are: ${h.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:w}=(0,i.U)(),[x,P]=(0,o.useState)(v),T=[],{blockElementScrollPositionUntilNextRender:N}=(0,c.o5)();if(null!=f){const e=k[f];null!=e&&e!==x&&h.some((t=>t.value===e))&&P(e)}const M=e=>{const t=e.currentTarget,n=T.indexOf(t),a=h[n].value;a!==x&&(N(t),P(a),null!=f&&w(f,String(a)))},O=e=>{var t;let n=null;switch(e.key){case"Enter":M(e);break;case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;n=T[t]??T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;n=T[t]??T[T.length-1];break}}null==(t=n)||t.focus()};return o.createElement("div",{className:(0,r.Z)("tabs-container",u)},o.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":s},g)},h.map((e=>{let{value:t,label:n,attributes:s}=e;return o.createElement("li",(0,a.Z)({role:"tab",tabIndex:x===t?0:-1,"aria-selected":x===t,key:t,ref:e=>T.push(e),onKeyDown:O,onClick:M},s,{className:(0,r.Z)("tabs__item",p,null==s?void 0:s.className,{"tabs__item--active":x===t})}),n??t)}))),n?(0,o.cloneElement)(b.filter((e=>e.props.value===x))[0],{className:"margin-top--md"}):o.createElement("div",{className:"margin-top--md"},b.map(((e,t)=>(0,o.cloneElement)(e,{key:t,hidden:e.props.value!==x})))))}function m(e){const t=(0,s.Z)();return o.createElement(d,(0,a.Z)({key:String(t)},e))}},1867:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>i,default:()=>m,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var a=n(4250),o=(n(9496),n(9613)),r=n(208),s=n(4210);const l={sidebar_position:1,description:"Blog articles with tags example. Model setup and action usage."},i="Blog CRUD",c={unversionedId:"examples/blog",id:"examples/blog",title:"Blog CRUD",description:"Blog articles with tags example. Model setup and action usage.",source:"@site/docs/examples/blog.mdx",sourceDirName:"examples",slug:"/examples/blog",permalink:"/func-client/docs/examples/blog",draft:!1,editUrl:"https://github.com/paul-thebaud/func-client/tree/main/website/docs/examples/blog.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,description:"Blog articles with tags example. Model setup and action usage."},sidebar:"tutorialSidebar",previous:{title:"Examples",permalink:"/func-client/docs/category/examples"},next:{title:"Generic CRUD",permalink:"/func-client/docs/examples/generic"}},u={},p=[{value:"Models",id:"models",level:2},{value:"CRUD",id:"crud",level:2},{value:"View many",id:"view-many",level:3},{value:"View one",id:"view-one",level:3},{value:"Create or update one",id:"create-or-update-one",level:3},{value:"Delete one",id:"delete-one",level:3},{value:"Non-standard actions",id:"non-standard-actions",level:2}],d={toc:p};function m(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"blog-crud"},"Blog CRUD"),(0,o.kt)("admonition",{title:"What you'll learn",type:"tip"},(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},"Defining blog and tag models"),(0,o.kt)("li",{parentName:"ul"},"Use blog model for CRUD operations"))),(0,o.kt)("p",null,"This is a simple example to implement a blog content management using\nFuncClient. This example is framework-agnostic, so you'll only see\nexamples of models or actions calls. You may use those examples inside\nany project (Vanilla JS, React, Vue, etc.)."),(0,o.kt)("h2",{id:"models"},"Models"),(0,o.kt)(s.Z,{groupId:"language",defaultValue:"ts",values:[{label:"TypeScript",value:"ts"},{label:"JavaScript",value:"js"}],mdxType:"Tabs"},(0,o.kt)(r.Z,{value:"ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="models/tag.ts"',title:'"models/tag.ts"'},"import { attr, hasMany, makeModel } from 'func-client/core';\nimport type Post from './post';\n\nconst TagModel = makeModel({\n  name: attr<string>(),\n  posts: hasMany<Post>(),\n});\n\nexport default class Tag extends TagModel {\n}\n"))),(0,o.kt)(r.Z,{value:"js",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="models/tag.ts"',title:'"models/tag.ts"'},"import { attr, hasMany, makeModel } from 'func-client/core';\n\nconst TagModel = makeModel({\n    name: attr(),\n    posts: hasMany(),\n});\n\nexport default class Tag extends TagModel {\n}\n")))),(0,o.kt)(s.Z,{groupId:"language",defaultValue:"ts",values:[{label:"TypeScript",value:"ts"},{label:"JavaScript",value:"js"}],mdxType:"Tabs"},(0,o.kt)(r.Z,{value:"ts",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts",metastring:'title="models/post.ts"',title:'"models/post.ts"'},"import { attr, hasMany, makeModel, toDate } from 'func-client/core';\nimport type Tag from './tag';\n\nconst PostModel = makeModel({\n  title: attr<string>(),\n  description: attr<string>(),\n  publishedAt: attr(toDate()),\n  tags: hasMany<Tag>(),\n});\n\nexport default class Post extends PostModel {\n}\n"))),(0,o.kt)(r.Z,{value:"js",mdxType:"TabItem"},(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="models/post.ts"',title:'"models/post.ts"'},"import { attr, hasMany, makeModel, toDate } from 'func-client/core';\n\nconst PostModel = makeModel({\n    title: attr(),\n    description: attr(),\n    publishedAt: attr(toDate()),\n    tags: hasMany(),\n});\n\nexport default class Post extends PostModel {\n}\n")))),(0,o.kt)("h2",{id:"crud"},"CRUD"),(0,o.kt)("h3",{id:"view-many"},"View many"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { model, when } from 'func-client/core';\nimport { filter, sortByDesc, paginate, allMeta } from 'func-client/json-api';\nimport action from './action';\nimport Post from './models/post';\n\nexport default async function fetchAllPost(query = {}) {\n  return action()\n    .use(model(Post))\n    .use(when(query.search, (a, s) => a.use(filter('search', s))))\n    .use(sortByDesc('createdAt'))\n    .use(paginate({ number: query.page ?? 1 }))\n    .run(allMeta())\n}\n\n// Somewhere in your app.\nconst { data, meta } = await fetchAllPost({ search: 'Hello' });\n")),(0,o.kt)("h3",{id:"view-one"},"View one"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { find, include, oneOrFail } from 'func-client/core';\nimport action from './action';\nimport Post from './models/post';\n\nexport default async function fetchOnePost(id) {\n  return action()\n    .use(find(Post, id))\n    .use(include('tags'))\n    .run(oneOrFail())\n}\n\n// Somewhere in your app.\nconst post = await fetchOnePost('123-abc');\n")),(0,o.kt)("h3",{id:"create-or-update-one"},"Create or update one"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { changed, fill, one, reset, save, when } from 'func-client/core';\nimport action from './action';\nimport Post from './models/post';\n\nexport default async function savePost(post, values = {}) {\n  fill(post, values);\n\n  try {\n    await action()\n      .use(save(post))\n      .run(when(changed(post), one()));\n  } catch (error) {\n    reset(post);\n\n    throw error;\n  }\n\n  return post;\n}\n\n// Somewhere in your app.\nconst post = new Post();\n\nawait savePost(post, {\n  title: 'Hello World!',\n  publishedAt: new Date(),\n});\n")),(0,o.kt)("h3",{id:"delete-one"},"Delete one"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { destroy, none } from 'func-client/core';\nimport action from './action';\nimport Post from './models/post';\n\nexport default async function deletePost(post) {\n  await action()\n    .use(destroy(post))\n    .run(none());\n}\n\n// Somewhere in your app.\nconst post = new Post();\n\nawait deletePost(post);\n")),(0,o.kt)("h2",{id:"non-standard-actions"},"Non-standard actions"),(0,o.kt)("p",null,"You can also use FuncModel to run non-standard actions to your backend."),(0,o.kt)("p",null,"Thanks to functional programming, you can easily combine non-standard action\nwith classical context enhancers and runners."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-javascript"},"import { instance, include, when, oneOrFail } from 'func-client/core';\nimport { makeGet, makePost } from 'func-client/json-api';\nimport action from './action';\nimport Post from './models/post';\n\nexport default function bestPosts() {\n  return action()\n    .use(model(Post))\n    .use(makeGet('actions/best-posts'))\n    .run(all());\n}\n\nexport default function publishPost(post, query = {}) {\n  return action()\n    .use(instance(post))\n    .use(when(query.include, (a, i) => a.use(include(i))))\n    .use(makePost('actions/publish', {\n      publishedAt: new Date(),\n    }))\n    .run(oneOrFail());\n}\n\n// Somewhere in your app.\n// Sends a GET to \"/<your-base-url>/posts/actions/best-posts\n// and deserialize a list of Post instances.\nconst posts = await bestPosts();\n\nconst post = new Post();\n// Sends a POST to \"/<your-base-url>/posts/<id>/actions/publish\n// and deserialize a Post instance.\nawait publishPost(post);\n")),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},(0,o.kt)("inlineCode",{parentName:"p"},"makeGet")," or other custom request enhancers (",(0,o.kt)("inlineCode",{parentName:"p"},"makePost"),', etc.) will just append\nthe given path if it is not an "absolute" (starting with ',(0,o.kt)("inlineCode",{parentName:"p"},"/"),") path.\nThis allows you to run non-standard actions scoped to an instance, etc."),(0,o.kt)("p",{parentName:"admonition"},"Your may also use an absolute (starting with ",(0,o.kt)("inlineCode",{parentName:"p"},"/"),") path like ",(0,o.kt)("inlineCode",{parentName:"p"},"/some/magic/action"),"\nto ignore the configured base URL and run a non-standard action.")))}m.isMDXComponent=!0}}]);