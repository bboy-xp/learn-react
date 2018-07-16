module.exports = app => {
  const mongoose = app.mongoose;
  const FormdataSchema = new mongoose.Schema({
    title: { type: String },
    id: { type: String },
    describe: { type: String },
    fields: { type: Array }
  }, {
      timestamps: true,
    });

  return mongoose.model('Formdata', FormdataSchema);
}