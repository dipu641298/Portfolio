// Contact form: posts to the Azure Static Web Apps managed API at /api/contact
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var note = document.getElementById("cf-note");
  var submit = document.getElementById("cf-submit");

  function setNote(message, ok) {
    note.textContent = message;
    note.className = "form-note " + (ok ? "form-note--ok" : "form-note--err");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim()
    };

    if (!data.name || !data.email || !data.message) {
      setNote("Please fill in every field.", false);
      return;
    }

    submit.disabled = true;
    setNote("Sending…", true);

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json().catch(function () { return {}; });
      })
      .then(function () {
        form.reset();
        setNote("Thanks — your message is on its way.", true);
      })
      .catch(function () {
        setNote("Something went wrong. Please email me directly instead.", false);
      })
      .finally(function () {
        submit.disabled = false;
      });
  });
})();
