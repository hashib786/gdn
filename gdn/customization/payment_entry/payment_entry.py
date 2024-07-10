import frappe

def update_subject_final_amount(doc, method):
    if doc.custom_subject:
        subject_doc = frappe.get_doc("Subject", doc.custom_subject)
        subject_doc.update_final_amount()
        subject_doc.db_update()
        frappe.db.commit()