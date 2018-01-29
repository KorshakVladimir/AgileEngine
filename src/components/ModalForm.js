import React from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';

const ModalForm = (props) => {
  function handleSubmit (e){
    e.preventDefault();
    props.submitForm();
    props.hideModal();
  }
  return (
    <Dialog active={props.show}
            onEscKeyDown={props.hideModal}
            onOverlayClick={props.hideModal}
            title='Create product'
    >
      <form onSubmit={handleSubmit}>
        {props.children}
        <div style={{'float': 'right'}}>
          <Button onClick={props.hideModal} raised> Cancel</Button>
          <Button type="submit" raised primary
                  disabled={!props.valid || props.pristineForm}
          >
            Save
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalForm;
