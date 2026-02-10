const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.body.innerHTML = "TOKEN TIDAK DITEMUKAN";
  throw new Error("Token kosong");
}

async function loadData() {
  const users = await fetch("users.json").then(r => r.json());
  const transaksi = await fetch("transaksi.json").then(r => r.json());
  const pengambilan = await fetch("pengambilan.json").then(r => r.json());

  const user = users.find(u => u.token === token);
  if (!user) {
    document.body.innerHTML = "USER TIDAK DITEMUKAN";
    return;
  }

  document.getElementById("token").innerText = user.token;
  document.getElementById("nama").innerText = user.nama;
  document.getElementById("pangkalan").innerText = user.pangkalan;

  const transaksiUser = transaksi.filter(t => t.token === token);
  const pengambilanUser = pengambilan.filter(p => p.token === token);

  const totalSetor = transaksiUser.reduce((s, t) => s + Number(t.tabungan || 0), 0);
  const totalBonus = transaksiUser.reduce((s, t) => s + Number(t.bonus || 0), 0);
  const totalTarik = pengambilanUser.reduce((s, p) => s + Number(p.nilai || 0), 0);

  document.getElementById("saldo").innerText =
    "Rp " + (totalSetor - totalTarik).toLocaleString("id-ID");

  document.getElementById("bonus").innerText =
    "Rp " + totalBonus.toLocaleString("id-ID");

  const tabelTransaksi = document.getElementById("tabel-transaksi");
  transaksiUser.forEach(t => {
    tabelTransaksi.innerHTML += `
      <tr>
        <td>${t.tanggal}</td>
        <td>Rp ${Number(t.tabungan).toLocaleString("id-ID")}</td>
        <td>Rp ${Number(t.bonus).toLocaleString("id-ID")}</td>
      </tr>`;
  });

  const tabelPengambilan = document.getElementById("tabel-pengambilan");
  pengambilanUser.forEach(p => {
    tabelPengambilan.innerHTML += `
      <tr>
        <td>${p.tanggal}</td>
        <td>${p.jenis}</td>
        <td>Rp ${Number(p.nilai).toLocaleString("id-ID")}</td>
      </tr>`;
  });
}

loadData();
