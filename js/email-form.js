
const messages = {
    Welcome: 'Welcome on board! We\'ve will keep you updated on the latest developments',
    'Server Error': 'Server error. Please try again later or contact us at info@paralink.network.',
    'Invalid Resource': 'Please enter a valid email address.',
    'Member Exists': 'Looks like you&apos;ve already signed up with this email address.',
};

function subscribe($emailInput, $messageHolder) {

    $.ajax({
        type: 'POST',
        url: 'https://api.paralink.network/api/subscribe',
        data: JSON.stringify({ email: $emailInput.val() }),
        headers: {
            'Content-Type': 'application/json',
        },
        success: (res) => {
            const message = res.success
                ? `<p class="c-form-message c-form-message--success">${messages.Welcome}</p>`
                : `<p class="c-form-message c-form-message--error">${messages[res.err.title] || 'Unexpected error happened.'}</p>`;

            $messageHolder.html(message).fadeIn('slow');
            if (res.success) {
                $emailInput.val('');
            }
        },
        error: () => {
            $messageHolder.html(`<p class="c-form-message c-form-message--error">${messages['Server Error']}</p>`).fadeIn('slow');
        },
    });
}

function attachEmailSignup($wrapper) {
    const $form = $wrapper.find('form');
    const $email = $wrapper.find('input[name=email]');
    const $message = $wrapper.find('.js-email-message');
    console.log($form, $email, $message, "?????")
    $form.on('submit', (evt) => {
        evt.preventDefault();
        subscribe($email, $message);
    });

}

function initEmailForm() {
    $('.js-email-signup').each((index, el) => {
        attachEmailSignup($(el));
    });
    $("#send-button").on("click", function () {
        $("#send-form").submit();
    });
}

initEmailForm();
