"use strict";

var $ = require("$");

var cinco_mvc_Controller = require("cinco_mvc_Controller");

var cinco = require("cinco");

var cinco_util_Constants = require("cinco_util_Constants");

var cinco_Session = require("cinco_Session");

var cuC = require("cuC");

var UserRole = require("UserRole");

var OrderConstants = require("OrderConstants");

var UserConstants = require("UserConstants");

var cinco_util_SessionManager = require("cinco_util_SessionManager");

var CashInOutConstants = require("CashInOutConstants");

var CashInOutController = $.inherit(cinco_mvc_Controller, {

    /**
     * @constructor Constructor function
     * @public
     */
    __constructor: function __constructor() {
        //this.__base();
    },

    /**
     * Cash In/Out int function
     */
    init: function init() {
        cinco.setActiveScreen(cinco_util_Constants.SCREEN_CASH_IN_OUT);
        var _this = this;
        if (!cinco.$("#cashinout_screen_wrapper").is(":visible")) {
            if (this.isRestrictToEmployee() && cinco_Session.get(cuC.SESSION_KEY_AUTHENTICATED_EMPLOYEE).getRoleName() == UserRole.CINCO_EMPLOYEE_ROLES.Employee.roleName) {
                cinco.managerApproval.displayApprovalScreen(cinco.getLanguage().__('APPLYING_CASH_IN_OUT_TRANSACTION', cinco_util_Constants.MODULE_CASHINOUT), OrderConstants.EVENT_ORDER_ITEM_DISCOUNT, function (params) {
                    if (params[UserConstants.PARAM_KEY_ACTION] == UserConstants.PARAM_VALUE_VALID) {
                        cinco_util_SessionManager.setCookie(CashInOutConstants.SESSION_EMPLOYEE_ACCESS_REMEMBER, '1');
                        _this.loadModule();
                    }
                });
            } else {
                _this.loadModule();
            }
        } else {
            _this.loadModule();
        }
    }
}, {});