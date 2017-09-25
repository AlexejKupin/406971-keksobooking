var type = ['flat', 'house', 'bungalo'];
var MIN_PRISE = 1000;
var MAX_PRISE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var description = '';
var photos = [];
var MIN_X = 300;
var MAX_X= 900;
var MIN_Y = 100;
var MAX_Y= 500;
var SIZE_OF_PIN_ICON_X = 35;
var SIZE_OF_PIN_ICON_Y = 48;
var MIN_GUESTS = 1;
var MAX_GUESTS = 15;
var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var advertData = {};
var typeOfAssetsKeys = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
};

var generateRandomAvatars = function(amount) {
  var avatars = [];
  for (i = 0; i < amount; i++)  {
    avatars[i] = 'img/avatars/user0'+ (i+1) +'.png';
  };
  var shuffle = function (a, b) {
    return Math.random() - 0.5;
  };
  return avatars.sort(shuffle);
};

var avatars = generateRandomAvatars(8);

var randomFromInterval = function(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
};

var randomData = function(arrayData) {
 return Math.floor(Math.random() * arrayData.length)
}; 

var tokyo__pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

var AdvertData = function() {
  
  this.author = {
    "avatar": avatars[i],
  };

  this.location = {
    "x": randomFromInterval(MIN_X, MAX_X),
    "y": randomFromInterval(MIN_Y, MAX_Y),
  };

  this.offer = {
    "title": title[randomData(title)],
    "adress": ('{{' + this.location.x + '}}, {{' + this.location.y + '}}'),
    "price": randomFromInterval(MIN_PRISE, MAX_PRISE),
    "type": type[randomData(type)],
    "rooms": randomFromInterval(MIN_ROOMS, MAX_ROOMS),
    "guests": randomFromInterval(MIN_GUESTS, MAX_GUESTS),
    "checkin": checkin[randomData(checkin)],
    "checkout": checkout[randomData(checkout)],
    "features": features.filter(function(number) {
      return (Math.random() > 0.5);
     }), 
    "description": description,
    "photos": photos,
  };
};

var generateAdvert = function() {
  for (i = 0; i <= 7; i++) {
    var numberItem = i;

    advertData[i] = new AdvertData();

    var newElement = document.createElement('div');
    var img = document.createElement('img');
    newElement.className = 'pin';
    newElement.style.left = (advertData[i]["location"]["x"] + SIZE_OF_PIN_ICON_X / 2) + 'px';
    newElement.style.top = (advertData[i]["location"]["y"] + SIZE_OF_PIN_ICON_Y) + 'px';
    newElement.appendChild(img);
    img.setAttribute('width', 40);
    img.setAttribute('height', 40);
    img.className = "rounded";
    img.setAttribute('src', avatars[i]);
    newElement.setAttribute('data', numberItem);
    newElement.setAttribute('tabindex', 0);
    fragment.appendChild(newElement);
    title.splice(randomData(title), 1);
  };
};

generateAdvert();

tokyo__pinMap.appendChild(fragment);

var lodgeTemplate = document.querySelector('#lodge-template');
var dialogPanel = document.querySelector('.dialog__panel');

var element = lodgeTemplate.content.cloneNode(true);

var title = element.querySelector('.lodge__title');
title.textContent = advertData[0].offer.title;

var adress = element.querySelector('.lodge__address');
adress.textContent = advertData[0].offer.adress;

var price = element.querySelector('.lodge__price');
price.textContent= advertData[0].offer.price +'₽'+'/ночь';

var type = element.querySelector('.lodge__type');
type.textContent = typeOfAssetsKeys[advertData[0].offer.type];

var roomsAndGuests = element.querySelector('.lodge__rooms-and-guests');
roomsAndGuests.textContent = 'для ' + advertData[0].offer.guests + ' гостей в ' + advertData[0].offer.rooms + ' комнатах';

var checkInOut = element.querySelector('.lodge__checkin-time');
checkInOut.textContent = 'Заезд после ' + advertData[0].offer.checkin + ', выезд до ' + advertData[0].offer.checkout;

var features = element.querySelector('.lodge__features');

for (i = 0; i <= advertData[0].offer.features.length - 1; i++) {
  var span = document.createElement('span');
  span.className = 'feature__image  feature__image--'+ advertData[0].offer.features[i];
  features.appendChild(span);
};

var description = element.querySelector('.lodge__description');
description.textContent = advertData[0].offer.description;

var offerDialog = document.querySelectorAll('#offer-dialog');
offerDialog[0].replaceChild(element.children[0], dialogPanel);

var dialogTitle = document.querySelector('.dialog__title');
dialogTitle.children[0].setAttribute('src', advertData[0].author.avatar);