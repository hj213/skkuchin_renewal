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
exports.id = "pages/api/account/verify";
exports.ids = ["pages/api/account/verify"];
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

/***/ "(api)/./src/pages/api/account/verify.js":
/*!*****************************************!*\
  !*** ./src/pages/api/account/verify.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../config/index */ \"(api)/./src/config/index.js\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{\n    if (req.method === \"GET\") {\n        const cookies = cookie__WEBPACK_IMPORTED_MODULE_1___default().parse(req.headers.cookie ?? \"\");\n        const access = cookies.access ?? false;\n        if (access === false) {\n            return res.status(403).json({\n                error: \"User forbidden from making the request\"\n            });\n        }\n        try {\n            const apiRes = await fetch(`${_config_index__WEBPACK_IMPORTED_MODULE_0__.API_URL}/api/token/verify`, {\n                method: \"GET\",\n                headers: {\n                    \"Accept\": \"application/json\",\n                    \"Authorization\": `Bearer ${access}`\n                }\n            });\n            if (apiRes.status === 200) {\n                return res.status(200).json({\n                    success: \"Authenticated successfully\"\n                });\n            } else {\n                return res.status(apiRes.status).json({\n                    error: \"Failed to authenticate\"\n                });\n            }\n        } catch (error) {\n            return res.status(500).json({\n                error: \"Something went wrong when trying to authenticate\"\n            });\n        }\n    } else {\n        res.setHeader(\"Allow\", [\n            \"GET\"\n        ]);\n        return res.status(405).json({\n            error: `Method ${req.method} not allowed`\n        });\n    }\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvdmVyaWZ5LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBZ0Q7QUFDcEI7QUFFNUIsaUVBQWUsT0FBT0UsR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDL0IsSUFBSUQsR0FBRyxDQUFDRSxNQUFNLEtBQUssS0FBSyxFQUFFO1FBQ3RCLE1BQU1DLE9BQU8sR0FBR0osbURBQVksQ0FBQ0MsR0FBRyxDQUFDSyxPQUFPLENBQUNOLE1BQU0sSUFBSSxFQUFFLENBQUM7UUFDdEQsTUFBTU8sTUFBTSxHQUFHSCxPQUFPLENBQUNHLE1BQU0sSUFBSSxLQUFLO1FBRXRDLElBQUlBLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDbEIsT0FBT0wsR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztnQkFDeEJDLEtBQUssRUFBRSx3Q0FBd0M7YUFDbEQsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELElBQUk7WUFDQSxNQUFNQyxNQUFNLEdBQUcsTUFBTUMsS0FBSyxDQUFDLENBQUMsRUFBRWIsa0RBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUN0REksTUFBTSxFQUFFLEtBQUs7Z0JBQ2JHLE9BQU8sRUFBRTtvQkFDTCxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixlQUFlLEVBQUcsQ0FBQyxPQUFPLEVBQUVDLE1BQU0sQ0FBQyxDQUFDO2lCQUN2QzthQUNKLENBQUM7WUFFRixJQUFJSSxNQUFNLENBQUNILE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3ZCLE9BQU9OLEdBQUcsQ0FBQ00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7b0JBQUVJLE9BQU8sRUFBRSw0QkFBNEI7aUJBQUUsQ0FBQyxDQUFDO1lBQzNFLE9BQU87Z0JBQ0gsT0FBT1gsR0FBRyxDQUFDTSxNQUFNLENBQUNHLE1BQU0sQ0FBQ0gsTUFBTSxDQUFDLENBQUNDLElBQUksQ0FBQztvQkFDbENDLEtBQUssRUFBRSx3QkFBd0I7aUJBQ2xDLENBQUMsQ0FBQztZQUNQLENBQUM7UUFDTCxFQUFFLE9BQU1BLEtBQUssRUFBRTtZQUNYLE9BQU9SLEdBQUcsQ0FBQ00sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7Z0JBQ3hCQyxLQUFLLEVBQUUsa0RBQWtEO2FBQzVELENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxPQUFPO1FBQ0hSLEdBQUcsQ0FBQ1ksU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUFDLEtBQUs7U0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBT1osR0FBRyxDQUFDTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLElBQUksQ0FBQztZQUFFQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUVULEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLFlBQVksQ0FBQztTQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0FBQ0wsQ0FBQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9zcmMvcGFnZXMvYXBpL2FjY291bnQvdmVyaWZ5LmpzPzA3N2MiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJX1VSTCB9IGZyb20gJy4uLy4uLy4uL2NvbmZpZy9pbmRleCc7XG5pbXBvcnQgY29va2llIGZyb20gJ2Nvb2tpZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGlmIChyZXEubWV0aG9kID09PSAnR0VUJykge1xuICAgICAgICBjb25zdCBjb29raWVzID0gY29va2llLnBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSA/PyAnJyk7XG4gICAgICAgIGNvbnN0IGFjY2VzcyA9IGNvb2tpZXMuYWNjZXNzID8/IGZhbHNlO1xuXG4gICAgICAgIGlmIChhY2Nlc3MgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDMpLmpzb24oe1xuICAgICAgICAgICAgICAgIGVycm9yOiAnVXNlciBmb3JiaWRkZW4gZnJvbSBtYWtpbmcgdGhlIHJlcXVlc3QnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBhcGlSZXMgPSBhd2FpdCBmZXRjaChgJHtBUElfVVJMfS9hcGkvdG9rZW4vdmVyaWZ5YCwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbicgOiBgQmVhcmVyICR7YWNjZXNzfWBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGFwaVJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IHN1Y2Nlc3M6ICdBdXRoZW50aWNhdGVkIHN1Y2Nlc3NmdWxseScgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKGFwaVJlcy5zdGF0dXMpLmpzb24oe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogJ0ZhaWxlZCB0byBhdXRoZW50aWNhdGUnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDUwMCkuanNvbih7XG4gICAgICAgICAgICAgICAgZXJyb3I6ICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGVuIHRyeWluZyB0byBhdXRoZW50aWNhdGUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcy5zZXRIZWFkZXIoJ0FsbG93JywgWydHRVQnXSk7XG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwNSkuanNvbih7IGVycm9yOiBgTWV0aG9kICR7cmVxLm1ldGhvZH0gbm90IGFsbG93ZWRgIH0pO1xuICAgIH1cbn07Il0sIm5hbWVzIjpbIkFQSV9VUkwiLCJjb29raWUiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJjb29raWVzIiwicGFyc2UiLCJoZWFkZXJzIiwiYWNjZXNzIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiYXBpUmVzIiwiZmV0Y2giLCJzdWNjZXNzIiwic2V0SGVhZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./src/pages/api/account/verify.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./src/pages/api/account/verify.js"));
module.exports = __webpack_exports__;

})();