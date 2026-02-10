const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  alert("Token tidak ditemukan");
}

async function loadData() {
  const users = await fetch("users.json").then(res => res.json());
  const pengambilan = await fetch("pengambilan.json").then(res => res.json());

  const user = users.find(u => u.token === token);
  if (!user) {
    alert("User tidak ditemukan");
    return;
  }

  document.getElementById("nama").innerText = user.nama;
  document.getElementById("pangkalan").innerText = user.pangkalan;

  const dataUser = pengambilan.filter(p => p.token === token);

  let total = 0;
  const list = document.getElementById("list");
  list.innerHTML = "";

  dataUser.forEach(d => {
    total += d.nilai;
    list.innerHTML += `
      <div class="item">
        <strong>${d.tanggal}</strong>
        <span>${d.jenis}</span>
        <span>Rp ${d.nilai.toLocaleString()}</span>
      </div>
    `;
  });

  document.getElementById("total").innerText =
    "Rp " + total.toLocaleString();
}

loadData();
