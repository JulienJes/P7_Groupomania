const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    pseudo: { type: String, required: true, unique: true , minlength: 3 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    picture: {type: String, default: "../client/public/uploads/profil/default-user-pic.png" },
    bio: {type: String, maxlenght: 1024 },
    likes: { type: [String] },
    admin: { type: Boolean, default: false}
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } else {
      throw Error('incorrect password');
    }
  } else {
    throw Error('incorrect email');
  }
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);