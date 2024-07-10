# Copyright (c) 2024, extension and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Subject(Document):
    def validate(self):
        self.update_final_amount()

    def update_final_amount(self):
        final_amount = frappe.db.sql("""
            SELECT paid_amount
            FROM `tabPayment Entry`
            WHERE custom_subject = %s AND docstatus = 1
        """, self.name, as_list=1)
        
        self.amount = final_amount[0][0] if final_amount and final_amount[0][0] else 0

