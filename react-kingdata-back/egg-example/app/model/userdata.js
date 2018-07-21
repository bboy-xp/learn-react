module.exports = app => {
  const mongoose = app.mongoose;
  const UserdataSchema = new mongoose.Schema({
    userdata: { type: Object },
    
  }, {
      timestamps: true,
    });

  return mongoose.model('Userdata', UserdataSchema);
}