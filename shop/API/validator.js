class Validator  {
    static emailCheck = (email) => {
        if (!email||email===''||email.length<4) {
            return false;
        }
        return true;
    }
}

module.exports = Validator