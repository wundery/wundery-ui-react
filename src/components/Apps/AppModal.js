import React from 'react';
import { AppIcon } from '../Apps';
import { Button } from '../Button';
import { Headline } from '../Headline';
import { Media, MediaIcon, MediaContent } from '../Media';
import { Modal, ModalContent, ModalHeader } from '../Modal';
import { Text } from '../Text';

function AppModal({ title, description, children, open, onClose, iconSrc, closeLabel }) {
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
            {closeLabel && <Button margin="1xt" onClick={onClose}>{closeLabel}</Button>}
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
  children: React.PropTypes.any,
  closeLabel: React.PropTypes.string,
  description: React.PropTypes.string,
  iconSrc: React.PropTypes.string,
  onClose: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool,
  title: React.PropTypes.string,
};

AppModal.defaultProps = {
  closeLabel: null,
};

export default AppModal;
