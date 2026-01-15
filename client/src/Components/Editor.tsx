import { useEffect, useState } from 'react';

import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { Box } from '@mui/material';
import styled from '@emotion/styled';


import { io, Socket } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Delta } from 'quill';

const Component = styled.div`
    background: #F5F5F5;
`

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
];
  

const Editor = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [quill, setQuill] = useState<Quill | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const container = document.querySelector('#container');
        if (container) container.innerHTML = '';
        const quillServer = new Quill('#container', { theme: 'snow', modules: { toolbar: toolbarOptions }});
        quillServer.disable();
        quillServer.setText('Loading the document...')
        setQuill(quillServer);
    }, []);

    useEffect(() => {
        const socketServer = io('http://localhost:9000');
        setSocket(socketServer);

        return () => {
            socketServer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta: Delta, _oldData: Delta, source: string) => {
            if (source !== 'user') return;

            socket.emit('send-changes', delta);
        }

        quill.on('text-change', handleChange);

        return () => {
            quill.off('text-change', handleChange);
        }
    }, [quill, socket])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChange = (delta: Delta) => {
            quill.updateContents(delta);
        }

        socket.on('receive-changes', handleChange);

        return () => {
            socket.off('receive-changes', handleChange);
        }
    }, [quill, socket]);

    useEffect(() => {
        if (quill === null || socket === null) return;

        socket.once('load-document', document => {
            console.log('Received load-document', document);
            // Handle existing empty documents or valid delta
            if (typeof document === 'string' && document.length === 0) {
                 quill.setContents([{ insert: '\n' }]);
            } else {
                 quill.setContents(document);
            }
            quill.enable();
        })

        console.log('Emitting get-document', id);
        socket.emit('get-document', id);
    },  [quill, socket, id]);

    useEffect(() => {
        if (socket === null || quill === null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents())
        }, 2000);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill]);

    return (
        <Component>
            <Box className='container' id='container'></Box>
        </Component>
    )
}

export default Editor;