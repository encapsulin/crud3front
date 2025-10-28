import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

export default function AppModal({props,fnHandleOpen,children}) {

    // console.log(props)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        setModalIsOpen(props.isOpen);
    }, [props]);

    const closeModal = () => {
        fnHandleOpen(false);
    };

    return (

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    // backgroundColor: 'white',
                    background: 'linear-gradient(#e7e7e7, white)',
                    padding: '0px',
                    width: 'fit-content',
                    margin: 'auto',
                    borderRadius: '10px',
                    textAlign: 'left',
                    height: 'fit-content',
                    maxHeight: '90vh', // Set maximum height using CSS
                    overflowY: 'auto'
                }

            }}
        >
            <div style={{
                backgroundColor: 'slategray',
                textAlign: 'center',
                color: 'white',
                padding: '5px',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <span style={{
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                }}>{props.title}</span>
                <span onClick={closeModal} className='modalClose'>&times;</span>
            </div>


            <div style={{
                padding: '10px',
            }}>
                {children}
            </div>


        </Modal>

    );
}