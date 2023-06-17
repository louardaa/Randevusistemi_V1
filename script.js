document.getElementById("randevuForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

    var tarihSaatInput = document.getElementById("tarihSaat");
    var adInput = document.getElementById("ad");
    var tarihSaat = tarihSaatInput.value;
    var ad = adInput.value;

    if (randevuMevcutMu(tarihSaat)) {
        alert("Seçilen saatte randevu mevcut. Lütfen başka bir saat deneyin.");
    } else {
        randevuEkle(tarihSaat, ad);
        alert("Randevu başarıyla alındı!");
        tarihSaatInput.value = "";
        adInput.value = "";
        window.location.href = "randevu.html"; // Randevu alındıktan sonra randevu.html sayfasına yönlendir
    }
});

function randevuMevcutMu(tarihSaat) {
    var saat = new Date(tarihSaat).getHours();
    return (randevular[saat] !== undefined);
}

function randevuEkle(tarihSaat, ad) {
    var saat = new Date(tarihSaat).getHours();
    randevular[saat] = ad;
    localStorage.setItem("randevular", JSON.stringify(randevular));
}

function iptalEt(saat) {
    delete randevular[saat];
    localStorage.setItem("randevular", JSON.stringify(randevular));
}

function guncelleRandevuSaatleri() {
    var randevuSaatleriDiv = document.getElementById("randevuSaatleri");
    randevuSaatleriDiv.innerHTML = "";

    for (var saat = 0; saat < 24; saat++) {
        var saatDiv = document.createElement("div");
        saatDiv.classList.add("saat");

        var saatSpan = document.createElement("span");
        saatSpan.textContent = saat + ":00";

        var durumSpan = document.createElement("span");
        durumSpan.classList.add("durum");

        if (randevular[saat] !== undefined) {
            saatDiv.classList.add("aktif");
            durumSpan.textContent = "Dolu - " + randevular[saat] + " tarafından alındı";

            var iptalButton = document.createElement("button");
            iptalButton.textContent = "İptal Et";
            iptalButton.dataset.saat = saat;
            iptalButton.addEventListener("click", function() {
                iptalEt(this.dataset.saat);
                guncelleRandevuSaatleri();
            });

            saatDiv.appendChild(iptalButton);
        } else {
            saatDiv.classList.add("pasif");
            durumSpan.textContent = "Boş";
        }

        saatDiv.appendChild(saatSpan);
        saatDiv.appendChild(durumSpan);
        randevuSaatleriDiv.appendChild(saatDiv);
    }
}

var randevular = JSON.parse(localStorage.getItem("randevular")) || {};
guncelleRandevuSaatleri();
