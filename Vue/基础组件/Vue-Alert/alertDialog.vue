<template>
    <section class="tip">
        <article class="article">
            <h5>{{ title }} <span class="close" title="关闭" @click="close">X</span></h5>
            <div class="container"> <span><div class="el-message-box__status el-icon-information"></div></span> {{ message }}</div>
            <div v-if="type === 'info'">
                <button class="btn-primary" autofocus @click="confirm" @keyup.enter="confirm" name='info-confirm'>确定</button>
            </div>
            <div v-else>
                <button class="btn-primary" autofocus @click="confirm" @keyup.enter="confirm" name="confirm-confirm">确定</button>
                <button class="btn-primary" @click="cancle" name="confirm-cancle">取消</button>
            </div>
        </article>
    </section>
</template>

<script>
export default {
    data () {
        return {
            type: 'info',
            title: '提示',
            message: '',
            onConfirm: false,
            onCancle: false
        }
    },
    methods: {
        confirm () {
            this.hidden();
            if (typeof this.onConfirm === 'function') {
                this.onConfirm()
            }
        },
        cancle () {
            this.hidden();
            if (typeof this.onCancle === 'function') {
                this.onCancle()
            }
        },
        close () {
            this.hidden();  
        },
        hidden () {
            this.$el.style.display = 'none';
        }
    }
}
</script>

<style lang="scss" scoped>
.tip {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9998;
    background-color: rgba(100,100,100,.5);
}
.article {
    display: block;
    position: fixed;
    top: 30%;
    left: 35%;
    width: 450px;
    z-index: 9999;
    height: 200px;
    overflow: hidden;
    border: 1px solid #fff;
    border-radius: 4px;
    background-color: white;
    animation: show .7s ease;
    > h5 {
        padding-left: 20px;
        letter-spacing: 1px;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-weight: normal;
        border-bottom: 2px solid #20a0ff;
        background-color: #efefef;
        .close {
            display: inline;
            float: right;
            margin-right: 10px;
            color: #999;
            cursor: pointer;
            transform: scaleX(1.2);
        }
    }
    button {
        position: absolute;
        bottom: 5px;
        right: 14px;
        width: 20%;
        border-radius: 2px !important;
        background-color: #20a0ff !important;
        color: white !important;
        &:nth-child(1) {
            right: 26%;
        }
    }
    .container {
        padding-left: 50px;
        padding-right: 20px;
        margin: 20px;
        height: 70px;
        max-height: 70px !important;
        overflow: hidden;
        word-break: break-all;
        font-size: 15px;
        > span {
            display: inline-block;
            position: absolute;
            left: 30px;
            top: 100px;
        }
    }
}
@keyframes show {
    0% {
        top: 20%;
        opacity: .6;
    }
    100% {
        top: 30%;
        opacity: 1;
    }
}
@media screen and (max-width: 750px) {
    .article {
        width: 250px;
        left: 30%;
    }
}
</style>

