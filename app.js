var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true })

function getValue(url, name) {
	var reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
	var arr = url.match(reg);

	if (arr) {
		return arr[2];
	}

	return null;
}

nightmare
  .goto('http://bbs.byr.cn/oauth2/authorize?response_type=code&client_id=b7ad2efb085ee0ba87acd8ef921a0632&%20redirect_uri=http://www.byr.pub&%20state=abc')
  .type('#Username', 'dcy0701')
  .type('#Password', 'dcy0701')
  .click('#login_button')
  .forward()
  .wait(500)
  .evaluate(function () {
    return location.href
  })
  .end()
  .then(function (result) {
    console.log(getValue(result,'code'));
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
