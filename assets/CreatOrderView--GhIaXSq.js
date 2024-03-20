import{V as v,d as A,l as V,c as y,F as D,a as E,E as U,z as I}from"./zh_TW-Dci9-G_w.js";import{_ as k,m as w,j as g,a as C,r as u,o as S,c as R,b as s,t as d,d as a,w as M,F as O,n as c,k as z,v as F}from"./index-CALbCaTn.js";import{U as b}from"./UserState-CxXzrXXr.js";import{a as m}from"./axios-Bo0ATomq.js";var L={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/pixelmissions/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:_,VITE_API_PATH:h}=L,P=["userName","userEmail","userID","userHasLogIn","AdminToken","Alldata"],N=["checkUserLogin","UserLogout","getAlldata","PushUrl","setAdminToken"];Object.keys(v).forEach(l=>{A(l,v[l])});V({zh_TW:I});y({generateMessage:V("zh_TW"),validateOnInput:!0});const q={data(){return{total:0,form:{user:{name:"",email:"",tel:"",address:"",userid:"",forauthor:""},message:""},ThisComissionData:{}}},methods:{...w(b,N),async createOrder(){const l=this.$route.params.id,o=this.Alldata[l].author,f=`${_}/api/${h}/cart`,p=`${_}/api/${h}/order`;this.form.user.userid=this.userID,this.form.user.forauthor=o,m.post(f,{data:{product_id:l,qty:1}}).then(e=>(console.log(e.data),m.post(p,{data:{user:this.form.user,message:this.form.message,createUser:this.userID,forauthor:o}}))).then(e=>{console.log(e.data),g.success("已創建訂單")})},deletCart(){const l=`${_}/api/${h}/admin/orders/all`;m.defaults.headers.common.Authorization=this.AdminToken,m.delete(l).then(o=>{console.log(o.data),g.success("已刪除購物車")})},getThisComission(){this.ThisComissionData=this.Alldata[this.$route.params.id]}},computed:{...C(b,P)},async mounted(){this.setAdminToken(),this.checkUserLogin(),await this.getAlldata(),this.getThisComission()},components:{VField:D,VForm:E,ErrorMessage:U}},W={class:"container"},B={class:"row"},j={class:"col-12"},H=s("h1",{class:"pt-3"},"登記方案",-1),G=s("hr",null,null,-1),J={class:"container"},K={class:"row"},Q={class:"col-12 p-5 bg bg-dark-subtle rounded-5"},X={class:"row g-5"},Y={class:"col-md-4"},Z=["src"],$={class:"col-md-8 d-flex flex-column"},ss={class:"card-body"},es={class:"card-title"},os={class:"fs-3 text-secondary mb-0"},ts={class:"fs-3 text-secondary"},as={class:"text-center display-4"},ls={class:""},is=s("hr",null,null,-1),rs={class:"container"},ns=s("div",{class:"row"},[s("div",{class:"col"},[s("h2",{class:"my-2"},"登記資料")])],-1),ds={class:"row justify-content-center"},cs={class:"mb-3 form-floating"},ms=s("label",{for:"email",class:"floatingInput"},"Email",-1),us={class:"mb-3"},_s=s("label",{for:"name",class:"form-label"},"收件人name",-1),hs={class:"mb-3"},fs=s("label",{for:"tel",class:"form-label"},"收件人phone",-1),ps={class:"mb-3"},vs=s("label",{for:"address",class:"form-label"},"收件人address",-1),gs={class:"mb-3"},bs=s("label",{for:"message",class:"form-label"},"留言",-1),Vs=s("div",{class:"text-end"},[s("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function Ts(l,o,f,p,e,T){const i=u("v-field"),r=u("error-message"),x=u("v-form");return S(),R(O,null,[s("div",W,[s("div",B,[s("div",j,[H,G,s("div",J,[s("div",K,[s("div",Q,[s("div",X,[s("div",Y,[s("img",{src:e.ThisComissionData.imageUrl,class:"img-fluid rounded-start-0 ratio-1x1 mh-100"},null,8,Z)]),s("div",$,[s("div",ss,[s("h1",es,d(e.ThisComissionData.title),1),s("p",os,d(e.ThisComissionData.description),1),s("p",ts,d(e.ThisComissionData.content),1)]),s("div",as,[s("span",ls,d(e.ThisComissionData.price)+" TWD",1)])])])])])]),is])])]),s("div",rs,[ns,s("div",ds,[a(x,{ref:"form",class:"col-md-6",onSubmit:T.createOrder},{default:M(({errors:n})=>[s("div",cs,[a(i,{id:"email",name:"email",type:"email",class:c(["form-control",{"is-invalid":n.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:e.form.user.email,"onUpdate:modelValue":o[0]||(o[0]=t=>e.form.user.email=t)},null,8,["class","modelValue"]),ms,a(r,{name:"email",class:"invalid-feedback"})]),s("div",us,[_s,a(i,{id:"name",name:"name",type:"text",class:c(["form-control",{"is-invalid":n.name}]),placeholder:"請輸入name",rules:"required",modelValue:e.form.user.name,"onUpdate:modelValue":o[1]||(o[1]=t=>e.form.user.name=t)},null,8,["class","modelValue"]),a(r,{name:"name",class:"invalid-feedback"})]),s("div",hs,[fs,a(i,{id:"tel",name:"phone",type:"text",class:c(["form-control",{"is-invalid":n.phone}]),placeholder:"請輸入phone",rules:"required|min:8|max:10",modelValue:e.form.user.tel,"onUpdate:modelValue":o[2]||(o[2]=t=>e.form.user.tel=t)},null,8,["class","modelValue"]),a(r,{name:"phone",class:"invalid-feedback"})]),s("div",ps,[vs,a(i,{id:"address",name:"address",type:"text",class:c(["form-control",{"is-invalid":n.address}]),placeholder:"請輸入address",rules:"required",modelValue:e.form.user.address,"onUpdate:modelValue":o[3]||(o[3]=t=>e.form.user.address=t)},null,8,["class","modelValue"]),a(r,{name:"address",class:"invalid-feedback"})]),s("div",gs,[bs,z(s("textarea",{name:"",id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":o[4]||(o[4]=t=>e.form.message=t)},null,512),[[F,e.form.message]])]),Vs]),_:1},8,["onSubmit"])])])],64)}const Es=k(q,[["render",Ts]]);export{Es as default};
