function actualitzaRellotja(){
    momentActual = new Date();
    hora = momentActual.getHours();
    minut = momentActual.getMinutes();
    segons = momentActual.getSeconds();
  
    if (hora < 10) hora = "0" + hora;
    if (minut < 10) minut = "0" + minut;
    if (segons < 10) segons = "0" + segons;
  
    horaImprimible = hora + " : " + minut + " : " + segons;
  
    //document.title = horaImprimible
    horaActual.innerHTML= horaImprimible;
  
    setTimeout("actualitzaRellotja()",1000);
  }
  
  var timeLeft; // tiempo restante
  var timerId; // identificador del temporizador
  
  function startTimer() {
    var inputHours = document.getElementById("hrs").value; // número de horas
    var inputMinutes = document.getElementById("mins").value; // número de minutos
    timeLeft = inputHours * 3600 + inputMinutes * 60; // convertir a segundos
  
    // actualizar y mostrar el temporizador
    timerId = setInterval(countdown, 1000);
    function countdown() {
      var hours = Math.floor(timeLeft / 3600);
      var minutes = Math.floor((timeLeft - (hours * 3600)) / 60);
      var seconds = timeLeft % 60;
  
      // formatear las horas, minutos y segundos
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
  
      // mostrar el temporizador
      document.getElementById("demo").innerHTML = hours + ":" + minutes + ":" + seconds;
  
      // decrementar el tiempo restante
      timeLeft--;
  
      // detener el temporizador una vez que se haya alcanzado el tiempo
      if (timeLeft < 0) {
        clearInterval(timerId);
        document.getElementById("demo").innerHTML = "00:00:00";
        alert("¡Tiempo agotado!");
      }
    }
  }
  
  function stopTimer() {
    clearInterval(timerId); // detener el temporizador
    timeLeft = 0; // restablecer el tiempo restante
    document.getElementById("demo").innerHTML = ""; // borrar el contenido del elemento HTML
  }
  
  const elementTempoRestant = document.getElementById("tempsRestantImprimible");
  let tempsSegons = 0;
  let tempsRestant = 0;
  let idTimeoutTemporitzador;
  
  function startTemporitzador() {
    let tempsIntroduit = document.getElementById("temps").value;
    let tempsHM = tempsIntroduit.split(":");
    tempsSegons = tempsHM[0] * 3600 + tempsHM[1] * 60;
    tempsRestant = tempsSegons;
  
    if (idTimeoutTemporitzador) {
      return;
    }
  
    idTimeoutTemporitzador = setTimeout(contarAtrasTemporitzador, 1000);
  }
  
  function stopTemporitzador() {
    if (!idTimeoutTemporitzador) {
      return;
    }
  
    clearTimeout(idTimeoutTemporitzador);
    idTimeoutTemporitzador = undefined;
    tempsRestant = 0;
    elementTempoRestant.textContent = "00:00";
  }
  
  function contarAtrasTemporitzador() {
    if (tempsRestant <= 0) {
      stopTemporitzador();
      elementTempoRestant.textContent = "00:00:00";
      alert("¡Tiempo agotado!");
      return;
    }
    if (tempsRestant === 4) {
      let audio = new Audio('relojsonido.mp3');
      audio.play();
    }
    let hours = Math.floor(tempsRestant / 3600);
    let minutes = Math.floor((tempsRestant % 3600) / 60);
    let seconds = tempsRestant % 60;
    let tempsRestantFormatat = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    elementTempoRestant.textContent = tempsRestantFormatat;
  
    tempsRestant--;
    idTimeoutTemporitzador = setTimeout(contarAtrasTemporitzador, 1000);
  }
  
  document.getElementById('id-sun').onclick = function(){
    document.getElementById('page').classList.remove('dark-mode');
    document.getElementById('id-moon').classList.remove('active');
    this.classList.add('active');
  }
  
  document.getElementById('id-moon').onclick = function(){
    document.getElementById('page').classList.add('dark-mode');
    document.getElementById('id-sun').classList.remove('active');
    this.classList.add('active');
  }
  
  function activarModoClaro() {
    var body = document.querySelector("body");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
  
  function activarModoOscuro() {
    var body = document.querySelector("body");
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  }
  
  const canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth * 0.6;
  canvas.height = window.innerHeight * 0.8;
  const ctx = canvas.getContext("2d");
  const sliceSize = Math.PI / 12;
  let slices = [];
  let names = [];
  
  function drawSlice(startAngle, endAngle, color) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width * 0.3,
      startAngle,
      endAngle
    );
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  function draw() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    ctx.beginPath();
    ctx.arc(
      centerX,
      centerY,
      canvas.width * 0.225,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#333333";
    ctx.stroke();
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    let angle = 0;
    for (let i = 0; i < names.length; i++) {
      const sliceAngle = (2 * Math.PI) / names.length;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        canvas.width * 0.3,
        angle,
        angle + sliceAngle
      );
      ctx.fillStyle = slices[i];
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#000";
      ctx.font = `bold ${canvas.width * 0.01}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const textRadius = canvas.width * 0.1;
      const cosAngle = Math.cos(angle + sliceAngle / 2);
      const sinAngle = Math.sin(angle + sliceAngle / 2);
      const textX = centerX + cosAngle * (canvas.width * 0.3 + textRadius) / 2;
      const textY = centerY + sinAngle * (canvas.width * 0.3 + textRadius) / 2;
  
      ctx.fillText(
        names[i],
        textX,
        textY
      );
      angle += sliceAngle;
    }
  }
  
  function readTextFile() {
    const xhr = new XMLHttpRequest();
    const file = "nombres.txt";
    xhr.open("GET", file, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        names = xhr.responseText.split("\n").filter((name) => name.trim() !== "");
        slices = Array(names.length)
          .fill()
          .map(() => "#" + ((Math.random() * 0xffffff) << 0).toString(16));
        draw();
      }
    };
    xhr.send();
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    readTextFile("nombres.txt");
  });
  
  document.getElementById("spin-btn").addEventListener("click", () => {
    const audio = document.getElementById("audio");
    const random = Math.floor(Math.random() * names.length);
    const nextName = names[random];
    const sliceAngle = random * sliceSize;
    const spinAngle = sliceAngle + Math.PI * (2 + Math.random() * 2);
    canvas.style.transition = `transform 5.5s cubic-bezier(0.25, 0.1, 0.25, 1)`;
    canvas.style.transform = `rotate(${spinAngle}rad)`;
  
    audio.currentTime = 0;
    audio.play();
  
    setTimeout(() => {
      canvas.style.transition = "";
      canvas.style.transform = "";
      audio.pause();
      alert(`El nombre seleccionado es: ${nextName}`);
     }, 5600);
  });
  