import { Modal, Button } from "@mantine/core";

const AlertModal = ({ opened, onClose, onConfirm, content }) => {
  const handleCancelButton = () => {
    onClose();
  };

  const handleConfirmButton = () => {
    onConfirm();
    onClose();
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Confirm">
      <div>
        <p>{content}</p>
        <Button onClick={handleCancelButton} style={{ marginRight: 10 }}>
          Cancel
        </Button>
        <Button onClick={handleConfirmButton} color="red">
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
