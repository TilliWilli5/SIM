"use strict";
class SIM
{
    constructor(){
        this.mode = SIMMode.ZERO;
        this.view = null;
        this.enviroment = util.DefineEnviroment();//Не оч красивое решение, но на первое время норм
    }
    AttachTo(pShelter){
        pShelter.ctrl = this;
        this.view = pShelter;
        this.AssignHandlers("titleInput", "keydown", [this.TitleBackspaceHandler, this.TitleFirstCharHandler, this.TitleEnterHandler, this.TabHandler]);
        this.AssignHandlers("descInput", "keydown", [this.DescBackspaceHandler, this.DescEnterHandler, this.TabHandler]);
        this.AssignHandlers("tagInput", "keydown", [this.TagBackspaceHandler, this.TagEnterHandler]);
        let eventName = document.body.ontouchstart?"touchstart":"click";
        this.AssignHandlers("tagBar", eventName, [this.TagBarClickHandler]);
        this.AssignHandlers("tagFieldBar", eventName, [this.TagBarClickHandler]);
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
            // else if(pEvent.key === "Backspace" && pEvent.target.innerText === "")
            // {
            //     this.ChangeMode(SIMMode.ZERO);
            // }
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
    TitleBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "";
            pEvent.preventDefault();
            this.ChangeMode(SIMMode.ZERO);
        }
    }
    DescEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            let theTarget = pEvent.target;
            let theText = theTarget.innerText;
            //Если поле пустое - то однозначно переходим к след полю
            if(theText === "")
            {
                this.GotoTagInput();
                pEvent.preventDefault();
            }
            else
            {
                //Версия для Chrome
                let newlinePosition = theText.indexOf("\n\n");
                if((newlinePosition !== -1) && (newlinePosition === (theText.length - 2)))
                {
                    this.GotoTagInput();
                    pEvent.preventDefault();
                    //Версия для Firefox
                    for(var iX=theTarget.childNodes.length-1; iX>=0; --iX)
                    {
                        if(theTarget.childNodes[iX].nodeName === "BR")
                            theTarget.removeChild(theTarget.childNodes[iX]);
                        else
                            break;
                    }
                    //Версия для Chrome
                    for(var iX=theTarget.childNodes.length-1; iX>=0; --iX)
                    {
                        if(theTarget.childNodes[iX].nodeName === "DIV" && theTarget.childNodes[iX].innerText.trim() === "")
                            theTarget.removeChild(theTarget.childNodes[iX]);
                        else
                            break;
                    }

                }
                //Версия для Firefox
                // if(this.enviroment === UtilEnviroment.FIREFOX && theText[theText.length-1] === "\n")
                // {
                //     this.GotoTagInput();
                //     pEvent.preventDefault();
                // }
            }
            // if(pEvent.target.innerText[pEvent.target.innerText.length-1] === "\n" || pEvent.target.innerText === "")
            // {
            //     this.GotoTagInput();
            //     pEvent.preventDefault();
            // }
        }
    }
    DescBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "";
            pEvent.preventDefault();
            this.GotoTitleInput();
        }
    }
    TagBackspaceHandler(pEvent){
        if(pEvent.key === "Backspace" && pEvent.target.innerText.trim() === "")
        {
            pEvent.target.innerHTML = "&nbsp;";
            pEvent.preventDefault();
            this.GotoDescInput();
        }
    }
    TagEnterHandler(pEvent){
        if(pEvent.key === "Enter")
        {
            if(pEvent.target.innerText.trim() === "")
                this.CreateIssue();
            else
            {
                this.view.querySelector("#tagField").appendChild(new Tag(pEvent.target.innerText.trim()).Render());
                pEvent.target.innerHTML = "&nbsp;";
            }
            pEvent.preventDefault();
        }
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
    TagBarClickHandler(pEvent){
        this.FocusTo(this.view.querySelector("#tagInput"));//Фокусировка в Chrome
        this.view.querySelector("#tagInput").focus();//Фокусировка в Firefox
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
        this.FocusTo(this.view.querySelector("#titleInput"));//Фокусировка в Chrome
        this.view.querySelector("#titleInput").focus();//Фокусировка в Firefox
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Hide();
    }
    GotoDescInput(){
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Show();
        this.view.querySelector("#descLabel").ctrl.Show();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Show();
        this.FocusTo(this.view.querySelector("#descInput"));//Фокусировка в Chrome
        this.view.querySelector("#descInput").focus();//Фокусировка в Firefox
    }
    GotoTagInput(){
        this.view.querySelector("#tagBar").ctrl.Show();
        this.view.querySelector("#tagLabel").ctrl.Show();
        this.view.querySelector("#descUnderline").ctrl.Show();
        // this(this.view.querySelector("#tagInput").innerHTML === "")
        // {
        //     this.view.querySelector("#tagInput").innerHTML = "<br>";
        // }
        this.FocusTo(this.view.querySelector("#tagInput"));//Фокусировка в Chrome
        this.view.querySelector("#tagInput").focus();//Фокусировка в Firefox
    }
    CreateIssue(){
        alert("Issue: [" + this.view.querySelector("#titleInput").innerText + "] created.");
        this.Reset();
    }
    AddTag(){

    }
    DeleteTag(){

    }
    //Aux
    FocusTo(pElement, pCollapseToStart){
        let wasEmptyInput = false;
        let selection = window.getSelection();
        let range = document.createRange();
        // range.setStart(pElement, 0);
        // range.setEnd(pElement, 0);
        if(pElement.innerHTML === "")
        {
            wasEmptyInput = true;
            pElement.innerText = ".";
        }
        range.selectNodeContents(pElement);
        range.collapse(pCollapseToStart);
        selection.removeAllRanges();
        selection.addRange(range);
        if(wasEmptyInput)
            pElement.innerHTML = "";
    }
    Reset(){
        //Hide all stuff
        this.view.querySelector("#tagLabel").ctrl.Hide();
        this.view.querySelector("#tagBar").ctrl.Hide();
        this.view.querySelector("#descUnderline").ctrl.Hide();
        this.view.querySelector("#descLabel").ctrl.Hide();
        this.view.querySelector("#descBar").ctrl.Hide();
        this.view.querySelector("#titleUnderline").ctrl.Hide();
        this.view.querySelector("#titleLabel").ctrl.Hide();
        //Clear all inputs
        this.view.querySelector("#tagField").innerHTML = "";
        this.view.querySelector("#tagInput").innerHTML = "";
        this.view.querySelector("#descInput").innerHTML = "";
        this.view.querySelector("#titleInput").innerHTML = "";
        //Init setup
        this.mode = SIMMode.ZERO;
        //Focus
        this.FocusTo(this.view.querySelector("#titleInput"));//Фокусировка в Chrome
        this.view.querySelector("#titleInput").focus();//Фокусировка в Firefox
    }
}