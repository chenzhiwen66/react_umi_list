import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
  ],
  npmClient: 'yarn',
  alias: {
    '@': 'src', // 将@路径指向src目录
  },
  // compilerOptions: {
  //   "paths": {
  //     "@/*": ["src/*"],
  //   },
  // },
  plugins: ['@umijs/plugins/dist/dva'],
  dva:{}
  // layout:false,
});
