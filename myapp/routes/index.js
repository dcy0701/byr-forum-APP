const express = require('express');
const router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res){
    let Nightmare = require('nightmare');
    let nightmare = Nightmare({ show: false });
    let user = req.query.user;
    let pass = req.query.pass;

    console.log(user);
    let code,access_token;
    nightmare
      .goto('http://bbs.byr.cn/oauth2/authorize?response_type=code&client_id=b7ad2efb085ee0ba87acd8ef921a0632&%20redirect_uri=http://www.byr.pub&%20state=abc')
      .type('#Username', user)
      .type('#Password', pass)
      .click('#login_button')
      .forward()
      .wait(100)
      .evaluate(function () {
        return location.href
      })
      .end()
      .then(function (result) {
        code = getValue(result,'code');
        request.post('http://bbs.byr.cn/oauth2/token', {form:{
            client_id:'b7ad2efb085ee0ba87acd8ef921a0632',
            client_secret:'585d146fa7811738f4d61440a9f5e591',
            redirect_uri:'http://www.byr.pub',
            grant_type:'authorization_code',
            code:code
        }}, function(err, httpResponse, body){
            res.send(JSON.parse(body));
        });

        function getValue(url, name) {
        	let reg = new RegExp('(\\?|&)' + name + '=([^&?]*)', 'i');
        	let arr = url.match(reg);

        	if (arr) {
        		return arr[2];
        	}
        	return null;
        }
      })
      .catch(function (error) {
        console.error('Search failed:', error);
        req.send({status:'error'});
      });
})

module.exports = router;
