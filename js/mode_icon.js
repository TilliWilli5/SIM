class ModeIcon
{
    constructor(){
        this.view = null;
        this.isHidden = true;
    }
    AttachTo(pShelter)
    {
        this.view = pShelter;
        pShelter.ctrl = this;
    }
    Show(){
        if(this.isHidden)
        {
            this.style.animation = "scaleUp 6.s forwards";
        }
    }
    Hide(){
        if(!this.isHidden)
        {
            this.style.animation = "scaleUp 6.s reverse";
        }
    }
}