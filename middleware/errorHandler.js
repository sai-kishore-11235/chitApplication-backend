const { CONSTANTS } = require("../constants")
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode? res.statusCode :500;
    switch(statusCode){
        case CONSTANTS.VALIDATION_ERROR:
            res.json({title: "Validation Failed",message: err.message,stackTrace: err.stack})
            break;
        case CONSTANTS.NOT_FOUND:
            res.json({title: "NOT FOUND",message: err.message,stackTrace: err.stack})
            break;
        case CONSTANTS.UNAUTHORIZED:
            res.json({title: "UnAuthorized",message: err.message,stackTrace: err.stack})
            break;
        case CONSTANTS.FORBIDDEN:
            res.json({title: "Forbidden",message: err.message,stackTrace: err.stack})
            break;
        case CONSTANTS.SERVER_ERROR:
            res.json({title: "Server Error",message: err.message,stackTrace: err.stack})
            break;
        default:
            console.log("All Good !!")
            break;
    }
}
module.exports = errorHandler;