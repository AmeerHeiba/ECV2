// modalHelper.js

function createCustomModal() {
  const modalHTML = `
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

  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);
}

function showCustomModal(title, bodyText, confirmText, cancelText, confirmCallback, cancelCallback) {
  if (!document.getElementById('customModal')) {
    createCustomModal();
  }

  const modalElement = document.getElementById('customModal');
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
    $(modalElement).modal('hide');
  });

  cancelButton.addEventListener('click', () => {
    if (cancelCallback) cancelCallback();
    $(modalElement).modal('hide');
  });

  // Show the modal
  $(modalElement).modal('show');
}

// Export the function for use in other scripts
export { showCustomModal };
