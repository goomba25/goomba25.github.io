const searchItem = document.querySelector('.search');
const searchInput = searchItem.querySelector('input');

searchItem.addEventListener('click', function() {
    searchInput.focus();
})

searchInput.addEventListener('focus', function() {
    searchItem.classList.add('focused');
    searchInput.setAttribute('placeholder', '검색');
});

searchInput.addEventListener('blur', function() {
    searchItem.classList.remove('focused');
    searchInput.setAttribute('placeholder', '');
});