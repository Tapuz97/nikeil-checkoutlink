var CO_link = null;

function handleGenLinkClick() {
    $('#co_btn').text('Generating...').css('display', 'block');
    toaster(0);
    var productLink = $('#productlink').val().trim();
    var enteredSku = $('#sku').val().trim(); // Get the user-entered SKU
    console.log('Button clicked. Product link:', productLink, 'SKU:', enteredSku);

    if (productLink && enteredSku) {
        var proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(productLink);
        console.log('Fetching data from:', proxyUrl);

        $.get(proxyUrl, function(response) {
            console.log('Response received');
            
            if (response && response.contents) {
                // Check if the entered SKU is in the response
                console.log('Checking for entered SKU:', enteredSku);  
                var productPattern = new RegExp(`"productId":"([\\w-]+)","styleColor":"${enteredSku}"`, 'i');
                var productMatch = response.contents.match(productPattern);

                if (productMatch && productMatch[1]) {
                    // SKU matches, proceed to update CO_link
                    CO_link = generatelink(productMatch[1]); // Update CO_link globally
                    console.log('CO_link updated:', CO_link);

                    // Update #co_btn based on CO_link
                    updateCOButton(CO_link);
                } else {
                    console.log('Product info not found for entered SKU:', enteredSku);
                    $('#genlink').one('click', handleGenLinkClick); // Re-bind the click event to #genlink
                    updateCOButton(null);
                }
            } else {
                console.log('No contents in the response');
            }
        }).fail(function(error) {
            console.error('Error fetching the data:', error);
        });
    } else {
        console.log('Product link or SKU not provided');
    }
}

$(document).ready(function() {
    $('#genlink').one('click', handleGenLinkClick);
});

function generatelink(pid) {
    var url = $('#productlink').val();
    var size = $('#size').val();
    return `${url}?productId=${pid}&size=${size}`;
}

function updateCOButton(link) {
    if (link) {
        $('#co_btn').text("Checkout");
        toaster(1);
        $('#co_btn').css('background', '#1D2433');
        $('#co_btn').css('color', '#FFA667');
        $('#co_btn').css('cursor', 'pointer');
        $('#co_btn').prop('disabled', false);
        $('#co_btn').css('pointer-events', 'auto');
        $('#co_btn').attr('onclick', `location.href='${link}';`);
    } else {
        $('#co_btn').css('background', '#a885d8');
        $('#co_btn').css('cursor', 'not-allowed');
        $('#co_btn').prop('disabled', true);
        $('#co_btn').css('pointer-events', 'none');
        $('#co_btn').removeAttr('onclick');
        $('#co_btn').text("Error");
        toaster(-1)
    }
}

function toaster(num){
    if (num==0){
        $.toast(
            {
                text: "Generating Checkout link", // Text that is to be shown in the toast
                heading: "Please wait..",
                icon: 'info', // Type of toast icon
                showHideTransition: 'slide', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3500, // false to make it sticky or number representing the milliseconds as time after which toast needs to be hidden
                stack: false, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left',  // Text alignment i.e. left, right or center
                loader: true,  // Whether to show loader or not. True by default
                loaderBg: '#ffffff',  // Background color of the toast loader
    
        });
    }
    if (num==1){
        $.toast(
            {
                text: "GOT IT!", // Text that is to be shown in the toast
                heading: "hope you GOTEM",
                icon: 'success', // Type of toast icon
                showHideTransition: 'slide', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3500, // false to make it sticky or number representing the milliseconds as time after which toast needs to be hidden
                stack: false, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
                textAlign: 'left',  // Text alignment i.e. left, right or center
                loader: true,  // Whether to show loader or not. True by default
                loaderBg: '#ffffff',  // Background color of the toast loader
    
        });
    }
    if (num==-1){
        $.toast(    
            {
            text: "Please check SKU and URL and try again", // Text that is to be shown in the toast
            heading: "Error accord",
            icon: 'error', // Type of toast icon
            showHideTransition: 'slide', // fade, slide or plain
            allowToastClose: true, // Boolean value true or false
            hideAfter: 3500, // false to make it sticky or number representing the milliseconds as time after which toast needs to be hidden
            stack: false, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
            position: 'top-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values 
            textAlign: 'left',  // Text alignment i.e. left, right or center
            loader: true,  // Whether to show loader or not. True by default
            loaderBg: '#ffffff',  // Background color of the toast loader

        });
    }
}
