document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const storedTheme = localStorage.getItem('theme');
    if(storedTheme){
        themeStylesheet.href = storedTheme;
    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        // if it's light -> go dark
        if(themeStylesheet.href.includes('main')){
            themeStylesheet.href = './Style/darkmain.css';
            themeToggle.innerText = 'Switch to light mode';

        } else {
            // if it's dark -> go light
            themeStylesheet.href = './Style/main.css';
            themeToggle.innerText = 'Switch to dark mode';
        }
        // save the preference to localStorage
        localStorage.setItem('theme',themeStylesheet.href)  
    })
})