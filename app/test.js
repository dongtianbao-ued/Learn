/**
 * Created by admin on 2017/8/26.
 */
import React from "react";
import DisplaySize from "../displaySize.js";
import smaller,{au,arr,object,Animal} from "./smaller.js";
let Test=React.createClass({
    getInitialState(){
        return {
            size:20
        }
    },
    componentDidMount(){
        //这里需要注意的是
     this.stu=new Animal("red",this.state.size)
    },
    clickBiger(){
         console.log("1");
         this.setState({
              size:this.state.size+10
         });

    },
        //用new调用类名创建对象直接量

        render(){
            return (
                <div>
                    <DisplaySize  size={this.state.size}></DisplaySize>
                    <img style={{width:this.state.size,height:this.state.size}}  src="static/images/logo.png" />
                    <h3 onClick={this.clickBiger}>点击变大</h3>
                    <p onClick={()=>{smaller(this.state.size)}}>{au}:{arr[1]}</p>
                    <p onClick={()=>{this.stu.sort()}}>姓名:{object.name} ;年龄：{object.age} ;性别：{object.sex}</p>
               </div>
)
}
});
export default Test;
