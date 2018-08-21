'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
const { readFileSync } = require('fs');
const { resolve } = require('path');

class HomeController extends Controller {
  async index() {
    const data = readFileSync(resolve(__dirname, '../public/index.html'), 'utf8');
    this.ctx.body = data;
  };
  async saveForm() {
    const ctx = this.ctx;
    const res = ctx.request.body;
    // console.log(res);
    const FormDescription = ctx.model.FormDescription;
    const isRepeated = !!res.isRepeated;

    const isExistForm = await FormDescription.find({ "id": res.id });
    if (isExistForm.length !== 0) {
      await FormDescription.update({ "id": res.id }, {
        title: res.title,
        describe: res.describe,
        next: res.next,
        id: res.id,
        repeated: isRepeated,
        fields: res.fields
      })
      ctx.body = 'ok';
    } else {
      const formDescription = new FormDescription({
        title: res.title,
        describe: res.describe,
        next: res.next,
        id: res.id,
        repeated: isRepeated,
        fields: res.fields
      });
      await formDescription.save();
      ctx.body = 'ok';
    }
  };
  async getAllForm() {
    const ctx = this.ctx;
    const FormDescription = ctx.model.FormDescription;
    const allForm = await FormDescription.find();
    // console.log(allForm);
    ctx.body = allForm;
  }
  async getNextForm() {
    const ctx = this.ctx;
    const FormDescription = ctx.model.FormDescription;
    const targetForm = await FormDescription.find({ next: null });
    // console.log(targetForm);
    ctx.body = targetForm;
  }
  async getForm() {
    const ctx = this.ctx;
    const id = ctx.request.body.id;
    // console.log(id);
    const FormDescription = ctx.model.FormDescription;
    const targetForm = await FormDescription.find({ id: id });

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
    // console.log(openid);
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
    // console.log(openid);
    const Userdata = ctx.model.Userdata;
    const targetUserdata = await Userdata.find({
      openid: openid,
      id: id
    });
    ctx.body = targetUserdata;
  }
  async postUserData() {
    const ctx = this.ctx;
    const Userdata = ctx.model.Userdata;
    const data = ctx.request.body;
    // console.log(data);
    // console.log("走到这里了1");
    const findUserdata = await Userdata.find({ "openid": data.openid, "id": data.id });
    // console.log(findUserdata);
    if (findUserdata.length !== 0) {
      // console.log("走到这里了2");
      await Userdata.update({ "openid": data.openid, "id": data.id }, {
        userdata: data.userData
      })
    } else {
      // console.log("走到这里了3");
      const userdata = new Userdata({
        userdata: data.userData,
        openid: data.openid,
        id: data.id,
        formName: data.formName,
        isRepeated: data.isRepeated
      })
      await userdata.save();
    }

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
    }, {
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
    // console.log(code);
    const codeData = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx21174deccc6b6c4b&secret=903087872adb2b41d2a4cea77a53446f&code=${code}&grant_type=authorization_code`);
    // const access_token = codeData.data.access_token;
    const openid = codeData.data.openid;
    // console.log(openid);
    ctx.body = openid;
  }
  async test() {
    const ctx = this.ctx;
    const FormDescription = ctx.model.FormDescription;

    ctx.body = 'ok';
    // ctx.body = '临时修改数据库数据用';
  }
  async getTimeSteps() {
    const ctx = this.ctx;
    let id = ctx.request.body.id;
    let timeStepsArr = [];
    // console.log(id);
    const FormDescription = ctx.model.FormDescription;
    const getStepFunction = async function (idStr) {
      const getStepRes = await FormDescription.find({ 'id': idStr });
      const getStep = getStepRes[0];
      timeStepsArr.push(getStep);
      const nextStr = getStep.next;
      if (!!nextStr) {
        // console.log(getStep.next);
        await getStepFunction(nextStr);
      }
    };
    await getStepFunction(id);
    // console.log(timeStepsArr);
    ctx.body = timeStepsArr;
  }
  async getRenderUserdata() {
    const ctx = this.ctx;
    // console.log(ctx.request.body);
    const id = ctx.request.body.id;
    const openid = ctx.request.body.openid;
    const Userdata = ctx.model.Userdata;
    // console.log(id, openid);
    const targetUserdata = await Userdata.find({ 'id': id, 'openid': openid });
    // console.log(targetUserdata);
    if (targetUserdata.length !== 0) {
      const userDataObject = targetUserdata[0].userdata;
      ctx.body = userDataObject;
    } else {
      const userDataObject = [];
      ctx.body = userDataObject;
    }
  }
}

module.exports = HomeController;
