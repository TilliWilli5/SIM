class Bar
{
    constructor(pCore){
        this.view = null;
        this.isHidden = true;
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
            this.view.style.animation = `yScaleUp ${this.animDuration}s forwards`;
            this.isHidden = false;
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.view.style.animation = `yScaleDown ${this.animDuration}s reverse forwards`;
            this.isHidden = true;
        }
    }
}