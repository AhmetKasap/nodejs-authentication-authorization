const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    name : {type: String, required : true, unique : true},
    password : {type: String, required : true}
})

//* modelimize ekstra bu kod parçasını ekleyerek veri tabanına şifremizi gizli bir (hashlenmiş) şekilde kaydediyoruz.
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const User = mongoose.model('USER', userSchema)
module.exports = User