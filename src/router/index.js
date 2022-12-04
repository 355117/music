import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/Home.vue"),
        children: [
            {
                path: "/",
                name: "FindMusic",
                component: () =>
                    import(
                        /* webpackChunkName: "about" */ "@/views/FindMusic/FindMusic.vue"
                    ),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
