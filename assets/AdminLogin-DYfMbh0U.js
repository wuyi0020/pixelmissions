import{a as c}from"./axios-Bo0ATomq.js";import{_ as m,t as l,o as p,c as _,b as s,C as f,h as d,v as u}from"./index-C-_izT2N.js";var h={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/pixelmissions/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:w}=h,v={data(){return{apiUrl:`${w}`,user:{username:"",password:""}}},methods:{login(){const n=`${this.apiUrl}/admin/signin`;c.post(n,this.user).then(o=>{l.success("燈入成功");const{token:i,expired:a}=o.data;document.cookie=`DashbordAdminToken=${i};expires=${new Date(a)}; path=/`,this.$router.push("/admin/product")}).catch(()=>{l.error("登入失敗")})}},mounted(){document.cookie.replace(/(?:(?:^|.*;\s*)DashbordAdminToken\s*=\s*([^;]*).*$)|^.*$/,"$1")&&this.$router.push("/admin/product")}},b=s("h2",null,"登入頁面",-1),E={class:"container"},g={class:"row justify-content-center"},k={class:"col-8"},x={class:"form-floating mb-3"},A=s("label",{for:"username"},"Email address",-1),D={class:"form-floating"},T=s("label",{for:"password"},"Password",-1),V=s("br",null,null,-1);function y(n,o,i,a,t,r){return p(),_("div",null,[b,s("div",E,[s("div",g,[s("div",k,[s("form",{id:"form",class:"form-signin",onSubmit:o[3]||(o[3]=f((...e)=>r.login&&r.login(...e),["prevent"]))},[s("div",x,[d(s("input",{type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:"","onUpdate:modelValue":o[0]||(o[0]=e=>t.user.username=e)},null,512),[[u,t.user.username]]),A]),s("div",D,[d(s("input",{type:"password",class:"form-control",id:"password",placeholder:"Password",required:"","onUpdate:modelValue":o[1]||(o[1]=e=>t.user.password=e)},null,512),[[u,t.user.password]]),T]),V,s("button",{type:"button",class:"btn btn-lg btn-primary w-100 mt-3",onClick:o[2]||(o[2]=e=>r.login())}," 登入 ")],32)])])])])}const R=m(v,[["render",y]]);export{R as default};
