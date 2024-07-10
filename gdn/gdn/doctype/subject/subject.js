// Copyright (c) 2024, extension and contributors
// For license information, please see license.txt

frappe.ui.form.on('Subject', {
    setup: function(frm) {
        frm.set_query('task', function(doc) {
            return {
                filters: {
                    'project': doc.project
                }
            };
        });
    },
    
    project: function(frm) {
        // Clear the task field when project changes
        frm.set_value('task', '');
    }
});
