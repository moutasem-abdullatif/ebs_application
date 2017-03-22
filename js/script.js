/**
 * Created by moutasem on 3/22/2017.
 */
$(document).ready(function () {
    //Amac ve Hedefler
    $("#amac").click(function () {

        $('.side-nav li.active').removeClass('active');
        $(this).parent().addClass('active');

        var $page_body = $("#page-body");
        $page_body.hide();
        $.ajax({
            url: "AmacVeHedefler.txt",
            success: function (data) {
                $page_body.html(data).slideDown(200);
            }
        });
    });

    //AKTS
    $("#ders-plani").click(function () {

        $('.side-nav li.active').removeClass('active');
        $(this).parent().addClass('active');

        var $page_body = $("#page-body");
        $page_body.hide();

        $.ajax({
            url: "DersPlani.html",
            cache:false,
            success: function (data) {
                $page_body.html(data).slideDown(200);
            }
        });
    });

    $(".container-fluid").on('click', '.dersler tr', function () {
        var $this = $(this);
        $(".dersler .inserted").animate({height: 0}, 200, "linear", function () {
            $(this).remove();
        });

        var value = $(this).children('.input_value').val();
        var data = "";

        $.getJSON("DersIcerigi.json", function (json) {

            //filter json jsonay to get the desired course
            json = json.filter(function (elem) {
                return elem.id === value;
            });

            json.forEach(function (elem) {

                data = "<tr class='inserted'><td colspan='7'><div class='panel panel-success inserted text-left'>";
                data += "<div class='panel-heading'>" +
                    "<h5>Ders bilgileri</h5>";
                data += "</div>" +
                    "<div class='panel-body'>" +
                    "<div class='table-responsive'>" +
                    "<table class='table table-bordered table-striped table-condensed '>" +
                    "<thead>" +
                    "<tr>"+
                    "<th>Ders</th>" +
                    "<th>Kodu</th>" +
                    "<th>Yarilyil</th>" +
                    "<th>T+U Saat</th>" +
                    "<th>Kredi</th>" +
                    "<th>AKTS</th>" +
                    "</tr>"+
                    "</thead>" +
                    "<tbody>" +
                    "<tr>" +
                    "<td>" + elem.genel.ders + "</td>" +
                    "<td>" + elem.genel.kodu + "</td>" +
                    "<td>" + elem.genel.yariyil + "</td>" +
                    "<td>" + elem.genel.tusaat + "</td>" +
                    "<td>" + elem.genel.kredi + "</td>" +
                    "<td>" + elem.genel.akts + "</td>" +
                    "</tr>" +
                    "</tbody>" +
                    "</table>" +
                    "</div>" +
                    "<div class='table-responsive'>" +
                    "<table class='table table-bordered table-striped table-condensed text-center'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<th style='width: 25%;' '>Ön Koşul Dersler</th>"+
                    "<td>"+ elem.onkosulders +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Önerilen Seçmeli Dersler</th>"+
                    "<td>"+ elem.onerilenders +"</td>"+
                    "</tr>"+
                    "</tbody>"+
                    "</table>"+
                    "</div>"+
                    //
                    "<div class='table-responsive'>" +
                    "<table class='table table-bordered table-striped table-condensed text-center'>" +
                    "<tbody>" +
                    "<tr>" +
                    "<th style='width: 25%;' '>Dersin Dili</th>"+
                    "<td>"+ elem.dersindili +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Dersin Seviyesi</th>"+
                    "<td>"+ elem.dersseviyesi +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Dersin Türü</th>"+
                    "<td>"+ elem.dersturu +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Dersin Koordinatörü</th>"+
                    "<td>"+ elem.derskoord +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Ders Verenler</th>"+
                    "<td>"+ elem.onkosulders +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Ders Yardımcılar</th>"+
                    "<td>"+ elem.dersyardim +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Dersin Amacı</th>"+
                    "<td>"+ elem.dersamaci +"</td>"+
                    "</tr>"+
                    "<tr>" +
                    "<th>Ders İçeriği</th>"+
                    "<td>"+ elem.dersicerigi +"</td>"+
                    "</tr>"+
                    "</tbody>"+
                    "</table>"+
                    "</div>"+
                    //
                    "</div>" +
                    "</div>" +
                    "</td>" +
                    "</tr>";
                $(data).insertAfter($this);
            });//endforeach
        });//endjson
    });


    //program ogrenim ciktilari
    $("#ciktilari").click(function () {

        $('.side-nav li.active').removeClass('active');
        $(this).parent().addClass('active');

        var $page_body = $("#page-body");
        var data="";
        $page_body.hide();
        $.ajax({
            url: "ProgramOgrenmeCiktilari.xml",
            dataType:"xml",
            success: function (xml) {

                $(xml).find('field')
                    .each(function (index , elem) {
                        var field = $(elem);

                        data+="<h3>"+  field.find('fieldname').text() +"</h3><ul>";

                        field.find('fieldvalue').each(function (i , e) {
                            var fieldvalue = $(e);
                            data+="<li>"+ fieldvalue.text() +"</li>";
                        });

                        data+="</ul>";
                    });
                $page_body.html(data).slideDown(200);
            }
        });

    });
});