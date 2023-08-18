const words = [
    'play',
    'connect',
    'code',
    'scratch'
    // Add more words here
  ];

  const typingContainer = document.getElementById('new_way_to');

  async function typeWord(word) {
    for (let i = 0; i < word.length; i++) {
      typingContainer.textContent = word.substring(0, i + 1);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve, 2000)); // Pause for a second
    for (let i = word.length - 1; i >= 0; i--) {
      typingContainer.textContent = word.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    await new Promise(resolve => setTimeout(resolve,1000)); // Pause for a second
  }

  async function startTyping() {
    while (true) {
        for (const word of words) {
        await typeWord(word);
        }
    }
  }

  startTyping();