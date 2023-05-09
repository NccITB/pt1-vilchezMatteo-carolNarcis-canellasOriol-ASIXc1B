actualitzaRellotja()
function actualitzaRellotja(){
        momentActual = new Date()
        hora = momentActual.getHours()
        minut = momentActual.getMinutes()
        segons = momentActual.getSeconds()

        if (hora < 10) hora = "0" + hora
        if (minut < 10) minut = "0" + minut
        if (segons < 10) segons = "0" + segons

        horaImprimible = hora + " : " + minut + " : " + segons

        //document.title = horaImprimible
        horaActual.innerHTML= horaImprimible

        setTimeout("actualitzaRellotja()",1000)
}