
var avatar = [];
var createAvatar = function() {
  for (i = 0; i < 8; i++)  {
    avatar[i] = 'img/avatars/user0'+ (i+1) +'.png';
  }
  return avatar[i];
};

createAvatar();

var title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var adress = ["{{location.x}}, {{location.y}}"];
var prise = []

var MIN_PRISE = 1000;
var MAX_PRISE = 1000000;

var createPrise = function() {
  for (i = 0; i <= 7; i++) {
    prise[i] = Math.floor(Math.random() * (MAX_PRISE - MIN_PRISE + 1)) + MIN_PRISE;
  }
  return prise[i];
};

createPrise();

var type = ['flat', 'house', 'bungalo'];

var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var rooms = [];
var creatRooms = function() {
  for (i = 0; i <= 7; i++) {
    rooms[i] = Math.floor(Math.random() * (MAX_ROOMS - MIN_ROOMS + 1)) + MIN_ROOMS;
  }
  return rooms[i];
}
creatRooms();

var guests = [];

var MIN_GUESTS = 1;
var MAX_GUESTS = 15;
var creatGuests = function() {
  for (i = 0; i <= 7; i++) {
    guests[i] = Math.floor(Math.random() * (MAX_GUESTS - MIN_GUESTS + 1)) + MIN_GUESTS;
  }
  return guests[i];
}
creatGuests();

var checkin = ['12:00', '13:00', '14:00'];
var checkout = ['12:00', '13:00', '14:00'];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var description = '';
var photos = [];
var locationX = [];
var locationY = [];
var MIN_X = 300;
var MAX_X= 900;
var MIN_Y = 100;
var MAX_Y= 500;
var SIZE_OF_PIN_ICON_X = 35;
var SIZE_OF_PIN_ICON_Y = 48;

var creatLocationX = function() {
  for (i = 0; i <= 7; i++) {
    locationX[i] = Math.floor(Math.random() * (MAX_X - MIN_X + 1)) + MIN_X; 
  }
  return locationX[i];
}
creatLocationX();


var creatLocationY = function() {
  for (i = 0; i <= 7; i++) {
    locationY[i] = Math.floor(Math.random() * (MAX_Y - MIN_Y + 1)) + MIN_Y; 
  }
  return locationY[i];
}
creatLocationY();

var advertData = {};



var tokyo__pinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

function creatAdvertData() {
  this.author = {
    "avatar": avatar[randAvatar],
  };

  this.offer = {
    "title": title[randTitle],
    "adress": ('{{' + locationX[randlocationX] + '}}, {{' + locationY[randlocationY] + '}}'),
    "price": prise[randPrice],
    "type": type[randType],
    "rooms": rooms[randRooms],
    "guests": guests[randGuests],
    "checkin": checkin[randCheckin],
    "checkout": checkout[randCheckout],
    "features": randFeatures,
    "description": description,
    "photos": photos,
  };

  this.location = {
    "x": locationX[randlocationX],
    "y": locationY[randlocationY],
  };
};

var randomData = function(arrayData) {
 return Math.floor(Math.random() * arrayData.length)
}; 


for (i = 0; i <= 7; i++) {

  var numberItem = i;
  var randAvatar = randomData(avatar);
  var randTitle = randomData(title);
  var randPrice = randomData(prise);
  var randType = randomData(type);
  var randRooms = randomData(rooms);
  var randGuests = randomData(guests);
  var randCheckin = randomData(checkin);
  var randCheckout = randomData(checkout);
  var randFeatures = features.filter(function(item) {
    return (randomData(features) > 1);
  }); // выбирает несколько фишек, только вот иконку показывает одну :((
  var randlocationX = randomData(locationX);
  var randlocationY = randomData(locationY);

  advertData[i] = new creatAdvertData();

  var newElement = document.createElement('div');
  newElement.className = 'pin';
  newElement.style.left = (locationX[randlocationX] + SIZE_OF_PIN_ICON_X / 2) + 'px';
  newElement.style.top = (locationY[randlocationY] + SIZE_OF_PIN_ICON_Y) + 'px';
  newElement.innerHTML = '<img src=' + avatar[randAvatar] + ' class="rounded" width="40" height="40">';
  newElement.setAttribute('data', numberItem);
  newElement.setAttribute('tabindex', 0);

  fragment.appendChild(newElement);
  avatar.splice(randAvatar, 1);
  title.splice(randTitle, 1);

};

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

var getTypeOfAssets = function() {
  if (advertData[0].offer.type === 'flat') {
    return 'Квартира';
  } else if (advertData[0].offer.type === 'house') {
    return 'Дом';
  } else if (advertData[0].offer.type === 'bungalo') {
    return 'Бунгало';
  }
};

var type = element.querySelector('.lodge__type');
type.textContent = getTypeOfAssets();

var roomsAndGuests = element.querySelector('.lodge__rooms-and-guests');
roomsAndGuests.textContent = 'для ' + advertData[0].offer.guests + ' гостей в ' + advertData[0].offer.rooms + ' комнатах';

var checkInOut = element.querySelector('.lodge__checkin-time');
checkInOut.textContent = 'Заезд после ' + advertData[0].offer.checkin + ', выезд до ' + advertData[0].offer.checkout;

var features = element.querySelector('.lodge__features');
features.innerHTML = '<span class="feature__image  feature__image--' + advertData[0].offer.features +'"></span>';

var description = element.querySelector('.lodge__description');
description.textContent = advertData[0].offer.description;

var offerDialog = document.querySelectorAll('#offer-dialog');
offerDialog[0].replaceChild(element.children[0], dialogPanel);

var dialogTitle = document.querySelector('.dialog__title');
dialogTitle.children[0].setAttribute('src', advertData[0].author.avatar);