module.exports = app => {
  const mongoose = app.mongoose;
  const FormDescriptionSchema = new mongoose.Schema({
    title: { type: String },
    next: { type: String },
    id: { type: String },
    repeated: { type: Boolean },
    describe: { type: String },
    // fields: { type: Array },
    fields: [{
      name: { type: String },
      type: { type: String },
      choice: [{
        name: { type: String },
        value: { type: String },
      }]
    }],
  }, {
      timestamps: true,
    });

  return mongoose.model('FormDescription', FormDescriptionSchema);
}