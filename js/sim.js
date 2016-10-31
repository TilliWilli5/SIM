"use strict";
class SIM
{
    constructor(){
        this.mode = SIMMode.ZERO;
        this.view = null;
    }
    AttachTo(pShelter){
        pShelter.ctrl = this;
        this.view = pShelter;
        this.AssignHandlers("titleInput", "keydown", [this.TitleFirstCharHandler, this.TitleEnterHandler, this.TabHandler]);
        this.AssignHandlers("descInput", "keydown", [this.DescBackspaceHandler, this.DescEnterHandler, this.TabHandler]);
        this.AssignHandlers("descInput", "keyup", [this.AutoResizeHandler]);
        this.AssignHandlers("tagInput", "keydown", [this.TagBackspaceHandler]);
        this.AssignHandlers("tagInput", "keyup", [this.AutoResizeHandler]);
    }
    AssignHandlers(pElementId, pEventName, pHandlerArray){
        
        for(let iX=0; iX<pHandlerArray.length; ++iX)
        {
            this.view.addEventListener(pEventName, function(pEvent){
                if(pEvent.target.id === pElementId)
                    pHandlerArray[iX].call(this.ctrl, pEvent);
            });
        }
    }
    //Handlers
    TitleFirstCharHandler(pEvent){
        if(pEvent.target.id === "titleInput")
        {
            if(this.mode === SIMMode.ZERO)
            {
                //Фильтруем некоторые значения
                if(pEvent.key === "Shift" || pEvent.key === "Alt" || pEvent.key === "Backspace" || pEvent.key === "Enter" || pEvent.key === "Tab")
                    return;
                switch(pEvent.key)
                {
                    case "?": this.ChangeMode(SIMMode.SEARCH);pEvent.preventDefault();break;
                    case "@": this.ChangeMode(SIMMode.SYNC);pEvent.preventDefault();break;
                    default : this.ChangeMode(SIMMode.COMP);break;
                }
            }
            else if(pEvent.key === "Backspace" && pEvent.target.value === "")
            {
                this.ChangeMode(SIMMode.ZERO);
            }
        }
    }
    TitleEnterHandler(pEvent){
        if(pEvent.target.id === "titleInput")
        {
            if(pEvent.key === "Enter")
            {
                if(this.mode === SIMMode.ZERO)
                {
                    
                }
                else
                {
                    this.GotoDescInput();
                }
                pEvent.preventDefault();
            }
        }
    }
    DescEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            if(pEvent.target.value[pEvent.target.value.length-1] === "\n")
            {
                this.GotoTagInput();
                pEvent.preventDefault();
            }
        }
    }
    DescBackspaceHandler(pEvent){
        if(pEvent.target.id === "descInput")
        {
            if(pEvent.key === "Backspace" && pEvent.target.value === "")
            {
                pEvent.preventDefault();
                this.GotoTitleInput();
            }
        }
    }
    TagBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.value === "")
        {
            pEvent.preventDefault();
            this.GotoDescInput();
        }
    }
    AutoResizeHandler(pEvent){
        pEvent.target.style.height = "1px";
        pEvent.target.style.height = pEvent.target.scrollHeight + "px";
    }
    TabHandler(pEvent){
        if(pEvent.key === "Tab")
        {
            pEvent.preventDefault();
            if(pEvent.target.id === "titleInput")
                this.GotoDescInput();
            if(pEvent.target.id === "descInput")
                this.GotoTagInput();
        }
    }
    //Events
    ChangeMode(pMode){
        this.mode = pMode;
        console.log("Enter mode: " + SIMModetoName[pMode]);
        switch(pMode)
        {
            case SIMMode.ZERO:{
                this.view.querySelector("#modeIcon").ctrl.Hide();
                this.view.querySelector("#titleLabel").ctrl.Hide();
            };break;
            case SIMMode.COMP:{
                this.view.querySelector("#titleLabel").ctrl.Show();
            };break;
            case SIMMode.SEARCH:{
                this.view.querySelector("#modeIcon").ctrl.ChangeMode(SIMMode.SEARCH);
            };break;
            case SIMMode.SYNC:{
                this.view.querySelector("#modeIcon").ctrl.ChangeMode(SIMMode.SYNC);
            };break;
        }
    }
    GotoTitleInput(){
        this.view.querySelector("#titleInput").focus();
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
    }
    GotoDescInput(){
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Show();
        this.view.querySelector("#descLabel").ctrl.Show();
        this.view.querySelector("#descInput").focus();
    }
    GotoTagInput(){
        this.view.querySelector("#tagBar").ctrl.Show();
        this.view.querySelector("#tagLabel").ctrl.Show();
        this.view.querySelector("#tagInput").focus();
    }
}