const {body} = require("express-validator");

const insertPhotoValidation = () => {
    return [
        body("title")
        .not()
        .equals("undefined")
        .withMessage("O título é obrigatório!")
        .isString(0)
        .withMessage("O título é obrigatório")
        .isLength({min: 3})
        .withMessage("O título precisa ter no mínimo 3 letras")
        ,body("image").custom((value, {req}) => {
            if(!req.file){
                throw new Error("A imagem é obrigatória");
            }

            return true;
        })

    ]
}

const photoUpdateValidation = () => {
    return [
        body("title")
        .optional()
        .isString()
        .withMessage("O título é obrigatório")
        .isLength({min: 3})
        .withMessage("O título precisa ter no mínimo 3 caracteres")

    ]
}

const photoCommentValidation = () => {
    return [

        body("comment")
        .isString()
        .withMessage("O comentário é obrigatório")
        
    ]
}

module.exports = {insertPhotoValidation, photoUpdateValidation, photoCommentValidation};