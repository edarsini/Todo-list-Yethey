window.addEventListener('load', function(){
  notificationToggle = document.getElementById('notification-toggle');
  notificationText = document.getElementById('notification');
  alertShown = false; // Track if alert has been shown

  notificationToggle.addEventListener('change', function() {
    if (this.checked) {
      // User has enabled notifications
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          notificationText.innerText = 'Notifications enabled';
          notificationToggle.checked = true;
        } 
        else {
          // Show alert only if it hasn't been shown before
          if (!alertShown) {
            alert("To enable notifications, please go to your browser settings and allow notifications for this website.");
            alertShown = true;
          }
          notificationText.innerText = 'Notifications disabled';
          notificationToggle.checked = false;
          Notification.permission = 'denied';
        }
      });
    }
    else {
      notificationText.innerText = 'Notifications disabled';
      notificationToggle.checked = false;
      Notification.permission = 'denied';
    }
  });
});

//rating bar
rating = document.getElementsByName('rating');

function setRatingValue() {
  let ratingValue;
  for (let i = 0; i < rating.length; i++) {
    if (rating[i].checked) {
      ratingValue = rating[i].value;
      break;
    }
  }
  console.log(ratingValue); // this will log the selected rating value to the console
}

for (let i = 0; i < rating.length; i++) {
  rating[i].addEventListener('click', setRatingValue);
}
