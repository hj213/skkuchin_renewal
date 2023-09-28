import React, { useEffect, useState } from 'react';
import { Typography, Grid, Divider, Container} from '@mui/material';
import { displayMBTI } from '../Matching/MBTIList';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CustomPopup from './CustomPopup';
import CustomInputField from './CustomInputField';
import Image from 'next/image';
import replyArrow from '../../image/turn_right.png';
import { like_comment, delete_comment, load_comment } from '../../actions/comment/comment';
import { useDispatch } from 'react-redux';
import CustomPopupNoBtn from './CustomPopupNoBtn';
import CustomDropdownMenu from './CustomDropdownMenu';
import { useRouter } from 'next/router';

const Comment = ({ comments, postId }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [isReplyPopupOpen, setReplyPopupOpen] = useState(false); 
    const [tempComment, setTempComment] = useState(null); 
    const [selectedComment, setSelectedComment] = useState(null);

    const [isPopupMessageOpen, setPopupMessageOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    
    // 대댓글 팝업
    const openReplyPopup = (comment) => {
        setTempComment(comment);
        setReplyPopupOpen(true);
    };

    const closeReplyPopup = () => {
        setTempComment(null);
        setReplyPopupOpen(false);
    };

    const handleAddReply = () => {
        setSelectedComment(tempComment);
        closeReplyPopup();
    };

    const handleAddFav = (commentId) => {
        console.log(commentId);
        dispatch(like_comment(commentId, postId, ([result, message]) => {
            if (result) {
                console.log("좋아요 성공")
            } else {
                console.log("좋아요 오류" + message);
                setPopupMessage(message);
                setPopupMessageOpen(true);
            }
        }));
    }

    // 댓글 드롭다운
    const [anchorEl, setAnchorEl] = useState(null); 
    const [currentComment, setCurrentComment] = useState(null); 

    const handleMenuOpen = (e, comment) => {
        setAnchorEl(e.currentTarget);
        setCurrentComment(comment);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentComment(null);
    };

    const getMenuOptions = (comment) => {
        const options = [];

        // 내 댓글/대댓글인 경우
        if (comment.my_comment) {
            options.push({
                label: '삭제하기',
                onClick: () => handleDeleteComment(comment),
            });
        } else {
            // 남의 댓글/대댓글인 경우
            if (comment.anonymous) {
                options.push({
                    label: '신고하기',
                    onClick: () => handleReportComment(comment),
                    });
            } else {
                options.push({
                    label: '프로필 보기',
                    onClick: () => handleViewProfile(comment),
                });
                options.push({
                    label: '신고하기',
                    onClick: () => handleReportComment(comment),
                });
            }
        }

        return options;
    };


    const handleDeleteComment = (comment) => {
        console.log("삭제하기");
        dispatch(delete_comment(comment.id, ([result, message]) => {
            if (result) {
                console.log("삭제 성공");
                setPopupMessage("해당 댓글이 삭제되었습니다.");
                setPopupMessageOpen(true);

                // 댓글 다시 불러오기
                dispatch(load_comment(postId, ([result, message]) => {
                    if (result) {
                        console.log("댓글 불러오기 성공")
                    }
                }));
            } else {
                console.log("삭제 오류" + message);
            }
        }
        ));
        handleMenuClose();
    }

    const handleViewProfile = (comment) => {
        router.push(`/clickProfile?id=${comment.user_id}`);
    }

    const handleReportComment = (comment) => {
        console.log("신고하기");
        console.log(comment.id);
        router.push({
            pathname: '/reportCommunity',
            // query: { 
            //     room_id : room_id,
            //     user_number: user_number
            // }
        })
    }
    
    return (  
        <div>
        {comments && comments.map((comment, index) => (
            <div key={index} style={{ borderBottom: '1px solid #F2F2F2'}}>
                {
                    comment.deleted ?
                    (<>
                        <div style={{backgroundColor: 'transparent', padding: '10px 24px'}}>
                            {/* 프로필 이미지, 닉네임 */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {displayMBTI("defaultY", 25, 25)}
                                </div>
                                <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#BABABA' }}>
                                    (삭제)
                                </Typography>
                                </div>
                            </div>
                            {/* 댓글 내용 */}
                            <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>삭제된 댓글입니다.</Typography>
                        </div>
                    </>)
                    :
                    <div style={{backgroundColor: selectedComment && comment.id === selectedComment.id ? '#FFFCE4' : 'transparent', padding: '10px 24px'}}>
                        {/* 프로필 이미지, 닉네임 */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            {displayMBTI(comment.user_image, 35, 35)}
                            <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#3C3C3C' }}>
                                {comment.anonymous ? '익명' : comment.nickname}
                                {(comment.my_comment && comment.writer) || (comment.my_comment && !comment.writer) ? <span style={{ color: '#FFAC0B' }}> (나)</span> : null}
                                {comment.writer && !comment.my_comment ? <span style={{ color: '#FFAC0B' }}> (작성자)</span> : null}
                            </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FBFBFB', padding: '0px 9px', borderRadius: '10px' }}>
                                <FavoriteBorderIcon style={{ width: '13px', color: '#BABABA' }} onClick={()=> handleAddFav(comment.id)}/>
                                <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                                <ChatBubbleOutlineIcon onClick={() => openReplyPopup(comment)} style={{ width: '13px', color: '#BABABA' }} />
                                <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                                <MoreVertOutlinedIcon style={{ width: '13px', color: '#BABABA' }} onClick={(e) => handleMenuOpen(e, comment)}/>

                                <CustomDropdownMenu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && currentComment === comment}
                                    onClose={handleMenuClose}
                                    options={getMenuOptions(comment)} 
                                />   
                            </div>
                        </div>
                        {/* 댓글 내용 */}
                        <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>{comment.content}</Typography>
                        {/* 업로드 시간, 좋아요 */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography style={{ fontSize: '12px', fontWeight: 700, color: '#BABABA' }}>{comment.display_time}</Typography>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FavoriteBorderIcon style={{ width: '15px', color: '#FFCE00' }} />
                                <Typography style={{ fontSize: '12px', color: '#FFCE00', marginLeft: '3px', fontWeight: 600 }}> {comment.comment_likes}</Typography>
                            </div>
                        </div>
                    </div>
                }
                {/* 대댓글 */}
                {
                    comment.reply && comment.reply.length > 0 &&
                        <div style={{padding: '0px 24px'}}>
                            {comment.reply.map((reply, replyIndex) => (
                                    <div key={replyIndex} style={{display: 'flex'}}>
                                        <div>
                                            <Image src={replyArrow} alt="" width={13} height={13} style={{marginRight: '10px'}}/>
                                        </div>
                                        {
                                            reply.deleted ? (
                                                <div style={{flexGrow: 1, backgroundColor: '#FBFBFB', borderRadius: '10px', padding: '5px 10px', margin: '10px 0'}}>
                                                    {/* 프로필 이미지, 닉네임 */}
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                                        <div style={{ width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            {displayMBTI("defaultY", 25, 25)}
                                                        </div>
                                                        <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#BABABA' }}>
                                                            (삭제)
                                                        </Typography>
                                                        </div>
                                                    </div>
                                                    {/* 댓글 내용 */}
                                                    <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>삭제된 댓글입니다.</Typography>
                                                </div>
                                            )
                                            :
                                            <div style={{flexGrow: 1, backgroundColor: '#FBFBFB', borderRadius: '10px', padding: '5px 10px', margin: '10px 0'}}>
                                                {/* 프로필 이미지, 닉네임 */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                                                    {displayMBTI(reply.user_image, 35, 35)}
                                                    <Typography style={{ fontSize: '12px', fontWeight: 800, color: '#3C3C3C' }}>
                                                        {reply.anonymous ? '익명' : reply.nickname}
                                                        {(reply.my_comment && reply.writer) || (reply.my_comment && !reply.writer) ? <span style={{ color: '#FFAC0B' }}> (나)</span> : null}
                                                        {reply.writer && !reply.my_comment ? <span style={{ color: '#FFAC0B' }}> (작성자)</span> : null}
                                                    </Typography>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', backgroundColor: '#FBFBFB', padding: '0px 9px', borderRadius: '10px' }}>
                                                        <FavoriteBorderIcon style={{ width: '13px', color: '#BABABA' }} onClick={()=>handleAddFav(reply.id)}/>
                                                        <Divider orientation='vertical' style={{ height: '7px', backgroundColor: '#E2E2E2' }} />
                                                        <MoreVertOutlinedIcon style={{ width: '13px', color: '#BABABA' }} onClick={(e) => handleMenuOpen(e, reply)}/>

                                                        <CustomDropdownMenu
                                                            anchorEl={anchorEl}
                                                            open={Boolean(anchorEl) && currentComment === reply}
                                                            onClose={handleMenuClose}
                                                            options={getMenuOptions(reply)} 
                                                        />   
                                                    </div>
                                                </div>
                                                {/* 댓글 내용 */}
                                                <Typography style={{ fontSize: '14px', fontWeight: 400, color: '#3C3C3C', margin: '10px 0' }}>{reply.content}</Typography>
                                                {/* 업로드 시간, 좋아요 */}
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <Typography style={{ fontSize: '12px', fontWeight: 700, color: '#BABABA' }}>{reply.display_time}</Typography>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FavoriteBorderIcon style={{ width: '15px', color: '#FFCE00' }}/>
                                                        <Typography style={{ fontSize: '12px', color: '#FFCE00', marginLeft: '3px', fontWeight: 600 }}> {reply.comment_likes}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            }  
                        </div>
                }
            </div>
        ))}

        <CustomPopup
            open={isReplyPopupOpen}
            onClose={closeReplyPopup}
            content={`대댓글을 작성하시겠습니까?`} // 팝업 내용을 원하는 텍스트로 변경
            leftButtonLabel="아니요"
            rightButtonLabel="작성"
            onLeftButtonClick={closeReplyPopup} // 아니오 버튼 클릭 시 팝업 닫기
            onRightButtonClick={() => {
                handleAddReply();
            }}
        />

        <CustomPopupNoBtn
            open={isPopupMessageOpen}
            onClose={() => setPopupMessageOpen(false)}
            content={popupMessage}
        />

        <Container sx={{justifyContent: 'center', position: 'fixed', backgroundColor: '#fff', bottom: '0px', pb: '24px'}}>
            <CustomInputField article_id={postId} isReply={selectedComment ? true : false} parentCommentId={selectedComment ? selectedComment.id : null}/>
        </Container>
        </div>
    );
};

export default Comment;
