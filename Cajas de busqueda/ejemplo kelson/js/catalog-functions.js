function ebscoPreProcess(myForm) {
    myForm.bquery.value = myForm.search_prefix.value + myForm.uquery.value;
}

function limittoFullText(myForm) {
    if (myForm.fulltext_checkbox.checked)
        myForm.clv0.value = "Y";
    else
        myForm.clv0.value = "N";
}

function limittoPeerReview(myForm) {
    if (myForm.peerReview.checked)
        myForm.clv1.value = "Y";
    else
        myForm.clv1.value = "N";
}

function limittoBasesPeriodicos(myForm) {
    if (myForm.peerReview.checked)
        myForm.clv3.value = "Y";
    else
        myForm.clv3.value = "N";
}

function limittoRevistaESPM(myForm) {
    myForm.bquery.value += ' AND LN ir00790a';
}

function limittoElectronic(myForm) {
    myForm.bquery.value += ' NOT LN cat04198a';
}

function limittoPrinted(myForm) {
    myForm.bquery.value = '(' + myForm.bquery.value + ') (AND PT Book NOT PT eBOOK AND LN cat04198a)';
}

function limittoArticles(myForm) {
    myForm.bquery.value += ' ZT Articles';
}

function limittoBooks(myForm) {
    myForm.bquery.value += ' AND PT eBook';
}

function limittoPubType(myForm, name) {
    var val;
    var radios = myForm.elements[name];

    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
            val = radios[i].value;
            break;
        }
    }
    myForm.bquery.value += val;
}