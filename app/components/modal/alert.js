import { Modal, Button } from "@mantine/core";

const AlertModal = ({ opened, onClose, onConfirm }) => {
  const handleCancelButton = () => {
    onClose();
  };

  const handleDeleteButton = () => {
    onConfirm();
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Confirm">
      <div>
        <p>Are you sure you want to delete this item?</p>
        <Button onClick={handleCancelButton} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onClick={handleDeleteButton} color="red">
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
