-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-07-01 04:42:48
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `gongdan`
--

-- --------------------------------------------------------

--
-- 表的结构 `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `c_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公司ID',
  `c_name` varchar(255) NOT NULL COMMENT '公司名称',
  `c_desciption` varchar(255) NOT NULL COMMENT '公司描述',
  `c_starttime` date NOT NULL COMMENT '公司创建时间',
  PRIMARY KEY (`c_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `company`
--

INSERT INTO `company` (`c_id`, `c_name`, `c_desciption`, `c_starttime`) VALUES
(1, '成都多享', '专注于科技研发', '2016-05-01'),
(2, '成都潘朵拉', '专注于科技研发', '2016-05-01');

-- --------------------------------------------------------

--
-- 表的结构 `customer`
--

CREATE TABLE IF NOT EXISTS `customer` (
  `cu_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户ID',
  `cu_name` varchar(50) NOT NULL COMMENT '客户姓名',
  `cu_email` varchar(255) NOT NULL COMMENT '客户邮箱',
  `cu_phone` varchar(50) NOT NULL COMMENT '客户电话',
  `cu_date` date NOT NULL COMMENT '客户创建时间',
  `cu_description` varchar(255) NOT NULL COMMENT '客户描述',
  `cu_wx` varchar(50) NOT NULL COMMENT '客户微信',
  `cu_twitter` varchar(50) NOT NULL COMMENT '客户微博',
  `cu_qq` varchar(50) NOT NULL COMMENT '客户QQ',
  `c_id` int(11) NOT NULL COMMENT '所属公司',
  `s_id` int(11) DEFAULT NULL COMMENT '所属员工',
  PRIMARY KEY (`cu_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `customer`
--

INSERT INTO `customer` (`cu_id`, `cu_name`, `cu_email`, `cu_phone`, `cu_date`, `cu_description`, `cu_wx`, `cu_twitter`, `cu_qq`, `c_id`, `s_id`) VALUES
(1, '柳敏', 'liumin@126.com', '13558844521', '2016-04-03', '.........................', 'wxwxwx', 'blogblogblogblog', '123456789', 1, NULL),
(2, '黄丹', 'huangdan@126.com', '13584529541', '2016-04-03', ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,', 'wxwxwx', 'blogblogblogblog', '123456789', 1, NULL),
(3, '杨雪晴', 'yangxueqing@126.com', '17259485463', '2016-04-03', '******************************', 'wxwxwx', 'blogblogblogblog', '123456789', 1, NULL),
(4, '刘凤敏', 'liufeng@126.com', '15875856325', '2016-04-03', '..........................', 'wxwxwx', 'blogblogblogblog', '123456789', 2, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
  `o_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '工单ID',
  `o_title` varchar(200) NOT NULL COMMENT '工单标题',
  `o_description` varchar(255) NOT NULL COMMENT '工单描述',
  `o_status` int(11) NOT NULL COMMENT '工单状态',
  `o_level` int(11) NOT NULL COMMENT '工单优先级',
  `o_tags` varchar(250) DEFAULT NULL COMMENT '工单标签',
  `o_starttime` date NOT NULL COMMENT '工单创建时间',
  `o_follower` varchar(50) NOT NULL COMMENT '工单关注者',
  `o_remark` varchar(50) DEFAULT NULL COMMENT '工单备注',
  `o_qudao` int(50) NOT NULL COMMENT '工单渠道',
  `o_upload` varchar(255) DEFAULT NULL COMMENT '工单上传附件',
  `cu_id` int(11) NOT NULL COMMENT '所属客户ID',
  `s_id` int(11) NOT NULL COMMENT '所属客服ID',
  `cr_id` int(11) NOT NULL COMMENT '创建人',
  PRIMARY KEY (`o_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `orders`
--

INSERT INTO `orders` (`o_id`, `o_title`, `o_description`, `o_status`, `o_level`, `o_tags`, `o_starttime`, `o_follower`, `o_remark`, `o_qudao`, `o_upload`, `cu_id`, `s_id`, `cr_id`) VALUES
(2, '服务器崩溃了', '<p>sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场生成商场sc市场', 2, 3, '', '2016-05-01', 'sds', '淡淡的', 1, 'images', 1, 2, 1),
(5, '这是主题2', '<p>这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;这是主题内容2&nbsp;</p>', 1, 1, '', '2016-05-19', '5', '', 1, 'images', 4, 2, 1),
(6, '主题在这儿', '<p>内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿</p>', 1, 1, '主题,内容', '2016-05-19', '1,5', '事实上', 1, 'images', 1, 4, 1),
(7, '主题在这儿2', '<p>内容在这儿在哪儿内容在这儿在哪儿内容在这儿在哪儿内容222222在哪儿</p>', 1, 1, '主题2,内容2', '2016-05-19', '1,5', '2222', 1, 'images', 2, 1, 2);

-- --------------------------------------------------------

--
-- 表的结构 `serve`
--

CREATE TABLE IF NOT EXISTS `serve` (
  `s_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工ID',
  `s_name` varchar(50) NOT NULL COMMENT '员工用户名',
  `s_user` varchar(50) NOT NULL COMMENT ' 员工姓名',
  `s_pwd` varchar(50) NOT NULL COMMENT '员工密码',
  `sg_id` int(11) NOT NULL COMMENT '所属员工组',
  `s_part` int(11) NOT NULL COMMENT '员工角色',
  `s_phone` varchar(50) NOT NULL COMMENT '员工电话',
  `s_nickname` varchar(50) NOT NULL COMMENT '员工昵称',
  `s_email` varchar(50) NOT NULL COMMENT '员工邮箱',
  `s_headPic` varchar(255) NOT NULL COMMENT '员工头像',
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `serve`
--

INSERT INTO `serve` (`s_id`, `s_name`, `s_user`, `s_pwd`, `sg_id`, `s_part`, `s_phone`, `s_nickname`, `s_email`, `s_headPic`) VALUES
(1, '001', '张三', '123456', 1, 0, '15864854855', '筱君涵2', '15864854855@126.com', ''),
(2, '002', '李四', '123456', 2, 0, '13426854885', '清月2', '13426854885@126.com', ''),
(4, '003', '王武', '123456', 1, 1, '15803559441', '清月2', '15803559441@126.com', 'images/defaultPic.png'),
(5, '013', '赵茜', '123456', 1, 1, '15803559441', '清月13', '15803559441@126.com', 'images/defaultPic.png');

-- --------------------------------------------------------

--
-- 表的结构 `servegroup`
--

CREATE TABLE IF NOT EXISTS `servegroup` (
  `sg_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '员工组ID',
  `sg_name` varchar(50) NOT NULL COMMENT '员工组名称',
  `sg_serves` varchar(255) NOT NULL COMMENT '成员',
  `sg_startdate` date NOT NULL COMMENT '员工组创建时间',
  PRIMARY KEY (`sg_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `servegroup`
--

INSERT INTO `servegroup` (`sg_id`, `sg_name`, `sg_serves`, `sg_startdate`) VALUES
(1, '客服一组', '1,4,5', '2016-04-24'),
(2, '客服二组', '2', '2016-04-24');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `u_name` varchar(50) NOT NULL COMMENT '用户名称',
  `u_pwd` varchar(50) NOT NULL COMMENT '用户密码',
  `u_part` int(50) NOT NULL COMMENT '用户角色',
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`u_id`, `u_name`, `u_pwd`, `u_part`) VALUES
(1, 'tammy', '802374', 1),
(2, 'jason', '123456', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
