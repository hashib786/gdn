frappe.ui.form.on('Project', {
    refresh: function(frm) {
        frm.add_custom_button(__('Get Tasks'), function() {
            if (!frm.doc.__islocal) {
                frappe.call({
                    method: 'frappe.client.get_list',
                    args: {
                        doctype: 'Task',
                        filters: {
                            'project': frm.doc.name
                        }, 
                        fields: ['name', 'subject', 'status']
                    },
                    callback: function(r) {
                        if (r && r.message.length > 0) {
                            frm.clear_table('custom_task_details');
                            r.message.forEach(function(task) {
                                var row = frm.add_child('custom_task_details');
                                row.task_id = task.name;
                                row.subject = task.subject;
                                row.status = task.status;
                            });
                            frm.refresh_field('custom_task_details');
                        } else {
                            frappe.msgprint(__('No tasks have been created against this project.'));
                        }
                    }
                });
            } else {
                frappe.msgprint(__('Please save the project first to load tasks.'));
                
            }
        });
    }
});
