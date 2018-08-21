module.exports = app => {
  const mongoose = app.mongoose;
  const UserSchema = new mongoose.Schema({
    openid: { type: String },
  }, {
      timestamps: true,
    });

  return mongoose.model('User', UserSchema);
}