/**
 * Created by admin on 2017/8/20.
 */
import React from "react";
import MusicListItem from "../components/musiclistitem.js"
let MusicList=React.createClass({
    render(){
        let listEle=null;
        listEle=this.props.musicList.map((item)=>{
            return (
                <MusicListItem
                focus={item===this.props.currentMusicItem}
                key={item.id}
                musicItem={item}
                >
                    </MusicListItem>
                    )
        });
        return (
            <ul>
              { listEle }
            </ul>
        )
    }
});
export default MusicList;