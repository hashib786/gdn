// Copyright (c) 2024, extension and contributors
// For license information, please see license.txt

const defaultFillTheVal = [{
    field: "status",
    fieldName: "Status",
    value: "custom__old_grant_status_verified",
    dateTime: "custom__grant_status_change_date_time"
},
{
    field: "custom_grant_start_date",
    fieldName: "Grant Start Date",
    value: "custom_old_grant_start_date_verified",
    dateTime: "custom__grant_start_change_date_time"
},
{
    field: "custom_grant_end_date",
    fieldName: "Grant End Date",
    value: "custom_old_grad_end_date_verified",
    dateTime: "custom_grand_end_date_change_date_time"
},
{
    field: "sent_on",
    fieldName: "Sent On",
    value: "custom_old_grant_verified",
    dateTime: "custom__grant_sent_change_date_time"
},
{
    field: "signed_on",
    fieldName: "Signed On",
    value: "custom_old_grant_signed_on_veified",
    dateTime: "custom_grant_signed_on_change_date_time"
}]

const hideFields = [
    "custom__old_grant_status_verified",
    "custom__grant_status_change_date_time",
    "custom_old_grant_start_date_verified",
    "custom__grant_start_change_date_time",
    "custom_old_grad_end_date_verified",
    "custom_grand_end_date_change_date_time",
    "custom_old_grant_verified",
    "custom__grant_sent_change_date_time",
    "custom_old_grant_signed_on_veified",
    "custom_grant_signed_on_change_date_time",
];

frappe.ui.form.on("Grant", {
    refresh(frm) {
        frm.toggle_display("custom_grant_proposal_document", frm.doc.custom_documents_required);
    },
    custom_documents_required(frm) {
        frm.toggle_display("custom_grant_proposal_document", frm.doc.custom_documents_required);
    },
    before_save: function (frm) {
        defaultFillTheVal.forEach((field) => {
            if ((!frm.doc[field.value] && frm.doc[field.field]) || (frm.doc[field.value] !== frm.doc[field.field])) {
                const currentDateTime = frappe.datetime.now_datetime();
                const newValue = [{
                    "custom_field_name": field.fieldName,
                    "from": frm.doc[field.value] || "Blank",
                    "to": frm.doc[field.field] || "Blank",
                    "custom_field_api_name": field.field,
                    "from_date": frm.doc[field.dateTime] || currentDateTime,
                    "to_date": currentDateTime,
                    custom_changed_by: frappe.session.user_fullname ?? frm.doc.owner,
                    custom_changed_durations: formatDurationFromMinutesWithSeconds((new Date(currentDateTime).getTime() - new Date(frm.doc[field.dateTime] || currentDateTime).getTime()) / 1000),
                }, ...frm.doc.custom_logs || []];
                frm.set_value("custom_logs", newValue);
                frm.set_value(field.dateTime, frappe.datetime.now_datetime());
                frm.set_value(field.value, frm.doc[field.field]);
            }
        });
    },
    onload: function (frm) {
        // Hide fields
        hideFields.forEach((field) => frm.set_df_property(field, "hidden", 1));
    },
});


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