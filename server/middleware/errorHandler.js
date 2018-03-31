const errorHandler = (ctx, next) => {
    // console.log(err);
    return next();
}

module.exports = errorHandler;
