var content = document.querySelector('.content'),
    editBtn = document.querySelector('.editBtn'),
    saveBtn = document.querySelector('.saveBtn'),
    cancelBtn = document.querySelector('.cancelBtn'),
    htmlsGroup = document.querySelector('.htmls-group');

function toggleBtnsVisiblity(){
    editBtn.classList.toggle('hidden');
    saveBtn.classList.toggle('hidden');
    cancelBtn.classList.toggle('hidden');
}
var html = '',
    stor = localStorage.getItem('stor') ? JSON.parse(localStorage.getItem('stor')) : [] ;

    editBtn.addEventListener('click', function(){
    html = content.innerHTML;
    content.setAttribute('contentEditable', true);
    toggleBtnsVisiblity();
})
cancelBtn.addEventListener('click', function(){
    content.innerHTML = html;
    toggleBtnsVisiblity();
})
saveBtn.addEventListener('click', function(){
    if (content.innerHTML === html) {
        alert ('Изменений не внесено');
    } else {
        stor.push({
            id: stor.length,
            date: new Date(),
            html: content.innerHTML,
            text: content.textContent.substr(0, 40) + '...'
        });
        localStorage.setItem('stor', JSON.stringify(stor));
    }
    toggleBtnsVisiblity();
})
function init(){
    if (stor.length == 0) {
        content.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus qui ea voluptatibus expedita dolore quo, labore aspernatur id impedit ratione molestiae, vero quisquam! Sapiente saepe perferendis reiciendis deleniti obcaecati adipisci, qui voluptatum veniam, dicta doloribus impedit iure ut corrupti fugiat rem commodi reprehenderit officia placeat iusto nulla facere itaque odio. Distinctio incidunt consectetur dignissimos sequi. Ipsa nulla a itaque facilis iusto illum quos nesciunt. Error reprehenderit molestiae maxime aut ut nostrum! Ab eveniet, ex consequatur distinctio deleniti dolores illo? Tempore incidunt et rem, at recusandae beatae hic facere, omnis totam sunt in facilis labore provident ex voluptatem neque temporibus tenetur?';
    } else {
        stor.forEach(element => {
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.setAttribute('class', 'list-group-item');
            var span1 = document.createElement('span');
            span1.classList.add('badge');
            span1.textContent = element.id;
            a.appendChild(span1);
            var span2 = document.createElement('span');
            span2.classList.add('label');
            span2.classList.add('label-primary');
            span2.textContent = element.date.toLocaleString();
            a.appendChild(span2);
            var span3 = document.createElement('span');
            span3.classList.add('text');
            span3.textContent = element.text;
            a.appendChild(span3);
            htmlsGroup.appendChild(a);
            a.addEventListener('click', function(){
                content.innerHTML = element.html;
                $('#errModal').modal('hide');
            });
        });
        $('#errModal').modal();
    }
}
window.onload = init;