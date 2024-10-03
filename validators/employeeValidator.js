const Joi = require("joi");
const Responses = require ("../helpers/response");

//CREATE EMPLOYEE VALIDATOR
const createEmployeeValidator = async (req, res, next) => {
  try {
    console.log("Body-->", req.body);
    
    const bodySchema = Joi.object({
      name: Joi.string()
        .trim()
        .pattern(/^[a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": "HTML tags & Special letters are not allowed!",
        }),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      role: Joi.string().valid('user', 'admin').default('user') // Add role with default value
    });

    console.log("bodySchema--", bodySchema);
    req.body = await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error.details[0].message, 200);
  }
};
//DELETE EMPLOYEE VALIDATOR
const deleteEmployeeValidator = async (req, res, next) => {
  try {
      const paramSchema = Joi.object({
          id: Joi.string().required(),
      });
      await paramSchema.validateAsync(req.params);
      next();
  } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error, 400);
  }
};
// EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
  try {
      const paramSchema = Joi.object({
          id: Joi.string().required(),
      });
      const bodySchema = Joi.object({
          name: Joi.string()
              .trim()
              .pattern(/^[a-zA-Z ,/-]+$/)
              .messages({
                  "string.pattern.base": "HTML tags & Special letters are not allowed!",
              }),
          email: Joi.string().email(),
          password: Joi.string().min(6),
         
      });
      await paramSchema.validateAsync(req.params);
      await bodySchema.validateAsync(req.body);
      next();
  } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error, 400);
  }
};

//LOGIN EMPLOYEE VALIDATOR
const loginEmployeeValidator = async (req, res, next) => {
  try {
      const bodySchema = Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
      });
      await bodySchema.validateAsync(req.body);
      next();
  } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error, 400);
  }
};


//LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.query);
      console.log(req.params);
  
      const headerSchema = Joi.object({
        headers: Joi.object({
          authorization: Joi.required(),
        }).unknown(true),
      });
      const bodySchema = Joi.object({
        searchKey: Joi.string()
          .trim()
          .pattern(/^[0-9a-zA-Z ,/-]+$/)
          .messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
          }),
      });
      const paramsSchema = Joi.object({
        limit: Joi.number(),
        page: Joi.number(),
        order: Joi.number(),
      });
  
      await headerSchema.validateAsync({ headers: req.headers });
      await bodySchema.validateAsync(req.body);
      await paramsSchema.validateAsync(req.query);
  
      next();
    } catch (error) {
      console.log(error);
      
      return Responses.errorResponse(req, res, error, 200);
    }
  };
module.exports = {
  createEmployeeValidator,
  deleteEmployeeValidator,
  editEmployeeValidator,
  loginEmployeeValidator,
  listEmployesValidator
}