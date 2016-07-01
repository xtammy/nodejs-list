var express = require('express');
var router = express.Router();
var usr=require('database/dbConnect');

/* GET login page. */
router.route('/')
    .get(function(req, res) {
        if(req.session.islogin){
            res.locals.islogin=req.session.islogin;
        }
        if(req.cookies.islogin){
            req.session.islogin=req.cookies.islogin;
        }
        res.render('login', { title: '用户登录' ,test:res.locals.islogin});
    })
    .post(function(req, res) {
        client=usr.connect();
        result=null;
        usr.selectUser(client,req.body.username, req.body.password,function (result) {
            if(result[0]===undefined){
                console.log(result[0]);
                req.session.error='用户名或密码不正确';
                res.redirect('/login');
            }else{
                if(result[0].s_pwd===req.body.password){
                    req.session.userId=result[0].s_id;/*用户id*/
                    req.session.part=result[0].s_part;/*用户角色*/

                    req.session.username=result[0].s_user;/*用户姓名*/
                    res.locals.username=req.session.username;/*用户姓名*/
                    res.cookie('username',res.locals.username,{maxAge:60000});
                    res.redirect('/');
                }else{
                    console.log('ssss');
                    req.session.error='用户名或密码不正确';
                    res.redirect('/login');
                }
            }
        });
    });

module.exports = router;
