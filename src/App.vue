<template>
    <div class="app">
        <div class="top">
            <div class="top_left">
                <el-image class="top_left_1" :src="logoImg" />
                <div class="top_left_2">
                    <div class="top_left_2_1">＞</div>
                    <div class="top_left_2_2">＜</div>
                </div>
                <div class="top_left_3">
                    <el-input
                        v-model="searchText"
                        class="w-50 m-2"
                        placeholder="请输入内容"
                        :prefix-icon="Search"
                    />
                </div>
            </div>
            <div class="top_right">
                <div class="photo">
                    <el-image style="height: 5vw" :src="photo" fit="cover" />
                </div>
                <div class="dengLu">点击头像登录</div>
            </div>
        </div>
        <div class="bottom">
            <div class="left" @click="change($event)">
                <div
                    class="left_1"
                    :class="[activeIndex == 1 ? 'left_1_active' : '']"
                >
                    <div class="left_1_1">
                        <el-icon size="2vw">
                            <View />
                        </el-icon>
                    </div>
                    <div class="left_1_2">发现音乐</div>
                </div>
                <div
                    class="left_1"
                    :class="[activeIndex == 2 ? 'left_1_active' : '']"
                >
                    <div class="left_1_1">
                        <el-icon size="2vw">
                            <VideoCamera />
                        </el-icon>
                    </div>
                    <div class="left_1_2">MV视频</div>
                </div>
                <div
                    class="left_1"
                    :class="[activeIndex == 3 ? 'left_1_active' : '']"
                >
                    <div class="left_1_1">
                        <el-icon size="2vw">
                            <Finished />
                        </el-icon>
                    </div>
                    <div class="left_1_2">每日推荐</div>
                </div>
                <div
                    class="left_1"
                    :class="[activeIndex == 4 ? 'left_1_active' : '']"
                >
                    <div class="left_1_1">
                        <el-icon size="2vw">
                            <User />
                        </el-icon>
                    </div>
                    <div class="left_1_2">我的音乐</div>
                </div>
            </div>
            <div class="right">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search, User } from "@element-plus/icons-vue";
import { ref } from "vue";
const logoImg = ref(require("./static/logo.png"));
const photo = ref(require("./static/long.webp"));
let searchText = ref("");
let activeIndex = ref("1");
let title = {
    发现音乐: 1,
    MV视频: 2,
    每日推荐: 3,
    我的音乐: 4,
};
function change(e) {
    activeIndex.value = title[e.target.textContent];
}
</script>

<style lang="less" scoped>
.app {
    width: 100vw;
    height: 100vh;
    background-color: rgb(200, 191, 14);
    overflow: hidden;
    .top {
        height: 9vh;
        width: inherit;
        background-color: #ec4141;
        display: flex;
        justify-content: space-between;
        .top_left {
            width: 80vw;
            height: 100%;
            display: flex;
            .top_left_1 {
                width: 15%;
                margin-left: 1vw;
                height: 100%;
            }
            .top_left_2 {
                color: white;
                width: 15%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .top_left_2_1 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20%;
                    height: 50%;
                    border-radius: 200vw;
                    margin-right: 1.5vw;
                    background-color: rgba(225, 62, 62, 1);
                }
                .top_left_2_2 {
                    display: flex;
                    border-radius: 200vw;
                    justify-content: center;
                    align-items: center;
                    width: 20%;
                    height: 50%;
                    background-color: rgba(225, 62, 62, 1);
                }
            }
            .top_left_3 {
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                /deep/ .el-input__wrapper {
                    background-color: #e13e3e !important;
                    height: 5vh;
                    width: 2vw;
                }
                /deep/ .el-input {
                    --el-input-border-color: #ec4141;
                    --el-input-text-color: white;
                }
                /deep/ .el-input__inner {
                    font-size: 1vw;
                }
            }
        }
        .top_right {
            margin-right: -2vw;
            color: white;
            display: flex;
            align-items: center;
            width: 20vw;
            height: 100%;
            .photo {
                margin-right: 0.5vw;
                background-color: rgb(0, 255, 132);
                border-radius: 200vw;
                width: 5vw;
                height: 5vw;
                overflow: hidden;
            }
        }
    }
    .bottom {
        height: 91vh;
        display: flex;
        .left {
            width: 12vw;
            background-color: rgb(255, 0, 0);
            cursor: pointer;
            .left_1 {
                display: flex;
                align-items: center;
                width: 100%;
                height: 8vh;
                background-color: rgb(203, 26, 26);
                .left_1_1 {
                    margin-left: 1vw;
                    color: white;
                }
                .left_1_2 {
                    font-size: 1.5vw;
                    margin-left: 0.5vw;
                    color: white;
                }
            }
            .left_1:hover {
                background-color: rgba(64, 142, 232, 0.6);
            }
            .left_1_active {
                background-image: linear-gradient(
                    135deg,
                    #81ffef 10%,
                    #f067b4 100%
                );
            }
        }

        .right {
            width: 88vw;
            background-color: rgb(0, 0, 255);
        }
    }
}
</style>
