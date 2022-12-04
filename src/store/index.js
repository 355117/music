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
            console.log(cat, limit, offset);
            let result = await server.getGeDanImgList(cat, limit, offset);
            let data = [result.data.playlists, cat, limit, offset];
            commit("setGeDanImgList", data);
        },
    },
    modules: {},
});
