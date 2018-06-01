function addContact({ name, phone, autoContact }) {
    $("#contacts-list").append(`<li class="list-group-item" phone="${phone}">${name}: ${phone} <button type="button" class="btn-remove btn btn-danger"><i class="material-icons">delete</i></button></li>`);
}

function removeContact(phone) {
    let contacts = store.get("contacts");
    delete contacts[phone];
    $(`[phone="${phone}"]`).remove();
    store.set('contacts', contacts);
}

function clearVals() {
    $("#contact-name").val("");
    $("#contact-phone").val("");
}

$(() => {
    let initContacts = store.get("contacts") || {};
    if(initContacts) {
        console.log(initContacts);
        for(const contact in initContacts) {
            addContact(initContacts[contact]);
        }
    }
    $("#add-btn").on("click", e => {
        e.preventDefault();
        const $name = $("#contact-name").val();
        const $phone = $("#contact-phone").val();
        if($name.trim().length > 0 && $phone.trim().length > 0) {
            // uses existing contacts or new one
            let contacts = store.get("contacts") || {};
            const contact = {
                name: $name,
                phone: $phone,
                autoContact: $("#auto-contact").is(":checked")
            };
            contacts[$phone] = contact;
            addContact(contact);
            store.set("contacts", contacts);
            clearVals();
            console.log(contacts);
        }
    })
    $("#contacts-list").on("click", ".list-group-item .btn-remove", function(e) {
        console.log('hit')
        e.preventDefault();
        removeContact($(this).parent().attr("phone"));
    })
});