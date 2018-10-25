<template>
  <div id="home">
    <div class="bannerr">
      <swiper :list="bannerList" style="width:100%;margin:0 auto;" :aspect-ratio="300/800"
              dots-position="center"></swiper>
    </div>
    <div class="criteria">
      <ul class="criteria_item">
        <li class="header">
          <font class="size">择偶条件</font>
        </li>
        <li>
          <div class="age">
        <li>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 龄 :</li>
        <li v-for="(item,idx) in ageList" @click="ageFun(item,idx)" :class="idx==ageNow?'active':''">{{item}}</li>
    </div>
    <div class="age">
      <li>婚姻状况 :</li>
      <li v-for="(item,idx) in checkList" @click="checkFun(item,idx)" :class="idx==checkNow?'active':''"
          style="padding: 0.4rem 1rem;">{{item}}
      </li>
    </div>
    <div class="age">
      <li>居&nbsp;住&nbsp;&nbsp;地 :</li>
      <li v-for="(item,idx) in placeList" @click="placeFun(item,idx)" :class="idx==placeNow?'active':''"
          style="padding: 0.4rem 1rem;">{{item}}
      </li>
    </div>
    <div class="age">
      <li>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;籍 :</li>
      <li v-for="(item,idx) in placeListt" @click="huFun(item,idx)" :class="idx==huNow?'active':''"
          style="padding: 0.4rem 1rem;">{{item}}
      </li>
    </div>
    </li>
    </ul>
  </div>
  <dl class="mess" v-show="ascny">
    <dt>
      <img src="../../static/img/symbols-失败.png"/>
    </dt>
    <dd>无匹配用户</dd>
  </dl>
  <!--<div class="allinformation">
      <div class="message" v-for="items in member" @click="go(items.member_id)">
          <div class="photo">
              <img src="../../static/img/1.png" v-if='items.album==""' />
              <img :src="items.album" v-else/>
          </div>
          <div class="information">
              <span>{{items.true_name}}</span>
              <div>
                  <font class="annum">{{items.age}}岁</font>
                  <font class="stature">{{items.height}}cm</font>
              </div>
              <span>户籍所在地：{{items.household_register_address}}</span>
          </div>
          <div class="area">
              居住地：{{items.address}}
          </div>
      </div>
  </div>-->


  <div class="allinformation" style='padding-bottom:23px'>
    <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="0"
        infinite-scroll-immediate-check="false">
      <div class="message" v-for="items in member" @click="go(items.member_id)">
        <div class="photo">
          <img src="../../static/img/1.png" v-if='items.album==""'/>
          <img :src="items.album" v-else/>
        </div>
        <div class="information">
          <span>{{items.true_name}}</span>
          <div>
            <font class="annum">{{items.age}}岁</font>
            <font class="stature">{{items.height}}cm</font>
          </div>
          <span>户籍所在地：{{items.household_register_address}}</span>
        </div>
        <div class="area">
          居住地：{{items.address}}
        </div>
      </div>
      <li style="display:flex;justify-content: center;background: #F6F6F6;" v-show="!queryLoading">
        <mt-spinner type="fading-circle" color="#26a2ff" :size="20" v-show="loading&&!allLoaded"></mt-spinner>
        <span v-show="allLoaded">已加载全部</span>
      </li>
    </ul>
  </div>


  <div class="mark" v-if='liveCheck'>
    <div class="mark_content">
      <div class="list">
        <span @click='liveMark' style="margin-left: 4%;font-size: 1.07rem;color: #999999">取消</span>
        <h2 style="font-size: 1.14rem;">居住地</h2>
        <span style="margin-right: 4%;font-size: 1.07rem;color: #B674FD" @click='liveFun'>确定</span>
      </div>
      <div class='text'>
        <ul v-if='liveCheck'>
          <picker :data='year7' :fixed-columns="3" :columns=3 v-model='liveData'></picker>
        </ul>
      </div>
    </div>
  </div>
  <div class="mark" v-if='isCheck'>
    <div class="mark_content">
      <div class="list">
        <span @click='closeMark' style="margin-left: 4%;font-size: 1.07rem;color: #999999">取消</span>
        <h2 style="font-size: 1.14rem;">户籍</h2>
        <span style="margin-right: 4%;font-size: 1.07rem;color: #B674FD" @click='okFun'>确定</span>
      </div>
      <div class='text'>
        <ul v-if='isCheck'>
          <picker :data='year8' :fixed-columns="1" :columns=1 v-model='huData'></picker>
        </ul>
      </div>
    </div>
  </div>
  <div class="markk" v-show="warnTwo">
    <div class="mark_content">
      <h2 style='font-size:1.4rem;  text-align:center;'>您的基本信息有误请检查</h2>
      <p>很抱歉您的基本信息有误，请检查</p>
      <div class="btn">
        <span @click="goRedact">确定</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script type="text/javascript">
  import {
    Cell,
    Group,
    Picker,
    GroupTitle,
    XButton,
    Swiper
  } from 'vux'
  import datas from '../../static/data/china_address.json';
  import two from '../../static/data/two.json';
  import {
    Indicator
  } from 'mint-ui';

  export default {
    name: 'home',
    components: {
      Picker,
      GroupTitle,
      XButton,
      Cell,
      Group,
      Swiper
    },
    data() {
      return {
        index: 0,
        aindex: 0,
        bindex: 0,
        cindex: 0,
        ageNow: 0,
        checkNow: 0,
        placeNow: 0,
        areaNow: 0,
        huNow: 0,
        ageList: ['全部', '40~50', '51~60', '61~70', '71以上'],
        checkList: ['全选', '未婚', '离异', '丧偶'],
        placeList: ['全选', '北京', '天津', '河北'],
        placeListt: ['全选', '北京', '天津', '河北'],
        ages: '', //年龄
        marital: '', //婚姻状况
        idCard: '', //居住地
        year7: datas,
        year8: two,
        liveValue: [],
        year9Value: [],
        household_register_address: '', //户籍
        isCheck: false,
        isChecks: false, //居住地
        popupVisible: false,
        bannerList: [],
        member: '', //数据保存
        sendId: null,
        tokens: '',
        huData: [], //户籍的值
        liveData: [], //居住地
        liveCheck: false,
        ascny: false,
        warn: false,
        warnTwo: false,
        tokenNew: "",
        status: null,
        queryLoading: false, //下拉加载更多
        loading: false,
        allLoaded: false,
        page: 1
      }
    },
    mounted() {
      window.scroll(0, 0);
      this.require();
      if (sessionStorage.getItem("Token")) {
        this.tokenNew = sessionStorage.getItem("Token")
      }
      this.members();
      this.banner();
    },
    methods: {
      areaChange(index) {
        this.address_area = this.address[index]
      },
      //轮播
      banner() {
        var _this = this;
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/banners",
          params: {
            type: 1
          }
        }).then(res => {
          console.log(res.data.data)
          _this.bannerList = res.data.data
        }).catch(error => {
          throw error
        })
      },
      //截取code
      UrlSearch() {
        var name, value;
        //	var str = window.location.href;
        var str = window.location.href;
        //console.log(str)
        var num = str.indexOf("?");
        str = str.substr(num + 1); //str得到?之后的字符串
        var arr = str.split("&"); //得到&分割的参数，放入数组中
        for (var i = 0; i < arr.length; i++) {
          num = arr[i].indexOf("=");
          if (num >= 0) {
            name = arr[i].substring(0, num);
            value = arr[i].substr(num + 1);
            this[name] = value;
          }
        }
      },
      //下拉
      loadMore() {
        let _this = this
        if (_this.allLoaded) {
          _this.loading = true;
          return;
        }
        if (_this.queryLoading) {
          return;
        }
        _this.loading = !_this.queryLoading;
        _this.page++;
        _this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: _this.ages,
            marital: _this.marital,
            idcard: "", //居住地
            register_address: "",
            page: _this.page,
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          console.log(res)
          localStorage.removeItem('huji');
          localStorage.removeItem('juzhudi');
          // _this.member = res.data.data
          if (_this.member.length == 0) {
            _this.ascny = true
          } else {
            _this.ascny = false
          }
          if (res.data.data.length != 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              _this.member.push(res.data.data[i])
            }
            //                 console.log(this.venue_model)
            _this.loading = false
            _this.allLoaded = false
            _this.queryLoading = false
            return false
          } else {
            _this.loading = false
            _this.allLoaded = true
            _this.queryLoading = false
          }
        }).catch(res => {
          console.log(res)
        })
      },


      require() {
        var tok = sessionStorage.getItem("Token")
        if (tok == null) {
          //拿取到的code值 去换token
          var $login = window.sessionStorage.getItem("$login");
          console.log($login)
          this.UrlSearch()
          var Request = new this.UrlSearch();
          var code = Request.code;
          console.log(code)
          this.$http({
            method: 'post',
            url: 'http://yinhan-media.weiyingjia.org/api/yinhan/wechatcode',
            params: {
              code: code
            }
          }).then(res => {
            console.log(res)
            //拿到后台给的token值 ---  sessionStorag
            let Token = res.data.data.token
            let phone = res.data.data.phone
            sessionStorage.setItem("Token", Token)
            sessionStorage.setItem("phone", phone)
            this.tokenNew = Token
            this.members(Token);
            this.status = res.data.data.status
            localStorage.setItem("status", res.data.data.status)
            if (sessionStorage.phone == 0) {
              this.$router.push({
                path: "/login"
              })
            }
            if (this.status == 3) {
              this.warnTwo = true
            } else {
              this.warnTwo = false
            }
          })
        }
        //				 else {
        //					console.log(this.tokenNew)
        //					this.members();
        //				}
      },
      go(id) {
        if (sessionStorage.phone == 0) {
          this.$router.push({
            path: "/login"
          })
        } else {
          this.$router.push({
            path: "/options/" + id,
            name: "options",
            params: {
              id: id
            }
          })
        }
      },
      //会员列表
      members(Token) {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        let _this = this
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: _this.ages,
            marital: _this.marital,
            idcard: "", //居住地
            register_address: "",
            page: _this.page,
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          console.log(res)
          localStorage.removeItem('huji');
          localStorage.removeItem('juzhudi');
          _this.member = res.data.data
          if (_this.member.length == 0) {
            _this.ascny = true
          } else {
            _this.ascny = false
          }
        }).catch(res => {
          console.log(res)
        })
      },
      //筛选年龄
      ageFun(demo, idx) {
        idx === 0 ? this.ages = '' : this.ages = idx;
        this.ageNow = idx;
        //				this.members();
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: this.ages,
            marital: this.marital,
            idcard: localStorage.juzhudi, //剧中地
            register_address: localStorage.huji, //户籍
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          this.member = res.data.data
          if (this.member.length == 0) {
            this.ascny = true
          } else {
            this.ascny = false
          }
        }).catch(res => {
          console.log(res)
        })
        // this.hulive();
      },
      //筛选婚姻状态
      checkFun(demo, idx) {
        idx === 0 ? this.marital = '' : this.marital = idx;
        this.checkNow = idx;
        //				this.members();
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: this.ages,
            marital: this.marital,
            idcard: localStorage.juzhudi, //剧中地
            register_address: localStorage.huji, //户籍
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          this.member = res.data.data
          if (this.member.length == 0) {
            this.ascny = true
          } else {
            this.ascny = false
          }
        }).catch(res => {
          console.log(res)
        })
      },

      //关闭zhenzhaoceng 1
      closeMark() {
        this.isCheck = false;
      },
      //关闭zhenzhaoceng 2
      liveMark() {
        this.liveCheck = false;
      },
      //居住地的值
      change(value) {
        this.liveData = value;
        console.log(this.liveData)
      },
      //户籍的值
      changes(value) {
        this.huData = value;
        console.log(this.huData)
      },
      //户籍
      okFun() {
        localStorage.huji = JSON.stringify(this.huData)
        this.isCheck = false;
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: this.ages,
            marital: this.marital,
            idcard: localStorage.juzhudi, //剧中地
            register_address: localStorage.huji, //户籍
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          this.member = res.data.data
          if (this.member.length == 0) {
            this.ascny = true
          } else {
            this.ascny = false
          }
        }).catch(res => {
          console.log(res)
        })
      },
      //居住地
      liveFun() {
        localStorage.juzhudi = JSON.stringify(this.liveData)
        this.liveCheck = false;
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
          params: {
            ages: this.ages,
            marital: this.marital,
            idcard: localStorage.juzhudi, //剧中地
            register_address: localStorage.huji, //户籍
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          this.member = res.data.data
          if (this.member.length == 0) {
            this.ascny = true
          } else {
            this.ascny = false
          }
        }).catch(res => {
          console.log(res)
        })
      },
      //筛选居住地
      placeFun(demo, idx) {
        this.placeNow = idx;
        switch (idx) {
          case 0:
            this.liveCheck = false;
            // this.liveData = '';
            localStorage.removeItem('juzhudi');
            //						this.members();
            Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            });
            this.$http({
              method: "get",
              url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
              params: {
                ages: this.ages,
                marital: this.marital,
                idcard: localStorage.juzhudi, //剧中地
                register_address: localStorage.huji, //户籍
              },
              headers: {
                Authorization: "Bearer " + this.tokenNew
              }
            }).then(res => {
              Indicator.close();
              this.member = res.data.data
              if (this.member.length == 0) {
                this.ascny = true
              } else {
                this.ascny = false
              }
            }).catch(res => {
              console.log(res)
            })
            break;
          default:
            this.liveCheck = true;
            this.liveData = [];
          // this.hulive();
        }
      },
      //刷选户籍
      huFun(demo, idx) {
        this.huNow = idx;
        switch (idx) {
          case 0:
            this.isCheck = false;
            // this.huData = '';
            localStorage.removeItem('huji');
            //						this.members();
            Indicator.open({
              text: 'Loading...',
              spinnerType: 'fading-circle'
            });
            this.$http({
              method: "get",
              url: "http://yinhan-media.weiyingjia.org/api/yinhan/members",
              params: {
                ages: this.ages,
                marital: this.marital,
                idcard: localStorage.juzhudi, //剧中地
                register_address: localStorage.huji, //户籍
              },
              headers: {
                Authorization: "Bearer " + this.tokenNew
              }
            }).then(res => {
              Indicator.close();
              this.member = res.data.data
              if (this.member.length == 0) {
                this.ascny = true
              } else {
                this.ascny = false
              }
            }).catch(res => {
              console.log(res)
            })
            break;
          default:
            this.isCheck = true;
            this.huData = [];
          // this.hulive();
        }
      },
      goRedact() {
        this.$router.push({
          path: "/redact"
        })
      }
    },
    //修改列表页的meta值，false时再次进入页面会重新请求数据。
    beforeRouteLeave(to, from, next) {
      from.meta.keepAlive = false;
      next();
    }
  }
</script>
<style type="text/css">
  ::-webkit-scrollbar {
    display: none;
  }

  #home .wwww {
    width: 100%;
    height: auto;
  }

  #home .wwww > img {
    width: 100%;
    height: 150px;
  }

  #home {
    position: relative;
    overflow: hidden;
    width: 100%;
    margin-bottom: 5rem;
  }

  #home .bannerr {
    width: 100%;
    /*height: 12rem;
    padding-bottom: 3rem;*/
  }

  #home .bannerr img {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    object-fit: scale-down;
  }

  #home .criteria {
    width: 100%;
    margin: 0 auto;
    /*padding: 1rem 0 0.5rem 1rem;*/
    box-shadow: 0 2px 9px 0 #F7F7F7;
  }

  #home .criteria_item li {
    line-height: 1.5rem;
  }

  #home .header {
    font-size: 1.1rem;
    color: #B674FD;
    letter-spacing: 0;
    font-weight: 900;
    border-bottom: 1px solid #f5f5f5;
  }

  #home .size {
    display: block;
    width: 20%;
    padding: 0.5rem;
    text-align: center;
    margin-left: 0.7rem;
    border-bottom: 2px solid #B674FD;
  }

  #home .age {
    display: flex;
    padding: 0.5rem 0 1.2rem 0;
  }

  #home .age li {
    padding: 0.4rem 0.5rem;
    font-size: 0.875rem;
    color: #666666;
    letter-spacing: 0;
  }

  #home .age li:first-child {
    margin-left: 0.3rem;
    font-size: 1.1rem;
    color: #000000;
    letter-spacing: 1.6px;
  }

  #home .active {
    /*opacity: 0.7;*/
    background: #B674FD;
    border-radius: 3px;
    color: white !important;
  }

  #home .allinformation {
    width: 94.7%;
    margin: 1rem auto;
  }

  #home .message {
    margin-top: 0.5rem;
    background: #FFFFFF;
    box-shadow: 0 2px 9px 0 #EEEEEE;
    border-radius: 3px;
    padding: 0.3rem;
    display: flex;
    justify-content: space-around;
  }

  #home .photo {
    /*flex: 1;*/
    width: 7rem;
    height: 7rem;
  }

  #home .photo img {
    width: 100%;
    height: 100%;
    /*object-fit: scale-down;*/
  }

  #home .information {
    margin-left: 0.5rem;
    flex: 2;
    display: flex;
    flex-direction: column;
    line-height: 2.5;
  }

  #home .area {
    /*margin-left: 3.5rem;*/
    font-size: 0.9rem;
    color: #666666;
    flex: 0.8;
    letter-spacing: 0;
  }

  #home .information span:first-child {
    font-size: 1.1rem;
    color: #000000;
    letter-spacing: 0;
  }

  #home .information span:last-child {
    font-size: 0.9rem;
    color: #666666;
    letter-spacing: 0;
  }

  #home .annum {
    color: #B674FD;
  }

  #home .stature {
    margin-left: 0.5rem;
    padding: 0.1rem 0.25rem;
    border: 1px solid #B674FD;
    border-radius: 3px;
    color: #B674FD;
  }

  /* 弹出层 */

  #home .mark {
    position: fixed;
    bottom: 3.5rem;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #home .mark_content {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 100%;
    transform: translate(-50%, 0);
    background-color: #fff;
    padding: 1rem;
  }

  #home .mark_content > .list {
    display: flex;
    justify-content: space-between;
    line-height: 3rem;
    border-bottom: 1px solid #EEEEEE;
  }

  #home .text {
    display: flex;
    height: 14rem;
    overflow: hidden;
    padding-top: 1rem;
    font-size: 1.2rem;
  }

  #home .mark_content > .text > ul {
    text-align: center;
    flex: 50%;
    height: 80%;
  }

  /* #home .mark_content>.text>ul>li {
      display: flex;
      line-height: 2.5rem;
      justify-content: center;
      color: #666666;
  } */

  #home .mark_content > .text > ul > li:hover {
    color: #B674FD;
  }

  #home .mess {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    color: #666;
    padding: 3rem 0;
  }

  #home .mess > dt {
    width: 20%;
    margin: 0 auto;
  }

  #home .mess > dt > img {
    width: 100%;
    max-width: 100%;
  }

  /*模态框*/

  #home .markk {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #home .markk .mark_content {
    position: absolute;
    padding-bottom: 1rem;
    top: 44%;
    left: 50%;
    width: 82%;
    height: 42%;
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    color: #000000;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 3;
    text-align: center;
  }

  #home .markk .mark_content > h2 {
    position: relative;
    text-align: left;
    line-height: 4rem;
    font-size: 1.7rem;
    border-bottom: 1px solid #eeeeee;
  }

  #home .markk .btn span {
    display: inline-block;
    margin-top: 2rem;
    background: red;
    width: 7rem;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    background: #B674FD;
    border-radius: 3px;
    color: #FFFFFF;
  }

  /*#home .vux-swiper {
      height: 150px!important;
  }

  .vux-slider>.vux-swiper>.vux-swiper-item>a>.vux-img {
      height: 100%!important;
      background-size: contain!important;
  }*/
</style>
