$(async function () {
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    // Step 1
    async function draw1(baseURL, deckId) {
        let data = await $.getJSON(`${baseURL}/${deckId}/draw/`);
        return data;
    }

    let singleCardData = await draw1(baseURL, "new");
    let { suit, value } = singleCardData.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);

    // Step 2
    let firstCardData = await draw1(baseURL, "new");
    let firstCard = firstCardData.cards[0];
    let deckId = firstCardData.deck_id;

    let secondCardData = await draw1(baseURL, deckId);
    let secondCard = secondCardData.cards[0];

    [firstCard, secondCard].forEach(function (card) {
        console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );
    });

    // Step 3
    async function getIdNewShuffledDeck(baseURL) {
        let data = await $.getJSON(`${baseURL}/new/shuffle/`)
        deckId = data.deck_id;
        return deckId;
    }

    let $btn = $('button');
    let $cardArea = $('#card-area');
    deckId = await getIdNewShuffledDeck(baseURL);
    $btn.show();

    $btn.on('click', async function () {
        let data = await draw1(baseURL, deckId);
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
            $('<img>', {
                src: cardSrc,
                css: {
                    transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
            })
        );
        if (data.remaining === 0) $btn.remove();
    });
});