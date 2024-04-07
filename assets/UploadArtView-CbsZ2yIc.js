import{a}from"./axios-Bo0ATomq.js";import{U as f}from"./UserState-D7ke27qt.js";import{_ as V,m as w,z as _,a as b,r as c,o as I,c as y,b as e,x as o,d as l,w as E,C as x}from"./index-Bk2W6sNu.js";import{V as h,d as T,l as U,c as k,F as S,a as R,E as P,z}from"./zh_TW-TpuKsICi.js";var M={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/pixelmissions/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:g,VITE_API_PATH:v}=M,F=["AdminToken","userID"],L=["setAdminToken","checkUserLogin"];Object.keys(h).forEach(i=>{T(i,h[i])});U({zh_TW:z});k({generateMessage:U("zh_TW"),validateOnInput:!0});const j={components:{VField:S,VForm:R,ErrorMessage:P},data(){return{fileUrl:"",form:{user:{email:""}},ArtData:{author:"",category:"作品",content:"",description:"",imageUrl:"",is_enabled:1,like:0,origin_price:0,price:0,time:0,title:"",unit:"元"}}},mounted(){this.$refs.imgfileInput.addEventListener("change",this.imagePreview),this.setAdminToken(),this.checkUserLogin()},methods:{...w(f,L),imagePreview(){const i=this.$refs.imgfileInput.files[0],s=new FileReader;s.readAsDataURL(i),s.onload=n=>{this.fileUrl=n.target.result}},upload(){const i=new FormData,s=this.$refs.imgfileInput.files[0];i.append("file-to-upload",s);const n=`${g}/api/${v}/admin/upload`,d=`${g}/api/${v}/admin/product`;if(a.defaults.headers.common.Authorization=this.AdminToken,this.ArtData.author=this.userID,this.ArtData.time=new Date().getTime(),this.fileUrl===""){_.error("請選擇圖片");return}a.post(n,i).then(t=>(this.fileUrl=t.data.imageUrl,this.ArtData.imageUrl=t.data.imageUrl,a.post(d,{data:this.ArtData}))).then(()=>{this.$router.push(`/usercenter/${this.userID}`),_.success("上傳成功")})}},computed:{...b(f,F)}},N={class:"container mt-5"},O={class:"row"},B=e("div",{class:"col-12"},[e("h1",null,"上傳作品")],-1),C={class:"justify-content-center d-flex"},W={class:"d-flex justify-content-center align-items-center btn btn-outline-secondary rounded-3"},q={type:"file",ref:"imgfileInput",id:"fileInput"},H=["src"],$=e("hr",null,null,-1),G={class:"row justify-content-center"},J={class:"input-group mb-3"},K=e("span",{class:"input-group-text"},"作品名稱",-1),Q={class:"input-group mb-3"},X=e("span",{class:"input-group-text",id:"basic-addon1"},"作品描述",-1),Y=e("div",{class:"row justify-content-center"},null,-1),Z=e("div",{id:"imagePreview"},null,-1);function ee(i,s,n,d,t,A){const u=c("v-field"),m=c("error-message"),D=c("v-form");return I(),y("div",N,[e("div",O,[B,e("div",C,[e("div",{class:o({"col-12 col-md-6 col-lg-3":t.fileUrl=="","col-12 col-md-9 col-lg-6":t.fileUrl!=""})},[e("div",{class:o(["d-flex justify-content-center mw-100 ratio ratio-1x1",{uploadStyle:t.fileUrl==""}])},[e("label",W,[e("input",q,null,512),e("h1",{class:o(["m-0 p-0",{"d-block":t.fileUrl=="","d-none":t.fileUrl!=""}])}," + ",2),e("img",{src:t.fileUrl,ref:"imagePreview2",class:"mw-100 ratio-1x1"},null,8,H)])],2)],2)])]),$,e("div",G,[l(D,{class:"col-12 col-md-9 col-lg-6 text-center",ref:"form",onSubmit:A.upload},{default:E(({errors:p})=>[e("div",J,[K,l(u,{id:"title",name:"作品名稱",type:"",class:o(["form-control",{"is-invalid":p.作品名稱}]),placeholder:"作品名稱",rules:"required",modelValue:t.ArtData.title,"onUpdate:modelValue":s[0]||(s[0]=r=>t.ArtData.title=r)},null,8,["class","modelValue"]),l(m,{name:"作品名稱",class:"invalid-feedback"})]),e("div",Q,[X,l(u,{id:"description",name:"作品描述",type:"",class:o([{"is-invalid":p.作品描述},"form-control"]),placeholder:"作品描述",rules:"required",modelValue:t.ArtData.description,"onUpdate:modelValue":s[1]||(s[1]=r=>t.ArtData.description=r)},null,8,["class","modelValue"]),l(m,{name:"作品描述",class:"invalid-feedback"})]),e("button",{class:"btn btn-primary w-100 rounded-pill",type:"submit",onSubmit:s[2]||(s[2]=x(()=>{},["prevent"]))}," 上傳 ",32)]),_:1},8,["onSubmit"])]),Y,Z])}const le=V(j,[["render",ee]]);export{le as default};
