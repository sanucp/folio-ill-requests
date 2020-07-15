function searchStacks() {
    var text1 = document.getElementById("stacksSearch").value;
    var res = escape(text1);
    if (res != ''){
        var url = "https://biblioteca.ilumno.com/multisearch?" + "bentoq=" + res + "&catalog=bento";
        window.open(url);
    }
    else {
        alert("Por favor realize una busqueda");
    }
    }