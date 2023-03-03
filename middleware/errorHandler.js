// const asyncWrap = func => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next)
//     }
// }

// const globalErrorHandler = (err, req, res, next) => {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
// }

// module.exports ={
//     asyncWrap,
//     globalErrorHandler
// }
