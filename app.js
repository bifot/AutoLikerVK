var request = require('request');

var token = 'TOKEN';
var profile = 'bifot';
var album = 'saved';

  request(`https://api.vk.com/method/users.get?user_ids=${profile}&v=5.8`, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body);
      var id = json.response[0].id;

      request(`https://api.vk.com/method/photos.get?owner_id=${id}&rev=1&album_id=${album}&count=1000&v=5.60`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          var json = JSON.parse(body);
          var items = json.response.items;

          items.forEach((photo, index) => {
            let photoId = photo.id;

            setTimeout(() => {
              request(`https://api.vk.com/method/likes.add?type=photo&owner_id=${id}&item_id=${photoId}&access_token=${token}&v=5.60`, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                  var json = JSON.parse(body);
                  var photoURL = `https://vk.com/photo${id}_${photoId}`;

                  if (json.response) {
                    console.log(`Лайк поставлен. Всего лайков на фотографии: ${json.response.likes}`);
                    console.log(`Фотография => ${photoURL}`);
                  } else {
                    console.log(`Ошибка: ${json.error.error_msg}`);
                  }
                } else {
                  console.log('Не получилось поставить лайк.');
                }
              });
            }, index * 3000);
          });
        } else {
          console.log('Ошибка при получении фотографий.')
        }
      });
    } else {
      console.log('Ошибка при получении id юзера.');
    }
  });