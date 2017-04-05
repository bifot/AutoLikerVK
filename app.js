const request = require('request');

const token = 'your_profile_token';
const profile = 'bifot';
const album = 'saved';

request({
  url: 'https://api.vk.com/method/users.get',
  method: 'POST',
  form: {
    user_ids: profile,
    v: 5.8
  },
  json: true
}, (err, res, body) => {
  if (!err && res.statusCode == 200) {
    const id = body.response[0].id;

    request({
      url: 'https://api.vk.com/method/photos.get',
      method: 'POST',
      form: {
        owner_id: id,
        rev: 1,
        album_id: album,
        count: 1000,
        access_token: token,
        v: 5.60
      },
      json: true
    }, (err, res, body) => {
      if (!err && res.statusCode == 200) {
        const items = body.response.items;

        items.forEach((photo, i) => {
          setTimeout(() => {
            request({
              url: 'https://api.vk.com/method/likes.add',
              method: 'POST',
              form: {
                type: 'photo',
                owner_id: id,
                item_id: photo.id,
                access_token: token,
                v: 5.60
              },
              json: true
            }, (err, res, body) => {
              if (!err && res.statusCode == 200) {
                if (body.response) {
                  console.log(`https://vk.com/photo${id}_${photo.id}`, body);
                } else {
                  console.log('Ошибка:', body.error.error_msg);
                }
              }
            });
          }, i * 3000);
        });
      }
    });
  }
});
