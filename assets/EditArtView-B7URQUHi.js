import{_ as A,a as b,m as U,j as m,o as i,c as r,b as t,e as l,n as u,k as p,v as _}from"./index-CnB8nTM4.js";import{U as g}from"./UserState-BoEKTuGp.js";import{a as h}from"./axios-Bo0ATomq.js";var I={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/undefined/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f,VITE_API_PATH:y}=I,k=["Alldata","AdminToken","userHasLogIn","userID"],v=["AdminTokenCheck","getAlldata","setAdminToken"],D={data(){return{art:{},artAuthor:"",artID:"",oldimageUrl:""}},computed:{...b(g,k)},methods:{...U(g,v),async getArtdata(){await this.getAlldata(),this.art=this.Alldata[this.artID],this.artAuthor=this.Alldata[this.artID].author,this.oldimageUrl=this.Alldata[this.artID].imageUrl,this.artAuthor!==this.userID&&this.$router.push(`/usercenter/${this.userID}`)},cancel(){this.art.category==="作品"&&this.$router.push(`/dashboard/art/${this.userID}`),this.art.category==="報價"?this.$router.push(`/dashboard/comission/${this.userID}`):this.$router.push(`/usercenter/${this.userID}`)},done(){this.setAdminToken();const n=`${f}/api/${y}/admin/product/${this.artID}`;h.defaults.headers.common.Authorization=this.AdminToken,console.log(this.art),h.put(n,{data:this.art}).then(s=>{console.log(s),this.$router.push(`/usercenter/${this.userID}`),m.success("修改成功")}).catch(s=>{console.log(s),m.warning("修改失敗")})},imagePreview(){const n=this.$refs.imgfileInput.files[0],s=new FileReader;s.readAsDataURL(n),s.onload=a=>{this.art.imageUrl=a.target.result}},upload(){if(this.art.imageUrl===this.oldimageUrl){this.done();return}console.log("upload");const n=new FormData,s=this.$refs.imgfileInput.files[0];n.append("file-to-upload",s);const a=`${f}/api/${y}/admin/upload`;if(h.defaults.headers.common.Authorization=this.AdminToken,this.fileUrl===""){m.error("請選擇圖片");return}h.post(a,n).then(c=>{this.art.imageUrl=c.data.imageUrl,this.done()}).catch(c=>{console.log(c)})}},async mounted(){await this.getAlldata(),this.AdminTokenCheck(),this.getArtdata(),this.artID=this.$route.params.id,this.$refs.imgfileInput.addEventListener("change",this.imagePreview)}},w={class:"container pt-5"},x={class:"row justify-content-center"},T={class:"col-12 col-md-9 col-lg-6"},E={class:"card mt-3"},V={class:"card-body"},P={class:"card-title"},R={key:0},S={key:1},j={class:"d-flex justify-content-center align-items-center btn btn-outline-secondary rounded-3"},C={type:"file",ref:"imgfileInput",id:"fileInput"},L=["src"],M=["src"],N={class:"mt-3 d-flex justify-content-center"},B={class:"mt-3"},z={class:"fs-1"},H={key:0},O={key:1},F={class:"mt-3"},W={class:"fs-1"},q={key:0},G={key:1},J={key:1,class:"mt-3"},K=t("label",{class:"fs-1"},[t("span",null,"方案價格")],-1),Q={class:"mt-3 d-flex justify-content-between"},X=t("i",{class:"bi bi bi-x-circle-fill me-1"},null,-1),Y=t("span",null,"取消修改",-1),Z=[X,Y],$=t("i",{class:"bi bi-check-circle-fill me-1"},null,-1),tt=t("span",null,"確定修改",-1),et=[$,tt];function st(n,s,a,c,e,d){return i(),r("div",w,[t("div",x,[t("div",T,[t("div",E,[t("div",V,[t("h1",P,[e.art.category==="作品"?(i(),r("span",R,"編輯作品")):l("",!0),e.art.category==="報價"?(i(),r("span",S,"編輯方案")):l("",!0)]),t("div",{class:u(["justify-content-center",{"d-none":e.art.imageUrl!=="","d-flex":e.art.imageUrl===""}])},[t("div",{class:u({"col-12 col-md-6 col-lg-3":e.art.imageUrl=="","col-12 col-md-9 col-lg-6":e.art.imageUrl!=""})},[t("div",{class:u(["d-flex justify-content-center mw-100 ratio ratio-1x1",{uploadStyle:e.art.imageUrl==""}])},[t("label",j,[t("input",C,null,512),t("h1",{class:u(["m-0 p-0",{"d-block":e.art.imageUrl=="","d-none":e.art.imageUrl!=""}])}," + ",2),t("img",{src:e.art.imageUrl,ref:"imagePreview2",class:"mw-100 ratio-1x1"},null,8,L)])],2)],2)],2),e.art.imageUrl?(i(),r("img",{key:0,class:"card-img-top ratio-1x1",src:e.art.imageUrl,alt:""},null,8,M)):l("",!0),t("div",N,[t("button",{type:"button",class:"w-100 btn btn-danger btn-lg",onClick:s[0]||(s[0]=o=>e.art.imageUrl="")}," 刪除圖片 ")]),t("div",B,[t("label",z,[e.art.category==="作品"?(i(),r("span",H,"作品名稱：")):l("",!0),e.art.category==="報價"?(i(),r("span",O,"方案名稱：")):l("",!0)]),p(t("input",{type:"text",class:"form-control fs-3",placeholder:"作品名稱","onUpdate:modelValue":s[1]||(s[1]=o=>e.art.title=o)},null,512),[[_,e.art.title]])]),t("div",F,[t("label",W,[e.art.category==="作品"?(i(),r("span",q,"作品描述")):l("",!0),e.art.category==="報價"?(i(),r("span",G,"方案描述")):l("",!0)]),p(t("input",{type:"text",class:"form-control fs-3",placeholder:"作品描述","onUpdate:modelValue":s[2]||(s[2]=o=>e.art.description=o)},null,512),[[_,e.art.description]])]),e.art.category==="報價"?(i(),r("div",J,[K,p(t("input",{type:"text",class:"form-control fs-3",placeholder:"方案價格","onUpdate:modelValue":s[3]||(s[3]=o=>e.art.price=o)},null,512),[[_,e.art.price]])])):l("",!0),t("div",Q,[t("button",{type:"button",class:"btn btn-danger btn-lg",onClick:s[4]||(s[4]=(...o)=>d.cancel&&d.cancel(...o))},Z),t("button",{type:"button",class:"btn btn-success btn-lg",onClick:s[5]||(s[5]=(...o)=>d.upload&&d.upload(...o))},et)])])])])])])}const lt=A(D,[["render",st]]);export{lt as default};
