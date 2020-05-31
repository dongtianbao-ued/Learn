/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import "./header.less";
import { browserHistory } from "react-router";
let path="/";
let Header=React.createClass({
        getInitialState(){
            return {
                path:"/"
            }
        },
        //设置初始化数据
        loadPlayer(path){
            if(path=="/"){this.setState({path:'/list'})}
            else{this.setState({path:'/'})}
            browserHistory.push(path);
        },
    render(){
        return (
            <div className="components-header row">
            <img src="static/images/logo.png" width="40" alt="" className="-col-auto"/>
                <h1 className="caption">React Music Player</h1>
                <h3 onClick={this.loadPlayer.bind(this,this.state.path)}>切换页面</h3>
            </div>
        )
    }
});
export default Header;