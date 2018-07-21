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
  postUserData() {
    const ctx = this.ctx;
    const Userdata = ctx.model.Userdata;
    const userdata = new Userdata({
      userdata: ctx.request.body
    })
    // console.log(ctx.request.body);
    userdata.save();
    ctx.body = 'ok';
  }
  updateUserdata() {
    const ctx = this.ctx;
    console.log(ctx.request.body);
    ctx.body = 'ok';
  }
  async oauth() {
    const ctx = this.ctx;
    console.log(ctx.query.code);
    const code = ctx.query.code;
    const codeData = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21174deccc6b6c4b&secret=903087872adb2b41d2a4cea77a53446f&code=${code}&grant_type=authorization_code`); 
    const access_token = codeData.data.access_token;
    const openid = codeData.data.openid;
    console.log(access_token,openid);
    console.log('走到这里了');
    ctx.body = 'ok';
  }
}

module.exports = HomeController;
