  const buttons = document.querySelectorAll("nav button");
  const pages = document.querySelectorAll(".page");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const targetPage = button.dataset.page;

      // Update active button
      buttons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Show the selected page
      pages.forEach(page => {
        page.classList.toggle("active", page.id === targetPage);
      });
    });
  });

  // HALLOWEEN BACKGROUND MUSIC
  const backgroundMusic = document.getElementById("backgroundMusic");
  const musicButton = document.getElementById("musicButton");

  backgroundMusic.volume = 0.3; // 30% volume

  musicButton.addEventListener("click", async () => {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        musicButton.textContent = "🔇 Pause Halloween Waltz";
      } catch (error) {
        musicButton.textContent = "🎃 Click to try music again";
      }
    } else {
      backgroundMusic.pause();
      musicButton.textContent = "🎃 Play Halloween Waltz";
    }
  });