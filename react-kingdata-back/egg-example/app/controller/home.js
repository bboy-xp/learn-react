'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  };
  saveForm() {
    const ctx = this.ctx;
    const res = ctx.request.body;
    const Formdata = ctx.model.Formdata;

    const formdata = new Formdata({
      title: res.title,
      describe: res.describe,
      next: res.next,
      id: res.id,
      fields: res.fields
    })
    formdata.save();
    ctx.body = 'ok';
  };
  async getAllForm() {
    const ctx = this.ctx;
    const Formdata = ctx.model.Formdata;
    const allForm = await Formdata.find();
    ctx.body = allForm;
  }
  async getNextForm() {
    const ctx = this.ctx;
    const Formdata = ctx.model.Formdata;
    const targetForm = await Formdata.find({ next: null });
    // console.log(targetForm);
    ctx.body = targetForm;
  }
  async getForm() {
    const ctx = this.ctx;
    const id = ctx.request.body.id;
    console.log(id);
    const Formdata = ctx.model.Formdata;
    const targetForm = await Formdata.find({ id: id });

    ctx.body = targetForm;
  }
  async getUserdata() {
    const ctx = this.ctx;
    const id = ctx.request.body.id;
    const Userdata = ctx.model.Userdata;
    const targetUserdata = await Userdata.find({
      id: id
    });
    ctx.body = targetUserdata;
  }
  async getUserdataByOpenId() {
    const ctx = this.ctx;
    const openid = ctx.request.body.openid;
    console.log(openid);
    const Userdata = ctx.model.Userdata;
    const targetUserdata = await Userdata.find({
      openid: openid
    });
    ctx.body = targetUserdata;
  }
  async getUserdataByOpenIdAndId() {
    const ctx = this.ctx;
    const openid = ctx.request.body.openid;
    const id = ctx.request.body.id;
    console.log(openid);
    const Userdata = ctx.model.Userdata;
    const targetUserdata = await Userdata.find({
      openid: openid,
      id: id
    });
    ctx.body = targetUserdata;
  }
  postUserData() {
    const ctx = this.ctx;
    
    const Userdata = ctx.model.Userdata;
    const userdata = new Userdata({
      userdata: ctx.request.body.userData,
      openid: ctx.request.body.openid,
      id: ctx.request.body.id,
      formName: ctx.request.body.formName
    })
    // console.log(ctx.request.body);
    userdata.save();
    ctx.body = 'ok';
  }
  async updateUserdata() {
    const ctx = this.ctx;
    const res = ctx.request.body
    const id = res.id;
    const openid = res.openid;
    const newUserdata = res.userdata;
    const formName = res.formName;
    //更新userdata中的数据
    const Userdata = ctx.model.Userdata;
    const update = await Userdata.update({
      id: id,
      openid: openid
    },{
      userdata: newUserdata,
      openid: openid,
      id: id,
      formName: formName
    });
    ctx.body = update;
  }
  async oauth() {
    const ctx = this.ctx;
    const code = ctx.request.body.code;
    console.log(code);
    const codeData = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21174deccc6b6c4b&secret=903087872adb2b41d2a4cea77a53446f&code=${code}&grant_type=authorization_code`); 
    const access_token = codeData.data.access_token;
    const openid = codeData.data.openid;
    console.log(openid);
    ctx.body = openid;
  }
}

module.exports = HomeController;
