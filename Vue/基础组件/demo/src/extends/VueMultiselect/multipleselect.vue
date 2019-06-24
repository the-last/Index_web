<<template>
    <section class="container">
        <header>
            <span>未选项 (单击选中)</span>
            <span>已选项</span>
        </header>
        <article class="multiselect">
            <div class="select-left">
                <button v-for="item in candidatesA"
                    :key="item.id"
                    :data-val="item.id"
                    @click.prevent="selectItem">
                    {{ item.name }}
                </button>
            </div>
            <div class="select-right" v-if="editAble" oncontextmenu="doNothing()">
                <button v-for="(item,index) in selectedorganize"
                    :key="index"
                    :data-val="item.id"
                    :title="anchorspeers"
                    @mouseenter="getp(item.id)"
                    @mouseleave="canclep(item.id)"
                    oncontextmenu="false"
                    @dblclick="'return false'"
                    @click.stop.prevent="cancleClk"
                    @mousedown="editAnchorPeer">
                    {{ item.name }}
                </button>
            </div>
            <div class="select-right" v-else oncontextmenu="doNothing()">
                <button v-for="item in selectedorganize"
                    :key="item.id"
                    :data-val="item.id"
                    @click.right.stop.prevent="'return false'"
                    @dbclick.stop.prevent="'return false'"
                    @click.left.stop.prevent="cancleClk">
                    {{ item.name }}
                </button>
            </div>
        </article>
        <div class="select-middle">
            <span class="btn-switch" title="全选" @click.stop.prevent="selectItemAll">&gt;&gt;</span>
            <span class="btn-switch-b" title="清除" @click.left.stop.prevent="revocationItemAll">&lt;&lt;</span>
        </div>
        <template v-if="isEditDialog">
            <form>
                <div style="color: rgb(32, 160, 255);font-size: 15px;">
                    添加 anchor peer
                    <span style="float: right;" @click.stop.prevent="addPeer">
                        <el-button type="primary" style="background-color:#20a0ff;color:white;">添加</el-button>
                    </span>
                </div>
                <div class="peers">
                    <div v-for="(item,key) in peerGroup" :key="key">
                        <input type="text" v-model="item.value">
                        <b class="pull" @click="removePeer(key)"><icon name="times"></icon></b>
                    </div>
                </div>
                <div style="position: absolute; bottom: -12px;right: 0px;">
                    <span @click="confirmPerr"><el-button type="primary" style="background-color:#20a0ff;color:white;">确定</el-button></span>
                    <span @click="cancle"><el-button type="primary" style="background-color:#20a0ff;color:white;">取消</el-button></span>
                </div>
            </form>
        </template>
    </section>
</template>

<script>
export default {

    props: {
        editAble: Boolean,
        candidates: {
            type: Object,
            default: function () {
                return {
                    left: [],
                    right: []
                }
            }
        }
    },
    
    data () {
        return {
            candidatesA: [],
            peerGroup: [],
            selectedorganize: [],
            isEditDialog: false,
            peerObject: {
                name: null,
                id: null,
                anchor_peers: []
            },
            rightEditArray: [],
            anchorspeers: null,
            selectedIndex: null,
            selectedName: null,
            selectedId: null,
            child: this.candidates,
            flag: 0
        }
    },
    computed: {
        // this.candidatesA = []
    },
    mounted () {
        this.candidatesA = [];
        setTimeout(() => {
            let contents = this.child.left;
            let selected = this.child.right;
            if (contents && contents.length !== 0) {
                if (selected && selected.length) {
                    this.rightEditArray = selected;
                    selected.forEach(function (v,ix,a) {
                        this.selectedorganize.push(v)
                        for (let i=0; i<contents.length; i++ ) {
                            if (contents[i].id === v.id) {
                                contents.splice(i, 1)
                            }
                        }
                    }, this);
                    if (this.rightEditArray.length) {
                        this.candidatesA = contents;
                        this.candidatesA.sort(this.compare('name'));
                    }
                } else {
                    this.candidatesA = contents;
                    this.candidatesA.sort(this.compare('name'));
                }
            }
        }, 300);
    },
    methods: {
        getp (id) {
            console.log('hover getp', id);
            if (this.rightEditArray) {
                this.rightEditArray.forEach(function (v,i,a) {
                    if (id === v.id) {
                        if (a[i].anchor_peers) {
                            this.anchorspeers = a[i].anchor_peers.toString();
                        }
                    }
                }, this);
            };
        },
        canclep (id) {
            this.anchorspeers = ' ';
        },
        addPeer () {
            let peerObj = {
                value: null
            };
            this.peerGroup.push(peerObj);
        },
        removePeer (val) {
            let index;
            this.peerGroup.forEach(function (v,i,a) {
                if (i == val) {
                    index = i;
                }
            }, this);
            this.peerGroup.splice(index,1);
        },
        confirmPerr () {
            this.peerGroup.forEach(function (v,i,a) {
                if (v.value) {
                    this.peerObject.anchor_peers.push(v.value);
                }
            }, this);
            this.peerObject.name = this.selectedName;
            this.peerObject.id = this.selectedId;

            if (!isNaN(this.selectedIndex)) {
                let idx = this.selectedIndex;
                this.selectedorganize.splice(idx, 1, this.peerObject);
                this.rightEditArray.splice(idx, 1, this.peerObject);
                this.peerGroup.length = 0;
                
                this.peerObject = {
                    name: null,
                    id: null,
                    anchor_peers: []
                };
                this.isEditDialog = false;
            }
        },
        cancle () {
            this.isEditDialog = false;
            if (this.peerGroup) {
                this.peerGroup.splice(parseInt('0'),this.peerGroup.length);
            }
        },
        selectItem (e) {
            let aimVal = parseInt(e.target.dataset.val);
            let leftArr = this.candidatesA;
            let aimIndex;
            if (aimVal) {
                for (let j=0; j<leftArr.length; j++) {
                    if (leftArr[j].id === aimVal) {
                        aimIndex = j;
                    }
                }
            }
            
            let select_anchor_peer_obj = {};
            select_anchor_peer_obj.id = leftArr[aimIndex].id;
            select_anchor_peer_obj.name = leftArr[aimIndex].name;
            this.selectedorganize.push(select_anchor_peer_obj);
            this.candidatesA.splice(aimIndex, 1);
            this.selectedorganize.sort(this.compare('name'));
        },
        cancleClk (e) {
            // console.log(e);
            let number = e.button;
            let aimVal = e.target.dataset.val;
            if (number === parseInt('0')) {
                let rightArr = this.selectedorganize;
                let aimIndex
                for (let i=0; i<rightArr.length; i++) {
                    if (rightArr[i].id === parseInt(aimVal)) {
                        aimIndex = i;
                        break;
                    }
                }
                let cancle_anchor_peer_obj = {};
                cancle_anchor_peer_obj.id = rightArr[aimIndex].id;
                cancle_anchor_peer_obj.name = rightArr[aimIndex].name;
                
                if (this.selectedorganize[aimIndex].anchor_peers) {
                    let cur_length = this.selectedorganize[aimIndex].anchor_peers.length;
                    this.selectedorganize[aimIndex].anchor_peers.splice(0, cur_length);
                }

                this.candidatesA.push(cancle_anchor_peer_obj);
                this.candidatesA.sort(this.compare('name'));
                this.selectedorganize.splice(aimIndex, 1);
            }
        },
        editAnchorPeer (e) {
            let number = e.button;
            let aimVal = e.target.dataset.val;
            if (number === parseInt('2')) {
                this.isEditDialog = true;
                let aimId = parseInt(aimVal);
                this.selectedId = aimId;
                let newItem = [];

                let isSelected = function(element) {
                    return element.id==aimId;
                }
                
                if (this.selectedorganize) {
                    newItem = this.selectedorganize.filter(function(item){
                        return item.id===aimId;
                    });
                    this.selectedName = newItem[0].name;
                    this.selectedIndex = this.selectedorganize.findIndex(isSelected)
                }
                
                if (newItem[0].anchor_peers) {
                    this.peerGroup = newItem[0].anchor_peers.map(function (item) {
                        let peersGroupObj = {
                            value: item
                        };
                        return peersGroupObj
                    });
                    newItem = [];
                }
                
            }
        },
        selectItemAll () {
            this.candidatesA.forEach(function(element) {
                this.selectedorganize.push(element);
            }, this);
            this.selectedorganize.sort(this.compare('name'));
            this.candidatesA.splice(parseInt('0'), this.candidatesA.length);
        },
        revocationItemAll () {
            this.selectedorganize.forEach(function(element) {
                this.candidatesA.push(element);
            }, this);
            this.candidatesA.sort(this.compare('name'));
            this.selectedorganize.splice(parseInt('0'), this.selectedorganize.length);
        },
        compare (prop) {
            return function (obj1, obj2) {
                let val1 = obj1[prop];
                let val2 = obj2[prop];
                if (typeof val1 === 'string') {
                    val1 = val1.charAt(0).charCodeAt();
                }
                if (typeof val2 === 'string') {
                    val2 = val2.charAt(0).charCodeAt();
                }
                return val1 - val2;
            }
        }
    },
    watch: {
        'child.left' (data) {
            this.flag += 1;
            setTimeout(() => {
                this.candidatesA = data;
            }, 400);

            if (this.flag === 2) {
                this.selectedorganize = [];
                console.log('left changed');
            }
            
            setTimeout(() => {
                this.flag = 0;
            }, 100);
        },
        'selectedorganize' () {
            this.$emit('input', this.selectedorganize);
            console.log('结果: ', this.selectedorganize);
        }
    }
}
</script>


<style lang="scss" scoped>
$border: 1px solid rgba(200,200,200,.9);
form {
    display: block;
    position: absolute;
    top: 50px;
    left: 500px;
    border-radius: 3px;
    border: 1px solid rgb(32, 160, 255);
    z-index: 200;
    width: 300px;
    height: 250px;
    background-color: white;
    font-size: 14px;
    line-height: 2;
    text-align: left;
    max-height: 250px;
    padding: 10px;
    .peers {
        border: $border;
        text-align: left;
        display: block;
        box-sizing: border-box;
        overflow-y: auto;
        height: 80%;
        padding: 10px 0 0 10px;
    }
    .pull {
        display: inline-block;
        vertical-align: sub;
        cursor: pointer;
    }
    span {
        display: inline-block;
        cursor: pointer;
        .el-button--primary {
           font-size: .88rem;
        }
        &:after {
            display: block;
            content: '0';
            height: 0;
            width: 0;
            font-size: 0;
            overflow: hidden;
            clear: both;
        }
    }
}
.container {
    display: block;
    // width: 100%;
    // max-width: 470px;
    height: 100%;
    position: relative;
    > header {
        display: flex;
        flex-direction: row;
        border-right: $border;
        border-left: $border;
        border-top: $border;
        border-radius: 2px 2px 0 0;
        background-color: #4f5358;
        color: white;
        > span {
            flex: 1;
            text-align: center;
            color: 14px;
            height: 30px;
            line-height: 30px;
        }
    }
}
.multiselect {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 84%;
    border-radius: 0 0 2px 2px;
    border: $border;
    align-items: top;
    background-color: white;
}

.select-left {
    flex: 2;
    margin-right: 15%;
    overflow-y: auto;
    height: auto;
    padding: .5rem 0 .5rem .5rem;
}
.select-middle {
    display: block;
    width: 20%;
    height: 85%;
    position: absolute;
    left: 40%;
    top: 31px;
    border-left: $border;
    border-right: $border;
    .btn-switch {
        display: block;
        margin: 50% auto 0px;
        height: 30px;
        line-height: 30px;
        width: 30px;
        text-align: center;
        cursor: pointer;
        font-weight: bold;
        transform: scale(1.2);
    }
    .btn-switch-b {
        @extend .btn-switch;
        margin: 0px auto 40%;
    }
}
.select-right {
    flex: 2;
    margin-left: 25px;
    margin-right: .5rem;
    overflow-y: auto;
    padding: .5rem 0 .5rem 1rem;
    > button {
        position: relative;
        padding: 0px;
    }
}

button {
    display: block;
    padding: 0 .5rem;
    margin-bottom: .2rem;
    border: 0px;
    width: 100%;
    cursor: pointer;
    line-height: 1.5;
    background-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
}
</style>


