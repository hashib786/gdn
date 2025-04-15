const defaultFillTheVal = [{
    field: "custom_agreement_verification_status",
    fieldName: "Agreement Verification Status",
    value: "custom_old_agreement_verified_value",
    dateTime: "custom_agreement_changed_date_time"
},
{
    field: "custom_onboarding_status",
    fieldName: "Onboarding Status",
    value: "custom_old_onboarding_status_verified",
    dateTime: "custom_onboarding_status_change_date_time"
},
{
    field: "custom_onboarding_date",
    fieldName: "Onboarding Date",
    value: "custom_old_onboarding_date_value",
    dateTime: "custom_onboarding_change_date_time"
},
{
    field: "custom_kyc_verification_status",
    fieldName: "KYC Verification Status",
    value: "custom_old_kyc_value_",
    dateTime: "custom_kyc_change_date_and_time"
}]

const hideFields = ["custom_old_agreement_verified_value",
    "custom_agreement_changed_date_time",
    "custom_old_onboarding_status_verified",
    "custom_onboarding_status_change_date_time",
    "custom_old_onboarding_date_value",
    "custom_onboarding_change_date_time",
    "custom_old_kyc_value_",
    "custom_kyc_change_date_and_time"];

const readOnlyFields = [
    "custom_agreement_approved",
    "custom_kyc_",
];

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

    custom_agreement_doc: function (frm) {
        frm.set_value("custom_agreement_approved", Boolean(frm.doc.custom_agreement_doc));
        frm.set_value("custom_agreement_verification_status", Boolean(frm.doc.custom_agreement_doc) ? "Verified" : "Pending");
        frm.set_value("custom_onboarding_status", Boolean(frm.doc.custom_agreement_doc && frm.doc.custom_kyc_doc) ? "Completed" : "Pending");
    },
    custom_kyc_doc: function (frm) {
        frm.set_value("custom_kyc_", Boolean(frm.doc.custom_kyc_doc));
        frm.set_value("custom_kyc_verification_status", Boolean(frm.doc.custom_kyc_doc) ? "Verified" : "Pending");
        frm.set_value("custom_onboarding_status", Boolean(frm.doc.custom_agreement_doc && frm.doc.custom_kyc_doc) ? "Completed" : "Pending");
    },
    custom_onboarding_status: function (frm) {
        frm.set_value("custom_onboarding_status", Boolean(frm.doc.custom_agreement_doc && frm.doc.custom_kyc_doc) ? "Completed" : "Pending");
        if (frm.doc.custom_onboarding_status == "Completed") {
            frm.set_value("custom_onboarding_date", frappe.datetime.now_date());
        }
    },
    custom_agreement_approved: function (frm) {
    },
    before_save: function (frm) {
        defaultFillTheVal.forEach((field) => {
            if ((!frm.doc[field.value] && frm.doc[field.field]) || (frm.doc[field.value] !== frm.doc[field.field])) {
                const currentDateTime = frappe.datetime.now_datetime();
                const newValue = [{
                    "custom_field_name": field.fieldName,
                    "from": frm.doc[field.value] || "Blank",
                    "to": frm.doc[field.field],
                    "custom_field_api_name": field.field,
                    "from_date": frm.doc[field.dateTime] || currentDateTime,
                    "to_date": currentDateTime,
                    custom_changed_by: frm.doc.modified_by,
                    custom_changed_durations: formatDurationFromMinutesWithSeconds((new Date(currentDateTime).getTime() - new Date(frm.doc[field.dateTime] || currentDateTime).getTime()) / 1000),
                }, ...frm.doc.custom_logs || []];
                frm.set_value("custom_logs", newValue);
                frm.set_value(field.dateTime, frappe.datetime.now_datetime());
                frm.set_value(field.value, frm.doc[field.field]);
            }
        });
    },
    onload: function (frm) {
        // Read Only custom_agreement_approved, custom_kyc_
        readOnlyFields.forEach((field) => frm.set_df_property(field, "read_only", 1));

        // Hide fields
        hideFields.forEach((field) => frm.set_df_property(field, "hidden", 1));
    },
    refresh: function (frm) {
        // frm.add_custom_button(__('Validate Website'), function() {
        //     validateWebsite(frm);
        // });

        // Add the Create Budget button
        frm.add_custom_button(__('Create Budget'), function () {
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
    },

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


function formatDurationFromMinutesWithSeconds(secondsStr) {
    // Convert to BigInt for large safe numbers
    const totalSeconds = BigInt(secondsStr);

    const secondsInDay = 24n * 60n * 60n;
    const secondsInHour = 60n * 60n;
    const secondsInMinute = 60n;

    const days = totalSeconds / secondsInDay;
    const remainingAfterDays = totalSeconds % secondsInDay;

    const hours = remainingAfterDays / secondsInHour;
    const remainingAfterHours = remainingAfterDays % secondsInHour;

    const minutes = remainingAfterHours / secondsInMinute;
    const seconds = remainingAfterHours % secondsInMinute;

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}