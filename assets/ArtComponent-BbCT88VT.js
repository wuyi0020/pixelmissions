import{a as u,m as f,_,r as y,o as a,c as i,b as e,A as c,D as l,x as h,g as b,y as s,e as o,f as n}from"./index-Bk2W6sNu.js";import{U as m}from"./UserState-D7ke27qt.js";const g={props:{item:{type:Object,required:!0},datas:{type:Object,required:!1},showtitle:{type:Boolean,default:!0},showPrice:{type:Boolean,default:!1},showbutton:{type:Boolean,default:!1},showUpload:{type:Boolean,default:!1},showAuthor:{type:Boolean,default:!1},h100:{type:Boolean,default:!1}},data(){return{author:{}}},computed:{...u(m,["Alldata"])},methods:{...f(m,["getAlldata"])},async mounted(){this.datas?this.author=this.datas[this.item.author]:(await this.getAlldata(),this.author=this.Alldata[this.item.author])}},w={class:"card art rounded-0 border-2 my-2"},x={class:"container-fluid p-0"},k=["src"],A={class:"card-body flex-grow-0 align-self-stretch bg-dark-subtle"},B={key:0,class:"text fs-6 text-primary-emphasis ms-auto"},v={key:0,class:"card-body flex-grow-0 align-self-stretch bg-dark-subtle"},j={class:"d-flex justify-content-end align-items-center"},p=["src"];function P(U,C,t,D,d,S){const r=y("router-link");return a(),i("div",w,[e("div",x,[e("img",{src:t.item.imageUrl,class:"card-img-top mh-100 rounded-0 object-fit-contain object-position-center w-100 m-0 ArtComponent__image",loading:"lazy",alt:"作品圖片"},null,8,k)]),e("div",A,[c(e("p",{class:h(["mb-0 card-text border-top-0 text-nowrap text-truncate",{"fs-4":t.showPrice,"fs-5":!t.showPrice}])},[b(s(t.item.title)+" ",1),t.showUpload?(a(),i("span",B," 已上傳 "+s(t.item.ArtQuantity),1)):o("",!0)],2),[[l,t.showtitle]])]),t.showAuthor?(a(),i("div",v,[e("div",j,[e("img",{src:d.author.imageUrl,alt:"作者圖片",height:"50px",loading:"lazy",class:"rounded-circle object-fit-cover object-position-center"},null,8,p),e("p",{class:h(["mb-0 ms-2 card-text border-top-0 text-nowrap text-truncate",{"fs-4":t.showPrice,"fs-5":!t.showPrice}])},s(d.author.title),3)])])):o("",!0),c(e("p",{class:"card-body flex-grow-1 bg-dark-subtle mb-0 card-text border-0"},s(t.item.description),513),[[l,t.showPrice]]),c(e("p",{class:"card-footer mb-0 card-text border-0 text-end"},s(t.item.price)+" TWD ",513),[[l,t.showPrice]]),t.item.category==="作品"?(a(),n(r,{key:1,to:`/art/${t.item.id}`,class:"stretched-link"},null,8,["to"])):o("",!0),t.item.category==="報價"?(a(),n(r,{key:2,to:`/comission/${t.item.id}`,class:"stretched-link"},null,8,["to"])):o("",!0),t.item.category==="使用者"?(a(),n(r,{key:3,to:`/usercenter/${t.item.id}`,class:"stretched-link"},null,8,["to"])):o("",!0)])}const V=_(g,[["render",P]]);export{V as A};