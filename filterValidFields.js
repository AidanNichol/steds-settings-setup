
const validFields = ["STEDS_user_current",
"STEDS_user_sandy_password",
"STEDS_user_sandy_roles_0",
"STEDS_user_sandy_roles_1",
"STEDS_debug_devtoolsOpen",
"STEDS_debug_database",
"STEDS_machine_name",
"STEDS_database_current",
"STEDS_database_production_localname",
"STEDS_database_production_resetLocalBookings",
"STEDS_database_production_adapter",
"STEDS_database_production_remotename",
"STEDS_database_production_remotehost",
"STEDS_database_production_useFullHistory",
"STEDS_database_developement_localname",
"STEDS_database_developement_resetLocalBookings",
"STEDS_database_developement_adapter",
"STEDS_database_developement_remotename",
"STEDS_database_developement_remotehost",
"STEDS_database_developement_useFullHistory",
"STEDS_advanced",]
exports.filterValidFields = (fields)=>fields.filter(
  ([field, val])=>validFields.includes(field))