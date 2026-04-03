// Login Page: Role Selection
function selectRole(role) {
  const tabs = document.querySelectorAll('.role-tab');
  tabs.forEach(tab => {
    if (tab.dataset.role === role) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
}

// Dashboard Page: Toast Notification
function showToast() {
  const toast = document.getElementById('export-toast');
  if (toast) {
    toast.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      closeToast();
    }, 5000);
  }
}

function closeToast() {
  const toast = document.getElementById('export-toast');
  if (toast) {
    toast.classList.remove('show');
  }
}
