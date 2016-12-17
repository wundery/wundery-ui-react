import React from 'react';
import { Modal, ModalContent, ModalHeader } from '../Modal';
import { Text } from '../Text';
import { Headline } from '../Headline';
import { AppIcon } from '../Apps';
import { Media, MediaIcon, MediaContent } from '../Media';

function AppModal({ title, description, children, open, onClose, iconSrc }) {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>
        <Media>
          <MediaContent>
            <Headline size="medium">
              {title}
            </Headline>
            <Text muted block margin="1xt">
              {description}
            </Text>
          </MediaContent>
          <MediaIcon>
            <AppIcon src={iconSrc} />
          </MediaIcon>
        </Media>
      </ModalHeader>
      <ModalContent>
        {children}
      </ModalContent>
    </Modal>
  );
}

AppModal.propTypes = {
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  children: React.PropTypes.any,
  onClose: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool,
  iconSrc: React.PropTypes.string,
};

export default AppModal;
