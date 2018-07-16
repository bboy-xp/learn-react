'use strict';

const Controller = require('egg').Controller;

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
}

module.exports = HomeController;
