try {
    var myVarBanner = setInterval("loadbranding()", 5000);
    function loadbranding(){
        if (!window.jQuery) {
            return;
        }
        clearInterval(myVarBanner);
        jQuery(window.parent.document).ready(function(){
            $.ajax({
                type: 'POST',
                url: 'http://gss.ebscohost.com/anavarro/dev/umce/contador.php',
            })
            .done(function(numero){
                alert (numero);
            })
        })
        
    }
} catch (e) {}
