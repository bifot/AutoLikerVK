var request = require('sync-request');

var token = '354542de699a61f6563548096d41b8507620a93ab3237a15be7ea15de0af876d0741031bd581bf848b77a';
var profile = 'bifot';
var album = 'saved';

var id = (() => {
  var url = `https://api.vk.com/method/users.get?user_ids=${profile}&v=5.8`;
  var res = request('GET', url);
  var body = JSON.parse(res.getBody());
  var id = body.response[0].id;

  return id;
})();

var url = `https://api.vk.com/method/photos.get?owner_id=${id}&rev=1&album_id=${album}&count=1000&v=5.60`;
var res = request('GET', url);
var body = JSON.parse(res.getBody());
var items = body.response.items;

for (var i = 0, j = items.length; i < j; i++) {
  let photoId = items[i].id;

  setTimeout(() => {
    var url = `https://api.vk.com/method/likes.add?type=photo&owner_id=${id}&item_id=${photoId}&access_token=${token}&v=5.60`;
    var res = request('GET', url);
    var body = JSON.parse(res.getBody());

    var photoURL = `https://vk.com/photo${id}_${photoId}`;

    if (body.response) {
      console.log(`Лайк поставлен. Всего лайков на фотографии: ${body.response.likes}`);
      console.log(`Фотография => ${photoURL}`);
    } else {
      console.log('Ошибка.');
      console.log(body);
    }
  }, i * 2000);
}