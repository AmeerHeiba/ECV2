// modalHelper.js
class CustomModal {
  constructor() {
    this.modalHTML = `
      <div class="modal fade" id="customModal" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="customModalLabel">Modal Title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Modal body text goes here.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="customModalCancel">Cancel</button>
              <button type="button" class="btn btn-custom" id="customModalConfirm">Confirm</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  createCustomModal() {
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = this.modalHTML;
    document.body.appendChild(modalContainer);
  }

  showCustomModal(title, bodyText, confirmText, cancelText, confirmCallback, cancelCallback, theme = 'light') {
    if (!document.getElementById('customModal')) {
      this.createCustomModal();
    }

    const modalElement = document.getElementById('customModal');
    const modalContent = modalElement.querySelector('.modal-content');
    const modalTitle = modalElement.querySelector('.modal-title');
    const modalBody = modalElement.querySelector('.modal-body');
    const confirmButton = modalElement.querySelector('#customModalConfirm');
    const cancelButton = modalElement.querySelector('#customModalCancel');

    // Set modal content
    modalTitle.textContent = title;
    modalBody.textContent = bodyText;
    confirmButton.textContent = confirmText;
    cancelButton.textContent = cancelText;

    // Remove previous event listeners
    confirmButton.onclick = null;
    cancelButton.onclick = null;

    // Add new event listeners
    confirmButton.addEventListener('click', () => {
      confirmCallback();
      modalElement.querySelector('[data-bs-dismiss="modal"]').click();
    });

    cancelButton.addEventListener('click', () => {
      if (cancelCallback) cancelCallback();
      modalElement.querySelector('[data-bs-dismiss="modal"]').click();
    });

    // Set theme
    if (theme === 'dark') {
      modalContent.classList.add('bg-dark', 'text-white');
      confirmButton.classList.add('btn-outline-primary');
      cancelButton.classList.add('btn-outline-danger');
    } else {
      modalContent.classList.remove('bg-dark', 'text-white');
      confirmButton.classList.remove('btn-outline-primary');
      cancelButton.classList.remove('btn-outline-danger');
    }

    // Show the modal
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  }
}

// Make the class available globally
window.CustomModal = CustomModal;
