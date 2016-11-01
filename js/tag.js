"use strict";
class Tag
{
    constructor(pValue){
        this.value = pValue;
        this.view = null;
    }
    Render(){
        let theView = document.createElement("div");
        this.view = theView;
        theView.ctrl = this;
        theView.className = "tag";

            let theLabel = document.createElement("span");
            theLabel.innerHTML = this.value;
            theLabel.className = "tagLabel";
        theView.appendChild(theLabel);
            let theButton = document.createElement("button");
            theButton.type = "button";
            theButton.className = "tagClose";
            //Создаем обработчик нажатия в зависимости от desktop/mobile версии приложения
            let eventName = document.body.ontouchstart?"touchstart":"click";
            theButton.addEventListener(eventName, function(pEvent){
                pEvent.target.parentNode.ctrl.Hide();
            });
        theView.appendChild(theButton);
        return theView;
    }
    Show(){
        this.view.style.display = "initial";
    }
    Hide(){
        this.view.parentNode.removeChild(this.view);
    }
}
// var NewTag = function NewTag(pValue){
//     let theView = document.createElement("div");
//     this.view = theView;
//     theView.ctrl = this;
//     theView.className = "tag";
//         theLabel = document.createElement("span");
//         theLabel.innerHTML = pValue;
//         theLabel.className = "tagLabel";
//     theView.appendChild(theLabel);
//         theButton = document.createElement("span");
//         theButton.className = "tagClose";
//         theButton.innerHTML = "x";
//         //Создаем обработчик нажатия в зависимости от desktop/mobile версии приложения
//         let eventName = document.body.ontouchstart?"touchstart":"click";
//         theButton.addEventListener(eventName, function(pEvent){
//             pEvent.target.parentNode.ctrl.Hide();
//         });
//     theView.appendChild(theButton);
//     return theView;
// }
// NewTag.prototype.Show = function(){
//     this.view.style.display = "initial";
// }
// NewTag.prototype.Hide = function(){
//     this.view.parentNode.removeChild(this.view);
// }