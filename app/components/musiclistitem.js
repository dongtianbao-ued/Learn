/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import "./musiclistitem.less";
import Pubsub from "pubsub-js";
let MusicListItem=React.createClass({
    playMusic(musicItem){
    //�����¼�����һ������Ϊ�¼���������Ĳ���Ϊ�����¼�Я���Ĳ���
    console.log("1");
    Pubsub.publish("PLAY_MUSIC",musicItem);
},
    deleteMusic(musicItem,e){
    e.stopPropagation();
    Pubsub.publish("DELETE_MUSIC",musicItem)
},
//ע��call��apply��bind�����𣬴�������ķ�ʽ���ǵ�һ�������ı�thisָ��apply�������һ�����飬��Ҫע��ǰ2�����������ú�����bind���ȴ���һ���������ı�thisָ�򣬻ص���������Ҫ����ʱ�����ټӣ�����
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