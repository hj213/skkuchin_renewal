import React, { useState } from 'react';
import { Grid, Typography, Card } from '@mui/material';
import back from '../../image/arrow_back_ios.png';
import searchIcon from '../../image/search.png';
import dotIcon from '../../image/dotIcon.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CustomDropdownMenu from './CustomDropdownMenu';
import { useSelector, useDispatch } from 'react-redux';
import { delete_post } from '../../actions/post/post';

const Header = ({ title, onBackClick, showSearchIcon, post }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);

    // 댓글 드롭다운
    const [anchorEl, setAnchorEl] = useState(null); 

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const getMenuOptions = (post) => {
        const options = [];

        // 내 게시글인 경우
        if (post.user_id === user.id) {
            options.push({
              label: '수정하기',
              onClick: () => handleEditPost(post),
            });
            options.push({
                label: '삭제하기',
                onClick: () => handleDeletePost(post),
            });
        } else {
            // 남의 게시글인 경우
            options.push({
              label: '프로필 보기',
              onClick: () => handleViewProfile(post),
            });
            options.push({
              label: '신고하기',
              onClick: () => handleReportPost(post),
            });
          
        }
        return options;
    };

    const handleEditPost = (post) => {
        console.log("수정하기");
        console.log(post.id);
    }

    const handleDeletePost = (post) => {
        console.log("삭제하기");
        console.log(post.id);

        dispatch(delete_post(post.id, ([result, message]) => {
          if (result) {
            console.log("게시글 삭제 성공");
            router.back();
          } else {
            console.log("게시글 삭제 오류" + message);
          }
        }));
    }

    const handleViewProfile = (post) => {
        router.push(`/clickProfile?id=${post.user_id}`);
    }

    const handleReportPost = (post) => {
        console.log("신고하기");
        console.log(post.id);
        router.push({
            pathname: '/reportReview',
            // query: { 
            //     room_id : room_id,
            //     user_number: user_number
            // }
        })
    }
    
    
    return (
      <Card style={{
        height: 'max-content',
        zIndex: '4',
        borderRadius: 0,
        boxShadow: 'none',
      }}>
        <Grid container style={{justifyContent: 'space-between', alignItems: 'center', }}>
          <Grid onClick={onBackClick}>
            <Image src={back} width={11} height={18} name='back' layout='fixed' />
          </Grid>
          <Grid>
            <Typography sx={{fontSize: '18px', fontWeight: 700, color: '#3C3C3C'}}>{title}</Typography>
          </Grid>
          <Grid>
              {showSearchIcon ? (
                  <Image src={searchIcon} width={24} height={24} name='search' layout='fixed' onClick={() => router.push('/communitySearch')}/>
              ) : (
                  <>
                    <Image src={dotIcon} width={36} height={36} name='menu' layout='fixed' onClick={(e) => handleMenuOpen(e)}/>

                    <CustomDropdownMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        options={getMenuOptions(post)} 
                    />   
                  </>
              )}
          </Grid>
        </Grid>
      </Card>
    );
};

Header.defaultProps = {
    showSearchIcon: false, 
    post: null,
};

export default Header;
