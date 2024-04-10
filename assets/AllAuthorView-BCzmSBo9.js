import{A as P}from"./ArtComponent-Chj1iFzU.js";import{_ as v,L as A,m as b,a as k,r as h,o,c as l,d as p,b as t,F as c,z as d,B as g,i as x}from"./index-z1AvBJhR.js";import{U as m}from"./UserState-DLMa-bTK.js";import"./axios-Bo0ATomq.js";const y=["Alldata"],C=["getAlldata","checkUserhasArt"],L={name:"AllAuthorView",components:{ArtComponent:P,Loading:A},data(){return{authors:[],pages:{min:0,eachOfPage:12,current:0,total:0,currentPage:1,hasNext:!1,totalPage:0},isLoading:!0}},methods:{...b(m,C),async nextPage(n=0){await this.getAlldata(),this.authors=Object.values(this.Alldata).filter(r=>r.category==="使用者"&&r.ArtQuantity>0),this.pages.current=n,this.pages.currentPage=n+1,this.pages.total=Object.values(this.authors).length,this.pages.totalPage=Math.ceil(this.pages.total/this.pages.eachOfPage),this.pages.hasNext=this.pages.currentPage<this.pages.totalPage;const s=this.pages.current*this.pages.eachOfPage+this.pages.min,u=s+this.pages.eachOfPage;this.authors=this.authors.slice(s,u)},loadDone(){this.isLoading=!1}},computed:{...k(m,y)},mounted(){this.nextPage(),this.checkUserhasArt()}},w={class:"container mt-5"},N=t("h1",null,"瀏覽作者",-1),O=t("hr",null,null,-1),U={class:"row row-cols-2 row-cols-md-3 row-cols-xl-5 g-0 g-lg-4"},D=t("hr",null,null,-1),B={class:"d-flex justify-content-center"},V={class:"pagination"},j=t("span",{"aria-hidden":"true"},"«",-1),S=[j],z=["onClick"],F=t("span",{"aria-hidden":"true"},"»",-1),E=[F];function M(n,s,u,r,a,i){const _=h("loading"),f=h("ArtComponent");return o(),l(c,null,[p(_,{active:a.isLoading,"onUpdate:active":s[0]||(s[0]=e=>a.isLoading=e),"can-cancel":!0,"on-cancel":n.onCancel,"is-full-page":n.fullPage},null,8,["active","on-cancel","is-full-page"]),t("div",w,[N,O,t("div",U,[(o(!0),l(c,null,d(a.authors,e=>(o(),l("div",{key:e.id},[p(f,{item:e,showUpload:!0,onLoadDone:i.loadDone},null,8,["item","onLoadDone"])]))),128))]),D,t("div",B,[t("nav",null,[t("ul",V,[t("li",{class:g(["page-item",{disabled:!a.pages.current}])},[t("button",{class:"page-link",onClick:s[1]||(s[1]=e=>i.nextPage(a.pages.current-1)),"aria-label":"Previous",type:"button"},S)],2),(o(!0),l(c,null,d(a.pages.totalPage,e=>(o(),l("li",{class:g(["page-item",{active:e===a.pages.currentPage}]),key:e},[t("button",{type:"button",class:"page-link",onClick:Q=>i.nextPage(e-1)},x(e),9,z)],2))),128)),t("li",{class:g(["page-item",{disabled:!a.pages.hasNext}])},[t("button",{type:"button",class:"page-link",onClick:s[2]||(s[2]=e=>i.nextPage(a.pages.current+1)),"aria-label":"Next"},E)],2)])])])])],64)}const J=v(L,[["render",M]]);export{J as default};
