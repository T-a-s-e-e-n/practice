import React from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableDraggableDiv = () => {
  return (
    <Draggable>
      <ResizableBox
        width={200}
        height={200}
        minConstraints={[100, 100]}
        maxConstraints={[400, 400]}
        className="resizable-box"
        style={{ border: '1px solid #000', backgroundColor: '#f0f0f0', padding: '10px' }}
      >
        <div>Drag me around and resize me!</div>
      </ResizableBox>
    </Draggable>
  );
};

export default ResizableDraggableDiv;