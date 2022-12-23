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
exports.id = "pages/api/account/register";
exports.ids = ["pages/api/account/register"];
exports.modules = {

/***/ "(api)/./src/config/index.js":
/*!*****************************!*\
  !*** ./src/config/index.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"API_URL\": () => (/* binding */ API_URL)\n/* harmony export */ });\nconst API_URL = \"http://server:8080\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvY29uZmlnL2luZGV4LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxNQUFNQSxPQUFPLEdBQUdDLG9CQUErQiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vc3JjL2NvbmZpZy9pbmRleC5qcz8zM2E2Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTFxuIl0sIm5hbWVzIjpbIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/config/index.js\n");

/***/ }),

/***/ "(api)/./src/pages/api/account/register.js":
/*!*******************************************!*\
  !*** ./src/pages/api/account/register.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/index */ \"(api)/./src/config/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    if (req.method === \"POST\") {\n        const { nickname , username , password , re_password  } = req.body;\n        const body = JSON.stringify({\n            nickname,\n            username,\n            password,\n            re_password\n        });\n        try {\n            const apiRes = await fetch(`${_config_index__WEBPACK_IMPORTED_MODULE_0__.API_URL}/api/user/save`, {\n                method: \"POST\",\n                headers: {\n                    \"Accept\": \"application/json\",\n                    \"Content-Type\": \"application/json\"\n                },\n                body: body\n            });\n            const data = await apiRes.json();\n            if (apiRes.status === 201) {\n                return res.status(201).json({\n                    success: \"Sign up successfully!\"\n                });\n            } else {\n                return res.status(apiRes.status).json({\n                    error: data.error\n                });\n            }\n        } catch (error) {\n            return res.status(500).json({\n                \"error\": \"Something went wrong when registering for an account\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"POST\"\n        ]);\n        return res.status(405).json({\n            \"error\": `Method ${req.method} not allowed`\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvcmVnaXN0ZXIuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBZ0Q7QUFFaEQsaUVBQWUsT0FBT0MsR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDL0IsSUFBR0QsR0FBRyxDQUFDRSxNQUFNLEtBQUssTUFBTSxFQUFDO1FBQ3JCLE1BQU0sRUFDRkMsUUFBUSxHQUNSQyxRQUFRLEdBQ1JDLFFBQVEsR0FDUkMsV0FBVyxHQUNkLEdBQUdOLEdBQUcsQ0FBQ08sSUFBSTtRQUVaLE1BQU1BLElBQUksR0FBR0MsSUFBSSxDQUFDQyxTQUFTLENBQUM7WUFDeEJOLFFBQVE7WUFDUkMsUUFBUTtZQUNSQyxRQUFRO1lBQ1JDLFdBQVc7U0FDZCxDQUFDO1FBRUYsSUFBSTtZQUNBLE1BQU1JLE1BQU0sR0FBRyxNQUFNQyxLQUFLLENBQUMsQ0FBQyxFQUFFWixrREFBTyxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUNuREcsTUFBTSxFQUFFLE1BQU07Z0JBQ2RVLE9BQU8sRUFBRTtvQkFDTCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixjQUFjLEVBQUUsa0JBQWtCO2lCQUNyQztnQkFDREwsSUFBSSxFQUFFQSxJQUFJO2FBQ2IsQ0FBQztZQUVGLE1BQU1NLElBQUksR0FBRyxNQUFNSCxNQUFNLENBQUNJLElBQUksRUFBRTtZQUVoQyxJQUFHSixNQUFNLENBQUNLLE1BQU0sS0FBSyxHQUFHLEVBQUM7Z0JBQ3JCLE9BQU9kLEdBQUcsQ0FBQ2MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDRCxJQUFJLENBQUM7b0JBQUNFLE9BQU8sRUFBRSx1QkFBdUI7aUJBQUMsQ0FBQyxDQUFDO1lBQ3BFLE9BQU87Z0JBQ0gsT0FBT2YsR0FBRyxDQUFDYyxNQUFNLENBQUNMLE1BQU0sQ0FBQ0ssTUFBTSxDQUFDLENBQUNELElBQUksQ0FBQztvQkFBQ0csS0FBSyxFQUFFSixJQUFJLENBQUNJLEtBQUs7aUJBQUMsQ0FBQyxDQUFDO1lBQy9ELENBQUM7UUFFTCxFQUFFLE9BQU9BLEtBQUssRUFBRTtZQUNaLE9BQU9oQixHQUFHLENBQUNjLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0QsSUFBSSxDQUFDO2dCQUN4QixPQUFPLEVBQUUsc0RBQXNEO2FBQ2xFLENBQUM7UUFDTixDQUFDO0lBQ0wsT0FBSztRQUNEYixHQUFHLENBQUNpQixTQUFTLENBQUMsT0FBTyxFQUFFO1lBQUMsTUFBTTtTQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPakIsR0FBRyxDQUFDYyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNELElBQUksQ0FBQztZQUFFLE9BQU8sRUFBRyxDQUFDLE9BQU8sRUFBRWQsR0FBRyxDQUFDRSxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQUMsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvcmVnaXN0ZXIuanM/YzQ0NCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBUElfVVJMIH0gZnJvbSBcIi4uLy4uLy4uL2NvbmZpZy9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyggcmVxLCByZXMgKT0+IHtcbiAgICBpZihyZXEubWV0aG9kID09PSAnUE9TVCcpe1xuICAgICAgICBjb25zdCB7IFxuICAgICAgICAgICAgbmlja25hbWUsXG4gICAgICAgICAgICB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgcmVfcGFzc3dvcmRcbiAgICAgICAgfSA9IHJlcS5ib2R5O1xuXG4gICAgICAgIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBuaWNrbmFtZSxcbiAgICAgICAgICAgIHVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgICByZV9wYXNzd29yZFxuICAgICAgICB9KTtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgYXBpUmVzID0gYXdhaXQgZmV0Y2goYCR7QVBJX1VSTH0vYXBpL3VzZXIvc2F2ZWAsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgYXBpUmVzLmpzb24oKTtcblxuICAgICAgICAgICAgaWYoYXBpUmVzLnN0YXR1cyA9PT0gMjAxKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cygyMDEpLmpzb24oe3N1Y2Nlc3M6ICdTaWduIHVwIHN1Y2Nlc3NmdWxseSEnfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKGFwaVJlcy5zdGF0dXMpLmpzb24oe2Vycm9yOiBkYXRhLmVycm9yfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgJ2Vycm9yJzogJ1NvbWV0aGluZyB3ZW50IHdyb25nIHdoZW4gcmVnaXN0ZXJpbmcgZm9yIGFuIGFjY291bnQnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfWVsc2V7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0FsbG93JywgWydQT1NUJ10pO1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyAnZXJyb3InIDogYE1ldGhvZCAke3JlcS5tZXRob2R9IG5vdCBhbGxvd2VkYH0pO1xuICAgIH1cbn0iXSwibmFtZXMiOlsiQVBJX1VSTCIsInJlcSIsInJlcyIsIm1ldGhvZCIsIm5pY2tuYW1lIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInJlX3Bhc3N3b3JkIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcGlSZXMiLCJmZXRjaCIsImhlYWRlcnMiLCJkYXRhIiwianNvbiIsInN0YXR1cyIsInN1Y2Nlc3MiLCJlcnJvciIsInNldEhlYWRlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/account/register.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/account/register.js"));
module.exports = __webpack_exports__;

})();