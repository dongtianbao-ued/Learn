/**
 * Created by admin on 2017/8/20.
 */
//������ģ�����ձ�����ļ�index.js����
import React from "react";
import "./progress.less";
let Progress=React.createClass({
        getDefaultProps(){
            return {
                barColor:"#2f9842"
            }
        },
        changeProgress(e){
            //��ȡref��Ӧ����������Ӧ��Ԫ�ؽڵ�this.refs.ref��Ӧ��ֵ����Ԫ�ؽڵ���в���
            let progressBar=this.refs.progressBar;
            //��ȡ�����֮��ռ������Ԫ�صİٷֱ�
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