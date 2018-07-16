'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  test() {
    const ctx = this.ctx;
    ctx.body = 'ok';
  }
}

module.exports = HomeController;
