   const buttons = document.querySelectorAll("nav button");
    const pages = document.querySelectorAll(".page");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const targetPage = button.dataset.page;

        // Update active button
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Show the selected "page"
        pages.forEach(page => {
          page.classList.toggle("active", page.id === targetPage);
        });
      });
    });