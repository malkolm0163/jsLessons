(function(){
    function Todos(){
        var todos = Array.prototype.slice.call(arguments);
        var subscribers = [];
        var self = this;

        function chech(item){
            if (typeof item !== 'object' || !item.title || !item.hasOwnProperty('isDone')) throw new Error('argument must by an object with "title" and "isDone" parameters');
        }
        function callSubscribers(){
            subscribers.forEach(function (value) { value(); })
        }

        todos.forEach(function(item, index){
            chech(item);
            item.id = index;
        });
        this.length = todos.length;

        this.getTodos = function(){
            return todos;
        };
        this.get = function(id){
            return todos[id];
        };
        this.subscribe = function (calback) {
            subscribers.push(calback);
        };
        this.unsubscribe = function (callback) {
            subscribers.forEach(function (value, index) {
                if (callback === value) callback.splice(index, 1);
            })
        };

        this.add = function (item) {
            chech(item);
            item.id = todos.length;
            todos.push(item);
            this.length = todos.length;
            callSubscribers();
            return item;
        };
        this.delete = function (item) {
            todos.forEach(function (value, index) {
                if (value === item){
                    todos.splice(index, 1);
                    self.length = todos.length;
                    callSubscribers();
                }
            })
        };
        this.forEach = function (callback) {
            todos.forEach(function (value, index, array) { callback(value, index, array) });
        }
    }
    var heading = document.getElementById('todoText');
    var todoList = document.getElementById('todoList');
    var todoInput = document.getElementById('todoInput');
    var todoBtn = document.getElementById('todoBtn');
    var errParagraph = document.getElementById('errParagraph');


    var todos = new Todos( {
        title: "do1",
        isDone: false
    }, {
        title: "do2",
        isDone: true
    }, {
        title: "do3",
        isDone: false
    });
    heading.textContent = 'Here is your current ToDo List ('+ todos.length+' elements):';
    function alert(message){
        errParagraph.textContent = message;
        $('#errModal').modal();
    }
    function addTodoHandler() {
        if (todoInput.value){
            todoList.appendChild(getTodoLi(
                todos.add({title:todoInput.value, isDone: false})
            ));

            todoInput.value = '';
        } else {
            alert('Поле не должно быть пустым');
        }
    }
    function getTodoLi(todo) {
        var li = document.createElement('li');
        li.className = 'list-group-item';
        if (todo.isDone) li.classList.add('done');
        li.textContent = todo.title;
        li.setAttribute('data-toDoId', todo.id);
        return li;
    }
    function fillTodoList(todos){
        todos.forEach(function (item) {
            todoList.appendChild(getTodoLi(item));
        });
        todos.subscribe(function () {
            heading.textContent = 'Текущий список задач (записей '+ todos.length+'):';
        });


        todoList.addEventListener('click', function (ev) {
            if (ev.target.tagName === "LI"){
                ev.target.classList.toggle('done');
                todos.get(+ev.target.dataset.todoid).isDone = !todos.get(+ev.target.dataset.todoid).isDone;
            }
        });
        todoInput.addEventListener('keydown', function (ev) {
            if (ev.keyCode === 13){
                addTodoHandler();
            }
        });
        todoBtn.addEventListener('click', addTodoHandler);

    }

    fillTodoList(todos);


})();