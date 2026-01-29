// Login Form Handler
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/dashboard.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: data.message,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi kesalahan saat login",
    });
  }
});

// Register Form Handler
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById(
      "registerConfirmPassword",
    ).value;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Password dan konfirmasi password tidak cocok",
      });
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: data.message,
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // Pindah ke tab login
          document.getElementById("login-tab").click();
          // Reset form
          document.getElementById("registerForm").reset();
          // Set username di login form
          document.getElementById("loginUsername").value = username;
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registrasi Gagal",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan saat registrasi",
      });
    }
  });
