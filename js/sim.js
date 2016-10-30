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
        this.AssignHandlers("keydown", [this.FirstCharHandler]);
    }
    AssignHandlers(pEventName, pHandlerArray){
        for(let iX=0; iX<pHandlerArray.length; ++iX)
        {
            this.view.addEventListener(pEventName, function(pEvent){
                pHandlerArray[iX].call(this.ctrl, pEvent);
            });
        }
    }
    //Handlers
    FirstCharHandler(pEvent){
        if(this.mode === SIMMode.ZERO)
        {
            //Фильтруем некоторые значения
            if(pEvent.key === "Shift" || pEvent.key === "Alt" || pEvent.key === "Backspace" || pEvent.key === "Enter" || pEvent.key === "Tab")
                return;
            switch(pEvent.key)
            {
                case "?": this.ChangeMode(SIMMode.SEARCH);break;
                case "@": this.ChangeMode(SIMMode.SYNC);break;
                default : this.ChangeMode(SIMMode.COMP);break;
            }
        }
        else if(pEvent.target.value === "" && pEvent.key === "Backspace")
        {
            this.ChangeMode(SIMMode.ZERO);
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
                // this.view.querySelector("#titleLabel").ctrl.Hide();
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
}