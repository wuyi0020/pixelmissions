import{_ as C,m as M,j as _,P as p,a as D,o as l,c as n,b as t,F as c,h as m,n as b,t as a,e as g,k as v,Q as O}from"./index-CALbCaTn.js";import{a as u}from"./axios-Bo0ATomq.js";import{U as x}from"./UserState-CxXzrXXr.js";import{h as P}from"./moment-Cl4UOzQZ.js";var A={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/pixelmissions/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:k,VITE_API_PATH:y}=A,E={data(){return{orders:{},isNew:!1,pagination:{},isLoading:!1,tempOrder:{},currentPage:1}},components:{},methods:{...M(x,["getCookie"]),getOrders(){console.log(this.getCookie("DashbordAdminToken")),u.defaults.headers.common.Authorization=this.getCookie("DashbordAdminToken");const d=`${k}/api/${y}/admin/orders?page=${this.currentPage}`;console.log(d),u.get(d).then(o=>{this.orders=o.data.orders,console.log(o)}).catch(o=>{console.log(o),_.error("取得訂單失敗")})},formatDate(d){return console.log(d*1e3),P(d*1e3).format("YYYY-MM-DD")},updatePaid(d){this.isLoading=!0;const o=`${k}/api/${y}/admin/order/${d.id}`,h={is_paid:d.is_paid},f=p.getInstance(document.getElementById("OrderModal"));u.defaults.headers.common.Authorization=this.getCookie("DashbordAdminToken"),u.put(o,{data:h}).then(()=>{_.success("更新付款狀態成功"),f.hide(),this.getOrders(this.currentPage)}).catch(s=>{_.error("更新付款狀態失敗"),console.log(s)})},openDelOrderModal(d){this.tempOrder=d,new p(document.getElementById("deleteModal"),{keyboard:!1}).show()},deleteOrderConfirm(){const d=`${k}/api/${y}/admin/order/${this.tempOrder.id}`;u.defaults.headers.common.Authorization=this.getCookie("DashbordAdminToken"),u.delete(d).then(()=>{_.success("刪除訂單成功"),this.getOrders(this.currentPage)}).catch(h=>{_.error("刪除訂單失敗"),console.log(h)}),p.getInstance(document.getElementById("deleteModal")).hide()},openModal(d){const o=new p(document.getElementById("OrderModal"),{keyboard:!1});this.tempOrder=d,o.show()}},computed:{...D(x,["AdminToken"])},mounted(){this.getOrders()}},w={class:"container"},I={class:"table mt-4"},T=t("thead",null,[t("tr",null,[t("th",null,"購買時間"),t("th",null,"Email"),t("th",null,"購買方案"),t("th",null,"應付金額"),t("th",null,"是否付款"),t("th",null,"編輯")])],-1),V=["textContent"],S={class:"list-unstyled"},L={class:"text-right"},U={class:"form-check form-switch"},B=["id","onUpdate:modelValue","onChange"],N=["for"],R={key:0},z={key:1},Y={class:"btn-group"},j=["onClick"],F=["onClick"],H={class:"d-flex justify-content-center"},q={class:"pagination"},Q=t("span",{"aria-hidden":"true"},"«",-1),W=[Q],G=["onClick"],J=t("span",{"aria-hidden":"true"},"»",-1),K=[J],X={class:"modal",id:"deleteModal",tabindex:"-1","aria-labelledby":"deleteModalLabel","aria-hidden":"true"},Z={class:"modal-dialog"},$={class:"modal-content"},tt=t("div",{class:"modal-header"},[t("h5",{class:"modal-title",id:"deleteModalLabel"},"確認刪除"),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),et=t("div",{class:"modal-body"},[t("p",null,"確定要刪除此產品嗎？")],-1),st={class:"modal-footer"},ot=t("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"}," 取消 ",-1),lt={class:"modal",id:"OrderModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},nt={class:"modal-dialog modal-xl",role:"document"},dt={class:"modal-content border-0"},at=t("div",{class:"modal-header bg-dark text-white"},[t("h5",{class:"modal-title",id:"exampleModalLabel"},[t("span",null,"訂單細節")]),t("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),it={class:"modal-body"},rt={class:"row"},ct={class:"col-md-4"},ut=t("h3",null,"用戶資料",-1),_t={class:"table"},ht={key:0},pt=t("th",{style:{width:"100px"}},"姓名",-1),mt=t("th",null,"Email",-1),bt=t("th",null,"電話",-1),gt=t("th",null,"地址",-1),kt=t("th",null,"留言",-1),yt={class:"col-md-8"},ft=t("h3",null,"訂單細節",-1),vt={class:"table"},Ot=t("th",{style:{width:"100px"}},"訂單編號",-1),xt=t("th",null,"下單時間",-1),Ct=t("th",null,"付款時間",-1),Mt={key:0},Dt={key:1},Pt=t("th",null,"付款狀態",-1),At={key:0,class:"text-success"},Et={key:1,class:"text-muted"},wt=t("th",null,"總金額",-1),It=t("h3",null,"選購商品",-1),Tt={class:"table"},Vt=t("thead",null,[t("tr")],-1),St={class:"text-end"},Lt={class:"d-flex justify-content-end"},Ut={class:"form-check"},Bt={class:"form-check-label",for:"flexCheckDefault"},Nt={key:0},Rt={key:1},zt={class:"modal-footer"},Yt=t("button",{type:"button",class:"btn btn-outline-secondary","data-bs-dismiss":"modal"}," 取消 ",-1);function jt(d,o,h,f,s,i){return l(),n(c,null,[t("div",w,[t("table",I,[T,t("tbody",null,[(l(!0),n(c,null,m(s.orders,e=>(l(),n(c,{key:e.id},[s.orders.length?(l(),n("tr",{key:0,class:b({"text-secondary":!e.is_paid})},[t("td",null,a(i.formatDate(e.create_at)),1),t("td",null,[e.user?(l(),n("span",{key:0,textContent:a(e.user.email)},null,8,V)):g("",!0)]),t("td",null,[t("ul",S,[(l(!0),n(c,null,m(e.products,r=>(l(),n("li",{key:r.id},a(r.product.title),1))),128))])]),t("td",L,a(e.total),1),t("td",null,[t("div",U,[v(t("input",{class:"form-check-input",type:"checkbox",id:`paidSwitch${e.id}`,"onUpdate:modelValue":r=>e.is_paid=r,onChange:r=>i.updatePaid(e)},null,40,B),[[O,e.is_paid]]),t("label",{class:"form-check-label",for:`paidSwitch${e.id}`},[e.is_paid?(l(),n("span",R,"已付款")):(l(),n("span",z,"未付款"))],8,N)])]),t("td",null,[t("div",Y,[t("button",{class:"btn btn-outline-primary btn-sm",type:"button",onClick:r=>i.openModal(e)}," 檢視 ",8,j),t("button",{class:"btn btn-outline-danger btn-sm",type:"button",onClick:r=>i.openDelOrderModal(e)}," 刪除 ",8,F)])])],2)):g("",!0)],64))),128))])]),t("div",H,[t("nav",null,[t("ul",q,[t("li",{class:b(["page-item",{disabled:!s.pagination.current}])},[t("button",{class:"page-link",onClick:o[0]||(o[0]=e=>d.nextPage(s.pagination.current-1)),"aria-label":"Previous"},W)],2),(l(!0),n(c,null,m(s.pagination.totalPage,e=>(l(),n("li",{class:b(["page-item",{active:e===s.pagination.currentPage}]),key:e},[t("button",{class:"page-link",onClick:r=>d.nextPage(e-1)},a(e),9,G)],2))),128)),t("li",{class:b(["page-item",{disabled:!s.pagination.hasNext}])},[t("button",{class:"page-link",onClick:o[1]||(o[1]=e=>d.nextPage(s.pagination.current+1)),"aria-label":"Next"},K)],2)])])])]),t("div",X,[t("div",Z,[t("div",$,[tt,et,t("div",st,[ot,t("button",{type:"button",class:"btn btn-danger",onClick:o[2]||(o[2]=e=>i.deleteOrderConfirm())}," 確認刪除 ")])])])]),t("div",lt,[t("div",nt,[t("div",dt,[at,t("div",it,[t("div",rt,[t("div",ct,[ut,t("table",_t,[s.tempOrder.user?(l(),n("tbody",ht,[t("tr",null,[pt,t("td",null,a(s.tempOrder.user.name),1)]),t("tr",null,[mt,t("td",null,a(s.tempOrder.user.email),1)]),t("tr",null,[bt,t("td",null,a(s.tempOrder.user.tel),1)]),t("tr",null,[gt,t("td",null,a(s.tempOrder.user.address),1)]),t("tr",null,[kt,t("td",null,a(s.tempOrder.user.message),1)])])):g("",!0)])]),t("div",yt,[ft,t("table",vt,[t("tbody",null,[t("tr",null,[Ot,t("td",null,a(s.tempOrder.id),1)]),t("tr",null,[xt,t("td",null,a(i.formatDate(s.tempOrder.create_at)),1)]),t("tr",null,[Ct,t("td",null,[s.tempOrder.paid_date?(l(),n("span",Mt,a(i.formatDate(s.tempOrder.paid_date)),1)):(l(),n("span",Dt,"時間不正確"))])]),t("tr",null,[Pt,t("td",null,[s.tempOrder.is_paid?(l(),n("strong",At,"已付款")):(l(),n("span",Et,"尚未付款"))])]),t("tr",null,[wt,t("td",null,a(s.tempOrder.total),1)])])]),It,t("table",Tt,[Vt,t("tbody",null,[(l(!0),n(c,null,m(s.tempOrder.products,e=>(l(),n("tr",{key:e.id},[t("th",null,a(e.product.title),1),t("td",null,a(e.qty)+" / "+a(e.product.unit),1),t("td",St,a(e.final_total),1)]))),128))])]),t("div",Lt,[t("div",Ut,[v(t("input",{class:"form-check-input",type:"checkbox",value:"",id:"flexCheckDefault","onUpdate:modelValue":o[3]||(o[3]=e=>s.tempOrder.is_paid=e)},null,512),[[O,s.tempOrder.is_paid]]),t("label",Bt,[s.tempOrder.is_paid?(l(),n("span",Nt,"已付款")):(l(),n("span",Rt,"未付款"))])])])])])]),t("div",zt,[Yt,t("button",{type:"button",class:"btn btn-primary",onClick:o[4]||(o[4]=e=>i.updatePaid(s.tempOrder))}," 修改付款狀態 ")])])])],512)],64)}const Wt=C(E,[["render",jt]]);export{Wt as default};