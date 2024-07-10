import frappe
from dateutil.relativedelta import relativedelta
import calendar
from datetime import datetime

def validate_task(doc, method=None):
    frappe.logger().info(f"validate_task called with doc: {doc}, method: {method}")
    
    if not isinstance(doc, frappe.model.document.Document):
        frappe.throw("Invalid document passed to validate_task")
    
    if doc.doctype != "Task":
        frappe.throw(f"Expected Task document, got {doc.doctype}")

    # Ensure exp_start_date and exp_end_date are available
    if doc.exp_start_date and doc.exp_end_date:
        try:
            # Convert date strings to datetime objects
            exp_start_date = datetime.strptime(doc.exp_start_date, '%Y-%m-%d').date() if isinstance(doc.exp_start_date, str) else doc.exp_start_date
            exp_end_date = datetime.strptime(doc.exp_end_date, '%Y-%m-%d').date() if isinstance(doc.exp_end_date, str) else doc.exp_end_date
        except ValueError as e:
            frappe.throw(f"Error parsing dates: {e}")
        
        frappe.logger().info(f"Parsed exp_start_date: {exp_start_date}")
        frappe.logger().info(f"Parsed exp_end_date: {exp_end_date}")

        # Clear existing custom_task_budget_details
        doc.custom_task_budget_details = []

        # Iterate through each month between exp_start_date and exp_end_date
        current_date = exp_start_date
        while current_date <= exp_end_date:
            month_name = calendar.month_name[current_date.month]
            doc.append('custom_task_budget_details', {
                'year': current_date.year,
                'month': month_name,
                'budget_amount': 0
            })
            current_date += relativedelta(months=1)
        
        frappe.logger().info("custom_task_budget_details populated successfully")

    frappe.logger().info("validate_task completed successfully")
