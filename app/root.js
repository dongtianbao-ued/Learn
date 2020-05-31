/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import Header from "./components/header";
import Player from "./page/player.js";
import Pubsub from "pubsub-js";
import { randomRange } from './utill';
import MusicList from "./page/musicList.js";
import { PLAY_STYLE } from "./page/playStyle.js";
import Test from "./test.js";
import MusicListItem from "./components/musiclistitem";
//从react-router组件中引入需要用到的模块，没有default默认，用{}包裹
import { Router, IndexRoute, Link, Route, hashHistory , browserHistory } from "react-router";
//注意在引入的时候如果是export default 对象的方式，不用加方括号，如果是export 对象或者变量的方式，一定要加{}；
import { MUSIC_LIST } from "./config/musicList.js";
//import Progress from "./components/progress";
//创建组件,针对不同的生命周期执行不同的函数或者返回值
//创建App组件
let App=React.createClass({
    getInitialState(){
    return {
        musicList:MUSIC_LIST,
        currentMusicItem:MUSIC_LIST[3],
        repeatType: 'cycle'
    }
},
        //封装函数，设置播放路径和，状态设置
     playMusic(musicItem){
        $("#player").jPlayer("setMedia",{
            mp3:musicItem.file
        }).jPlayer("play");

         this.setState({
             currentMusicItem:musicItem
         })
     },
        //创建播放上一首，下一首对应的点击播放函数
        playNext(type="next"){
            let index=this.findMusicIndex(this.state.currentMusicItem);
            let newIndex=null;
            let musicListLength=this.state.musicList.length
            if(type=="next"){
                newIndex=(index+1)% musicListLength;
            }
            else{
                newIndex=((index-1)+musicListLength)% musicListLength;
            }
            this.playMusic(this.state.musicList[newIndex])
        },
        findMusicIndex(musicItem){
            return this.state.musicList.indexOf(musicItem)
        },
    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    },
    playWhenEnd() {
    if (this.state.repeatType === 'random') {
        let index = this.findMusicIndex(this.state.currentMusitItem);
        let randomIndex = randomRange(0, this.state.musicList.length - 1);
        while(randomIndex === index) {
            randomIndex = randomRange(0, this.state.musicList.length - 1);
        }
        this.playMusic(this.state.musicList[randomIndex]);
    } else if (this.state.repeatType === 'once') {
        this.playMusic(this.state.currentMusicItem);
    } else {
        this.playNext();
    }
},

//渲染页面生成DOM节点之后执行函数不需要返回值
componentDidMount(){
    //对id为player元素执行操作，为别对应准备阶段
    $("#player").jPlayer({
        //ready:function(){
        //    $(this).jPlayer("setMedia",{mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"}).jPlayer("play");
        //},
        //支持格式
        supplied:"mp3",
        //支持环境
        wmode:"window"
    });
    //采用this.props.params.id(或设置其他参数来取出routePath传过来的值)
    //console.log("接收到的参数"+this.props.params.id);
    let repeatList = [
        'cycle',
        'once',
        'random'
    ];
    $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();})
    //调用创建好的函数，playMusic，传入目前的item为下标0项
    this.playMusic(this.state.currentMusicItem);
    //绑定事件，播放借宿后，调用回调函数，调用playNext方法
    //pubsub就相当于vue中创建的一个实例，用于绑定事件，子父之间数据传递或者其他组件之间数据传递，publish公布事件，subscribe接受事件，注意事件名相同，前者参数为传入的数据，后者为回调函数，对传入数据作为参数处理
    Pubsub.subscribe("DELETE_MUSIC",(msg,musicItem)=>{
        //回调函数内执行，设置数据musicList为过滤掉当前参数项musicItem
        this.setState({
            musicList:this.state.musicList.filter(item=>{
                return item !==musicItem;
            })
        })
    });
            PubSub.subscribe('CHANAGE_REPEAT', () => {
                let index = repeatList.indexOf(this.state.repeatType);
                index = (index + 1) % repeatList.length;
                this.setState({
                    repeatType: repeatList[index]
                });
            });
    //点击切换功能，接受事件，传递过来的参数，调用回调函数，执行播放某一曲
    Pubsub.subscribe("PLAY_MUSIC",(msg,musicItem)=>{
        this.playMusic(musicItem);
    });
    Pubsub.subscribe("PLAY_NEXT",(msg)=>{
        this.playNext("next");
    });
    Pubsub.subscribe("PLAY_PREV",(msg)=>{
        this.playNext("prev");
    });
    Pubsub.subscribe("PLAY_STYLE",(msg,playStyle)=>{
        this.playStyle(playStyle);
        //console.log(playStyle)
    });},
    //console.log(this.state);
    //改变初始化数据progress的值，再次渲染整个页面，重新加载页面结构。this.setState就是改变数据，初始化数据
    //$("#player").bind($.jPlayer.event.timeupdate,(e)=>{
    //    duration=e.jPlayer.status.duration;
    //    this.setState({
    //        progress:e.jPlayer.status.currentPercentAbsolute
    //    })
    //});
//    //生命在周期组件销毁之后,执行，即关闭页面，不再占用内存，释放内存，取消绑定事件，避免再次打开页面时重复绑定事件，unsubscribe为事件解绑
componentWillUnMounted(){
    Pubsub.unsubscribe("DELETE_MUSIC");
    Pubsub.unsubscribe("PLAY_MUSIC");
    Pubsub.unsubscribe("PLAY_NEXT");
    Pubsub.unsubscribe("PLAY_PREV");
    Pubsub.unsubscribe("PLAY_STYLE");
        PubSub.unsubscribe('CHANAGE_REPEAT');
    $("#player").unbind($.jPlayer.event.ended);
},

////渲染整个页面，页面加载结构.生成dom节点后，再次渲染整个页面，改变progress初始化数据，并将数据统一封装到this.state对象中，可用对应的获取熟悉值，父组件向子组件的通信采用this.props.自定义属性名,改变数据采用this.setState(k,v);获取数据采用this.state.属性名
        //对组件app下的组件进行克隆，this。props.children是对应path下的组件，没设置path时就是indexroute默认的组件加载，克隆无法克隆参数，通过this.state取出所有状态数据，参数传入，但要注意属性名和值要相同，例如musicList={this.state.musicList}，都要是musicList，否者会出错
        //<MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList}></MusicList>
render(){
    return (
        <div>
           <Header/>
           { React.cloneElement(this.props.children,this.state)}
        </div>
)
}})



let Root=React.createClass({
    //移到player.js下
    //设置初始化数据
    //indexRoute为默认的组件，不用设置path路径，外层route包裹内层2个route，对应的组件和路径
    //path="/list/:id"
    render(){
      return (
          <Router history={browserHistory}>
                <Route path="/" component={App}>
                     <IndexRoute component={Player}>
                     </IndexRoute>
                      <Route path="/list" component={MusicList}>
                      </Route>
                      <Route path="/test" component={Test}>
                      </Route>
                </Route>
        </Router>
    )
    }
});
//render中采用自定义progress属性完成父向子的通信。通过onProgressChange完成子向父的通信
export default Root;