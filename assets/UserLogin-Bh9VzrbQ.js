import{_ as d,m,a as p,r as u,o as _,c as f,b as t,d as h,w as x,h as r,v as l}from"./index-BKyi1mnf.js";import{U as i}from"./UserState-DTLkBWnh.js";import"./axios-Bo0ATomq.js";const b=["userName","userEmail","userID","userHasLogIn","AdminToken"],g=["Userlogin","AdminTokenCheck"],v={data(){return{email:"",password:""}},mounted(){this.AdminTokenCheck(!0)},methods:{GOregister(){this.$router.push("/register")},...m(i,g)},computed:{...p(i,b)}},w={class:"container-fluid mt-5"},k={class:"row justify-content-center"},y={class:"col-sm-12 col-md-9 col-lg-6 col-xxl-4"},U={class:"card rounded-lg border-3"},C={class:"card-body"},A=t("h2",{class:"display-4 text-center fw-bold text"},"Pixel Missions",-1),I=t("p",{class:"text-center text-secondary"},"接案的好幫手",-1),T=t("hr",null,null,-1),V=t("p",{class:"text-center text-secondary"},"請登入或註冊",-1),B={class:"form-floating mt-3"},G=t("label",{for:"floatingInput"},"電子信箱",-1),N={class:"form-floating mt-1"},O=t("label",{for:"floatingInput"},"密碼",-1),D={class:"text-center mt-3 w-100"},E={class:"text-center mt-3 w-100"};function H(a,e,L,M,s,n){const c=u("router-link");return _(),f("div",w,[t("div",k,[t("div",y,[t("div",U,[t("div",C,[h(c,{to:{name:"Home"},class:"text text-decoration-none"},{default:x(()=>[A]),_:1}),I,T,V,t("div",B,[r(t("input",{type:"text",class:"form-control",placeholder:"使用者名稱或電子信箱","onUpdate:modelValue":e[0]||(e[0]=o=>s.email=o)},null,512),[[l,s.email]]),G]),t("div",N,[r(t("input",{type:"password",class:"form-control",placeholder:"密碼","onUpdate:modelValue":e[1]||(e[1]=o=>s.password=o)},null,512),[[l,s.password]]),O]),t("div",D,[t("button",{class:"w-100 btn btn-primary rounded-pill",type:"button",onClick:e[2]||(e[2]=o=>a.Userlogin(s.email,s.password))}," 登入 ")]),t("div",E,[t("button",{class:"w-100 btn btn-outline-primary rounded-pill",type:"button",onClick:e[3]||(e[3]=(...o)=>n.GOregister&&n.GOregister(...o))}," 註冊 ")])])])])])])}const q=d(v,[["render",H]]);export{q as default};