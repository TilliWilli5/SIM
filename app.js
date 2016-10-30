var app = (function(){
    //Результирующий экспорт
    let $ = {};

    $.sim = document.getElementById("sim");
    $.modeIcon = document.getElementById("modeIcon");
    $.titleLabel = document.getElementById("titleLabel");
    $.titleInput = document.getElementById("titleInput");
    $.descBar = document.getElementById("descBar");
    $.descLabel = document.getElementById("descLabel");
    $.tagBar = document.getElementById("tagBar");
    $.tagLabel = document.getElementById("tagLabel");
    new SIM().AttachTo($.sim);
    new Prelabel().AttachTo($.titleLabel);
    new ModeIcon().AttachTo($.modeIcon);
    $.titleInput.focus();
    new Bar({animDuration:0.4}).AttachTo($.descBar);
    new Prelabel({animDuration:1.0}).AttachTo($.descLabel);
    new Bar({animDuration:0.4}).AttachTo($.tagBar);
    new Prelabel({animDuration:1.0}).AttachTo($.tagLabel);
    //Последняя строка
    return $;
})();