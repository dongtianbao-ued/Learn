/**
 * Created by admin on 2017/8/19.
 */
//入口文件统一归入
//var react=require('react');
import React from "react";//引入node_modules模块hello.js,输出React对象
import { render } from "react-dom";//引入dom加载模块
import { AppContainer } from "react-hot-loader";//引入热更新模块
import Root from "./root.js";//引入自定义模块hello.js,输出Hello对象
//console.log(1,React.version);
render(
    <AppContainer><Root/></AppContainer>,
    document.getElementById("root")
)
if(module.hot){
    module.hot.accept("./root",()=>{
        const NewRoot=require("./root").default;
        render(
            <AppContainer><NewRoot/></AppContainer>,
            document.getElementById("root")
        )

    })
}
