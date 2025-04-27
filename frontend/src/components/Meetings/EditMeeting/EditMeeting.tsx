import { Modal } from "@mantine/core";
import { Meeting } from "../../../interfaces/meetings";

interface EditMeetingProps {
  selectedMeeting: Meeting;
  openModal: boolean;
  onClose: () => void;
}

export function EditMeeting(props: EditMeetingProps) {
  const { selectedMeeting, openModal, onClose } = props;

  return (
    <Modal opened={openModal} onClose={onClose} title="Edit Meeting" size="lg">
      <div>{selectedMeeting.vibe}</div>
    </Modal>
  );
}

// TODO:
// [ ] Create edit views for List and Text view components
// [ ] Create edit views for Meeting components (title, date, project, template)
// [ ] Create add/delete functionality for edit List view
