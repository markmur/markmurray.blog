import React from 'react';
import { Defaults, Drawer as StyledDrawer, Overlay } from '../styles';
import { CSSTransition } from 'react-transition-group';

interface Props {
  open: boolean;
  blur?: boolean;
  onClose?: () => void;
}

const Drawer: React.FC<Props & Defaults> = ({
  open,
  onClose,
  children,
  ...props
}) => {
  return (
    <React.Fragment>
      <CSSTransition in={open} timeout={250} unmountOnExit>
        <StyledDrawer open={open} backgroundColor="white" {...props}>
          {children}
        </StyledDrawer>
      </CSSTransition>

      {open && <Overlay onClick={onClose} />}
    </React.Fragment>
  );
};

export default Drawer;
