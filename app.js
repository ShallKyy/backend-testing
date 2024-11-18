const express = require("express");
const app = express();
const axios = require("axios");
const e = require("express");

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let n = 1;
  fetch(
    "https://kelembagaanpsdaaceh.biocircular.id/api/api.php?request=data.json"
  )
    .then((res) => res.json())
    .then((data) => {
      res.render("index", {
        data: data.produk,
        n,
      });
    });
});

app.post("/", async (req, res) => {
  const apiUrl =
    "https://kelembagaanpsdaaceh.biocircular.id/api/api.php?request=add-product";

  const data = req.body;
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 201) {
        res.redirect("/");
      }
    
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengirim data",
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
