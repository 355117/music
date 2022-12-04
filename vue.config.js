let path = require("path");
const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            "/api": {
                target: "http://124.222.23.222:3000",
                pathRewrite: { "^/api": "" },
                ws: true,
                changeOrigin: true,
            },
        },
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
});
