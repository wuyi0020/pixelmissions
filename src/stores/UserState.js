import { defineStore } from 'pinia'
import axios from 'axios'
import toastr from 'toastr'
const { VITE_URL, VITE_API_PATH, VITE_ADMIN_PASSWORD, VITE_ADMIN_USERNAME } =
  import.meta.env

export default defineStore('UserState', {
  state: () => ({
    userName: null,
    userEmail: null,
    userID: null,
    userHasLogIn: false,
    AdminToken: null,
    Alldata: null,
    lastGetAllDataTime: 0
  }),
  getters: {
    getUserName () {
      return this.userName
    },
    getUserEmail () {
      return this.userEmail
    },
    getUserID () {
      return this.userID
    },
    getUserHasLogIn () {
      return this.userHasLogIn
    },
    getAdminToken () {
      return this.AdminToken
    }
  },
  actions: {
    setUserName (name) {
      this.userName = name
    },
    setUserEmail (email) {
      this.userEmail = email
    },
    setUserID (id) {
      this.userID = id
    },
    setUserHasLogIn (value) {
      this.userHasLogIn = value
    },
    async setAdminToken () {
      let token = this.getCookie('AdminToken')
      // 取得token
      const AdminloginData = {
        username: VITE_ADMIN_USERNAME,
        password: VITE_ADMIN_PASSWORD
      }
      const tokenUrl = `${VITE_URL}/admin/signin`
      // 登入取得後端必要token
      axios.post(tokenUrl, AdminloginData).then((res) => {
        const { expired } = res.data
        token = res.data.token
        document.cookie = `AdminToken=${token};expires=${new Date(expired)}; path=/`
        this.AdminToken = token
        return token
      })
      return token
    },
    async AdminTokenCheck (NeedCheckUserLogin = false) {
      const token = await this.setAdminToken()
      this.AdminToken = this.getCookie('AdminToken')
      // this.RegToken = this.getCookie('RegToken')
      this.userID = this.getCookie('UserID')
      // 如果已登入就跳過登入檢查，並跳轉至user頁面
      if (NeedCheckUserLogin && this.userID && this.AdminToken) {
        this.userHasLogIn = true
        const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/products?category=使用者`
        axios
          .get(url, {
            headers: {
              Authorization: `${token}`
            }
          })
          .then((res) => {
            // console.log(res.data);
            let account = Object.values(res.data.products).filter((item) => {
              return item.id === this.userID
            })
            account = account[0]
            const { username, email } = account
            // console.log(username);
            this.userName = username
            this.userEmail = email || username
            toastr.success('已登入 跳轉至首頁')
            this.$router.push('/')
          })
          .catch(() => {
            toastr.error('系統錯誤 請重新登入')
          })
      }
    },
    async Userlogin (email, password) {
      if (!email || !password) {
        toastr.error('請輸入帳號密碼')
        return
      }
      // 登入檢查
      const token = await this.setAdminToken()
      console.log(token)

      await this.getAlldata()
      console.log(this.Alldata)
      try {
        const user = Object.values(this.Alldata).find((item) => {
          if (item.category === '使用者' && item.email === email) {
            if (item.password === password) {
              return item
            } else {
              throw new Error('密碼錯誤')
            }
          }
          return null
        })
        console.log(user)
        if (!user) {
          toastr.error('帳號未註冊')
          return
        }
        console.log(user)
        if (Object.keys(user).length) {
          const ID = user.id
          toastr.success('登入成功')
          const expired = new Date(
            new Date().getTime() + 1000 * 60 * 60 * 24 * 7
          )
          document.cookie = `UserID=${ID};expires=${expired}; path=/`
          this.userID = ID
          this.userName = user.username
          this.userEmail = user.email
          this.userHasLogIn = true
          this.$router.push('/')
        } else {
          toastr.error('登入失敗')
        }
      } catch (err) {
        console.log(err)
        if (err.response.status === 401) {
          this.UserLogout()
        }
        toastr.error('登入失敗 請稍後再試')
      }
      // Object.values(this.Alldata).find((item) => {
      //   if (item.category === '使用者' && item.email === email) {
      //     if (item.password === password) {
      //       return item
      //     } else {
      //       throw new Error('密碼錯誤')
      //     }
      //   }
      //   return null
      // })

      // console.log(token);
      // const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/products/all`
      // axios
      //   .get(url, {
      //     headers: {
      //       Authorization: `${token}`
      //     }
      //   })
      //   .then((res) => {
      //     this.Alldata = res.data.products
      //     console.log(this.Alldata)
      //     const user = Object.values(this.Alldata).find((item) => {
      //       if (item.category === '使用者' && item.email === email) {
      //         if (item.password === password) {
      //           return item
      //         } else {
      //           throw new Error('密碼錯誤')
      //         }
      //       }
      //       return null
      //     })
      //     console.log(user)
      //     return user
      //   })
      //   .then((user) => {
      //     if (!user) {
      //       toastr.error('帳號未註冊')
      //       return
      //     }
      //     console.log(user)
      //     if (Object.keys(user).length) {
      //       const ID = user.id
      //       toastr.success('登入成功')
      //       const expired = new Date(
      //         new Date().getTime() + 1000 * 60 * 60 * 24 * 7
      //       )
      //       document.cookie = `UserID=${ID};expires=${expired}; path=/`
      //       this.userID = ID
      //       this.userName = user.username
      //       this.userEmail = user.email
      //       this.userHasLogIn = true
      //       this.$router.push('/')
      //     } else {
      //       toastr.error('登入失敗')
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     if (err.response.status === 401) {
      //       this.UserLogout()
      //     }
      //     toastr.error('登入失敗 請稍後再試')
      //   })
    },
    checkUserLogin (push = true) {
      this.userID = this.getCookie('UserID')
      if (this.userID) {
        this.userHasLogIn = true
      } else {
        this.userHasLogIn = false
        // 跳轉至登入頁面
        if (push) {
          this.$router.push('/login')
          toastr.warning('請先登入')
        }
      }
    },
    UserLogout () {
      document.cookie = 'UserID=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      document.cookie =
        'AdminToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      document.cookie =
        'RegToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
      this.resetUserState()
      toastr.success('已登出')
      this.$router.push('/')
    },
    DashbordLogout () {
      document.cookie =
        'DashbordAdminToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    },
    PushUrl (Url) {
      console.log(Url)
      this.$router.push(Url)
      // location.reload();
    },
    resetUserState () {
      this.userName = null
      this.userEmail = null
      this.userID = null
      this.userHasLogIn = false
    },
    async getAlldata (isDashbordAdmin = false) {
      if (this.Alldata && new Date() - this.lastGetAllDataTime < 2000) {
        this.lastGetAllDataTime = new Date()
        return this.Alldata
      }
      this.lastGetAllDataTime = new Date()
      let token = null
      if (isDashbordAdmin) {
        token = await this.getCookie('DashbordAdminToken')
      } else {
        token = await this.setAdminToken()
      }
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/products/all`
      await axios
        .get(url, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then((res) => {
          this.Alldata = res.data.products
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })

      return this.Alldata
    },
    async updateUserArtQuantity (authorID, needGetAlldata = false) {
      if (needGetAlldata) {
        await this.getAlldata()
      }
      const authorArt = Object.values(this.Alldata).filter((item) => {
        if (item.category === '作品' && item.author === authorID) {
          return item
        }
        return null
      })
      const author = { ...this.Alldata[authorID] }
      if (authorArt.length === author.ArtQuantity) {
        // console.log('無需更新')
        return
      }
      author.ArtQuantity = Object.values(authorArt).length
      const url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${authorID}`
      const token = await this.getCookie('AdminToken')
      const data = { data: author }
      // console.log(data)
      // return null
      axios
        .put(url, data, {
          headers: {
            Authorization: `${token}`
          }
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async checkUserhasArt () {
      await this.getAlldata()
      const UserSet = new Set()
      Object.values(this.Alldata).forEach((item) => {
        if (item.category === '使用者') {
          UserSet.add(item.id)
        }
      })
      console.log(UserSet)
      UserSet.forEach((item) => {
        console.log(item)
        this.updateUserArtQuantity(item)
      })
    },
    // 从 cookie 中获取指定名称的值
    getCookie (name) {
      const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))
        ?.split('=')[1]

      console.log(cookieValue)
      return cookieValue
    }

    // async PutProduct(item) {
    //   let url = `${VITE_URL}/api/${VITE_API_PATH}/admin/product/${data.id}`;
    //   let token = await this.AdminTokenCheck();
    //   let data = { item };
    //   axios
    //     .put(url, data, {
    //       headers: {
    //         Authorization: `${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       let returnData = {
    //         status: res.status,
    //         data: res.data,
    //         success: true,
    //       };
    //       return returnData;
    //     })
    //     .catch((err) => {
    //       let returnData = {
    //         status: err.response.status,
    //         data: err.response.data,
    //         success: false,
    //       };
    //       return returnData;
    //     });
    // },
  }
})
