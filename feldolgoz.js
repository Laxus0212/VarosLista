
$(function () {
    $('#varos').keyup(adatBeolvas);
    $("article").delegate("table th", "click", rendezesSort);
});
var irany = true;
function rendezesSort() {
    var aktOszlop = $(this).attr("id");//Number(this.id);
    console.log(aktOszlop);
    varosokTomb.sort(function (a, b)
    {
        var number;
        if (irany) {
            number = Number(a[aktOszlop] > b[aktOszlop]) * 2 - 1;
        } else {
            number = Number(a[aktOszlop] < b[aktOszlop]) * 2 - 1;
        }
        return number;
    }
    );
    tablabaKiir();
    irany = !irany;
}

var varosokTomb = [];
function adatBeolvas() {
    var varosErtek = $('#varos').val();
    console.log(varosErtek);

    $.ajax({
        type: 'GET',
        url: "feldolgoz.php?varos=" + varosErtek,
        success: function (eredmeny) {
            //$("article").html(eredmeny);

            varosokTomb = JSON.parse(eredmeny);
            //console.log(varosokTomb);
            kiir();
        }
    });
}
function kiir() {
    var txt = "";
    txt = "<select>";
    $("article").html("");
    for (var i = 0; i < varosokTomb.length; i++) {
        txt += "<option>" + varosokTomb[i].nev + "</option>";
        //$("article").append(varosokTomb[i].nev).append("<br>");
    }
    txt += "</select>";
    $("#valasztoLista").html(txt);
    tablabaKiir();
}

function tablabaKiir() {
    var tablazat = "";
    tablazat = "<table><tr><th id=\"nev\">Nev</th><th id=\"megye\">Megye</th><th id=\"jaras\">Járás</th><th id=\"kisterseg\">Kistérség</th><th id=\"nepesseg\">Népesség</th><th id=\"terulet\">Terület</th><th id=\"iranyitoszam\">Irányítószám</th><th id=\"miota_varos\">Mióta város</th><th id=\"tipus\">Típus</th></tr>";
    for (var i = 0; i < varosokTomb.length; i++) {
        tablazat += "<tr><td>" + varosokTomb[i].nev + "</td>" + "<td>" + varosokTomb[i].megye + "</td>" + "<td>" + varosokTomb[i].jaras + "</td>" + "<td>" + varosokTomb[i].kisterseg + "</td>" + "<td>" + varosokTomb[i].nepesseg + "</td>" + "<td>" + varosokTomb[i].terulet + "</td>" + "<td>" + varosokTomb[i].iranyitoszam + "</td>" + "<td>" + varosokTomb[i].miota_varos + "</td>" + "<td>" + varosokTomb[i].tipus + "</td></tr>";
    }
    tablazat += "</table>";
    $("article").html(tablazat);
}





