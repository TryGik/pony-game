const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const cards = document.querySelectorAll('.card');


function mamoryGame () {   
    
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    function shuffleCard(arr) {
        shuffle(arr);
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.order = arr[i];
        }
    }
    
    shuffleCard(arr)
    
    function flipCard () {
        if (lockBoard) return;
        if (this === firstCard) return;
    
        this.classList.add('flip');
    
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
    
        secondCard = this;
        
        checkCard ();
    }
    
    function checkCard () {
        if (firstCard.dataset.equal === secondCard.dataset.equal) {
            disableCards();
            return;
        } else unflipCards();
    }
    
    function disableCards() {
        firstCard.removeEventListener ('click', flipCard);
        secondCard.removeEventListener ('click', flipCard);
    
        resetBoard();
    }
    
    function unflipCards() {
        lockBoard = true;
        setTimeout (() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
    
            resetBoard();
        }, 1500)
    }
    
    cards.forEach(card => card.addEventListener('click', flipCard));


}
mamoryGame ();





const btnRestart = document.querySelector('.restart');
btnRestart.addEventListener('click', () => {
    cards.forEach (card => card.classList.remove('flip'));
    mamoryGame ();
    return;
});




