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
    const targetForm = await Formdata.find({next:null});
    // console.log(targetForm);
    ctx.body = targetForm;
  }
  async getForm() {
    const ctx = this.ctx;
    const id = ctx.request.body.id;
    console.log(id);
    const Formdata = ctx.model.Formdata;
    const targetForm = await Formdata.find({id: id});

    ctx.body = targetForm;
  }
}

module.exports = HomeController;
