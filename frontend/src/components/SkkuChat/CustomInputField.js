import React, { useState } from 'react';
import { TextField, Grid, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import send from '../../image/send.png';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { enroll_comment, load_comment, enroll_reply } from '../../actions/comment/comment';

const CustomInputField = ({ article_id, isReply, parentCommentId }) => {
    const dispatch = useDispatch();

    const [isChecked, setIsChecked] = useState(false);
    const [message, setMessage] = useState('');

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendClick = () => {
        if (message !== '') {
            if(isReply) {
                dispatch(enroll_reply(message, article_id, parentCommentId, ([result, message]) => {
                    if (result) {
                        setMessage('');
                        console.log("대댓글 작성 완료!!")

                        dispatch(load_comment(article_id, ([result, message]) => {
                            if (result) {
                                console.log("댓글 불러오기 성공")
                            }
                        }));
                    } else {
                        alert("대댓글 작성 오류" + message);
                    }
                }));
            }
            else {
                dispatch(enroll_comment(message, article_id, ([result, message]) => {
                    if (result) {
                        setMessage('');
                        console.log("댓글 작성 완료!!")
                        
                        dispatch(load_comment(article_id, ([result, message]) => {
                            if (result) {
                                console.log("댓글 불러오기 성공")
                            }
                        }));
                    } else {
                        alert("댓글 작성 오류" + message);
                    }
                }));
            }
        }
    };

    return (
        <div style={{ width: `calc(100%-48px)`, height: '44px', justifyContent: 'space-between', display: 'flex', backgroundColor: '#F2F2F2', borderRadius: '10px', alignItems: 'center'}}>
            <Button
                onClick={handleCheck}
                sx={{
                    fontSize: '12px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9E9E9E',
                    pl: '10px',
                }}
                >
                {isChecked ? (
                    <CheckCircleIcon sx={{ mr: '3px', color: '#9E9E9E', width: '16px' }} />
                ) : (
                    <CheckCircleOutlineIcon sx={{ mr: '3px', color: '#9E9E9E', width: '16px'}} />
                )}
                익명
            </Button>
            <TextField
                value={message}
                onChange={handleMessageChange}
                variant="outlined"
                InputProps={{
                    placeholder: "댓글을 입력하세요.",
                    style: {
                        fontSize: '14px',
                    },
                }}
                sx={{
                    flexGrow: 1,
                    '& fieldset': {
                        border: 'none', 
                    },
                    color: '#9E9E9E',
                }}
            />
            <Button onClick={handleSendClick}>
                <Image src={send} width={17.43}  />
            </Button>
        </div>
    );
};

export default CustomInputField;