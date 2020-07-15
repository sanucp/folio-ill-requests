
function restlogin () {
    jQuery("#warning").html('<img src="includes/loading_sm.gif" />');

    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(jQuery('#pubkey').val());

    var encrypted_un = encrypt.encrypt(jQuery('#login-un').val()); 
    var encrypted_pw = encrypt.encrypt(jQuery('#login-pw').val());
    var rd = jQuery('#returnData').val();
    var custid = jQuery('#custid').val();
    
    var payload = {pw:encrypted_pw,un:encrypted_un,custid:custid,rd:rd,verbose:"N"};
    
    if (jQuery("#results").length > 0) {
        payload.verbose = "Y";
    }
    console.log(payload);
    
    var pwcheck = "includes/restauth.php";
    
    jQuery.ajax({
        type: "POST",
        url: pwcheck,
        data: JSON.stringify(payload),
        success: function(data) {
            if (jQuery("#results").length == 0) {
                json_data = JSON.parse(data);
                if (json_data.valid == "Y") {
                    console.log(json_data);
                    window.location.href="redirect.php";
                } else {
                    jQuery("#warning").html('<div class="warningmessage">'+json_data.message+'</div>');
                }
            } else {
                jQuery("#results").html(data);
            }
        },
        error: function(xhr, status, error) {
            console.log("Broke");
        }
    });
}