/**
 * Created by admin on 2017/8/19.
 */
//����ļ�ͳһ����
//var react=require('react');
import React from "react";//����node_modulesģ��hello.js,���React����
import { render } from "react-dom";//����dom����ģ��
import { AppContainer } from "react-hot-loader";//�����ȸ���ģ��
import Root from "./root.js";//�����Զ���ģ��hello.js,���Hello����
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
