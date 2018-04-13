(function(){
    'use strict';

    function showAlert(text, alertType, timeout){
        var alt = /(warning)|(danger)|(info)|(success)/.test(alertType) ? alertType :"danger";
        timeout = timeout || 10000;

        var al = document.getElementById('alert');
        var aler  = document.createElement('div');
        aler.textContent = text;
        aler.classList.add('alert');
        aler.classList.add('alert-' + alt);
        al.appendChild(aler);
        // сохраню на случай если потом дорабатывать буду его
        var tId = setTimeout(function(){
            aler.remove();
        }, timeout)
    }



    $('#jsCodeArea').keydown(function(e){
        if(e.keyCode!==13) return;
        if(e.shiftKey) return;
        e.target.disabled = true;
        //showAlert('startig', 'warning', 2000);
        var inputText = e.target.value;
        /*
        =====================================================
        ПЕРВОЕ ЗАДАНИЕ
        =====================================================
        */
        try{
            eval(inputText);
            showAlert('SUCCESS', 'success', 10000);
        } catch(ex){
            showAlert(ex, null, 10000);
        }
        e.target.value = '';
        e.target.disabled = false;
        /*
        =====================================================
        КОНЕЦ ПЕРВОГО ЗАДАНИЯ
        =====================================================
        */
    });



    /*
    ===============================================
    ВТОРОЕ ЗАДАНИЕ
    ===============================================
    */
    function filterByType(filterType){
        //ну не проверяю уж type на случай если там sdfdfas написано вместо нормального типа
        var arr = Array.prototype.slice.call(arguments, 1);
        var result = [];
        arr.forEach(function(item){
            if (typeof item === filterType){
                result.push(item);
            }
        });
        return result;
    }
    /*
    ===============================================
    КОНЕЦ ВТОРОГО ЗАДАНИЯ
    ===============================================
    */

    console.log(filterByType('string', 10, 20, 'a', 'b', true, false));
})();