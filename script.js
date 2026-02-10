const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (!token) {
  document.body.innerHTML = "TOKEN TIDAK ADA";
  throw new Error("Token kosong");
}

async function loadData() {
  try {
    const users = await fetch("./users.json").then(r => r.json());
    const pengambilan = await fetch("./pengambilan.json").then(r => r.json());

    const user = users.find(u => u.token === token);

    if (!user) {
      document.body.innerHTML = "USER TIDAK DITEMUKAN";
      return;
    }

    document.getElementById("nama").innerText = user.nama;
    document.getElementById("pangkalan").innerText = user.pangkalan;

    const dataUser = pengambilan.filter(p => p.token === token);

    let total = 0;
    const list = document.getElementById("list");
    list.innerHTML = "";

    dataUser.forEach(d => {
      total += Number(d.nilai);
      list.innerHTML += `
        <div class="item">
          <strong>${d.tanggal}</strong>
          <span>${d.jenis}</span>
          <span>Rp ${d.nilai.toLocaleString("id-ID")}</span>
        </div>
      `;
    });

    document.getElementById("total").innerText =
      "Rp " + total.toLocaleString("id-ID");

  } catch (err) {
    console.error(err);
    document.body.innerHTML = "DATA ERROR / JSON TIDAK VALID";
  }
}

loadData();
