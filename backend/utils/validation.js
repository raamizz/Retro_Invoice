const validator = require("validator");


const validateSignUpData = (req)=>{
    const { name, email, password, companyName } = req.body;
    if(!name){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(email)){
        throw new Error("Enter a Valid Email Address")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password must be strong");
    }
};

module.exports = {
    validateSignUpData
}