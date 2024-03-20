import{_ as x,m as U,j as b,a as I,P as f,o as d,c as n,b as t,F as g,h as v,k as _,v as h,e as P,g as w,t as c,l as r}from"./index-CnB8nTM4.js";import{U as k}from"./UserState-BoEKTuGp.js";import{a as m}from"./axios-Bo0ATomq.js";var D={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/undefined/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:A,VITE_API_PATH:C}=D,M=["userName","userEmail","userID","userHasLogIn","AdminToken","Alldata"],E=["getAlldata","getCookie"];let p=null,y=null;const L={data(){return{tempProduct:{},Artwork:{},UserList:{},ComissionList:{}}},methods:{...U(k,E),async GetData(){await this.getAlldata(!0),Object.values(this.Alldata).forEach(s=>{s.category==="作品"?this.Artwork[s.id]=s:s.category==="使用者"?this.UserList[s.id]=s:s.category==="報價"&&(this.ComissionList[s.id]=s)})},editProduct(s){console.log(p),p.show(),console.log(s),this.tempProduct={...s}},editProductSave(){console.log(this.tempProduct);const s=JSON.parse(this.tempProduct),e=`${A}/api/${C}/admin/product/${s.id}`;m.defaults.headers.common.Authorization=this.getCookie("DashbordAdminToken"),console.log(s),console.log(this.tempProduct),m.put(e,{data:s}).then(a=>{b.success("修改成功"),console.log(a),p.hide()}).catch(a=>{b.error("修改失敗"),console.log(a)}),this.getAlldata(!0)},deletProduct(s){y.show(),console.log(s.id),this.tempProduct={...s}},deletProductConfirm(){const s=this.tempProduct.id;console.log("delete");const e=`${A}/api/${C}/admin/product/${s}`;m.defaults.headers.common.Authorization=this.getCookie("DashbordAdminToken"),m.delete(e).then(a=>{console.log(a),this.getAlldata(!0),b.success("刪除成功")}).catch(a=>{console.log(a)}),y.hide()}},computed:{...I(k,M)},mounted(){this.GetData(),p=new f(document.getElementById("editModal"),{keyboard:!0,backdrop:"static"}),y=new f(document.getElementById("deleteModal"),{keyboard:!0,backdrop:"static"})}},V={class:"container"},T={class:"d-flex flex-wrap"},S={class:"col-12 col"},N=t("h2",{type:"button",class:"my-5","data-bs-toggle":"collapse","aria-expanded":"false","data-bs-target":"#collapseArtwork","aria-controls":"collapseArtwork"},[w(" 作品列表 "),t("i",{class:"bi bi-arrow-down-circle"})],-1),R=t("hr",null,null,-1),B={class:"collapse",id:"collapseArtwork"},O={class:"d-flex flex-wrap collapse"},H={class:"col-12"},j={class:"w-100"},z=t("thead",{class:"border-bottom"},[t("tr",null,[t("th",null,"作品名稱"),t("th",null,"作品圖片"),t("th",null,"作品描述"),t("th",null,"編輯")])],-1),F=["src"],G=["onClick"],J=["onClick"],W=t("hr",null,null,-1),q={class:"col-12 col"},K=t("h2",{type:"button",class:"my-5","data-bs-toggle":"collapse","aria-expanded":"false","data-bs-target":"#collapseComission","aria-controls":"collapseComission"},[w(" 方案列表 "),t("i",{class:"bi bi-arrow-down-circle"})],-1),Q=t("hr",null,null,-1),X={class:"collapse",id:"collapseComission"},Y={class:"d-flex flex-wrap"},Z={class:"col-12"},$={class:"w-100"},tt=t("thead",{class:"border-bottom"},[t("tr",null,[t("th",null,"方案名稱"),t("th",null,"方案圖片"),t("th",null,"方案描述"),t("th",null,"編輯")])],-1),ot=["src"],st=["onClick"],et=["onClick"],lt=t("hr",null,null,-1),dt={class:"col-12 col"},nt=t("h2",{type:"button",class:"my-5","data-bs-toggle":"collapse","aria-expanded":"false","data-bs-target":"#collapseUser","aria-controls":"collapseUser"},[w(" 使用者列表 "),t("i",{class:"bi bi-arrow-down-circle"})],-1),at=t("hr",null,null,-1),it={class:"collapse",id:"collapseUser"},ct={class:"d-flex flex-wrap"},rt={class:"col-12"},ut={class:"w-100"},_t=t("thead",{class:"border-bottom"},[t("tr",null,[t("th",null,"使用者名稱"),t("th",null,"使用者圖片"),t("th",null,"使用者描述"),t("th",null,"編輯")])],-1),ht=["src"],mt=["onClick"],pt=["onClick"],bt={class:"modal h-100 fade",id:"editModal",tabindex:"-1","aria-labelledby":"editModalLabel","aria-hidden":"true"},gt={class:"modal-dialog h-100"},vt={class:"modal-content h-100"},yt=t("div",{class:"modal-header"},[t("h5",{class:"modal-title",id:"editModalLabel"},"修改產品"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),wt={class:"modal-body h-100"},ft={class:"row align-items-center mb-2"},Pt=["src"],kt={class:"row align-items-center mb-2"},At=t("label",{for:"title",class:"col-2"},"名稱 : ",-1),Ct={class:"row align-items-center mb-2"},xt=t("label",{for:"description",class:"col-2"},"描述 : ",-1),Ut={class:"row align-items-center mb-2"},It=t("label",{for:"AuthorID",class:"col-2"},"作者ID : ",-1),Dt={class:"row align-items-center mb-2"},Mt=t("label",{for:"imageUrl",class:"col-3"},"圖片連結 : ",-1),Et={class:"modal-footer"},Lt=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 ",-1),Vt={class:"modal fade",id:"deleteModal",tabindex:"-1","aria-labelledby":"deleteModalLabel","aria-hidden":"true"},Tt={class:"modal-dialog"},St={class:"modal-content"},Nt=t("div",{class:"modal-header"},[t("h5",{class:"modal-title",id:"deleteModalLabel"},"確認刪除"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),Rt=t("div",{class:"modal-body"},[t("p",null,"確定要刪除此產品嗎？")],-1),Bt={class:"modal-footer"},Ot=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function Ht(s,e,a,jt,l,i){return d(),n("div",V,[t("div",T,[t("div",S,[N,R,t("div",B,[t("div",O,[t("div",H,[t("table",j,[z,t("tbody",null,[(d(!0),n(g,null,v(l.Artwork,o=>(d(),n("tr",{key:o.id},[t("td",null,c(o.title),1),t("td",null,[t("img",{src:o.imageUrl,alt:"",width:"200",class:"mw-100"},null,8,F)]),t("td",null,c(o.description),1),t("td",null,[t("button",{class:"btn btn-primary",onClick:r(u=>i.editProduct(o),["prevent"])}," 編輯 ",8,G),t("button",{class:"btn btn-outline-danger my-2",onClick:r(u=>i.deletProduct(o),["prevent"])}," 刪除 ",8,J)])]))),128))])])])])])]),W,t("div",q,[K,Q,t("div",X,[t("div",Y,[t("div",Z,[t("table",$,[tt,t("tbody",null,[(d(!0),n(g,null,v(l.ComissionList,o=>(d(),n("tr",{key:o.id},[t("td",null,c(o.title),1),t("td",null,[t("img",{src:o.imageUrl,alt:"",width:"200",class:"mw-100"},null,8,ot)]),t("td",null,c(o.description),1),t("td",null,[t("button",{class:"btn btn-primary",onClick:r(u=>i.editProduct(o),["prevent"])}," 編輯 ",8,st),t("button",{class:"btn btn-outline-danger my-2",onClick:r(u=>i.deletProduct(o),["prevent"])}," 刪除 ",8,et)])]))),128))])])])])])]),lt,t("div",dt,[nt,at,t("div",it,[t("div",ct,[t("div",rt,[t("table",ut,[_t,t("tbody",null,[(d(!0),n(g,null,v(l.UserList,o=>(d(),n("tr",{key:o.id},[t("td",null,c(o.title),1),t("td",null,[t("img",{src:o.imageUrl,alt:"",width:"200",class:"mw-100"},null,8,ht)]),t("td",null,c(o.description),1),t("td",null,[t("button",{class:"btn btn-primary",onClick:r(u=>i.editProduct(o),["prevent"])}," 編輯 ",8,mt),t("button",{class:"btn btn-outline-danger my-2",onClick:r(u=>i.deletProduct(o),["prevent"])}," 刪除 ",8,pt)])]))),128))])])])])])])]),t("div",bt,[t("div",gt,[t("div",vt,[yt,t("div",wt,[t("div",ft,[t("img",{src:l.tempProduct.imageUrl,alt:"",width:"200",class:"mw-100 col-12"},null,8,Pt)]),t("div",kt,[At,_(t("input",{type:"text",id:"title",class:"col-10","onUpdate:modelValue":e[0]||(e[0]=o=>l.tempProduct.title=o)},null,512),[[h,l.tempProduct.title]])]),t("div",Ct,[xt,_(t("input",{type:"text",id:"description",class:"col-10","onUpdate:modelValue":e[1]||(e[1]=o=>l.tempProduct.description=o)},null,512),[[h,l.tempProduct.description]])]),t("div",Ut,[It,l.tempProduct.category==="作品"||l.tempProduct.category==="報價"?_((d(),n("input",{key:0,type:"text",id:"AuthorID",class:"col-10","onUpdate:modelValue":e[2]||(e[2]=o=>l.tempProduct.author=o)},null,512)),[[h,l.tempProduct.author]]):P("",!0),l.tempProduct.category==="使用者"?_((d(),n("input",{key:1,type:"text",id:"AuthorID",class:"col-10","onUpdate:modelValue":e[3]||(e[3]=o=>l.tempProduct.id=o)},null,512)),[[h,l.tempProduct.id]]):P("",!0)]),t("div",Dt,[Mt,_(t("textarea",{type:"text",id:"imageUrl",class:"col-9","onUpdate:modelValue":e[4]||(e[4]=o=>l.tempProduct.imageUrl=o)},null,512),[[h,l.tempProduct.imageUrl]])])]),t("div",Et,[Lt,t("button",{type:"button",class:"btn btn-primary",onClick:e[5]||(e[5]=o=>i.editProductSave())}," 儲存改變 ")])])])]),t("div",Vt,[t("div",Tt,[t("div",St,[Nt,Rt,t("div",Bt,[Ot,t("button",{type:"button",class:"btn btn-danger",onClick:e[6]||(e[6]=o=>s.deleteProductConfirm())}," 確認刪除 ")])])])])])}const Jt=x(L,[["render",Ht]]);export{Jt as default};
