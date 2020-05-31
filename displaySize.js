/**
 * Created by admin on 2017/8/26.
 */
/**
 * Created by admin on 2017/8/26.
 */
import React from "react";
let DisplaySize=React.createClass({
    getInitialState(){
        return {
            size:20
        }
    },
clickSmaller(v){
    this.setState({
        size:v
    });
},
render(){
    return (
        <p>显示图标的尺寸:{this.props.size}</p>
)
}
})
export default DisplaySize;
