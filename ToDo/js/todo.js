function clickMenu() {
    var menu = document.getElementById("menu");
    var sidemenu = document.getElementById("sidemenu");

    if(menu.className === "open") {
        menu.className = "close";
        sidemenu.style.width = "0em";
        sidemenu.style.minWidth = "0em";
        return;
    }

    menu.className = "open";
    sidemenu.style.width = "25%";
    sidemenu.style.minWidth = "10em";
}

var myNodelist = document.getElementsByTagName("LI");
var close = document.getElementsByClassName("close");
var list = document.querySelector('ul');
function loadElements(){
    var i;
    for (i = 0; i < myNodelist.length; i++) {
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        myNodelist[i].appendChild(span);
    }

    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
            div.className = "deleted";
            store();
            getActive();
        }
    }

    list.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.className = "checked";
            store();
            getActive();
        }
    }, false);
}

getValues();
getActive();



function newElement() {
    var li = document.createElement("li");
    li.className = "Active";
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);


    store();
    getValues();
    loadElements();

}
var myNodelist = document.getElementsByTagName("LI");
function getActive(){
    var activeTotal = 0;
    var completedTotal = 0;
    var deletedTotal = 0;
    for (var i = 0; i < myNodelist.length; i++) {
        if (myNodelist[i].className == "Active") {
            activeTotal++;
        }
        if (myNodelist[i].className == "checked") {
            completedTotal++;
        }
        if (myNodelist[i].className == "deleted") {
            deletedTotal++;
        }
        var totalCount = document.getElementById("count");
        totalCount.innerHTML = "<div id='count'>Tasks Left: " + activeTotal +
            "<br />Completed Tasks: " + completedTotal +"</div>"
    }
}


function store() {
    window.localStorage.myitems = list.innerHTML;
}

function getValues() {
    var storedValues = window.localStorage.myitems;
    if(!storedValues) {

    }
    else {
        list.innerHTML = storedValues;
    }
    getActive();
    loadElements();
}

