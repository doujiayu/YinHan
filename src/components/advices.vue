<template>
    <div id="advices">
        <div class="main">
            <div class="top">
                有人向您打了招呼
            </div>
            <div class="content" v-for="item in optData">
                <img :src="item.sender_img" />
                <div class="content_item">
                    <p>{{item.sender_name}}</p>
                    <p>
                        <span>{{item.sender_age}}岁</span>
                        <span>170cm</span>
                    </p>
                </div>
                <p style="font-size: 0.93rem;color: #666666;line-height: 2.2;">{{item.sender_address}}</p>
            </div>
        </div>
        <div class="mark" v-show='check'>
            <div class="wrap" :class='check?"dot":""'>
                <img src="../../static/img/guang.png" alt="" />
                <div class="con">
                    <img src="../../static/img/hua.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import { Indicator } from 'mint-ui';
    export default {
        name: "advices",
        data() {
            return {
                check: true,
                adviceId: "",
                tokenNew: "",
                optData: []
            }
        },
        created() {
            this.adviceId = this.$route.params.id;
            this.tokenNew = sessionStorage.getItem("Token");
            this.opt();
            console.log(this.adviceId)
            this.common();
        },
        updated() {
            window.scroll(0, 0);
        },
        methods: {
            opt() {
	        	Indicator.open({
				  text: 'Loading...',
				  spinnerType: 'fading-circle'
				});
                this.$http({
                    method: "get",
                    url: "http://yinhan-media.weiyingjia.org/api/yinhan/message/" + this.adviceId,
                    headers: {
                        "Authorization": "Bearer " + this.tokenNew
                    }
                }).then(res => {
                    console.log(res)
					Indicator.close();                    
                    this.optData = res.data.data;
                }).catch(res => {
                	Indicator.close();
                    console.log(res)
                })
            },
            common() {
                setInterval(() => {
                    this.check = false;
                }, 3000);
            }
        }
    }
</script>

<style>
    #advices .mark {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 1);
        width: 100%;
        height: 100%;
        z-index: 999;
        overflow: hidden;
    }

    #advices .wrap {
        position: relative;
        width: 100%;
        display: flex;
        margin: 40% auto;
        overflow: hidden;
    }

    #advices .wrap>img {
        width: 100%;
        height: 80%;
        display: block;
        opacity: 1;
    }

    #advices .con {
        position: absolute;
        left: 0rem;
        bottom: 1rem;
    }

    #advices .con>img {
        width: 100%;
        height: auto;
        /*transform: rotate(80deg);
		transition: transform 4s ease-out;  */
    }

    #advices .head {
        width: 100%;
        padding-bottom: 0.1rem;
        box-shadow: 0 2px 4px 0 #F7F7F7;
    }

    #advices .dot {
        /*margin: 150px auto;*/
        /*width: 200px;
		height: 200px;*/
        -webkit-animation-name: 'ripple';
        /*动画属性名，也就是我们前面keyframes定义的动画名*/
        -webkit-animation-duration: 3s;
        /*动画持续时间*/
        -webkit-animation-timing-function: ease;
        /*动画频率，和transition-timing-function是一样的*/
        -webkit-animation-delay: 0s;
        /*动画延迟时间*/
        -webkit-animation-iteration-count: infinite;
        /*定义循环资料，infinite为无限次*/
        -webkit-animation-direction: alternate;
        /*定义动画方式*/
    }

    @keyframes ripple {
        0% {
            width: 30%;
            height: auto;
        }
        100% {
            width: 80%;
            height: auto;
        }
    }

    #advices .bottom {
        font-size: 1.15rem;
        color: #333333;
        letter-spacing: 0;
        margin-bottom: 0.5rem;
    }

    #advices .bottom a {
        background: url(../../static/img/retreat.png) 1rem 0.5rem no-repeat;
        padding: 0.3rem 1.2rem;
        background-size: 0.8rem;
    }

    #advices .bottom font {
        display: inline-block;
        padding: 0.45rem 0;
    }

    #advices .main {
        width: 79.8%;
        margin: 0 auto;
        margin-top: 3rem;
        /*padding: 5rem 0;*/
        background: #FFFFFF;
        box-shadow: 0 2px 4px 1px rgba(182, 116, 253, 0.20);
        border-radius: 3px;
    }

    #advices .top {
        width: 100%;
        text-align: center;
        padding: 1rem 0;
        font-size: 1.14rem;
        color: #333333;
    }

    #advices .content {
        display: flex;
        justify-content: space-around;
        box-shadow: 0 2px 3px 3px #F7F7F7;
        border-radius: 3px;
        padding: 0.8rem 0;
    }

    #advices .content_item {
        display: flex;
        flex-direction: column;
        line-height: 2.2;
        margin-left: -1.5rem;
    }

    #advices .content_item p:nth-of-type(1) {
        font-size: 1.07rem;
    }

    #advices .content_item p:nth-of-type(2) {
        font-size: 1.07rem;
        color: #B674FD;
        letter-spacing: 0;
    }

    #advices .content_item p:nth-of-type(2) span:nth-of-type(2) {
        padding: 0 0.2rem;
        border: 1px solid #B674FD;
        border-radius: 3px;
        margin-left: 0.7rem;
    }
</style>
