frappe.ui.form.on("Customer", {
    custom_status: function (frm) {
        if (frm.doc.custom_status == "Inactive") {
            frm.set_value("disabled", true);
        } else {
            frm.set_value("disabled", false);
        }
    },
    disabled: function (frm) {
        if (frm.doc.disabled == true) {
            frm.set_value("custom_status", "Inactive");
        } else {
            frm.set_value("custom_status", "Active");
        }
    },
    refresh: function(frm) {
        // frm.add_custom_button(__('Validate Website'), function() {
        //     validateWebsite(frm);
        // });
        
        // Add the Create Budget button
        frm.add_custom_button(__('Create Budget'), function() {
            // Navigate to the Donor Task Budget page with the customer's name as a query parameter
            const baseUrl = window.location.origin;
            const donorTaskBudgetUrl = `${baseUrl}/frontend/donor-task-budget?customer=${frm.doc.name}`;
            window.open(donorTaskBudgetUrl, '_blank');
        }, __('Create'));

        frm.remove_custom_button("Get Customer Group Details", "Actions");
        frm.remove_custom_button("Create Budget", "Actions");
        frm.remove_custom_button("Validate Website");
        frm.remove_custom_button("Accounts Receivable", "View");
        frm.remove_custom_button("Accounting Ledger", "View");
    }
});

function validateWebsite(frm) {
    if (frm.doc.website) {
        // Remove any whitespace
        let website = frm.doc.website.trim();
        
        // Basic URL validation regex
        const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        
        // List of valid TLDs
        const validTLDs = ['com', 'in', 'org', 'net', 'edu', 'gov', 'co', 'biz', 'info'];
        
        if (!urlRegex.test(website)) {
            frappe.msgprint({
                title: __('Invalid Website'),
                indicator: 'red',
                message: __('Please enter a valid website URL')
            });
            return false;
        }
        
        // Extract TLD from URL
        const tld = website.split('.').pop().toLowerCase();
        
        if (!validTLDs.includes(tld)) {
            frappe.msgprint({
                title: __('Invalid Domain'),
                indicator: 'red',
                message: __('Please enter a website with a valid domain extension (.com, .in, etc.)')
            });
            return false;
        }
        
        // If URL doesn't start with http:// or https://, add https://
        if (!website.startsWith('http://') && !website.startsWith('https://')) {
            frm.set_value('website', 'https://' + website);
        }
        
        frappe.msgprint({
            title: __('Valid Website'),
            indicator: 'green',
            message: __('Website URL is valid')
        });
        return true;
    }
    return true;
}

