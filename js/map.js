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
var selectedPin;
var dialogClose = document.querySelector('.dialog__close');
var dialog = document.querySelector('.dialog');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

var fillInDialog = function(n) { 
var lodgeTemplate = document.querySelector('#lodge-template');
var element = lodgeTemplate.content.cloneNode(true);
var lodgeTitle = element.querySelector('.lodge__title');
var lodgeTemplate = document.querySelector('#lodge-template');
var dialogPanel = document.querySelector('.dialog__panel');
var lodgeAdress = element.querySelector('.lodge__address');
var lodgePrice = element.querySelector('.lodge__price');
var lodgeType = element.querySelector('.lodge__type');
var roomsAndGuests = element.querySelector('.lodge__rooms-and-guests');
var checkInOut = element.querySelector('.lodge__checkin-time');
var features = element.querySelector('.lodge__features');
var offerDialog = document.querySelectorAll('#offer-dialog');
var dialogTitle = document.querySelector('.dialog__title');

tokyo__pinMap.appendChild(fragment);
lodgeTitle.textContent = advertData[n].offer.title;
lodgeAdress.textContent = advertData[n].offer.adress;
lodgePrice.textContent= advertData[n].offer.price +'₽'+'/ночь';
lodgeType.textContent = typeOfAssetsKeys[advertData[n].offer.type];
roomsAndGuests.textContent = 'для ' + advertData[n].offer.guests + ' гостей в ' + advertData[n].offer.rooms + ' комнатах';
checkInOut.textContent = 'Заезд после ' + advertData[n].offer.checkin + ', выезд до ' + advertData[n].offer.checkout;

for (i = 0; i <= advertData[n].offer.features.length - 1; i++) {
  var span = document.createElement('span');
  span.className = 'feature__image  feature__image--'+ advertData[n].offer.features[i];
  features.appendChild(span);
};

description.textContent = advertData[n].offer.description;
offerDialog[0].replaceChild(element.children[0], dialogPanel);
dialogTitle.children[0].setAttribute('src', advertData[n].author.avatar);
};

fillInDialog(0);

tokyo__pinMap.addEventListener('click', function(event) {
  var target = event.target;
  while (target != tokyo__pinMap) {
    if (target.className == 'pin') {
      highlight(target);
      fillInDialog(target.getAttribute('data'));
      return;
    }
    target = target.parentNode;
  }
});

var removePinActiveClass = function () {
  selectedPin.classList.remove('pin--active');
};

var addPinActiveClass = function () {
  selectedPin.classList.remove('pin--active');
};

var addDialogHiddenClass = function () {
  dialog.classList.add('hidden');
};

var removeDialogHiddenClass =  function () {
  dialog.classList.remove('hidden');
};

var highlight = function(node) {
  if (selectedPin) {
    removePinActiveClass();
  }
  selectedPin = node;
  addPinActiveClass();
  removeDialogHiddenClass();
};

dialogClose.addEventListener('click', function() {
  addDialogHiddenClass();
  removePinActiveClass();
});

tokyo__pinMap.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    addDialogHiddenClass();
    removePinActiveClass();
  }
});

tokyo__pinMap.addEventListener('keydown', function(evt) {
  var target = evt.target;
  if (evt.keyCode === ENTER_KEYCODE) {
    highlight(target);
    fillInDialog(target.getAttribute('data'));
    return;
  }
  target = target.parentNode;
});

var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', function(evt) {
  var target = evt.target;
  if (target.value === "14:00") {
    timeOut.selectedIndex = 2;
  } else if (target.value === "13:00") {
    timeOut.selectedIndex = 1;
  } else {
    timeOut.selectedIndex = 0;
  };
});

timeOut.addEventListener('change', function(evt) {
  var target = evt.target;
  if (target.value === "14:00") {
    timeIn.selectedIndex = 2;
  } else if (target.value === "13:00") {
    timeIn.selectedIndex = 1;
  } else {
    timeIn.selectedIndex = 0;
  };
});


var type = document.querySelector('#type');
var price = document.querySelector('#price');

type.addEventListener('change', function(evt) {
  var target = evt.target;
  if (target.value === "flat") {
    price.setAttribute("min", "1000");
    price.setAttribute("placeholder", "1000");
  } else if (target.value === "bungalo") {
    price.setAttribute("min", "0");
    price.setAttribute("placeholder", "0");
  } else if (target.value === "house") {
    price.setAttribute("min", "5000");
    price.setAttribute("placeholder", "5000");
  } else if (target.value === "palace") {
    price.setAttribute("min", "10000");
    price.setAttribute("placeholder", "10000");
  }
});

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

roomNumber.addEventListener('change', function(evt) {
  for (i = 0; i < capacity.children.length; i++) {
    capacity[i].setAttribute("disabled", "true");
  };

  var target = evt.target;
  if (target.value === "1") {
    capacity[2].removeAttribute("disabled");
  } else if (target.value === "2") {
    capacity[2].removeAttribute("disabled");
    capacity[1].removeAttribute("disabled");
  } else if (target.value === "3") {
    capacity[2].removeAttribute("disabled");
    capacity[1].removeAttribute("disabled");
    capacity[0].removeAttribute("disabled");
  } else if (target.value === "100") {
    capacity[3].removeAttribute("disabled");
  }
});

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

roomNumber.addEventListener('change', function(evt) {
  capacity.selectedIndex = -1;
  for (i = 0; i < capacity.children.length; i++) {
    capacity[i].setAttribute("disabled", "true");
  };

  var target = evt.target;
  if (target.value === "1") {
    capacity[2].removeAttribute("disabled");
  } else if (target.value === "2") {
    capacity[2].removeAttribute("disabled");
    capacity[1].removeAttribute("disabled");
  } else if (target.value === "3") {
    capacity[2].removeAttribute("disabled");
    capacity[1].removeAttribute("disabled");
    capacity[0].removeAttribute("disabled");
  } else if (target.value === "100") {
    capacity[3].removeAttribute("disabled");
  }
});

/*capacity.addEventListener('change', function(evt) {
  //roomNumber.selectedIndex = -1;
  for (i = 0; i < capacity.children.length; i++ ) {
  capacity[i].removeAttribute("disabled");
  };
  for (i = 0; i < roomNumber.children.length; i++ ) {
    roomNumber[i].setAttribute("disabled", "true");
  };
 
  var target = evt.target;
    if (target.value === "1") {
    roomNumber[0].removeAttribute("disabled");
    roomNumber[1].removeAttribute("disabled");
    } else if (target.value === "2") {
      roomNumber[2].removeAttribute("disabled");
      roomNumber[1].removeAttribute("disabled");
      } else if (target.value === "3") {
        roomNumber[2].removeAttribute("disabled");
        } else if (target.value === "0") {
          roomNumber[3].removeAttribute("disabled");
          }
});*/