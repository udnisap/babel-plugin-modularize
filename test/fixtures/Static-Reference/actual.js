var CashInOutController = $.inherit(cinco_mvc_Controller, {

    /**
     * @constructor Constructor function
     * @public
     */
    __constructor : function() {
        //this.__base();
    },

    /**
     * Cash In/Out int function
     */
    init : function(){
        cinco.setActiveScreen(cinco_util_Constants.SCREEN_CASH_IN_OUT);
        var _this = this;
        if(!cinco.$("#cashinout_screen_wrapper").is(":visible")){
            if(this.isRestrictToEmployee() && cinco_Session.get( cuC.SESSION_KEY_AUTHENTICATED_EMPLOYEE ).getRoleName() == UserRole.CINCO_EMPLOYEE_ROLES.Employee.roleName){
                cinco.managerApproval.displayApprovalScreen(cinco.getLanguage().__('APPLYING_CASH_IN_OUT_TRANSACTION', cinco_util_Constants.MODULE_CASHINOUT), OrderConstants.EVENT_ORDER_ITEM_DISCOUNT, function(params){
                    if(params[UserConstants.PARAM_KEY_ACTION] == UserConstants.PARAM_VALUE_VALID){
                        cinco_util_SessionManager.setCookie(CashInOutConstants.SESSION_EMPLOYEE_ACCESS_REMEMBER, '1');
                        _this.loadModule();
                    }
                });
            }else{
                _this.loadModule();
            }
        }else{
            _this.loadModule();
        }
    },
},{

});