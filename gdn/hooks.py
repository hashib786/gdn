app_name = "gdn"
app_title = "Gdn"
app_publisher = "extension"
app_description = "custom app"
app_email = "deepak@extensioncrm.com"
app_license = "mit"
# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
app_include_css = "gdn.bundle.css"
# app_include_js = "/assets/gdn/js/gdn.js"

# include js, css files in header of web template
# web_include_css = "/assets/gdn/css/gdn.css"
# web_include_js = "/assets/gdn/js/gdn.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "gdn/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Project" : "customization/Project/project.js",
    
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "gdn/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "gdn.utils.jinja_methods",
# 	"filters": "gdn.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "gdn.install.before_install"
# after_install = "gdn.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "gdn.uninstall.before_uninstall"
# after_uninstall = "gdn.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "gdn.utils.before_app_install"
# after_app_install = "gdn.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "gdn.utils.before_app_uninstall"
# after_app_uninstall = "gdn.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "gdn.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

# override_doctype_class = {
# 	"ToDo": "custom_app.overrides.CustomToDo"
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
"Payment Entry":{
    "on_submit": "gdn.customization.payment_entry.payment_entry.update_subject_final_amount",
    "on_cancel": "gdn.customization.payment_entry.payment_entry.update_subject_final_amount"
},
"GL Entry":{
    "after_insert":"gdn.customization.gl_entry.gl_entry.update_project_in_gl_entry"
},
"Task":{
    "validate":"gdn.customization.task.task.validate_task"
}

}

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"gdn.tasks.all"
# 	],
# 	"daily": [
# 		"gdn.tasks.daily"
# 	],
# 	"hourly": [
# 		"gdn.tasks.hourly"
# 	],
# 	"weekly": [
# 		"gdn.tasks.weekly"
# 	],
# 	"monthly": [
# 		"gdn.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "gdn.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "gdn.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "gdn.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["gdn.utils.before_request"]
# after_request = ["gdn.utils.after_request"]

# Job Events
# ----------
# before_job = ["gdn.utils.before_job"]
# after_job = ["gdn.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"gdn.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

fixtures = [
    {"dt": "Custom Field", "filters": []},
    {"dt": "Property Setter", "filters": []},
    {"dt": "Client Script", "filters":[]}
]
