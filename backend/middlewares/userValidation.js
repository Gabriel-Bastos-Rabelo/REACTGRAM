const { body } = require('express-validator')


const userCreateValidation = () => {
    return [
        body('name')
        .isString()
        .withMessage('Nome é obrigatório!')
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("email")
        .isString()
        .withMessage("Email é obrigatório")
        .isEmail()
        .withMessage("O email deve ser válido"),
        body("password")
        .isString()
        .withMessage("A senha é obrigatória")
        .isLength({min: 5})
        .withMessage("A senha deve ter no mínimo 5 caracteres"),
        body("confirmPassword")
        .isString()
        .withMessage("A confirmação da senha é obrigatória")
        .custom((value, {req}) => {
            if(value != req.body.password){
                throw new Error('As senhas não são iguais');
            }

            return true;
        })
    ];
}

const loginValidation = () => {
    return [
        body("email")
        .isString()
        .withMessage("Email é obrigatório")
        .isEmail()
        .withMessage("Digite um email válido"),
        body("password")
        .isString()
        .withMessage("Senha é obrigatório")
        
    ];
}

const userUpdateValidation = () => {
    return [
        body("name")
        .optional()
        .isLength({min: 3})
        .withMessage("O nome precisa ter no mínimo 3 caracteres"),
        body("password")
        .optional()
        .isLength({min: 5})
        .withMessage("A senha deve ter no mínimo 5 caracteres"),

    ]
}

module.exports = {userCreateValidation, loginValidation, userUpdateValidation};