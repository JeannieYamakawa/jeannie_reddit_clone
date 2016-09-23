$(document).ready(function(){

    // need on click button that makes an ajax call based on the form data
    $('#submitButton').on('click', function(event) {
    // var $username = $('#textInput').val();
    // alert($username)
    $.ajax( {
            url: 'http://localhost:3000/users/new', //where request is going to
            method: POST,
            // data: {username: $username}

        } ).done( function( data ) {

            alert(data)

            } );

        )
});
})
