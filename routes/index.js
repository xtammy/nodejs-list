var express = require('express');
var router = express.Router();
var usr=require('database/dbConnect');

/*退出登录*/
router.get('/logout', function(req, res) {
    res.clearCookie('username');
    req.session.destroy();
    res.redirect('/');
});

/********************************************************** 工单的增删查改的开始 ****************************************************************************/
router.get('/', function(req, res) {
    islogins(req,res);
    /***********************************
     *     连接数据库并获取数据
     **************************************/
    client=usr.connect();
    userid=req.session.userId;
    if(userid){
        usr.selectForPagesFun(client,0,function (result) {
            res.render('index', { title: '列表页' ,data:result,count:result[0].count,test:res.locals.username,userId:req.session.userId});
        });
    }else{
        req.session.error='请先登陆';
        res.redirect('/login');/*先登录*/
    }

});
/*排序*/
router.get('/order', function(req, res) {
    client=usr.connect();
    orders=req.query.orderVal;
    console.log(orders);
    usr.selectUserOrder(client,function (dts) {
        console.log(dts);
        res.json(dts);
    });
   /* if(orders){
        usr.selectUserOrder(client,function (dts) {
            console.log(or);
            res.json(dts);
        });
    }*/
});
//------------------------------------------------------ 分页  -----------------------------------------------------------------
/*分页显示工单的所有数据*/
router.post('/pageList', function(req, res) {
    var page=req.body.p;
    client=usr.connect();
    usr.selectForPagesFun(client,page,function (dts) {
        res.json(dts);
    });
});
/*分页显示员工的所有数据*/
router.post('/employeeList', function(req, res) {
    var page=req.body.p;
    client=usr.connect();
    usr.selectEmployeeForPageFun(client,page,function (dts) {
        console.log("+++======+==");
        console.log(dts);
        res.json(dts);
    });
});
/********************************************************         工单编辑页所需要的json数据开始间隔符             ***************************************************************/



/*查找员工组*/
router.post('/group', function(req, res) {
    client=usr.connect();
    usr.selectEmgroupFun(client,function (dts) {
        res.json(dts);
    });
});
/*通过员工组的id来查找员工人员*/
router.post('/groupList', function(req, res) {
    client=usr.connect();
    groupNum=req.body.groupNum;
    usr.selectEmIDFun(client,groupNum,function (dts) {
        res.json(dts);
    });
});

/*通过关键字查询客户信息*/
router.get('/searchKey', function(req, res) {
    var term=req.query.term;
    var termVal="%"+term+"%";
    console.log(term+"======="+termVal);
    client=usr.connect();
    usr.selectKeywordFun(client,termVal,function (dts) {
        res.json(dts);
    });
});
/*通过关键字查询员工信息*/
router.get('/searchEm', function(req, res) {
    var term=req.query.term;
    var termVal="%"+term+"%";
    console.log(term+"======="+termVal);
    client=usr.connect();
    usr.selectKeyEmFun(client,termVal,function (dts) {
        res.json(dts);
    });
});
/*查询Id的唯一客户的详情*/
router.get('/customid', function(req, res) {
    var id=req.query.id;
    client=usr.connect();
    usr.selectCustomIDFun(client,id,function (dts) {
        res.json(dts);
    });
});
/********************************************************         工单编辑页所需要的json数据结束间隔符             ***************************************************************/


router.get('/detail?:id',function(req,res){
    islogins(req,res);
    /**************************************
     *     连接数据库并获取数据
     **************************************/
    var id=req.query.id;
    client=usr.connect();
    usr.selectIdFun(client,id,function (result) {
        res.render('detail', { title: '详情页' ,data:result,test:res.locals.username,userId:req.session.userId});
    });
});
router.post('/moveEM',function(req,res){
    var serve=req.body.serve;
    var remark=req.body.remark;
    var id=req.body.id;
    console.log(serve+"+===+"+remark+"+====+"+id);
    client=usr.connect();
    usr.updateEmFun(client,remark,serve,id,function (err,dts) {
        if(err) throw err;
        res.redirect('/');/*跳转到工单列表*/
    });
});
router.route('/edit?:id')
    .get(function(req,res,next){
        var id=req.query.id;
        if(id){
            /*if(req.cookies.islogin){
             req.session.islogin=req.cookies.islogin;
             }
             if(req.session.islogin){
             res.locals.islogin=req.session.islogin;
             }*/
            islogins(req,res);
            client=usr.connect();
            usr.selectIdFun(client,id,function (result) {
                console.log(result);
                res.render('edit', { title: '修改页',test:res.locals.username,userId:req.session.userId,data:result});
           });
        }else{
            next();
        }
    })
    .post(function(req,res,next){
        var pageid=req.query.id;
//        var userid=req.body.userId;
        if(pageid){
            /*if(userid){

            }else{
                console.log('请登录');
                res.redirect('/login');跳转到登录
            }*/
            client = usr.connect();
            usr.updateIdFun(client,req.body.theme ,req.body.content ,req.body.status ,req.body.level ,req.body.tags ,
                req.body.follower ,req.body.remark , req.body.upload ,req.body.customer , req.body.serve ,pageid, function (err,result) {
                if(err) throw err;
                res.redirect('/');/*跳转到工单列表*/
            });
        }else{
            next();
        }
    });
router.route('/edit')
    .get(function(req,res){
        /***********************************
         *     判断cookie和session有没有值
         **************************************/
        /*if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
         }
         if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
         }*/
        islogins(req,res);
        /***********************************
         *     连接数据库并获取数据
         **************************************/
        res.render('edit', { title: '编辑页',data:"",test:res.locals.username,userId:req.session.userId});
    })
    .post(function(req,res) {
        client = usr.connect();
        userid=req.session.userId;
        if(userid){
            usr.insertFun(client,req.body.theme ,req.body.content ,req.body.status ,req.body.level ,req.body.tags ,getNowFormatDate(),
                req.body.follower ,req.body.remark , req.body.qudao ,req.body.upload ,req.body.customer , req.body.serve , userid , function (err) {
                    if(err) throw err;
                    res.redirect('/');/*跳转到首页*/
                });
        }else{
            req.session.error='请先登陆';
            res.redirect('/login');/*先登录*/
        }
    });
router.get('/del?:id',function(req,res){
    var id = req.query.id;/*获取的id*/
    console.log('id+=====+'+id);
    client = usr.connect();
    if(id && '' != id) {
        usr.delIdFun(client,id, function( result) {
            res.redirect('/');/*跳转到首页*/
        });
    }
});
/********************************************************** 工单的增删查改的结束 ****************************************************************************/
/**************************************************************************************
 *
 *                     根据状态获取数据
 *
 * ***********************************************************************************/

router.get('/list?:status', function(req, res) {
    /***********************************
     *     判断cookie和session有没有值
     **************************************/
    if(req.cookies.username){
        req.session.username=req.cookies.username;
    }
    if(req.session.username){
        res.locals.username=req.session.username;
    }
    /***********************************
     *     连接数据库并获取数据
     **************************************/
    client=usr.connect();
    userid=req.session.userId;
    statusid=req.query.status;

    if(userid){
        usr.selectStaFun(client,userid,statusid,function (result) {
            console.log(result);
            res.render('statusIndex', { title: '列表页' ,data:result,test:res.locals.username,userId:req.session.userId});
        });
    }else{
        res.redirect('/login');/*先登录*/
    }
});
/*******************************************************************  员工管理开始  ************************************************************************************/

router.get('/employee/', function(req, res) {
    islogins(req,res);
    client=usr.connect();
     usr.selectEmployeeForPageFun(client,0,function (result) {
         res.render('employee/index', { title: '员工列表',count:result[0].count,data:result,test:res.locals.username,userId:req.session.userId});
     });
});
router.get('/employee/details?:id', function (req, res) {
    islogins(req,res);
    var id = req.query.id;/*获取的id*/
    client=usr.connect();
    usr.selectEmployeeIDFun(client,id,function (result) {
        console.log(result);
        res.render('employee/details', { title: '员工详情页' ,data:result,test:res.locals.username,userId:req.session.userId});
    });
});

router.route('/employee/edit?:id')
    .get(function(req,res,next){
        var id=req.query.id;
        islogins(req,res);
        if(id){
            client=usr.connect();
            usr.selectEmployeeIDFun(client,id,function (result) {
                console.log(result);
                res.render('employee/edit', { title: '员工修改页',data:result,test:res.locals.username,userId:req.session.userId});
            });
        }else{
            next();
        }
    })
    .post(function(req,res,next){
//        console.log(req.body.name+"===="+req.body.group +"===="+req.body.part +"===="+req.body.phone +"===="+req.body.nick +"===="+req.body.headPic+"===="+req.body.email);
        var pageid=req.query.id;
        if(pageid){
            client = usr.connect();
            usr.updateEmployeeIdFun(client,req.body.name ,req.body.group ,req.body.part ,req.body.phone ,req.body.nick ,req.body.headPic , pageid, function (err,result) {
                if(err) throw err;
                res.redirect('/employee/');/*跳转到员工列表*/
            });
        }else{
            next();
        }
    });

router.route('/employee/edit')
    .get(function(req,res){
        islogins(req,res);
        res.render('employee/edit', { title: '员工编辑页',data:"",test:res.locals.username,userId:req.session.userId});
    })
    .post(function(req,res) {

        client = usr.connect();
        usr.insertEmployeeFun(client,req.body.user ,req.body.name ,req.body.pwd ,req.body.group ,req.body.part ,req.body.phone ,req.body.nick ,req.body.email ,req.body.headPic , function (err) {
            if(err) throw err;

            res.redirect('/employee/');/*跳转到员工列表*/
        });
    });
router.get('/employee/del?:id',function(req,res){
    var id = req.query.id;/*获取的id*/
    client = usr.connect();
    if(id && '' != id) {
        usr.delEmployeeIDFun(client,id, function( result) {
            res.redirect('/employee/');/*跳转到首页*/
        });
    }
});
/*******************************************************************  员工管理结束  ************************************************************************************/
/*******************************************************************  员工组管理开始  ************************************************************************************/
router.get('/employeeGroup/', function(req, res) {
    islogins(req,res);
    client=usr.connect();
    usr.selectGroupFun(client,function (result) {
        console.log(result);
        res.render('employeeGroup/index', { title: '员工组列表',data:result,test:res.locals.username,userId:req.session.userId});
    });
});

router.route('/employeeGroup/edit?:id')
    .get(function(req,res){
        var id=req.query.id;
        islogins(req,res);
        if(id){
            client=usr.connect();
            usr.selectGroupIdFun(client,id,function (result) {
                console.log(result);
                res.render('employeeGroup/edit', { title: '员工修改页',data:result,test:res.locals.username,userId:req.session.userId});
            });
        }else{
            next();
        }
    })
    .post(function(req,res) {
        var pageid=req.query.id;
        if(pageid){
            client = usr.connect();
            usr.updateEmployeeIdFun(client,req.body.name , pageid, function (err,result) {
                if(err) throw err;
                res.redirect('/employeeGroup/');/*跳转到员工列表*/
            });
        }else{
            next();
        }
    });
router.route('/employeeGroup/edit')
    .get(function(req,res){
        islogins(req,res);
        res.render('employeeGroup/edit', { title: '员工组编辑页',data:"",test:res.locals.username,userId:req.session.userId});
    })
    .post(function(req,res) {
        client = usr.connect();
        usr.insertGroupFun(client,req.body.name ,req.body.serve ,req.body.date,function (err) {
            if(err) throw err;
            res.redirect('/employeeGroup/');/*跳转到员工列表*/
        });
    });
router.get('/employeeGroup/details?:id', function (req, res) {
    islogins(req,res);
    var id = req.query.id;/*获取的id*/
    client=usr.connect();
    usr.selectGroupIdFun(client,id,function (result) {
        console.log(result);
        res.render('employeeGroup/details', { title: '员工组详情' ,data:result,test:res.locals.username,userId:req.session.userId});
    });
});
router.get('/employeeGroup/del?:id',function(req,res){
    var id = req.query.id;/*获取的id*/
    console.log(id);
    client = usr.connect();
    if(id && '' != id) {
        usr.delGroupIdFun(client,id, function( result) {
            res.redirect('/employeeGroup/');/*跳转到首页*/
        });
    }
});
/*******************************************************************  员工组管理结束  ************************************************************************************/

/*******************************************************************  个人中心开始  ************************************************************************************/
router.route('/personal/')
    .get(function(req,res){
        islogins(req,res);
        client=usr.connect();
        userid=req.session.userId;
        if(userid){
            usr.selectPersonFun(client,userid,function (result) {
                res.render('personal/account', { title: '个人中心' ,data:result,test:res.locals.username,userId:req.session.userId});
            });
        }else{
            req.session.error='请先登陆';
            res.redirect('/login');/*先登录*/
        }
    })
    .post(function(req,res) {
        client = usr.connect();
        usr.updatePersonFun(client,req.body.tel ,req.body.headPic ,userid,function (err) {
            if(err) throw err;

            res.redirect('/personal/');/*跳转到员工列表*/
        });
    });
router.post('/changePwd',function(req,res){
    ele = req.body.val;
    userid = req.body.userID;
    client = usr.connect();
    usr.selectPersonFun(client,userid, function (dts) {
        console.log(dts);
        res.json(dts);
    });
});
router.route('/personal/changePwd')
    .get(function(req,res){
        islogins(req,res);
        userid=req.session.userId;
        if(userid){
            res.render('personal/updatePwd', { title: '修改密码' ,test:res.locals.username,userId:req.session.userId});
        }else{
            req.session.error='请先登陆';
            res.redirect('/login');/*先登录*/
        }
    })
    .post(function(req,res) {
        client = usr.connect();
        userid=req.session.userId;
        usr.updatePwdFun(client,req.body.againPwd ,userid,function (err) {
            if(err) throw err;

            res.redirect('/login');/*跳转到登录*/
        });
    });
/*******************************************************************  个人中心结束  ************************************************************************************/
function islogins(req,res){
    if(req.cookies.username){
        req.session.username=req.cookies.username;
    }
    if(req.session.username){
        res.locals.username=req.session.username;
    }
}
//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}
module.exports = router;
