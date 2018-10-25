<template>
  <div id="meheartbeat">
    <div class="main">
      <button @click="index=0,bol=false,myLike(0)" :class="index==0?'active':''">我心动的</button>
      <button @click="index=1,bol=true,myLike(1)" :class="index==1?'active':''">对我心动</button>
    </div>
    <div class="select">
			<span @click='tipCheck2=false,tipCheck1=!tipCheck1'>状态选择
				<time v-if='tipCheck1'>
					<img src="../../static/img/more_unfold.png"/>
				</time>
				<time v-else>
					<img src="../../static/img/less (1).png"/>
				</time>
				<div class="txt" v-show='tipCheck1'>
					<span style="font-size: 0.8rem; padding: 0;" v-for='(item,index) in statusList' @click='statusChange(index)'>{{item}}</span>
		</div>
		</span>
      <span @click='tipCheck1=false,tipCheck2=!tipCheck2'>时间选择
				<time v-if='tipCheck2'>
					<img src="../../static/img/more_unfold.png"/>
				</time>
				<time v-else>
					<img src="../../static/img/less (1).png"/>
				</time>
				<div class="txtt" v-show='tipCheck2'>
					<span style="font-size: 0.8rem; padding: 0;" v-for='(item,index) in dateList' @click='timeChange(index)'>{{item}}</span>
	</div>
	</span>
    </div>
    <div class="figure" v-show="!bol">
      <dl class="mess" v-show="ascny">
        <dt>
          <img src="../../static/img/symbols-失败.png"/>
        </dt>
        <dd>您还没有心动别人哦</dd>
      </dl>
      <div class="figureitem" v-for='(item,index) in listData' :key='item.id'
           @click="goPersonage(item.status,item.be_member_id,item.id)" v-show="ascny1" v-cloak>
        <div class="figureone">

          <img src="../../static/img/1.png" alt="" v-if='item.be_album==""'>
          <img v-lazy="item.be_album" alt='图片加载有误' v-else/>
        </div>
        <div class="figuretwo" style="flex: 2.5;">
          <p>
            <span class="namee">{{item.be_name}}</span>
            <span v-if='item.status==0'>等待回应</span>
            <span v-if='item.status==1'>邀约成功</span>
            <span v-if='item.status==2'>邀约失败</span>
          </p>
          <p>
            <span>{{item.c_time}}</span>
            <!-- <span style="margin-left: 1rem;">15:33</span> -->
          </p>
        </div>
        <div class="figurethree" style="flex: 1;margin-top: 1.7rem;margin-right: 0.5rem;">
          <button v-if="item.status==0">邀约中</button>
          <button v-if="item.status==1" @click.stop='responses(item.id)'>邀约成功</button>
          <button v-if="item.status==2">邀约失败</button>
        </div>
      </div>
    </div>
    <div class="figure" v-show="bol">
      <dl class="mess" v-show="ascny">
        <dt>
          <img src="../../static/img/symbols-失败.png"/>
        </dt>
        <dd>还没有人对您心动哦</dd>
      </dl>
      <div class="figureitem" v-for='(item,index) in listData' :key='item.id'
           @click="goOption(item.status,item.member_id,item.id)" v-show="ascny1" v-cloak>
        <div class="figureone">
          <img src="../../static/img/1.png" alt="" v-if='item.album==""'>
          <img :src="item.album" alt='图片加载有误' v-else/>
        </div>
        <div class="figuretwo" style="flex: 2.5;">
          <p>
            <span class="namee">{{item.name}}</span>
            <span v-if='item.status==0'>等待回应</span>
            <span v-if='item.status==1'>邀约成功</span>
            <span v-if='item.status==2'>邀约失败</span>
          </p>
          <p>
            <span>{{item.c_time}}</span>
            <!-- <span style="margin-left: 1rem;">15:33</span> -->
          </p>
        </div>
        <div class="figurethree"
             style="flex: 1;margin-top: 1.7rem;margin-right: 0.5rem;display: flex;justify-content: space-between;margin-left: 0.5rem;">
          <button @click.stop='response(item.member_id,item.id)' v-if='item.status==0'>应邀</button>
          <button @click.stop="resp(item.id)" v-if='item.status==0'>拒绝</button>
          <button @click.stop='responses(item.id)' v-if='item.status==1'>邀约成功</button>
          <button v-if='item.status==2'>邀约失败</button>
        </div>
      </div>
    </div>
    <div class="mark" v-show='alertMark'>
      <div class="mark_content">
        <!--<h2 style='font-size:1.4rem;  text-align:center;'>您确定支付19.9元牵手成功吗？</h2>-->
        <h2 style='font-size:1.4rem;  text-align:center;'>内测期间暂不收费</h2>
        <div class="dele">
          <span @click='deleMark'>取消</span>
          <span @click="okFun">确定</span>
        </div>
      </div>
    </div>
    <div class="mark" v-show='opMark'>
      <div class="mark_content">
        <h2 style='font-size:1.4rem;  text-align:center;'>您确定拒绝ta吗？</h2>
        <div class="dele">
          <span @click='oppMark'>取消</span>
          <span @click="okMark()">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';

  export default {
    name: "meheartbeat",
    data() {
      return {
        bol: false,
        alertMark: false,
        index: 0,
        listData: null,
        tipCheck1: false,
        tipCheck2: false,
        payId: null,
        dateList: ['全部', '今日', '一周以内', '半月以内'],
        statusList: ['邀约中/应邀', '邀约成功'],
        paramss: {
          type: 1, //默认列表
          daterange: null, //日期范围
          status: null, //状态全责
        },
        tokenNew: '',
        detailId: null,
        lists: null, //商品id
        ascny: false,
        ascny1: true,
        meId: null,
        opMark: false
      }
    },
    mounted() {
      this.tokenNew = sessionStorage.getItem("Token")
      this.$nextTick(() => {
        this.commonAxios();
      })
    },
    methods: {
      commonAxios() {
        Indicator.open({
          text: 'Loading...',
          spinnerType: 'fading-circle'
        });
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/moveds",
          params: this.paramss,
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.tokenNew
          }
        }).then(res => {
          Indicator.close();
          console.log(res.data.data)
          this.listData = res.data.data;
          this.listData == "" ? this.ascny = true : this.ascny = false;
          this.listData == "" ? this.ascny1 = false : this.ascny1 = true;
          console.log(this.listData)
        }).catch(res => {
          Indicator.close();
          console.log(res)
        })
      },
      myLike(type) {
        this.paramss.type = type + 1;
        this.listData.length = 0
        this.commonAxios();
      },
      statusChange(type) {
        //				this.paramss.status = type - 1 + 1;
        //				this.listData.length = 0
        //				console.log(this.paramss.status)
        //				this.commonAxios();
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/moveds",
          params: {
            type: this.paramss.type,
            status: type - 1 + 1
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.tokenNew
          }
        }).then(res => {
          console.log(res.data.data)
          //					this.commonAxios();
          this.listData = res.data.data;
          this.listData == "" ? this.ascny = true : this.ascny = false;
          this.listData == "" ? this.ascny1 = false : this.ascny1 = true;

        })
      },
      timeChange(type) {
        //				this.paramss.daterange = type - 1 + 1;
        //				this.listData.length = 0
        //				this.commonAxios();
        this.$http({
          method: "get",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/moveds",
          params: {
            type: this.paramss.type,
            daterange: type - 1 + 1
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.tokenNew
          }
        }).then(res => {
          console.log(res.data.data)
          //					this.commonAxios();
          this.listData.length = 0
          this.listData = res.data.data;
          this.listData == "" ? this.ascny = true : this.ascny = false;
          this.listData == "" ? this.ascny1 = false : this.ascny1 = true;
        })
      },
      response(id, meId) { //应邀 生成订单
        this.alertMark = true;
        console.log(id)
        this.meId = meId
        this.$http({
          method: "post",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/order",
          data: {
            ordertype: 3,
            product_id: id,
            price: 0,
            total: 1
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          console.log(res);
          this.payId = res.data.data.id
          console.log(this.payId)
          this.alertMark = true;
        }).catch(res => {
          console.log(res);
        });
      },
      okFun() {
        var _this = this;
        this.$http({
          method: "post",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/order/pay",
          data: {
            id: _this.payId,
          },
          headers: {
            Authorization: "Bearer " + this.tokenNew
          }
        }).then(res => {
          console.log(res.data.data.id)
          console.log(res)
          this.$message.success({
            message: "您已经支付成功哦！",
            duration: 6000
          });
          _this.isCheck = false;
          _this.$router.push({
            path: '/eachOther',
            name: 'eachOther',
            params: {
              liker: _this.meId,
              type: this.paramss.type
            }
          });
        });
      },
      responses(id) { //应邀 生成订单
        this.$router.push({
          path: '/eachOther',
          name: "eachOther",
          params: {
            liker: id,
            type: this.paramss.type
          }
        });
      },
      responsess(id) {
        var that = this;
        that.$http({
          method: "put",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/movedto/" + id,
          data: {
            type: 2
          },
          headers: {
            Authorization: "Bearer " + that.tokenNew
          }
        }).then(res => {
          console.log(res)
        })
      },
      //对我心动详情
      goOption(status, id, sideId) {
        this.detailId = id;
        if (status == 0) {
          this.$router.push({
            path: '/personage', //拒绝  同意
            name: "personage",
            params: {
              id: this.detailId,
              sideId: sideId
            }
          });
        } else if (status == 1) {
          this.$router.push({
            path: '/personageOne',
            name: "personageOne",
            params: {
              id: this.detailId,
            }
          });
        } else {
          this.$router.push({
            path: '/personageThree',
            name: "personageThree",
            params: {
              id: this.detailId
            }
          });
        }
      },
      //我心动的详情
      goPersonage(status, id, meId) {
        if (status == 0) {
          this.$router.push({
            path: '/particulars',
            name: "particulars",
            params: {
              id: id
            }
          });
        } else if (status == 1) {
          this.$router.push({
            path: '/personageOne',
            name: "personageOne",
            params: {
              id: id,
              meId: meId
            }
          });
        } else {
          this.$router.push({
            path: '/personageTwo',
            name: "personageTwo",
            params: {
              id: id
            }
          });
        }
      },
      deleMark() {
        this.alertMark = false;
      },
      oppMark() {
        this.opMark = false;
      },
      okMark() {
        var that = this;
        that.$http({
          method: "put",
          url: "http://yinhan-media.weiyingjia.org/api/yinhan/movedto/" + localStorage.movid,
          data: {
            type: 2
          },
          headers: {
            Authorization: "Bearer " + that.tokenNew
          }
        }).then(res => {
          this.opMark = false;
          this.$message.success({
            message: "拒绝成功",
            duration: 6000
          });
          this.commonAxios();
          console.log(res)
        })
      },
      resp(id) {
        this.opMark = true;
        localStorage.movid = id
      }
    }
  }
</script>

<style>
  #meheartbeat {
    padding-bottom: 5rem;
  }

  #meheartbeat .main {
    padding: 0.2rem;
    width: 94.8%;
    margin: 0 auto;
    margin-top: 1rem;
    background: #F3F3F3;
    border-radius: 3px;
    color: #999999;
    display: flex;
    justify-content: space-between;
  }

  #meheartbeat .main button {
    width: 49.5%;
    padding: 0.8rem 0;
    border-radius: 3px;
    font-size: 1.14rem;
    color: #999999;
    letter-spacing: 0;
  }

  #meheartbeat .select {
    width: 85%;
    margin: 0 auto;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F5F5F5;
  }

  #meheartbeat .select span {
    text-align: center;
    display: block;
    width: 49.5%;
    padding: 0.3rem 0;
    color: #999999;
    font-size: 1.14rem;
  }

  #meheartbeat .figure {
    width: 94.7%;
    margin: 0 auto;
    margin-top: 1rem;
  }

  #meheartbeat .figureitem {
    display: flex;
    justify-content: space-around;
    background: #FFFFFF;
    box-shadow: 0 2px 9px 0 #EEEEEE;
    border-radius: 3px;
    margin-top: 1rem;
    padding-bottom: 1rem;
  }

  #meheartbeat .figureone {
    width: 5.5rem;
    height: 5.5rem;
    padding: 0.6rem;
  }

  #meheartbeat .figureone img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    object-fit: scale-down;
  }

  #meheartbeat .figuretwo {
    line-height: 2;
    margin-top: 1rem;
  }

  #meheartbeat .figuretwo p:nth-of-type(1) {
    font-size: 1.07rem;
  }

  #meheartbeat .figuretwo p:nth-of-type(1) span:nth-of-type(2) {
    margin-left: 1.2rem;
    color: #B674FD;
  }

  #meheartbeat .figuretwo p:nth-of-type(2) {
    font-size: 1rem;
    color: #666666;
  }

  #meheartbeat .figurethree button {
    width: 4.86rem;
    height: 2.57rem;
    background: #B674FD;
    box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.30);
    border-radius: 3px;
    color: white;
  }

  #meheartbeat .main .active {
    color: #B674FD;
    background: white;
  }

  #meheartbeat .select span {
    position: relative;
  }

  #meheartbeat .txt {
    width: 95%;
    position: absolute;
    bottom: -2rem;
    left: -1rem;
    padding: .3rem .5rem;
    display: flex;
    justify-content: space-around;
    font-size: 1rem;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 2px 4px 0 #EEEEEE;
    border-radius: 3px 0 0 0 3px 3px 3px;
    z-index: 999;
  }

  #meheartbeat .txtt {
    width: 130%;
    position: absolute;
    bottom: -2rem;
    left: -3rem;
    padding: .3rem .5rem;
    display: flex;
    justify-content: space-around;
    font-size: 1rem;
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 2px 4px 0 #EEEEEE;
    border-radius: 3px 0 0 0 3px 3px 3px;
    z-index: 999;
  }

  #meheartbeat .txt > span:hover {
    color: #B674FD;
  }

  #meheartbeat time img {
    width: 1.5rem;
    height: 0.7rem;
  }

  #meheartbeat .namee {
    width: 5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #meheartbeat .mess {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    color: #666;
    padding: 10rem 0;
  }

  #meheartbeat .mess > dt {
    width: 20%;
    margin: 0 auto;
  }

  #meheartbeat .mess > dt > img {
    width: 100%;
    max-width: 100%;
  }

  /* 弹出层 */

  #meheartbeat .mark {
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }

  #meheartbeat .mark_content {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 85%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-bottom: 2rem;
  }

  #meheartbeat .mark_content > h2 {
    position: relative;
    text-align: center;
    line-height: 4rem;
    font-size: 1.6rem;
    border-bottom: 1px solid #eeeeee;
  }

  #meheartbeat .mark_content > ul {
    padding: 1rem;
  }

  #meheartbeat .mark_content > ul > li {
    display: flex;
    line-height: 2.5rem;
  }

  #meheartbeat .dele {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  #meheartbeat .dele span {
    padding: 0.6rem 1.6rem;
    margin: 0 auto;
    display: block;
    background: #ffffff;
    border: 1px solid #b674fd;
    box-shadow: 0 2px 4px 0 rgba(182, 116, 253, 0.3);
    border-radius: 3px;
    font-size: 1.07rem;
    color: #b674fd;
  }
</style>
