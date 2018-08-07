module.exports = app => {
  const mongoose = app.mongoose;
  const UserdataSchema = new mongoose.Schema({
    userdata: { type: Array },
    openid: { type: String },
    id: { type: String },
    formName: { type: String },
    isRepeated: { type: Boolean }
  }, {
      timestamps: true,
    });

  return mongoose.model('Userdata', UserdataSchema);
}