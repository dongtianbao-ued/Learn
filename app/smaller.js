/**
 * Created by admin on 2017/8/26.
 */
import React from "react";
export default function smaller(newState){
    console.log(newState)
};
export var au="sex";
export var arr=[1,2,3];
export var object={
    name:"小明",
    age:20,
    sex:"男"
};
export class Animal{
    constructor(color,size){
    this.color=color;
    this.size=size;
}
  sort(){
      console.log(this.color+":"+this.size)
  }
}

