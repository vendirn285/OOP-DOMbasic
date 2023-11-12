let pendaftarData = [];

// Fungsi untuk tab registrasi dan list data
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Menggunakan implementasi async sederhana untuk validasi form
async function validateForm(event) {
    event.preventDefault();
  
    let nama = document.getElementById("nama").value;
    let umur = document.getElementById("umur").value;
    let uangSangu = document.getElementById("uangSangu").value;
  
    if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
      alert("Data tidak memenuhi kriteria. Periksa kembali!");
    } else {
      await simulateAsyncOperation();
      pendaftarData.push({ nama, umur, uangSangu });
      document.getElementById("registrationForm").reset();
      updatePendaftarTable();
    }
  }
  
  // Kita buat delay selama 3 detik untuk menyimpan dan reset form
  function simulateAsyncOperation() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Operasi Asinkron Selesai");
        resolve();
      }, 3000); 
    });
  }
  

// Fungsi untuk memasukan data input dari form ke dalam tabel
function updatePendaftarTable() {
  let tableBody = document.getElementById("pendaftarBody");
  tableBody.innerHTML = "";

  pendaftarData.forEach((pendaftar) => {
    let row = tableBody.insertRow();
    let cellNama = row.insertCell(0);
    let cellUmur = row.insertCell(1);
    let cellUangSangu = row.insertCell(2);

    cellNama.innerHTML = pendaftar.nama;
    cellUmur.innerHTML = pendaftar.umur;
    cellUangSangu.innerHTML = pendaftar.uangSangu;
  });

  // Fungsi untuk menghitung rata-rata umur dan uang saku pendaftar
  let totalUmur = 0;
  let totalUangSangu = 0;

  pendaftarData.forEach((pendaftar) => {
    totalUmur += parseInt(pendaftar.umur);
    totalUangSangu += parseInt(pendaftar.uangSangu);
  });

  let averageUmur = totalUmur / pendaftarData.length;
  let averageUangSangu = totalUangSangu / pendaftarData.length;

  // Implementasi untuk menampikan rata-rata pada browser
  let averageInfo = document.getElementById("averageInfo");
  averageInfo.innerHTML = `Rata-rata uang sangu Rp. ${averageUangSangu.toFixed(2)} <br/> rata-rata umur ${averageUmur.toFixed(2)} tahun`;
}

console.log(pendaftarData)