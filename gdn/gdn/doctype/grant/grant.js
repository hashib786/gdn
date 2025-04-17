// Copyright (c) 2024, extension and contributors
// For license information, please see license.txt

frappe.ui.form.on("Grant", {
    refresh(frm) {
        frm.toggle_display("custom_grant_proposal_document", frm.doc.custom_documents_required);
    },
    custom_documents_required(frm) {
        frm.toggle_display("custom_grant_proposal_document", frm.doc.custom_documents_required);
    }
});
