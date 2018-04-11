<template>
    <div>
        <div class="newfooter fixed-bottom" data-style="fixed-bottom" v-if="version==1">
            <!--在li中添加active类名可以改变图标和字体颜色-->
            <ul>
                <router-link :to="{name: 'Index'}" class="foot-home">
                    <li :class="{'active':active==='home'}">
                        <span class="i_home">首页</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'nearlist'}" class="foot-home">
                    <li :class="{'active':active==='near'}">
                        <span class="i_near">附近柜机</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'cartList'}" class="foot-home">
                    <li :class="{'active':active==='buycar'}">
                        <span class="i_car">购物车</span>
                    </li>
                </router-link>
                <router-link :to="{name: 'mycenter'}" class="foot-home">
                    <li :class="{'active':active==='my'}">
                        <span class="i_my">我的</span>
                        <span class="i_redDot" v-if="!isMemberRead"></span>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isMemberRead: true,
                version:1,
            }
        },
        props: ['active'],
        methods: {}
    }
</script>


<style scoped>
/*新版M站底部*/
.newfooter{float:left; width:100%;border-top:1px solid #e8e8e8; background:#fcfcfc; font-size:.22rem; text-align:center; z-index:20;line-height: 0rem !important;}
.newfooter ul li{float:left; padding:0; margin:0; border:0;width:25% !important; font-weight:normal !important;position: relative; color:#5f646e;}
.newfooter ul li a{color:#5f646e; display:inline-block; width:100%;}
.newfooter ul li span{ display: block;line-height: .42rem;padding-top: .52rem;}
.newfooter ul .active{color: #f75e46;}
.newfooter ul li .i_home{background: url('~images/Icon/m_home.png') no-repeat center .1rem ; background-size: .47rem;}
.newfooter ul .active .i_home{background: url(~images/Icon/mred_home.png) no-repeat center .1rem ; background-size: .47rem; }
.newfooter ul li .i_near{background: url(~images/Icon/m_near.png) no-repeat center .1rem ; background-size: .47rem;}
.newfooter ul .active .i_near{background: url(~images/Icon/mred_near.png) no-repeat center .1rem ; background-size: .47rem; }
.newfooter ul li .i_car{background: url(~images/Icon/m_car.png) no-repeat center .1rem ; background-size: .47rem;}
.newfooter ul .active .i_car{background: url(~images/Icon/mred_car.png) no-repeat center .1rem ; background-size: .47rem; }
.newfooter ul li .i_my{background: url(~images/Icon/m_my.png) no-repeat center .1rem ; background-size: .47rem;}
.newfooter ul .active .i_my{background: url(~images/Icon/mred_my.png) no-repeat center .1rem ; background-size: .47rem; }

.newfooter .tsme{display:none; top: .05rem;left: 55%;border: 1px solid #fff;position:absolute;font-size:.2rem;line-height:.3rem;color:#fff; text-align:center; white-space:nowrap; vertical-align:baseline; background-color:#f75e46; border-radius:2em;width: .3rem;}
.newfooter ul li .i_redDot {display: inline-block;width: 0.18rem;height: 0.18rem;background: #f75e46;border-radius: 100%;position: absolute;top: 0.1rem;left:61%; padding-top:0;}


</style>
