/**
 * This contains the authentication for JWTs
 * These are middleware, so will be validated and then the function will continue as normal if validated
 * otherwise throw error
 */

const jwt = require('jsonwebtoken');

module.exports = {
    authenticateToken: function (req, res, next) {
        const token = req.headers.authorization;
        if (!token || token == null) {
            return res.status(401).send({ message: "No token"})
        }
        jwt.verify(token, process.env.JWT_SECRET = process.env.JWT_SECRET = "coffee", (err, decoded) => {
            if (err) {
                res.status(401).send({ message: "Token is not valid." })
            } else {
                req.user = decoded;
                next();
            }
        })
    },

    authenticateTeacher: function (req, res, next) {
        var class_code = req.query.class_code;
        if (!class_code || class_code == null) {
            class_code = req.body.class_code;
        }
        if ((!class_code || class_code == null) && req.body.params)  {
            class_code = req.body.params.class_code;
        } 
        if ((!class_code || class_code == null) && req.query.params) {
            class_code = req.query.params.class_code;
        }
        if (req.user.classes.some(item => item.class_code.toLowerCase() == class_code.toLowerCase())) {
            next();
        } else {
            res.status(401).send({ message: "Not authorised access to this class!" })
        }
    },

    authenticateDepartment: function (req, res, next) {
        const dept_id = req.query.dept_id;
        if (!dept_id || dept_id == null) {
            dept_id = req.body.dept_id;
        }
        if ((!dept_id || dept_id == null) && req.body.params)  {
            dept_id = req.body.params.dept_id;
        } 
        if ((!dept_id || dept_id == null) && req.query.params) {
            dept_id = req.query.params.dept_id;
        }
        if (req.user.departments.some(item => item.dept_id.toLowerCase() == dept_id.toLowerCase())) {
            next();
        } else {
            res.status(401).send({ message: "Not authorised access to this department!" })
        }
    },

}



/* functions used to determine whether a particular user has access to a page

module.exports = {
    authoriseTeacher : function(token, class_code) {
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
        if (decodedData.classes) {
            if (decodedData.classes.some(item => item.class_code.toLowerCase() == class_code.toLowerCase())) {
                return true;
            }
        }
        return false;
    },

    authoriseDepartment : function(token, dept_id) {
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
        if (decodedData.departments) {
            if (decodedData.departments.some(item => item.dept_id.toLowerCase() == dept_id.toLowerCase())) {
                return true;
            }
        }
        return false;
    }
} */