document.addEventListener('DOMContentLoaded', () => {
  const token = sessionStorage.getItem('userToken');

  fetch('/api/v1/levels/all', {
    headers: { 'Authorization': `Bearer ${token}`}
  })
  .then(response => response.json())
  .then(levels => {
    const levelsContainer = document.getElementById('levels');
    levels.forEach(level => {
      const levelDiv = document.createElementById('div');
      levelDiv.textContent = `Level ${level.order}`;
      levelDiv.className = level.isCompleted ? 'unlocked' : 'locked';
      levelsContainer.appendChild(levelDiv);
    });
  })
  .catch(error => console.error('Error fetching levels:', error));
})