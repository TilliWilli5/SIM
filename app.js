var app = (function(){
    //Результирующий экспорт
    let $ = {};

    $.sim = document.getElementById("sim");
    $.modeIcon = document.getElementById("modeIcon");
    $.titleLabel = document.getElementById("titleLabel");
    $.titleInput = document.getElementById("titleInput");

    new SIM().AttachTo($.sim);
    new ModeIcon().AttachTo($.modeIcon);
    $.titleInput.focus();
    //Последняя строка
    return $;
})();