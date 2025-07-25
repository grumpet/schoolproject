document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const songList = document.getElementById('song-list');
    const currentSongName = document.getElementById('current-song-name');
    
    // Sample songs - you can modify this array to match your audio files
    const songs = [
        { name: 'Song 1', file: '/audio/1.wav' },
        { name: 'Song 2', file: '/audio/2.wav' },
        { name: 'Song 3', file: '/audio/3.wav' },
    ];
    
    // Load playlist
    function loadPlaylist() {
        songList.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <button class="song-button" data-index="${index}">
                    <span class="song-name">${song.name}</span>
                    <span class="play-icon">▶</span>
                </button>
            `;
            songList.appendChild(li);
        });
    }
    
    // Play selected song
    function playSong(index) {
        const song = songs[index];
        if (song) {
            audioPlayer.src = song.file;
            currentSongName.textContent = song.name;
            audioPlayer.load();
            
            // Update active song styling
            document.querySelectorAll('.song-button').forEach(btn => {
                btn.classList.remove('active');
            });
            document.querySelector(`[data-index="${index}"]`).classList.add('active');
        }
    }
    
    // Event listeners
    songList.addEventListener('click', function(e) {
        if (e.target.closest('.song-button')) {
            const index = parseInt(e.target.closest('.song-button').dataset.index);
            playSong(index);
        }
    });
    
    // Auto-play next song when current ends
    audioPlayer.addEventListener('ended', function() {
        const activeButton = document.querySelector('.song-button.active');
        if (activeButton) {
            const currentIndex = parseInt(activeButton.dataset.index);
            const nextIndex = (currentIndex + 1) % songs.length;
            playSong(nextIndex);
            audioPlayer.play();
        }
    });
    
    // Initialize playlist
    loadPlaylist();
});
