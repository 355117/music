import { createStore } from "vuex";
import * as server from "../server/index.js";
export default createStore({
    state: {
        banner: [],
        tuiJianGeDanList: [],
        hotGeDanType: [],
        AllGeDanType: {},
        geDanImgLists: [],
        //发现音乐歌单  类型，每页数量，页数
        offset: {
            cat: "全部",
            limit: 25,
            offset: 1,
        },
        //歌手列表  类型，字母索引，每页数量，页数
        geShou: {
            area: -1,
            type: -1,
            initial: -1,
            offset: 0,
            limit: 25,
            areaIndex: 0,
            typeIndex: 0,
            initialIndex: 0,
            more: false, //判断是不是加载更多决定是覆盖还是追加数组
        },
        geShouList: [],
        //排行榜
        topList: [],
    },
    getters: {},
    mutations: {
        setBanner(state, payload) {
            state.banner = payload;
        },
        setTuiJianGeDanList(state, payload) {
            state.tuiJianGeDanList = payload;
        },
        setHotGeDanType(state, payload) {
            state.hotGeDanType = payload;
        },
        getAllGeDanType(state, payload) {
            state.AllGeDanType = payload;
        },
        setGeDanImgList(state, payload) {
            state.geDanImgLists = payload[0];
            state.offset.cat = payload[1];
            state.offset.limit = payload[2];
            state.offset.offset = payload[3];
        },
        setTopList(state, payload) {
            state.topList = payload;
        },
        setGeShouList(state, payload) {
            //页面内点击切换，给的是某一项数据，对象length的typeof是undefined，数组为number
            if (typeof payload.length == "undefined") {
                state.geShou[payload.type] = payload.value;
            } else {
                //给的全部数据
                // console.log(payload[9]);
                payload[9]
                    ? state.geShouList.push(...payload[0])
                    : (state.geShouList = payload[0]);
                state.geShou.area = payload[1];
                state.geShou.type = payload[2];
                state.geShou.initial = payload[3];
                state.geShou.offset = payload[4];
                state.geShou.limit = payload[5];
                state.geShou.areaIndex = payload[6];
                state.geShou.typeIndex = payload[7];
                state.geShou.initialIndex = payload[8];
            }
        },
    },
    actions: {
        async getBanner({ commit }) {
            let result = await server.getBanner();
            commit("setBanner", result.data.banners);
        },
        async getTuiJianGeDanList({ commit }) {
            let result = await server.getTuiJianGeDanList();
            commit("setTuiJianGeDanList", result.data.result);
        },
        async getHotGeDanType({ commit }) {
            let result = await server.getHotGeDanType();
            commit("setHotGeDanType", result.data.tags);
        },
        async getAllGeDanType({ commit }) {
            let result = await server.getAllGeDanType();
            commit("getAllGeDanType", result.data);
        },
        async getGeDanImgList(
            { commit, state },
            {
                cat = state.offset.cat,
                limit = state.offset.limit,
                offset = state.offset.offset,
            }
        ) {
            let result = await server.getGeDanImgList(cat, limit, offset);
            let data = [result.data.playlists, cat, limit, offset];
            commit("setGeDanImgList", data);
        },
        async getTopList({ commit }) {
            let result = await server.getTopList();
            let list_1 = result.data.list.slice(0, 4);
            let list_2 = result.data.list.slice(4);
            let list = [list_1, list_2];
            commit("setTopList", list);
        },
        async getGeShouList(
            { commit, state },
            {
                area = state.geShou.area,
                type = state.geShou.type,
                initial = state.geShou.initial,
                offset = state.geShou.offset,
                limit = state.geShou.limit,
                areaIndex = state.geShou.areaIndex,
                typeIndex = state.geShou.typeIndex,
                initialIndex = state.geShou.initialIndex,
                more = state.geShou.more,
            }
        ) {
            console.log(area, type, initial, offset, limit);
            let result = await server.getGeShouList(
                area,
                type,
                initial,
                offset,
                limit
            );
            console.log(result);
            let data = [
                result.data.artists,
                area,
                type,
                initial,
                offset,
                limit,
                areaIndex,
                typeIndex,
                initialIndex,
                more,
            ];
            commit("setGeShouList", data);
        },
    },
    modules: {},
});
