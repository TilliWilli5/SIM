class Bar
{
    constructor(pCore){
        this.view = null;
        this.isHidden = true;
        this.animDuration = 0.6;
        this.isShowAnimRunning = true;
        if(pCore)
            Object.assign(this, pCore);
    }
    AttachTo(pShelter)
    {
        this.view = pShelter;
        pShelter.ctrl = this;
    }
    Show(){
        if(this.isHidden)
        {
            this.view.addEventListener("animationend", this.OnShowAnimEnd);
            this.view.style.animation = `yScaleUp ${this.animDuration}s forwards`;
            this.isHidden = false;
            this.isShowAnimRunning = true;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.addEventListener("animationend", this.OnHideAnimEnd);
            this.view.style.animation = `yScaleDown ${this.animDuration}s reverse forwards`;
            this.isHidden = true;
            this.isShowAnimRunning = false;
        }
    }
    OnShowAnimEnd(){
        if(this.ctrl.isShowAnimRunning)
        {
            this.style.height = "initial";
            this.style.animationFillMode = "none";
        }
    }
    OnHideAnimEnd(){
        if(!this.ctrl.isShowAnimRunning)
        {
            this.style.height = "0px";
            this.style.animationFillMode = "none";
        }
    }
}