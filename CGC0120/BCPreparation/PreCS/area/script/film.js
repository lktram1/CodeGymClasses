var film = {} || film;

film.drawTable = function(){
    $.ajax({
        url : "http://localhost:3000/films",
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#tbFilm tbody').empty();
            $.each(data, function(i, v){
                $('#tbFilm tbody').append(
                    "<tr>"+
                        "<td>"+ v.id +"</td>" +
                        "<td>"+ v.title +"</td>" +
                        "<td><img src='"+ v.poster +"' width='100px' height='120px'></td>" +
                        "<td>"+ v.shortDesc +"</td>" +
                        "<td>" +
                            "<a href='javascript:;' title='edit film' onclick='film.getDetail("+ v.id +")'><i class='fa fa-edit'></i></a> " +
                            "<a href='javascript:;' title='remove film' onclick='film.delete("+ v.id +")' ><i class='fa fa-trash'></i></a>" +
                        "</td>" +
                    "</tr>"
                );
            });
            $('#tbfilms').DataTable();
        }
    });
};

film.openAddEditFilm = function(){
    film.reset();
    $('#addEditFilm').modal('show');
};

film.save = function(){
    if($('#frmAddEditFilm').valid()){
        if($('#id').val() == 0){
            var filmObj = {};
            filmObj.title = $('#Title').val();
            filmObj.poster = $('#Poster').attr('src');
            filmObj.shortDesc = $('#ShortDesc').val();
    
            $.ajax({
                url : "http://localhost:3000/films",
                method : "POST",
                dataType : "json",
                contentType : 'application/json',
                data : JSON.stringify(filmObj),
                success : function(data){
                    $('#addEditFilm').modal('hide');
                    film.drawTable();
                }
            });
        }
        else{
            var filmObj = {};
            filmObj.title = $('#FullName').val();
            filmObj.poster = $('#Avatar').attr('src');
            filmObj.shortDesc = $('#DOB').val();
            filmObj.id = $('#id').val();
    
            $.ajax({
                url : "http://localhost:3000/films/" + filmObj.id,
                method : "PUT",
                dataType : "json",
                contentType : 'application/json',
                data : JSON.stringify(filmObj),
                success : function(data){
                    $('#addEditFilm').modal('hide');
                    film.drawTable();
                }
            });
        }
        

    }
};

film.delete = function(id){
    bootbox.confirm({
        title: "Remove film?",
        message: "Do you want to remove this film.",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url : "http://localhost:3000/films/" + id,
                    method : "DELETE",
                    dataType : "json",
                    contentType : 'application/json',
                    success : function(data){
                        film.drawTable();
                    }
                });
            }
        }
    });
};

film.getDetail = function(id){
    $.ajax({
        url : "http://localhost:3000/films/" + id,
        method : "GET",
        dataType : "json",
        success : function(data){
            $('#Title').val(data.title);
            $('#Poster').attr('src',data.poster);
            $('#ShortDesc').val(data.shortDesc);
            $('#id').val(data.id);

            $('#addEditFilm').modal('show');
        }
    });
};

film.reset = function(){
    $('#Title').val('');
    $('#ShortDesc').val('');
    $('#Poster').prop('src','data:image/png;base64,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');
    $('#id').val(0);
};

film.uploadPoster = function(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#Poster').attr('src', e.target.result);
            console.log(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

film.init = function(){
    film.drawTable();
};

$(document).ready(function(){
    film.init();
});