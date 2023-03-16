/* Logic goes here */
let preferredUsers = [];
let savedPreferredUsers = [];

function init() {
    
    // this will return and array of obj's
    retriveUsers(50);
    


}

function retriveUsers(numHowManyUsersYouWant){
    let requestUrl = `https://random-data-api.com/api/v2/users?size=${numHowManyUsersYouWant}&response_type=json`;

    fetch(requestUrl)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        //do some thing with your data
        //maybe give it a card
        
        for (let index = 0; index < data.length; index++) {
            
          //appendChild form the methond that has the card
          document.querySelector('.container').append(createUserCard(data[index]));
          // let currentUser = createUserCard(data[index]);
          
          

        }
      });


}

function loadPreferredUsers(){

try {
    savedPreferredUsers = JSON.parse(localStorage.getItem('SomethingWeDecideOn'));
} catch (error) {
    
}

}

function createUserCard(cardData){

    let card = document.createElement('div');
    card.classList.add('card');

    let cardContent = document.createElement('div');
    cardContent.classList.add('card-content');

    let media = document.createElement('div');
    media.classList.add('media');

    let mediaLeft = document.createElement('div');
    mediaLeft.classList.add('media-left');

    let figure = document.createElement('figure');
    figure.classList.add('image');
    figure.classList.add('is-48x48');

    let img = document.createElement('img');
    img.src = 'https://bulma.io/images/placeholders/96x96.png';
    img.alt = 'Placeholder image';

    let mediaContent = document.createElement('div');
    mediaContent.classList.add('media-content');

    let title = document.createElement('p');
    title.classList.add('title');
    title.classList.add('is-4');
    title.textContent = `${cardData.first_name} ${cardData.last_name}`;

    let subtitle = document.createElement('p');
    subtitle.classList.add('subtitle');
    subtitle.classList.add('is-6');
    subtitle.textContent = `${cardData.email}`;

    let content = document.createElement('div');
    content.classList.add('content');
    content.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

    mediaContent.append(title);
    mediaContent.append(subtitle);
    figure.append(img);
    mediaLeft.append(figure);
    media.append(mediaLeft);
    media.append(mediaContent);
    cardContent.append(media);
    cardContent.append(content);
    card.append(cardContent);

    return card;
}


function savePreferredUsers(userObj){

    try {
        preferredUsers = JSON.parse(localStorage.getItem('SomethingWeDecideOn'));
    } catch (error) {
        
    }  
    
    localStorage.setItem()

}

init();