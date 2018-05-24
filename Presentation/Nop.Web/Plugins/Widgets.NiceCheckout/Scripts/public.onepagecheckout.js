Billing.save = function(shipToSameAddress) {
    if (Checkout.loadWaiting != false) return;

    Checkout.setLoadWaiting('billing');


    var dataForm = $(this.form).serialize();
    dataForm += "&ShipToSameAddress=" + shipToSameAddress;

    $.ajax({
        cache: false,
        url: this.saveUrl,
        data: $(this.form).serialize(),
        data: dataForm,
        type: 'post',
        success: this.nextStep,
        complete: this.resetLoadWaiting,
        error: Checkout.ajaxFailure
    });
};



ConfirmOrder.save = function (note) {
            if (Checkout.loadWaiting != false) return;
         
            //terms of service
            var termOfServiceOk = true;
            if ($('#termsofservice').length > 0) {
                //terms of service element exists
                if (!$('#termsofservice').is(':checked')) {
                    $("#terms-of-service-warning-box").dialog();
                    termOfServiceOk = false;
                } else {
                    termOfServiceOk = true;
                }
            }
            if (termOfServiceOk) {
                Checkout.setLoadWaiting('confirm-order');
                $.ajax({
                    cache: false,
                    url: this.saveUrl+'?note='+note,
                    type: 'post',
                    success: this.nextStep,
                    complete: this.completeConfirmOrder,
                    error: Checkout.ajaxFailure
                });
            } else {
                return false;
            }
}

completeConfirmOrder = function() {
    localStorage.removeItem('orderNote');
    this.resetLoadWaiting();
}