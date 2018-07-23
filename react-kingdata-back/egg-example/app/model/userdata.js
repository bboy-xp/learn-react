module.exports = app => {
  const mongoose = app.mongoose;
  const UserdataSchema = new mongoose.Schema({
    userdata: { type: Object },
    openid: { type: String },
    id: { type: String }
  }, {
      timestamps: true,
    });

  return mongoose.model('Userdata', UserdataSchema);
}