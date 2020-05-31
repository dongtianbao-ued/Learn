/**
 * Created by admin on 2017/8/20.
 */
//进度条模块最终被入口文件index.js引用
import React from "react";
import "./progress.less";
let Progress=React.createClass({
        getDefaultProps(){
            return {
                barColor:"#2f9842"
            }
        },
        changeProgress(e){
            //获取ref对应的属性名对应的元素节点this.refs.ref对应的值，对元素节点进行操作
            let progressBar=this.refs.progressBar;
            //获取鼠标点击之后占整个父元素的百分比
            let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
            this.props.onProgressChange && this.props.onProgressChange(progress);
        },
       render(){
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
            <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}} ></div>
            </div>
    )
    }
});
export default Progress;