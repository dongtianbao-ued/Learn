/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import "./musiclistitem.less";
import Pubsub from "pubsub-js";
let MusicListItem=React.createClass({
    playMusic(musicItem){
    //公布事件，第一个参数为事件名，后面的参数为公布事件携带的参数
    console.log("1");
    Pubsub.publish("PLAY_MUSIC",musicItem);
},
    deleteMusic(musicItem,e){
    e.stopPropagation();
    Pubsub.publish("DELETE_MUSIC",musicItem)
},
//注意call和apply和bind的区别，传入参数的方式都是第一个参数改变this指向，apply传入的是一个数组，但要注意前2者是立即调用函数，bind是先创造一个函数，改变this指向，回调函数，需要调用时后面再加（）；
    render(){
        let musicItem=this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this,musicItem)} className={`components-musiclistitem row${this.props.focus?" focus":""}`}>
                <p><strong>{musicItem.title}</strong>-{musicItem.artist}</p>
                <p onClick={this.deleteMusic.bind(this,musicItem)} className="-col-auto delete"></p>
            </li>
        )
    }
});
export default MusicListItem;