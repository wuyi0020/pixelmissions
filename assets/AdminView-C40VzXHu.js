import{a as c}from"./axios-Bo0ATomq.js";import{_,r as l,o as u,c as m,b as a,d as t,w as s,F as v,g as i}from"./index-CALbCaTn.js";var p={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_API_PATH:"wuyi0020",VITE_ADMIN_USERNAME:"wuyi0020@gmail.com",VITE_ADMIN_PASSWORD:"wuyi0020",BASE_URL:"/pixelmissions/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h}=p,b={data(){return{}},methods:{checkAdmin(o){c.defaults.headers.common.Authorization=o;const e=`${h}/api/user/check`;c.post(e).catch(()=>{this.$router.push("/admin/login")})},async getToken(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)DashbordAdminToken\s*=\s*([^;]*).*$)|^.*$/,"$1");console.log("token",o),o?console.log("已登入"):(this.$router.push("/admin/login"),console.log("請先登入")),this.checkAdmin(o)},AdminLogOut(){document.cookie="DashbordAdminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;",this.$router.push("/admin/login")}},mounted(){this.getToken()}},g={class:"navbar navbar-expand-lg navbar-static-top navbar-dark border-bottom"},k={class:"container-fluid"},f=a("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarContent","aria-controls":"navbarContent","aria-expanded":"false","aria-label":"Toggle navigation"},[a("span",{class:"navbar-toggler-icon"})],-1),A={class:"collapse navbar-collapse",id:"navbarContent"},T={class:"navbar-nav navbar-nav-scroll"},x={class:"nav-item"},V={class:"nav-item"},E={class:"nav-item"},R={class:"navbar-nav d-flex ms-auto"},$={class:"nav-item"};function w(o,e,D,I,C,r){const n=l("RouterLink"),d=l("RouterView");return u(),m(v,null,[a("div",null,[a("nav",g,[a("div",k,[t(n,{to:"/admin/",class:"navbar-brand"},{default:s(()=>[i("後台首頁")]),_:1}),f,a("div",A,[a("ul",T,[a("li",x,[t(n,{class:"nav-link",to:"/admin/product"},{default:s(()=>[i("管理使用者/作品/方案 ")]),_:1})]),a("li",V,[t(n,{class:"nav-link",to:"/admin/order"},{default:s(()=>[i("瀏覽訂單 ")]),_:1})]),a("li",E,[t(n,{class:"nav-link",to:"/"},{default:s(()=>[i("回到前台 ")]),_:1})])]),a("ul",R,[a("div",$,[a("button",{class:"nav-link",onClick:e[0]||(e[0]=L=>r.AdminLogOut())},"登出")])])])])])]),t(d)],64)}const y=_(b,[["render",w]]);export{y as default};