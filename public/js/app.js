$(function() {
    $('#submit-form').submit(function(e) {
        e.preventDefault();
        $('#form-ajax-indicator').show();
        var data = $(this).serialize();
        $.post('/submit', data, function(data) {
            $('#submitModal').modal('hide');
            $('#form-ajax-indicator').hide();
        }).fail(function(jqXHR, textStatus, errorThrown) {
            $('#form-ajax-indicator').hide();
            $('#modal-error-holder').html(errorThrown);
        });
        
        return false;
    });
    
    
    $('.pager .disabled a').click(function(e) {
        e.preventDefault();
    });
});