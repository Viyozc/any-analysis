$(function () {
    let gui = require('nw.gui');
    let win = gui.Window.get();
    $('.title-bar').on('click','.close',function (e) {

        win.close();
    })
})