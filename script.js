let globalApplicationModalInstance = null;
let globalApplicationModalElement = null;
const port = 3004;
const api_url =
    "https://school-api.republicschoolofjournalism.com/api/applications/register/";

const cashfree = Cashfree({
    mode: "production",
});

const createPaymentDetailsHTML = (details) => {
    // Format amount (optional, basic example)
    const formattedAmount = `Rs.${details.order_amount.toFixed(2)}`;
    // Format date (assuming YYYY-MM-DD from backend)
    const displayDate =
        details.created_at || new Date().toISOString().split("T")[0];

    return `
    <div class="payment-details-view">
        <div class="payment-header">
            <h2>Apply Now</h2>
            <p>Your application is incomplete unless you make the Payment</p>
        </div>
        <div class="order-details">
            <h3>Your filled order details</h3>
            <dl class="details-grid">
                <dt>Order Number:</dt>
                <dd>${details?.order_id || "N/A"}</dd>

                <dt>Payable Amount:</dt>
                <dd>${formattedAmount}</dd>

                <dt>Name:</dt>
                <dd>${details?.customer_details?.customer_name || "N/A"}</dd>

                <dt>Payment Mode:</dt>
                <dd>ONLINE_CC</dd>

                <dt>Order Date:</dt>
                <dd>${displayDate}</dd>

                <dt>Mobile:</dt>
                <dd>${details?.customer_details?.customer_phone || "N/A"}</dd>

                <dt>Email:</dt>
                <dd>${details?.customer_details?.customer_email || "N/A"}</dd>
            </dl>
        </div>
        <div class="pay-now-section">
            <button type="button" class="btn-pay-now" id="pay-now-button" data-order-number="${details.order_id
        }">Pay Now</button>
        </div>
        <div class="payment-disclaimer">
            <strong>Disclaimer:</strong> You are about to disclose sensitive financial information to a third party for further processing of the payment/service. Kindly note that the personal information is not being processed by Republic School of Journalism (RSJ), a division of Republic Media Network is not responsible for the information provided to the third parties. For more details on how your personal information will be used, stored and processed, check the privacy policy of the third party website.
        </div>
    </div>`;
};

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.forEach(function (nav) {
                nav.classList.remove("active");
            });

            this.classList.add("active");
        });
    });
});


const createPaymentSuccessHTML = () => {
    return `
    <div class="payment-result-view">
        <div class="result-icon success"></div>
        <h2 class="success">THANK YOU</h2>
        <p>Your submission has been received.<br>We've received your submission successfully. Our team will review the details and get in touch with you soon.</p>
        <button type="button" class="btn-result-action home" id="go-home-button">GO TO HOME PAGE <i class="bi bi-arrow-right-short"></i></button>
    </div>`;
};

const createPaymentFailureHTML = () => {
    return `
    <div class="payment-result-view">
        <div class="result-icon failure"></div>
        <h2 class="failure">Payment Failed</h2>
        <p>An error occurred while processing your payment<br>There was an error while processing your payment. Please verify your payment details and try again.</p>
        <button type="button" class="btn-result-action retry" id="retry-payment-button">RETRY <i class="bi bi-arrow-clockwise"></i></button>
    </div>`;
};

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $("#top_navi_bar").addClass("newNav");
    } else {
        $("#top_navi_bar").removeClass("newNav");
    }
});

const displayPaymentScreen = (paymentDetails) => {
    if (!globalApplicationModalElement) return;
    const modalBody = globalApplicationModalElement.querySelector(".modal-body");
    const modalTitle =
        globalApplicationModalElement.querySelector(".modal-title");
    const modalFooter =
        globalApplicationModalElement.querySelector(".modal-footer");

    if (modalTitle) modalTitle.textContent = "Complete Payment";
    if (modalBody) {
        modalBody.innerHTML = createPaymentDetailsHTML(paymentDetails);
        const payNowBtn = modalBody.querySelector("#pay-now-button");
        if (payNowBtn) {
            payNowBtn.addEventListener("click", () =>
                window.handlePaymentAttempt(paymentDetails)
            );
        }
    }
    if (modalFooter) modalFooter.style.display = "none";
};

const displaySuccessScreen = () => {
    if (!globalApplicationModalElement) return;
    const modalBody = globalApplicationModalElement.querySelector(".modal-body");
    const modalTitle =
        globalApplicationModalElement.querySelector(".modal-title");
    const modalFooter =
        globalApplicationModalElement.querySelector(".modal-footer");

    if (modalTitle) modalTitle.textContent = "Submission Successful";
    if (modalBody) {
        modalBody.innerHTML = createPaymentSuccessHTML();
        const goHomeBtn = modalBody.querySelector("#go-home-button");
        if (goHomeBtn && globalApplicationModalInstance) {
            goHomeBtn.addEventListener("click", () =>
                globalApplicationModalInstance.hide()
            );
        }
    }
    if (modalFooter) modalFooter.style.display = "none";
};

const displayFailureScreen = (paymentDetails) => {
    if (!globalApplicationModalElement) return;
    const modalBody = globalApplicationModalElement.querySelector(".modal-body");
    const modalTitle =
        globalApplicationModalElement.querySelector(".modal-title");
    const modalFooter =
        globalApplicationModalElement.querySelector(".modal-footer");

    if (modalTitle) modalTitle.textContent = "Payment Issue";
    if (modalBody) {
        modalBody.innerHTML = createPaymentFailureHTML();
        const retryBtn = modalBody.querySelector("#retry-payment-button");
        if (retryBtn && globalApplicationModalInstance) {
            retryBtn.addEventListener("click", () => {
                // globalApplicationModalInstance.hide()
                window.handlePaymentAttempt(paymentDetails);
            });
        }
    }
    if (modalFooter) modalFooter.style.display = "none";
};

const handlePaymentAttempt = (paymentDetails) => {
    let checkoutOptions = {
        paymentSessionId: paymentDetails.payment_session_id,
        orderId: paymentDetails.order_id,
        orderAmount: paymentDetails.order_amount,
        redirectTarget: "_modal",
        // redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions).then((result) => {

        // if (result.paymentDetails) {
        //     
        //     // displaySuccessScreen();
        // }

        // if (result.error) {
        //     displayFailureScreen(paymentDetails);
        //     console.log(
        //         "User has closed the popup or there is some payment error, Check for Payment Status"
        //     );
        // }

        if (result.redirect) {
            // console.log("Payment redirection requested by Cashfree.");
            if (
                typeof result.redirect === "string" &&
                result.redirect.startsWith("http")
            ) {
                // console.log("Redirecting to:", result.redirect);
                window.location = result.redirect;
            } else {
                console.warn(
                    "Cashfree result.redirect was not a valid URL:",
                    result.redirect
                );
                displayFailureScreen(paymentDetails);
            }
        }

        paymentDetailsSaved(paymentDetails);
    })
    .catch((error) => {
        console.error(`onRejected function called: ${error.message}`);
    })
    
};

const paymentDetailsSaved = async (paymentDetails) => {

    if (paymentDetails.order_id) {

        let new_url = `${api_url}payment-verify/${paymentDetails.order_id}`;
        
        try {
            const response = await fetch(new_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const result = await response.json();

            if (result?.data?.payment_status === 'SUCCESS') {
                displaySuccessScreen();
            } else {
                displayFailureScreen(paymentDetails);
            }

        } catch (error) {
            console.error(error);
            displayFailureScreen(paymentDetails);
        }
    }
};

window.createPaymentDetailsHTML = createPaymentDetailsHTML;
window.createPaymentSuccessHTML = createPaymentSuccessHTML;
window.createPaymentFailureHTML = createPaymentFailureHTML;
window.displayPaymentScreen = displayPaymentScreen;
window.displaySuccessScreen = displaySuccessScreen;
window.displayFailureScreen = displayFailureScreen;
window.handlePaymentAttempt = handlePaymentAttempt;
window.paymentDetailsSaved = paymentDetailsSaved;

$(document).ready(function () {

    const entranceModeSelect = document.getElementById("entrance_test_mode");
    const offlineLocationGroup = document.getElementById("offline-mode-location");
    const applicationForm = document.getElementById("application-form");

    globalApplicationModalElement = document.getElementById("application-modal");

    if (globalApplicationModalElement && typeof bootstrap !== "undefined") {

        globalApplicationModalInstance = bootstrap.Modal.getOrCreateInstance(
            globalApplicationModalElement
        );
    }

    if (entranceModeSelect && offlineLocationGroup) {
        entranceModeSelect.addEventListener("change", (event) => {
            const offlineSelect = offlineLocationGroup.querySelector("select");
            if (event.target.value === "offline") {
                offlineLocationGroup.style.display = "block";
                if (offlineSelect) offlineSelect.required = true;
            } else {
                offlineLocationGroup.style.display = "none";
                if (offlineSelect) {
                    offlineSelect.required = false;
                    offlineSelect.value = "";
                }
            }
        });

        const offlineSelectInitial = offlineLocationGroup.querySelector("select");
        if (entranceModeSelect.value === "offline") {
            offlineLocationGroup.style.display = "block";
            if (offlineSelectInitial) offlineSelectInitial.required = true;
        } else {
            offlineLocationGroup.style.display = "none";
            if (offlineSelectInitial) offlineSelectInitial.required = false;
        }
    }

    const navbarBtn = document.getElementById("navbarBtn");
    const navbarCollapse = document.getElementById("navbarNav");
    const menuIcon = document.getElementById("menuIcon");

    navbarBtn.addEventListener("click", () => {
        const isOpen = navbarCollapse.classList.contains("show");

        if (isOpen) {
            navbarCollapse.classList.remove("show");
            menuIcon.classList.remove("close-icon");
            menuIcon.classList.add("navbar-toggler-icon");
        } else {
            navbarCollapse.classList.add("show");
            menuIcon.classList.remove("navbar-toggler-icon");
            menuIcon.classList.add("close-icon");
        }
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            const applyElement = document.querySelector(".apply");
            if (applyElement) {
                applyElement.style.display = "none";
            }

            if (navbarCollapse.classList.contains("show")) {
                navbarCollapse.classList.remove("show");
                menuIcon.classList.remove("close-icon");
                menuIcon.classList.add("navbar-toggler-icon");
            }
        });
    });

    let originalModalBodyHTML = null;
    let validator = null;

    $.validator.addMethod(
        "lettersOnly",
        function (value, element) {
            return this.optional(element) || /^[a-zA-Z\s]+$/.test(value);
        },
        "Please enter only letters and spaces."
    );

    $.validator.addMethod(
        "noFutureDate",
        function (value, element) {
            if (!value) {
                return true;
            }
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const inputDate = new Date(value);
                inputDate.setHours(0, 0, 0, 0);
                return this.optional(element) || inputDate <= today;
            } catch (e) {
                console.error("Error parsing date:", e);
                return false;
            }
        },
        "Date of birth cannot be in the future."
    );


    if (applicationForm && globalApplicationModalInstance) {
        const initialModalBody =
            globalApplicationModalElement.querySelector(".modal-body");
        if (initialModalBody) {
            originalModalBodyHTML = initialModalBody.innerHTML;
        }

        validator = $(applicationForm).validate({
            rules: {
                name: {
                    required: true,
                    lettersOnly: true,
                },
                dob: {
                    required: true,
                    noFutureDate: true
                },
                email: {
                    required: true,
                    email: true,
                },
                contact: {
                    required: true,
                    digits: true,
                    minlength: 10,
                    maxlength: 10,
                },
                address: "required",
                entrance_test_mode: "required",
                offline_mode_location: {
                    required: function (element) {
                        return $("#entrance_test_mode").val() === "offline";
                    },
                },
                qualification: "required",
                institution: "required",
                terms: "required",
            },
            messages: {
                name: {
                    required: "Please enter your full name.",
                    lettersOnly: "Please enter only letters and spaces.",
                },
                dob: {
                    required: "Please enter your date of birth.",
                    noFutureDate: "Date of birth cannot be in the future."
                },
                email: "Please enter a valid email address.",
                contact: {
                    required: "Please enter your contact number.",
                    digits: "Please enter only digits.",
                    minlength: "Contact number must be 10 digits.",
                    maxlength: "Contact number must be 10 digits.",
                },
                address: "Please enter your current address.",
                entrance_test_mode: "Please select your preferred entrance test mode.",
                offline_mode_location: "Please select your offline test location.",
                qualification: "Please select your education qualification.",
                institution: "Please enter your current or last institution name.",
                terms: "You must accept the terms and conditions.",
            },
            errorElement: "div",
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback");
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.next("label"));
                } else if (element.parent().hasClass("input-group")) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass("is-invalid").removeClass("is-valid");
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass("is-invalid").addClass("is-valid");
            },
            submitHandler: function (form) {
                // console.log(
                //     "jQuery Validation successful. Attempting form submission..."
                // );

                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });

                data.terms = formData.has("terms");

                fetch(`${api_url}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => {

                        if (result.status && result.data) {
                            window.displayPaymentScreen(result.data);
                        } else {
                            if (result.error && typeof result.error === 'object' && Object.keys(result.error).length > 0) {
                                validator.showErrors(result.error);
                            } else {
                                const errorMsg = result.message || "Submission failed. Please check your input and try again.";
                                alert(`Submission failed: ${errorMsg}`);
                            }
                        }
                    })
                    .catch((error) => {
                        console.error("Error submitting form:", error);
                    });
                return false;
            },
        });
    }

    if (globalApplicationModalElement) {
        $(globalApplicationModalElement).on("hidden.bs.modal", () => {
            const modalBody =
                globalApplicationModalElement.querySelector(".modal-body");
            const modalTitle =
                globalApplicationModalElement.querySelector(".modal-title");
            const modalFooter =
                globalApplicationModalElement.querySelector(".modal-footer");

            if (modalTitle) modalTitle.textContent = "Application Form";

            if (
                modalBody &&
                originalModalBodyHTML &&
                modalBody.innerHTML !== originalModalBodyHTML
            ) {
                modalBody.innerHTML = originalModalBodyHTML;

                const newApplicationForm = modalBody.querySelector("#application-form");
                const newEntranceModeSelect = modalBody.querySelector("#entrance_test_mode");
                const newOfflineLocationGroup = modalBody.querySelector("#offline-mode-location");

                if (newEntranceModeSelect && newOfflineLocationGroup) {
                    newEntranceModeSelect.addEventListener("change", (event) => {
                        const offlineSelect = newOfflineLocationGroup.querySelector("select");
                        if (event.target.value === "offline") {
                            newOfflineLocationGroup.style.display = "block";
                            if (offlineSelect) offlineSelect.required = true;
                        } else {
                            newOfflineLocationGroup.style.display = "none";
                            if (offlineSelect) {
                                offlineSelect.required = false;
                                offlineSelect.value = "";
                            }
                        }
                    });

                    const offlineSelectInitial = newOfflineLocationGroup.querySelector("select");
                     if (newEntranceModeSelect.value === "offline") {
                        newOfflineLocationGroup.style.display = "block";
                        if (offlineSelectInitial) offlineSelectInitial.required = true;
                    } else {
                        newOfflineLocationGroup.style.display = "none";
                        if (offlineSelectInitial) offlineSelectInitial.required = false;
                    }
                }

                if (newApplicationForm) {

                    validator = $(newApplicationForm).validate({
                        rules: {
                            name: { required: true, lettersOnly: true },
                            dob: { required: true, noFutureDate: true },
                            email: { required: true, email: true },
                            contact: { required: true, digits: true, minlength: 10, maxlength: 10 },
                            address: "required",
                            entrance_test_mode: "required",
                            offline_mode_location: {
                                required: function (element) {
                                    return $("#entrance_test_mode").val() === "offline";
                                },
                            },
                            qualification: "required",
                            institution: "required",
                            terms: "required",
                        },
                        messages: {
                            name: { required: "Please enter your full name.", lettersOnly: "Please enter only letters and spaces." },
                            dob: {
                                required: "Please enter your date of birth.",
                                noFutureDate: "Date of birth cannot be in the future."
                            },
                            email: "Please enter a valid email address.",
                            contact: { required: "Please enter your contact number.", digits: "Please enter only digits.", minlength: "Contact number must be 10 digits.", maxlength: "Contact number must be 10 digits." },
                            address: "Please enter your current address.",
                            entrance_test_mode: "Please select your preferred entrance test mode.",
                            offline_mode_location: "Please select your offline test location.",
                            qualification: "Please select your education qualification.",
                            institution: "Please enter your current or last institution name.",
                            terms: "You must accept the terms and conditions.",
                        },
                        errorElement: "div",
                        errorPlacement: function (error, element) {
                            error.addClass("invalid-feedback");
                            if (element.prop("type") === "checkbox") {
                                error.insertAfter(element.next("label"));
                            } else if (element.parent().hasClass("input-group")) {
                                error.insertAfter(element.parent());
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        highlight: function (element, errorClass, validClass) {
                            $(element).addClass("is-invalid").removeClass("is-valid");
                        },
                        unhighlight: function (element, errorClass, validClass) {
                            $(element).removeClass("is-invalid").addClass("is-valid");
                        },
                        submitHandler: function (form) {
                            // console.log("jQuery Validation successful (re-initialized). Attempting form submission...");
                            const formData = new FormData(form);
                            const data = {};
                            formData.forEach((value, key) => { data[key] = value; });
                            data.terms = formData.has("terms");

                            fetch(`${api_url}`, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(data),
                            })
                            .then((response) => response.json())
                            .then((result) => {
                                if (result.status && result.data) {
                                    window.displayPaymentScreen(result.data);
                                } else {
                                    if (result.error && typeof result.error === 'object' && Object.keys(result.error).length > 0) {
                                        validator.showErrors(result.error);
                                    } else {
                                        const errorMsg = result.message || "Submission failed. Please check your input and try again.";
                                        alert(`Submission failed: ${errorMsg}`);
                                    }
                                }
                            })
                            .catch((error) => {
                                console.error("Error submitting form:", error);
                            });
                            return false;
                        },
                    });
                }

            } else if (applicationForm && validator) {
                 validator.resetForm();
                 $(applicationForm)[0].reset();
                 $(applicationForm).find(".is-invalid, .is-valid").removeClass("is-invalid is-valid");
                 if (entranceModeSelect && offlineLocationGroup) {
                    const offlineSelect = offlineLocationGroup.querySelector("select");
                    offlineLocationGroup.style.display = "none";
                    if (offlineSelect) offlineSelect.required = false;
                }
            }

            if (modalFooter) modalFooter.style.display = "flex";
        });
    }
});
