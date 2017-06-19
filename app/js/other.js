$(function () {
    let gui = require('nw.gui');
    let win = gui.Window.get();
    $('.title-bar .close').on('click',function () {
        win.close();
    });
    $('.title-bar .min-page').on('click',function () {
        win.minimize();
    });
    $('.title-bar .max-page').on('click',function () {
        win.maximize();
    });
    $('.title-bar').on('dbClick',function (e) {
        if(!$(e.target).is('.title-btn')){
            win.restore()
        }
    })
})