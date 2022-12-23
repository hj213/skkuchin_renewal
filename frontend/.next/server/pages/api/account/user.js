"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/account/user";
exports.ids = ["pages/api/account/user"];
exports.modules = {

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("cookie");

/***/ }),

/***/ "(api)/./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_URL\": () => (/* binding */ API_URL)\n/* harmony export */ });\nconst API_URL = \"http://server:8080\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29uZmlnL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxPQUFPLEdBQUdDLG9CQUErQiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbmZpZy9pbmRleC5qcz8zM2E2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTFxuIl0sIm5hbWVzIjpbIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/config/index.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/account/user.js":
/*!***************************************!*\
  !*** ./src/pages/api/account/user.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../config/index */ \"(api)/./src/config/index.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    if (req.method == \"GET\") {\n        const cookies = cookie__WEBPACK_IMPORTED_MODULE_0___default().parse(req.headers.cookie ?? \"\");\n        const access = cookies.access ?? false;\n        if (access == false) {\n            return res.status(401).json({\n                error: \"User unauthorized to make this request\"\n            });\n        }\n        try {\n            const apiRes = await fetch(`${_config_index__WEBPACK_IMPORTED_MODULE_1__.API_URL}/api/user`, {\n                method: \"GET\",\n                headers: {\n                    \"Accept\": \"application/json\",\n                    \"Authorization\": `Bearer ${access}`\n                }\n            });\n            const data = await apiRes.json();\n            if (apiRes.status === 200) {\n                return res.status(200).json({\n                    user: data\n                });\n            } else {\n                return res.status(apiRes.status).json({\n                    error: data.error_message\n                });\n            }\n        } catch (error) {\n            console.log(error);\n            return res.status(500).json({\n                error: \"Something went wrong when retrieving user\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"GET\"\n        ]);\n        return res.status(405).json({\n            error: `Method ${req.method} not allowed`\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvdXNlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTRCO0FBQ29CO0FBRWhELGlFQUFlLE9BQU9FLEdBQUcsRUFBRUMsR0FBRyxHQUFLO0lBQy9CLElBQUdELEdBQUcsQ0FBQ0UsTUFBTSxJQUFJLEtBQUssRUFBQztRQUNuQixNQUFNQyxPQUFPLEdBQUdMLG1EQUFZLENBQUNFLEdBQUcsQ0FBQ0ssT0FBTyxDQUFDUCxNQUFNLElBQUksRUFBRSxDQUFDO1FBQ3RELE1BQU1RLE1BQU0sR0FBR0gsT0FBTyxDQUFDRyxNQUFNLElBQUksS0FBSztRQUV0QyxJQUFHQSxNQUFNLElBQUksS0FBSyxFQUFDO1lBQ2YsT0FBT0wsR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFDeEJDLEtBQUssRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUk7WUFDQSxNQUFNQyxNQUFNLEdBQUcsTUFBTUMsS0FBSyxDQUFDLENBQUMsRUFBRVosa0RBQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDOUNHLE1BQU0sRUFBRSxLQUFLO2dCQUNiRyxPQUFPLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsZUFBZSxFQUFHLENBQUMsT0FBTyxFQUFFQyxNQUFNLENBQUMsQ0FBQztpQkFDdkM7YUFDSixDQUFDO1lBQ0YsTUFBTU0sSUFBSSxHQUFHLE1BQU1GLE1BQU0sQ0FBQ0YsSUFBSSxFQUFFO1lBRWhDLElBQUdFLE1BQU0sQ0FBQ0gsTUFBTSxLQUFLLEdBQUcsRUFBQztnQkFDckIsT0FBT04sR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztvQkFDeEJLLElBQUksRUFBRUQsSUFBSTtpQkFDYixDQUFDLENBQUM7WUFDUCxPQUFPO2dCQUNILE9BQU9YLEdBQUcsQ0FBQ00sTUFBTSxDQUFDRyxNQUFNLENBQUNILE1BQU0sQ0FBQyxDQUFDQyxJQUFJLENBQUM7b0JBQ2xDQyxLQUFLLEVBQUVHLElBQUksQ0FBQ0UsYUFBYTtpQkFDNUIsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztRQUVMLEVBQUUsT0FBT0wsS0FBSyxFQUFFO1lBQ1pNLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDUCxLQUFLLENBQUM7WUFDbEIsT0FBT1IsR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFDeEJDLEtBQUssRUFBRSwyQ0FBMkM7YUFDckQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNMLE9BQU07UUFDRlIsR0FBRyxDQUFDZ0IsU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUFDLEtBQUs7U0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBT2hCLEdBQUcsQ0FBQ00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFDeEJDLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRVQsR0FBRyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQzVDLENBQUMsQ0FBQztJQUNQLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvdXNlci5qcz85NjVlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb29raWUgZnJvbSAnY29va2llJztcbmltcG9ydCB7IEFQSV9VUkwgfSBmcm9tICcuLi8uLi8uLi9jb25maWcvaW5kZXgnO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAocmVxLCByZXMpID0+IHtcbiAgICBpZihyZXEubWV0aG9kID09ICdHRVQnKXtcbiAgICAgICAgY29uc3QgY29va2llcyA9IGNvb2tpZS5wYXJzZShyZXEuaGVhZGVycy5jb29raWUgPz8gJycpO1xuICAgICAgICBjb25zdCBhY2Nlc3MgPSBjb29raWVzLmFjY2VzcyA/PyBmYWxzZTtcblxuICAgICAgICBpZihhY2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogJ1VzZXIgdW5hdXRob3JpemVkIHRvIG1ha2UgdGhpcyByZXF1ZXN0J1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYXBpUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL3VzZXJgLCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJyA6IGBCZWFyZXIgJHthY2Nlc3N9YFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGFwaVJlcy5qc29uKCk7XG5cbiAgICAgICAgICAgIGlmKGFwaVJlcy5zdGF0dXMgPT09IDIwMCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyhhcGlSZXMuc3RhdHVzKS5qc29uKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGRhdGEuZXJyb3JfbWVzc2FnZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHJldHJpZXZpbmcgdXNlcidcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfWVsc2Uge1xuICAgICAgICByZXMuc2V0SGVhZGVyKCdBbGxvdycsIFsnR0VUJ10pO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oe1xuICAgICAgICAgICAgZXJyb3I6IGBNZXRob2QgJHtyZXEubWV0aG9kfSBub3QgYWxsb3dlZGBcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImNvb2tpZSIsIkFQSV9VUkwiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJjb29raWVzIiwicGFyc2UiLCJoZWFkZXJzIiwiYWNjZXNzIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiYXBpUmVzIiwiZmV0Y2giLCJkYXRhIiwidXNlciIsImVycm9yX21lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwic2V0SGVhZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/account/user.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/account/user.js"));
module.exports = __webpack_exports__;

})();