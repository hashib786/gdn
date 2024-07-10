import frappe

def update_project_in_gl_entry(doc,method):
    project = ""
    task = ""
    subject = ""
    if doc.voucher_type == "Jourmal Entry":
        je = frappe.get_doc("Journal Entry",doc.voucher_no)
        for accounts in je.accounts:
            if doc.against == accounts.account:
                project = accounts.project
                task = accounts.task
                subject = accounts.custom_subject 
                frappe.db.set_value("GL Entry",doc.name,{
                    "project":project,
                    "task":task,
                    "custom_subject":subject
                })