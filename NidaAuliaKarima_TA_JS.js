$(document).ready(function () {
  // 4. jQuery Event
  $("button").click(function () {
    var kota = $("#namakota").val(); // 1. Variabel
    if (kota == "") {
      alert("Nama kota harus diisi"); // 2. Blok Kondisional
    } else {
      cariWaktuSholat(); // 3. Fungsi
    }
    function cariWaktuSholat() {
      var apiUrl = "https://muslimsalat.p.rapidapi.com/" + kota + ".json";
      console.log(kota);
      $.ajax({
        // 6. AJAX
        url: apiUrl,
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "afdb0a64bfmsh7f8171af38dc2a1p17ee62jsneecd45c87d38",
          "X-RapidAPI-Host": "muslimsalat.p.rapidapi.com",
        },
        success: function (res) {
          $("#thnamakota").text(res.state); // 5. jQuery DOM
          $("#tdfajr").text(res.items[0].fajr);
          $("#tddhuhr").text(res.items[0].dhuhr);
          $("#tdasr").text(res.items[0].asr);
          $("#tdmaghrib").text(res.items[0].maghrib);
          $("#tdisha").text(res.items[0].isha);
          valtemp = res.today_weather.temperature;
          if (valtemp != null && valtemp > 0) {
            $("#temperatur").text(res.today_weather.temperature);
          } else {
            alert("Data temperatur tidak ditemukan");
            $("#temperatur").text("Data temperatur tidak ditemukan");
          }
          $(".container-hasil").addClass("background-pink");
        },
        error: function (xhr, status, error) {
          alert("Terjadi kesalahan dalam memuat data.");
          console.error(error);
        },
      });
    }
  });
  // Event handler untuk event resize halaman web
  $(window).resize(function () {
    console.log("Halaman web di-resize");
  });
});
