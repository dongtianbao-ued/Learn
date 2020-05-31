/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import Progress from "../components/progress";
import "./player.less";
import Pubsub from "pubsub-js";
import { PLAY_STYLE } from "./playStyle.js";
import { Link } from "react-router";
let duration=null;
let Player=React.createClass({
//设置初始化数据
    getInitialState(){
        return {
            progress:0,
            volume:0,
            isPlay:true,
            leftTime:"",
            playStyle:PLAY_STYLE[0]
        }
    },
    componentDidMount(){
        $("#player").bind($.jPlayer.event.timeupdate,(e)=>{
            duration=e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume*100,
                progress:e.jPlayer.status.currentPercentAbsolute,
                leftTime:this.formaTime(duration *(1-e.jPlayer.status.currentPercentAbsolute/100))
            });

        });
    },
//生命在周期组件销毁之后,执行，即关闭页面，不再占用内存，释放内存，取消绑定事件，避免再次打开页面时重复绑定事件
    componentWillUnmount(){
        $("#player").unbind($.jPlayer.event.timeupdate);
    },
//创建方法，完成子向父的通信
        changeProgressHandler(progress){
    console.log("from root widget",progress);
    $("#player").jPlayer("play",duration * progress)
},
//渲染整个页面，页面加载结构.生成dom节点后，再次渲染整个页面，改变progress初始化数据，并将数据统一封装到this.state对象中，可用对应的获取熟悉值，父组件向子组件的通信采用this.props.自定义属性名,改变数据采用this.setState(k,v);获取数据采用this.state.属性名
    changeVolumeHandler(progress){
        console.log("from root widget",progress);
        $("#player").jPlayer("volume",progress)
    },
        isPlay(){
            if(this.state.isPlay){$("#player").jPlayer("pause")}
            else{$("#player").jPlayer("play")}

            this.setState({
                isPlay: !this.state.isPlay
                })
        },
        playPrev(){
            Pubsub.publish("PLAY_PREV");
        },
        playNext(){
            Pubsub.publish("PLAY_NEXT");
        },
        playStyle(){
            //先找到当前对应的下标
         var index=PLAY_STYLE.indexOf(this.state.playStyle);
            console.log(index);
         var newIndex=(index+1)% PLAY_STYLE.length;
            console.log(newIndex);
            this.setState({
                playStyle:PLAY_STYLE[newIndex]
            });
            this.playStyleCss(newIndex);
            //console.log(this.state.playStyle);

        },
        changeRepeat() {
            PubSub.publish('CHANAGE_REPEAT');
        },
        formaTime(time){
            time=Math.floor(time);
            let minutes=Math.floor(time/60);
            let seconds=Math.floor(time%60);
            seconds=seconds < 10?`0${seconds}`:seconds;
            return `${minutes}:${seconds}`;
        },
render(){
    return (
        <div className="player-page">
        <h1 className="caption"><Link  to="/list" >我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
        <div className="controll-wrapper">
        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
        <div className="row mt20">
        <div className="left-time -col-auto">{this.state.leftTime}</div>
        <div className="volume-container">
        <i className="icon-volume rt" style={{top: 5, left: -5}}></i>
        <div className="volume-wrapper">
           <Progress
            progress={this.state.volume}
            onProgressChange={this.changeVolumeHandler}
            barColor='#aaa'
           >
           </Progress>
        </div>
        </div>
        </div>
                <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                  <Progress
                   progress={this.state.progress}
                   onProgressChange={this.changeProgressHandler}
                   >
                  </Progress>
                </div>
<div className="mt35 row">
    <div>
    <i className="icon prev" onClick={this.playPrev}></i>
<i className={`icon ml20 ${this.state.isPlay?"pause":"play"}`} onClick={this.isPlay}></i>
<i className="icon next ml20" onClick={this.playNext}></i>
</div>
<div className="-col-auto">
    <i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
</div>
</div>
</div>
<div className="-col-auto cover">
    <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.cover}/>
</div>
</div>
</div>
);
}
});
export default Player;